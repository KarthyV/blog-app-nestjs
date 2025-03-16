import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';
import { CreateAuthInput } from './dto/create-auth.input';
import { AuthGuard } from './guards/auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => Boolean, { description: "Test auth" })
  customerAuthCheck() {
    return true;
  }

  // @UseInterceptors(new SerializeInterceptor(UserDto))
  @Mutation(() => UserDto)
    async createSignIn(@Args('createAuthInput') createUserInput: CreateAuthInput): Promise<UserDto> {
      const result = await this.authService.createNewUser(createUserInput);
      return result;
  }

  @Mutation(() => UserDto)
  async loginUser(@Args('createAuthInput') userInput: CreateAuthInput): Promise<UserDto> {
    const result = await this.authService.findUser(userInput);
    return result;
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  logoutUser(@Context() res: Response) {
    return this.authService.logoutUser(res);
  }

  @Query(() => UserDto)
  @UseGuards(AuthGuard)
  getUserStatus(@Context() req: any) {
    return req?.user;
  }
}
