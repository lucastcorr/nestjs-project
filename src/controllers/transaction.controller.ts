import { Body, Controller, Post } from '@nestjs/common';
import { TransferDto } from 'src/dtos/transaction/transfer.dto';
import { TransactionService } from 'src/services/transaction.service';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Post('/transfer')
    transfer(@Body() transferDto: TransferDto ) {
        return this.transactionService.transferFunds(transferDto);
    }
}
