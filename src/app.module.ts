import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionModule } from './modules/transaction.module';
import { WalletModule } from './modules/wallet.module';
import { UserModule } from './modules/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [UserModule, WalletModule, TransactionModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      // Here i define guards as global
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
})
export class AppModule {}
