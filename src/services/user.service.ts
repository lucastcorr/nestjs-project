import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

//export type User = any;

@Injectable()
export class UserService {
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>;

    private readonly users = [
        {
            userId: 1,
            username: 'lucas',
            password: '011200',
        },
        {
            userId: 2,
            username: 'victoria',
            password: '123456',
        }
    ]

    findAll() {
        return this.userRepository.find();
    }

    async findByUsername(username: string)/*: Promise<User | undefined>*/{
        const user = await this.userRepository.findOne({
            where: { username },
        });

        return {
            ...user,
        };
    }

    async create(createUserDto: CreateUserDto) {
        const { username } = createUserDto;
        
        const alreadyExists = await this.userRepository.findOne({
            where: { username },
        });

        if (alreadyExists) {
            return `User ${username} already exists!`;
        }

        const user = {
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10)
        }

        this.userRepository.create(user);
        
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
