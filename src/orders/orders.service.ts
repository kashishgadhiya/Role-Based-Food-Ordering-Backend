import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateOrderInput } from './dto/create-order.input';

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) { }

    async create(createOrderInput: CreateOrderInput, user: User) {
        const restaurant = await this.prisma.restaurant.findUnique({ where: { id: createOrderInput.restaurantId } });
        if (!restaurant) throw new NotFoundException('Restaurant not found');

        if (user.role !== 'ADMIN' && restaurant.country !== user.country) {
            throw new UnauthorizedException('Cannot order from a restaurant outside your country');
        }

        let totalAmount = 0;
        const itemsData: { menuItemId: string, quantity: number, price: number }[] = [];

        for (const item of createOrderInput.items) {
            const dbItem = await this.prisma.menuItem.findUnique({ where: { id: item.menuItemId } });
            if (!dbItem || dbItem.restaurantId !== restaurant.id) {
                throw new BadRequestException(`Invalid menu item ${item.menuItemId}`);
            }
            totalAmount += dbItem.price * item.quantity;
            itemsData.push({
                menuItemId: dbItem.id,
                quantity: item.quantity,
                price: dbItem.price,
            });
        }

        return this.prisma.order.create({
            data: {
                userId: user.id,
                restaurantId: restaurant.id,
                totalAmount,
                status: 'CREATED',
                orderItems: {
                    create: itemsData,
                },
            },
        });
    }

    async checkout(orderId: string, user: User) {
        const order = await this.prisma.order.findUnique({ where: { id: orderId }, include: { restaurant: true } });
        if (!order) throw new NotFoundException('Order not found');

        if (user.role !== 'ADMIN' && order.restaurant.country !== user.country) {
            throw new UnauthorizedException('Cannot checkout order outside your country');
        }

        return this.prisma.order.update({
            where: { id: orderId },
            data: { status: 'PAID' },
        });
    }

    async cancel(orderId: string, user: User) {
        const order = await this.prisma.order.findUnique({ where: { id: orderId }, include: { restaurant: true } });
        if (!order) throw new NotFoundException('Order not found');

        if (user.role !== 'ADMIN' && order.restaurant.country !== user.country) {
            throw new UnauthorizedException('Cannot cancel order outside your country');
        }

        return this.prisma.order.update({
            where: { id: orderId },
            data: { status: 'CANCELLED' },
        });
    }
}
