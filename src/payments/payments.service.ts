import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentsService {
    constructor(private prisma: PrismaService) { }

    async addPaymentMethod(userId: string, provider: string, details: string) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');

        return this.prisma.paymentMethod.create({
            data: {
                userId,
                provider,
                details,
            },
        });
    }

    async updatePaymentMethod(id: string, provider: string, details: string) {
        const method = await this.prisma.paymentMethod.findUnique({ where: { id } });
        if (!method) throw new NotFoundException('Payment method not found');

        return this.prisma.paymentMethod.update({
            where: { id },
            data: { provider, details },
        });
    }
}
