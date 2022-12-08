import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { FirstStepRegistrationDto } from 'src/dtos/first-step-registration.dto';
import { SecondtStepRegistrationDto } from 'src/dtos/second-step-registration.dto';

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


    async create1(firstStepRegistrationDto: FirstStepRegistrationDto) {
        const { username, email } = firstStepRegistrationDto;
        
        const userAlreadyExists = await this.userRepository.findOne({
            where: { username },
        });

        const emailAlreadyExists = await this.userRepository.findOne({
            where: { email },
        });

        // Need to adapt this error
        if (userAlreadyExists) {
            return `User ${username} already exists.`;
        }

        if (emailAlreadyExists) {
            return `User ${email} already exists.`;
        }

        return this.userRepository.save(firstStepRegistrationDto);

        // Neet to create the 2fa secret
    }

    async create2(secondStepRegistrationDto: SecondtStepRegistrationDto) {
        
        const user = {
            ...secondStepRegistrationDto,
            password: await bcrypt.hash(secondStepRegistrationDto.password, 10)
        }

        this.userRepository.save(user);
        
        return {
            ...user,
            password: undefined,
        };
    }

    update() {
        return 'Atualização de usuário';
    }


    delete() {
        return 'Remoção de usuário';
    }
}
