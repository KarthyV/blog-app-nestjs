import { Sequelize } from "sequelize-typescript";
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
                database: 'nest-blog'
            });
            sequelize.addModels([User])
            await sequelize.sync()
            return sequelize
        }     
    }
]