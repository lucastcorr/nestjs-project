import { Inject, Injectable } from '@nestjs/common';
import { AddMoneyDto } from 'src/dtos/wallet/add-money.dto';
import { RemoveMoneyDto } from 'src/dtos/wallet/remove-money.dto';
import { Wallet } from 'src/entities/wallet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WalletService {

    @Inject('WALLET_REPOSITORY')
    private readonly walletRepository: Repository<Wallet> ;

    async deposit(addMoneyDto: AddMoneyDto) {
        if (addMoneyDto.amount <= 0) {
            return 'The amout must be higher then U$0.00'
        }

        const wallet = await this.walletRepository.findOne({
            where: {
                id: addMoneyDto.id,
                label: addMoneyDto.label,
            }
        })
        
        wallet.amout += addMoneyDto.amount;

        return this.walletRepository.save(wallet)
    }

    async withdraw(removeMoneyDto: RemoveMoneyDto) {
        const wallet = await this.walletRepository.findOne({
            where: {
                id: removeMoneyDto.id,
                label: removeMoneyDto.label,
            }
        })

        if (removeMoneyDto.amount > wallet.amout) {
            return 'No balance for the operation';
        }

        wallet.amout -= removeMoneyDto.amount;

        return this.walletRepository.save(wallet);
    }
}
