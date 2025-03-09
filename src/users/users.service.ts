import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { decryptAESHash, encryptAESHash } from 'utilities/encryption.utility';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepo: typeof User
  ) {}
  async create(createUserInput: Partial<CreateUserInput>) {
    const user = await this.userRepo.findOne({ where: { email: createUserInput.email }, raw: true });

    if(!user) {
      const userData = {
        ...createUserInput,
        password: encryptAESHash(createUserInput.password),
        userUniqueId: uuidv4(),
        token: '123'
      }
      const newUser = this.userRepo.build(userData);
      await newUser.save();
      return newUser.get({ plain: true });
    } else throw new UnauthorizedException('User already exists');
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(userInput: Partial<CreateUserInput>) {
     const user = await this.userRepo.findOne({
       where: { 
        email: userInput?.email
       },
        raw: true
     })
    
     if(user) {
       const decryptedPassword = decryptAESHash(user.password);

        if(decryptedPassword === userInput.password) {
          await this.userRepo.update({
            token: '1234'
          }, {
            where: { email: userInput.email }
          });

          const updatedUser = await this.userRepo.findOne({
            where: { email: userInput.email },
            raw: true
          });
          return updatedUser;
        } else return user 
        // throw new UnauthorizedException('Invalid password');
     }
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
