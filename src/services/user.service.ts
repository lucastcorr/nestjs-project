import { Injectable } from '@nestjs/common';

//export type User = any;

@Injectable()
export class UserService {

    private readonly users = [
        {
            id: 1,
            username: 'lucas',
            password: '011200',
        },
        {
            id: 2,
            username: 'victoria',
            password: '123456',
        }
    ]

    findAll() {
        return 'Retorno de todos os usuários';
    }

    async findOne(username: string)/*: Promise<User | undefined>*/{
        return this.users.find(user => user.username === username);
    }

    create() {
        return 'Criação de usuário';
    }

    update() {
        return 'Atualização de usuário';
    }

    delete() {
        return 'Remoção de usuário';
    }
}
