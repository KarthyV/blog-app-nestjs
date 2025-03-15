import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor( 
    private userService: UsersService
  ) {}
  
  createNewUser(data: Partial<CreateUserInput>) {
    return this.userService.create(data)
  }

  findUser(data: Partial<CreateUserInput>) {
    return this.userService.findOne(data)
  }

  async logoutUser(res: any) {
    const userId = res.user.userUniqueId
    if(userId) {
      const result = await this.userService.logoutUser(userId);
      delete res['user'];
      if(result) {
        return true;
      } else throw new BadRequestException('User not found');
    }
    else return false;
  }
}
