import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlogsResolver } from './blogs.resolver';
import { BlogsService } from './blogs.service';
import { Blog } from './entities/blog.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Blog, User]),
  ],
  providers: [BlogsResolver, BlogsService],
})
export class BlogsModule {}
