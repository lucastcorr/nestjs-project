import { DataSource } from "typeorm";
import { Transaction } from "./entities/transaction.entity";
import { User } from "./entities/user.entity";
import { Wallet } from "./entities/wallet.entity";

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
          const dataSource = new DataSource({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'docker',
            database: 'postgres',
            entities: [User, Transaction, Wallet],
            migrations: [],
            synchronize: true,
            logging: true,
          });
    
          return dataSource.initialize();
        },
      },
];

// docker start postgres
// docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres