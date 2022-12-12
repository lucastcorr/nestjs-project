import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { DeleteUserDto } from 'src/dtos/user/delete-user.dto';
import { SecondtStepRegistrationDto } from 'src/dtos/user/second-step-registration.dto';
import { FirstStepRegistrationDto } from 'src/dtos/user/first-step-registration.dto';
import { ChangePasswordDto } from 'src/dtos/user/change-password.dto';
import { ChangeEmailDto } from 'src/dtos/user/change-email.dto';
import { WalletService } from './wallet.service';
import { Wallet } from 'src/entities/wallet.entity';

@Injectable()
export class UserService {
    constructor (private readonly walletService: WalletService) {}

    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>;

    @Inject('WALLET_REPOSITORY')
    private readonly walletRepository: Repository<Wallet>;

    async findByUsername(username: string)/*: Promise<User | undefined>*/{
        const user = await this.userRepository.findOne({
            where: { username },
        });

        return {
            ...user,
        };
    }

    async createUser1(firstStepRegistrationDto: FirstStepRegistrationDto) {
        const secret = 'abc123';

        const user = {
            ...firstStepRegistrationDto,
            twoFactorAuth: secret,
        };

        return this.userRepository.save(user);
    }

    async createUser2(secondStepRegistrationDto: SecondtStepRegistrationDto) {
        const { id, twoFactorAuth, password } = secondStepRegistrationDto;
        
        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (user.twoFactorAuth != twoFactorAuth) {
            this.userRepository.remove(user);
            return 'Invalid authentication token!';
        }

        const passwordEncrypted = await bcrypt.hash(password, 10);

        await this.userRepository.update(user.id, {password: passwordEncrypted})
        
        // await this.walletService.createWallet(user.id)

        await this.walletService.createWallet(user.id);

        return {
            ...user,
            password: undefined,
        };
    }

    async changePassword(changePasswordDto: ChangePasswordDto) {
        // Validação do 2FA 
        const { id, twoFactorAuth, password } = changePasswordDto;

        const user = await this.userRepository.findOne({
            where: { id }
        })
        
        if (user.twoFactorAuth != twoFactorAuth) {
            return 'Invalid authentication token!';
        }

        const passwordEncrypted = await bcrypt.hash(password, 10);

        await this.userRepository.update(user.id, {password: passwordEncrypted});

        return {
            ...user,
            password: undefined,
        };
    }

    async changeEmail(changeEmailDto: ChangeEmailDto) {
        const { id, email } = changeEmailDto;

        const emailAlreadyExists = await this.userRepository.findOne({
            where: { email }
        })

        if (emailAlreadyExists) {
            return 'Email already exists.';
        }

        const user = await this.userRepository.findOne({
            where: { id }
        })

        this.userRepository.update(user.id, {email: email});

        return {
            ...user,
            password: undefined,
        };
    }

    async deleteUser(deleteUserDto: DeleteUserDto) {
        const { id } = deleteUserDto;
        const user = await this.userRepository.findOne({
            where: { id }
        })

        await this.walletService.deleteWallets(id);

        return this.userRepository.remove(user);
    }

    
}
