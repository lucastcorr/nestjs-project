import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get('one')
    findOne() {
        return this.userService.findOne();
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
