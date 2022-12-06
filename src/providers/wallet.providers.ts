import { Wallet } from "src/entities/wallet.entity";
import { DataSource } from "typeorm";

export const walletProviders = [
    {
        provide: 'WALLET_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Wallet),
        inject: ['DATA_SOURCE'],
    }
]