import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

    findAll() {
        return 'Retorno de todos os usuários';
    }

    findOne() {
        return 'Retorno de um único usuário';
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
