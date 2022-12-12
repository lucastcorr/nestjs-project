import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddMoneyDto } from 'src/dtos/wallet/add-money.dto';
import { getBalanceDto } from 'src/dtos/wallet/get-balance.dto';
import { RemoveMoneyDto } from 'src/dtos/wallet/remove-money.dto';
import { WalletService } from 'src/services/wallet.service';

@Controller('/wallet')
export class WalletController {
    constructor(private readonly walletService: WalletService) {}

    @Get('/balance')
    getBalance(@Body() getBalanceDto: getBalanceDto) {
        return this.walletService.getBalance(getBalanceDto);
    }

    @Post('/deposit')
    add(@Body() addMoneyDto: AddMoneyDto) {
        return this.walletService.deposit(addMoneyDto);
    }

    @Post('/withdraw')
    remove(@Body() removeMoneyDto: RemoveMoneyDto) {
        return this.walletService.withdraw(removeMoneyDto);
    }
}
