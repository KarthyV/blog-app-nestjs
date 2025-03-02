/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
// import { User as UserEntity } from './entities/user.entity';
// import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
