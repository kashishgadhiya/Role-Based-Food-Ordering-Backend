import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { PaymentsService } from './payments.service';
import { PaymentMethod } from './models/payment-method.model';

@Resolver(() => PaymentMethod)
@UseGuards(AuthGuard, RolesGuard)
export class PaymentsResolver {
    constructor(private readonly paymentsService: PaymentsService) { }

    @Mutation(() => PaymentMethod)
    @Roles('ADMIN')
    addPaymentMethod(
        @Args('userId') userId: string,
        @Args('provider') provider: string,
        @Args('details') details: string,
    ) {
        return this.paymentsService.addPaymentMethod(userId, provider, details);
    }

    @Mutation(() => PaymentMethod)
    @Roles('ADMIN')
    updatePaymentMethod(
        @Args('id') id: string,
        @Args('provider') provider: string,
        @Args('details') details: string,
    ) {
        return this.paymentsService.updatePaymentMethod(id, provider, details);
    }
}
