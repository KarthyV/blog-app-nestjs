import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    UsersModule,
    SequelizeModule.forFeature([User])
  ],
  providers: [AuthResolver, AuthService],
  exports: [AuthService]
})
export class AuthModule {}
