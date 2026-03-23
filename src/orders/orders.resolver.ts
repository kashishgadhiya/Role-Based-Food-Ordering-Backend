import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CurrentUser } from '../auth/current-user.decorator';
import { OrdersService } from './orders.service';
import { Order } from './models/order.model';
import { CreateOrderInput } from './dto/create-order.input';

@Resolver(() => Order)
@UseGuards(AuthGuard, RolesGuard)
export class OrdersResolver {
    constructor(private readonly ordersService: OrdersService) { }

    @Mutation(() => Order)
    @Roles('ADMIN', 'MANAGER', 'MEMBER')
    createOrder(
        @Args('input') input: CreateOrderInput,
        @CurrentUser() user: any,
    ) {
        return this.ordersService.create(input, user);
    }

    @Mutation(() => Order)
    @Roles('ADMIN', 'MANAGER')
    checkoutOrder(
        @Args('orderId') orderId: string,
        @CurrentUser() user: any,
    ) {
        return this.ordersService.checkout(orderId, user);
    }

    @Mutation(() => Order)
    @Roles('ADMIN', 'MANAGER')
    cancelOrder(
        @Args('orderId') orderId: string,
        @CurrentUser() user: any,
    ) {
        return this.ordersService.cancel(orderId, user);
    }
}
