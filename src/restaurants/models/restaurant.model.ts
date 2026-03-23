import { ObjectType, Field, ID } from '@nestjs/graphql';
import { MenuItem } from './menu-item.model';

@ObjectType()
export class Restaurant {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    country: string;

    @Field(() => [MenuItem], { nullable: true })
    menuItems?: MenuItem[];
}
