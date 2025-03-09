import { InputType, Int, Field, ArgsType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

@InputType()
export class CreateAuthInput {
   @IsEmail()
   @IsNotEmpty()
   @Field(() => String)
   email: string;
 
   @IsString()
   @IsNotEmpty()
   @Field(() => String)
   @IsStrongPassword({
       minLength: 8,
       minLowercase: 1,
       minUppercase: 1,
       minNumbers: 1,
       minSymbols: 1,
   })
   password: string;
}
