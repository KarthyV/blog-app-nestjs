import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Mutation(() => User)
  @UseGuards(AuthGuard)
  updateUser(@Context() res: any, @Args('updateUserInput') updateUserInput: UpdateUserInput) {
    const user = res.user;
    return this.usersService.update(user?.userUniqueId, updateUserInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  async uploadProfilePicture(@Context() res: any, @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload) {
    const user = res.user;
    console.log('File:', file);

    await this.usersService.uploadProfilePicture(user?.userUniqueId, file);
    return true;
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
