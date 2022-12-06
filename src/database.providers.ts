import { DataSource } from "typeorm";

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
            entities: [
              './entities/*.entity.ts'
                //__dirname + '/../**/*.entity{.ts,.js}',
            ],
            synchronize: true,
            logging: true,
          });
    
          return dataSource.initialize();
        },
      },
];

// docker start postgres
// docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres