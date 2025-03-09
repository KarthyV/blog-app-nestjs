import { ArgsType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@ArgsType()
export class CreateUserInput {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  profilePicture: string;
}
