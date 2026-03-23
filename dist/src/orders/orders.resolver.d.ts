import { OrdersService } from './orders.service';
import { CreateOrderInput } from './dto/create-order.input';
export declare class OrdersResolver {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(input: CreateOrderInput, user: any): Promise<{
        id: string;
        restaurantId: string;
        status: string;
        totalAmount: number;
        userId: string;
    }>;
    checkoutOrder(orderId: string, user: any): Promise<{
        id: string;
        restaurantId: string;
        status: string;
        totalAmount: number;
        userId: string;
    }>;
    cancelOrder(orderId: string, user: any): Promise<{
        id: string;
        restaurantId: string;
        status: string;
        totalAmount: number;
        userId: string;
    }>;
}
