import { RestaurantsService } from './restaurants.service';
export declare class RestaurantsResolver {
    private readonly restaurantsService;
    constructor(restaurantsService: RestaurantsService);
    restaurants(user: any): Promise<({
        menuItems: {
            id: string;
            name: string;
            price: number;
            restaurantId: string;
        }[];
    } & {
        id: string;
        name: string;
        country: string;
    })[]>;
    menuItems(restaurantId: string, user: any): Promise<{
        id: string;
        name: string;
        price: number;
        restaurantId: string;
    }[]>;
}
