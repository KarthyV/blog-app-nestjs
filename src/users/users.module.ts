/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { AuthService } from 'src/auth/auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { AzureStorageService } from 'src/azure/azure.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
  ],
  providers: [UsersResolver, UsersService, AuthService, AzureStorageService],
  exports: [UsersService]
})
export class UsersModule {}
