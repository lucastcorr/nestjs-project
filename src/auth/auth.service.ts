import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/services/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
        ) {}

    async validateUser(username: string, password: string)/*: Promise<any> */{
        const user = await this.userService.findOne(username);

        // Versão default da documentação
        // if (user && user.password === password) {
        //     const { password, ...result } = user;
        //     return result;
        // }

        // Versão utilizando a hash do bcrypt
        

        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
    return { access_token: this.jwtService.sign(payload), };
    }
}
