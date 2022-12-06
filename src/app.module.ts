import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionModule } from './modules/transaction.module';
import { WalletModule } from './modules/wallet.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [UserModule, WalletModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
