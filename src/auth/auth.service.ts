import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/services/user.service';
import * as bcrypt from 'bcrypt';
import { UserPayload } from './models/user-payload';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
        ) {}


    async login(user: any) {
        const payload: UserPayload = { username: user.username, sub: user.id, email: user.email };

        return { access_token: this.jwtService.sign(payload), };
    }


    async validateUser(username: string, password: string)/*: Promise<any> */{
        const user = await this.userService.findByUsername(username);

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
        
            if (isPasswordValid) {
                return {
                    ...user,
                    password: undefined,
                }
            }
        }

        throw new Error('Email adress or password not valid.');
    }
}
