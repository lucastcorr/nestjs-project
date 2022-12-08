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

    @Get()
    findByUsername(@Body() username: string) {
         return this.userService.findByUsername(username);
    }

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
