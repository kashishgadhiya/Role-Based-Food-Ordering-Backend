import { Resolver, Query } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Resolver(() => User)
export class UsersResolver {
    @Query(() => User)
    @UseGuards(AuthGuard)
    me(@CurrentUser() user: any) {
        return user;
    }
}
