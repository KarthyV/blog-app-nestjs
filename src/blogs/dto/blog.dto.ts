import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";
import { Transform } from "class-transformer";

@ObjectType()
export class BlogDto {
    @Field(() => String)
    title: string;

    @Field(() => String)
    content: string;

    @Field(() => String)
    imageUrl: string;

    @Field(() => User, { nullable: true })
    user?: Partial<User>;
}