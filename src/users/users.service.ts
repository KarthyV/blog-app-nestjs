import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { decryptAESHash, encryptAESHash } from 'utilities/encryption.utility';
import { JwtService } from '@nestjs/jwt';
import { AzureStorageService } from 'src/azure/azure.service';
import { FileUpload } from 'graphql-upload';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepo: typeof User,
    private jwtService: JwtService,
    private azureStorageService: AzureStorageService
  ) {}
  async create(createUserInput: Partial<CreateUserInput>) {
    const user = await this.userRepo.findOne({ where: { email: createUserInput.email }, raw: true });

    if(!user) {
      const userData = {
        ...createUserInput,
        password: encryptAESHash(createUserInput.password),
        userUniqueId: uuidv4(),
      }
      const token = await this.jwtService.signAsync({
        email: createUserInput.email,
        userUniqueId: userData.userUniqueId
      });

      const newUser = this.userRepo.build({...userData, token});
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
       const updatedToken = await this.jwtService.signAsync({
         email: userInput.email,
         userUniqueId: user.userUniqueId,
         userId: user.id
       })
       await this.userRepo.update({
         token: updatedToken
       }, {
         where: { email: userInput.email }
       });

       const updatedUser = await this.userRepo.findOne({
         where: { email: userInput.email },
         raw: true
       });
       return updatedUser;
     } else throw new UnauthorizedException('Invalid password');
  } else throw new BadRequestException('Invalid email');
}

  async logoutUser(userID: string) {
    return await this.userRepo.update({
      token: null
    }, {
      where: { userUniqueId: userID }
    });
  }

  async update(id: string, updateUserInput: Partial<CreateUserInput>) {
    const user = await this.userRepo.findOne({ where: { userUniqueId: id } });

    if(user) {
      await this.userRepo.update(updateUserInput, { where: { userUniqueId: id } });
      const updatePayload = await this.userRepo.findOne({ where: { userUniqueId: id } , raw: true });
      return updatePayload;
    } else throw new BadRequestException('User not found');
  }

  async uploadProfilePicture(userID: string, file: FileUpload) {
    const user = await this.userRepo.findOne({ where: { userUniqueId: userID } });
    const { createReadStream, filename } = file;
    const stream = createReadStream();
    
    if(user) {
      const profileUrl = await this.azureStorageService.uploadFile(stream, filename);
      await this.userRepo.update({
        profilePicture: profileUrl
      }, {
        where: { userUniqueId: userID }
      });
      return true;
    } else throw new BadRequestException('User not found');
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
