import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { GraphQLModule } from './configs/graphql.config.module';
import { BlogsModule } from './blogs/blogs.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    DatabaseModule,
    GraphQLModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BlogsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
