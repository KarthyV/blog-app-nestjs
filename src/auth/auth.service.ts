import { Injectable } from '@nestjs/common';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    // @InjectModel(User) private userModel: User, 
    private userService: UsersService
  ) {}
  
  createNewUser(data: Partial<CreateUserInput>) {
    return this.userService.create(data)
  }

  findUser(data: Partial<CreateUserInput>) {
    return this.userService.findOne(data)
  }
}
