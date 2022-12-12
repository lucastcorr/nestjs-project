import { Module } from '@nestjs/common';
import { WalletController } from 'src/controllers/wallet.controller';
import { walletProviders } from 'src/providers/wallet.providers';
import { WalletService } from 'src/services/wallet.service';
import { DatabaseModule } from './database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [WalletController],
    providers: [
        ...walletProviders,
        WalletService],
    exports: [WalletService]
})
export class WalletModule {}
