import { Controller, Delete, Get, Patch, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    // @Get('one')
    // findOne() {
    //     return this.userService.findOne();
    // }

    @UseGuards(/* before local-auth.guard: AuthGuard('local')*/ LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return req.user;
    }

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
