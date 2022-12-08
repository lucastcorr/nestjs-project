import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/services/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
        ) {}

    async validateUser(username: string, password: string)/*: Promise<any> */{
        const user = await this.userService.findByUsername(username);
        
        // Versão default da documentação
        // if (user && user.password === password) {
        //     const { password, ...result } = user;
        //     return result;
        // }

        // Versão utilizando a hash do bcrypt

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (isPasswordValid) {
            return {
                ...user,
                password: undefined,
            }
        }

        throw new Error('Email adress or password not valid.');
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
    return { access_token: this.jwtService.sign(payload), };
    }
}
