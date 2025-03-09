import { Sequelize } from "sequelize-typescript";
import { Blog } from "src/blogs/entities/blog.entity";
import { User } from "src/users/entities/user.entity";

export const databaseProviders = [
    { 
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'karthick',
                password: 'karthick',
                database: 'nest-blog',
            });
            sequelize.addModels([User, Blog])
            await sequelize.sync({ alter: true });
            return sequelize
        }     
    }
]