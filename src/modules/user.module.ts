import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/user.controller';
import { userProviders } from 'src/providers/user.providers';
import { walletProviders } from 'src/providers/wallet.providers';
import { UserService } from 'src/services/user.service';
import { DatabaseModule } from './database.module';
import { WalletModule } from './wallet.module';

@Module({
    imports: [DatabaseModule, WalletModule],
    controllers: [UserController],
    providers: [
        ...userProviders,
        ...walletProviders,
        UserService,
    ],
    exports: [UserService],
})
export class UserModule {}
