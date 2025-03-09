import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';
import { CreateAuthInput } from './dto/create-auth.input';

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
      console.log("result", result);
      
      return result;
  }

  @Mutation(() => UserDto)
  async loginUser(@Args('createAuthInput') userInput: CreateAuthInput): Promise<UserDto> {
    const result = await this.authService.findUser(userInput);
    console.log("result", result);
    
    return result;
  }

}
