import { Injectable, Inject } from '@nestjs/common';
import { TransferDto } from 'src/dtos/transaction/transfer.dto';
import { Transaction } from 'src/entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
    @Inject('TRANSACTION_REPOSITORY')
    private readonly transactionRepository: Repository<Transaction>;


    async transferFunds(transferDto: TransferDto) {
        
    }
}
