import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class PaymentMethod {
    @Field(() => ID)
    id: string;

    @Field()
    provider: string;

    @Field()
    details: string;

    @Field()
    userId: string;
}
