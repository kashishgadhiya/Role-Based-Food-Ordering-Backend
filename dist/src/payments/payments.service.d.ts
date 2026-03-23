import { PrismaService } from '../prisma/prisma.service';
export declare class PaymentsService {
    private prisma;
    constructor(prisma: PrismaService);
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
