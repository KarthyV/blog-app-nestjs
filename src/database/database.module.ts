import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { Blog } from 'src/blogs/entities/blog.entity';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          dialect: 'mysql',
          host: configService.get('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          models: [User, Blog],
          synchronize: true, // False in production
          autoLoadModels: true,
          dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false, // Needed for Azure SSL connections
            },
          },
        };
      },
      inject: [ConfigService],
    }),
    SequelizeModule.forFeature([User, Blog]),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}