import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateOrderInput } from './dto/create-order.input';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createOrderInput: CreateOrderInput, user: User): Promise<{
        id: string;
        restaurantId: string;
        status: string;
        totalAmount: number;
        userId: string;
    }>;
    checkout(orderId: string, user: User): Promise<{
        id: string;
        restaurantId: string;
        status: string;
        totalAmount: number;
        userId: string;
    }>;
    cancel(orderId: string, user: User): Promise<{
        id: string;
        restaurantId: string;
        status: string;
        totalAmount: number;
        userId: string;
    }>;
}
