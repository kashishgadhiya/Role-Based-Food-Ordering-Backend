import { PaymentsService } from './payments.service';
export declare class PaymentsResolver {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    addPaymentMethod(userId: string, provider: string, details: string): Promise<{
        id: string;
        userId: string;
        provider: string;
        details: string;
    }>;
    updatePaymentMethod(id: string, provider: string, details: string): Promise<{
        id: string;
        userId: string;
        provider: string;
        details: string;
    }>;
}
