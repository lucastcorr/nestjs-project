import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TransactionModule } from './modules/transaction.module';
import { WalletModule } from './modules/wallet.module';
import { UserModule } from './modules/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [UserModule, WalletModule, TransactionModule, AuthModule],
  controllers: [AppController],
  providers: [
    {
      // Here i define guards as global
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
})
export class AppModule {}
