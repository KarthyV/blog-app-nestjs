// database.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseProviders } from './database.providers';
import { User } from 'src/users/entities/user.entity';
import { Blog } from 'src/blogs/entities/blog.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'karthick',
      password: 'karthick',
      database: 'nest-blog',
      models: [User, Blog],
      synchronize: true, // Set to `false` in production for safer migrations
      autoLoadModels: true, // Automatically load models defined in the app
    }),
    SequelizeModule.forFeature([User, Blog]), // Ensure you have SequelizeModule.forFeature for the models
  ],
  providers: [...databaseProviders], // Adding any custom providers if needed
  exports: [SequelizeModule], // Exporting SequelizeModule for use in other modules
})
export class DatabaseModule {}
