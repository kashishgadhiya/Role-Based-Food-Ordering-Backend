import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class RestaurantsService {
    constructor(private prisma: PrismaService) { }

    async findAll(user: User) {
        if (user.role === 'ADMIN') {
            return this.prisma.restaurant.findMany({ include: { menuItems: true } });
        }
        return this.prisma.restaurant.findMany({
            where: { country: user.country },
            include: { menuItems: true }
        });
    }

    async findMenuItems(restaurantId: string, user: User) {
        const restaurant = await this.prisma.restaurant.findUnique({ where: { id: restaurantId } });
        if (!restaurant) throw new NotFoundException('Restaurant not found');

        if (user.role !== 'ADMIN' && restaurant.country !== user.country) {
            throw new UnauthorizedException('You can only view menus from your country');
        }

        return this.prisma.menuItem.findMany({ where: { restaurantId } });
    }
}
