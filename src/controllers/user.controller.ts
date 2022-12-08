import { Controller, Delete, Get, Patch, Post, UseGuards, Request, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/create-user.dto';
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
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
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
