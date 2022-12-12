import { Inject, Injectable } from '@nestjs/common';
import { AddMoneyDto } from 'src/dtos/wallet/add-money.dto';
import { getBalanceDto } from 'src/dtos/wallet/get-balance.dto';
import { RemoveMoneyDto } from 'src/dtos/wallet/remove-money.dto';
import { Wallet } from 'src/entities/wallet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WalletService {

    @Inject('WALLET_REPOSITORY')
    private readonly walletRepository: Repository<Wallet> ;

    async createWallet(userId: string) {
        const cryptoWallet = {
            label: 'crypto',
            userId: userId,
            amount: 300,
        }

        const fiatWallet = {
            label: 'fiat',
            userId: userId,
            amount: 5000,
        }

        this.walletRepository.save(cryptoWallet);
        this.walletRepository.save(fiatWallet);

        return;
    }

    async deleteWallets(userId: string) {
        const cryptoWallet = await this.walletRepository.findOne({
            where: { userId }
        })
        const fiatWallet = await this.walletRepository.findOne({
            where: { userId }
        })

        await this.walletRepository.remove(cryptoWallet);
        await this.walletRepository.remove(fiatWallet);

        return;
    }

    async getBalance(getBalanceDto: getBalanceDto) {
        const { label, id } = getBalanceDto;

        return this.walletRepository.findOne({
            where: {
                userId: id,
                label: label,
            }
        })
    }

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
        
        wallet.amount += addMoneyDto.amount;

        return this.walletRepository.save(wallet)
    }

    async withdraw(removeMoneyDto: RemoveMoneyDto) {
        const wallet = await this.walletRepository.findOne({
            where: {
                id: removeMoneyDto.id,
                label: removeMoneyDto.label,
            }
        })

        if (removeMoneyDto.amount > wallet.amount) {
            return 'No balance for the operation';
        }

        wallet.amount -= removeMoneyDto.amount;

        return this.walletRepository.save(wallet);
    }
}