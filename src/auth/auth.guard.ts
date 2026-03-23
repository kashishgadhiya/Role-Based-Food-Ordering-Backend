import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private prisma: PrismaService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;

        const userId = req.headers['x-user-id'];

        if (!userId) {
            throw new UnauthorizedException('x-user-id header is missing');
        }

        const user = await this.prisma.user.findUnique({ where: { id: userId as string } });
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        req.user = user;
        return true;
    }
}
