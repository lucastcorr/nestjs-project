import { Module } from '@nestjs/common';
import { TransactionController } from 'src/controllers/transaction.controller';
import { transactionProviders } from 'src/providers/transaction.providers';
import { TransactionService } from 'src/services/transaction.service';
import { DatabaseModule } from './database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [TransactionController],
    providers: [
        ...transactionProviders,
        TransactionService],
    
})
export class TransactionModule {}
