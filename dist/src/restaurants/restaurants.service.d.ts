import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
export declare class RestaurantsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(user: User): Promise<({
        menuItems: {
            id: string;
            name: string;
            price: number;
            restaurantId: string;
        }[];
    } & {
        id: string;
        name: string;
        country: string;
    })[]>;
    findMenuItems(restaurantId: string, user: User): Promise<{
        id: string;
        name: string;
        price: number;
        restaurantId: string;
    }[]>;
}
