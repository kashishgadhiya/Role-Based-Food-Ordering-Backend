import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class Order {
    @Field(() => ID)
    id: string;

    @Field()
    userId: string;

    @Field()
    restaurantId: string;

    @Field()
    status: string;

    @Field(() => Float)
    totalAmount: number;
}
