import { Controller, Delete, Get, Patch, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        // private readonly authService: AuthService
        ) {}

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    // @Get('one')
    // findOne() {
    //     return this.userService.findOne();
    // }

    

    @Post()
    create() {
        return this.userService.create();
    }

    @Patch()
    update() {
        return this.userService.update();
    }

    @Delete()
    delete() {
        return this.userService.delete();
    }
}
