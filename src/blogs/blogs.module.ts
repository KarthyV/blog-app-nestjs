import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsResolver } from './blogs.resolver';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [BlogsResolver, BlogsService],
})
export class BlogsModule {}
