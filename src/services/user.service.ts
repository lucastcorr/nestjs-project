import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { DeleteUserDto } from 'src/dtos/user/delete-user.dto';
import { SecondtStepRegistrationDto } from 'src/dtos/user/second-step-registration.dto';
import { FirstStepRegistrationDto } from 'src/dtos/user/first-step-registration.dto';
import { ChangePasswordDto } from 'src/dtos/user/change-password.dto';
import { ChangeEmailDto } from 'src/dtos/user/change-email.dto';

@Injectable()
export class UserService {
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>;

    async findByUsername(username: string)/*: Promise<User | undefined>*/{
        const user = await this.userRepository.findOne({
            where: { username },
        });

        return {
            ...user,
        };
    }


    async createUser1(firstStepRegistrationDto: FirstStepRegistrationDto) {
        // const { username, email } = firstStepRegistrationDto;
        
        // const userAlreadyExists = await this.userRepository.findOne({
        //     where: { username },
        // });

        // if (userAlreadyExists) {
        //     return `User ${username} already exists.`;
        // }

        // const emailAlreadyExists = await this.userRepository.findOne({
        //     where: { email },
        // });

        // if (emailAlreadyExists) {
        //     return `User ${email} already exists.`;
        // }

        // const user = {
        //     ...firstStepRegistrationDto,
        // }

        const user = firstStepRegistrationDto;

        this.userRepository.save(user);

        // 2fa
    }

    async createUser2(secondStepRegistrationDto: SecondtStepRegistrationDto) {
        const { id, twoFactorAuth, password } = secondStepRegistrationDto;

        const userAuth = await this.userRepository.findOne({
            where: { twoFactorAuth }
        })

        // Comparar o twoFactorAuth recebido com o que temos no BD

        const user = {
            ...secondStepRegistrationDto,
            password: await bcrypt.hash(password, 10)
        }

        this.userRepository.save(user);
        
        return {
            ...user,
            password: undefined,
        };
    }

    changePassword(changePassword: ChangePasswordDto) {
        // Validação do 2FA 

        

        return 'Atualização de password';
    }


    changeEmail(changeEmailDto: ChangeEmailDto) {
        return 'Atualização de email';
    }


    async deleteUser(deleteUserDto: DeleteUserDto) {
        const { id } = deleteUserDto;
        const user = await this.userRepository.findOne({
            where: { id }
        })

        return this.userRepository.remove(user);
    }
}
