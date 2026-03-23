import { Resolver, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { Restaurant } from './models/restaurant.model';
import { MenuItem } from './models/menu-item.model';
import { RestaurantsService } from './restaurants.service';

@Resolver(() => Restaurant)
export class RestaurantsResolver {
    constructor(private readonly restaurantsService: RestaurantsService) { }

    @Query(() => [Restaurant])
    @UseGuards(AuthGuard)
    restaurants(@CurrentUser() user: any) {
        return this.restaurantsService.findAll(user);
    }

    @Query(() => [MenuItem])
    @UseGuards(AuthGuard)
    menuItems(@Args('restaurantId') restaurantId: string, @CurrentUser() user: any) {
        return this.restaurantsService.findMenuItems(restaurantId, user);
    }
}
