import { Controller, Delete, Get, Patch, Post, UseGuards, Request, Body } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators';
import { FirstStepRegistrationDto } from 'src/dtos/first-step-registration.dto';
import { SecondtStepRegistrationDto } from 'src/dtos/second-step-registration.dto';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService) {}


    @Get()
    findByUsername(@Body() username: string) {
         return this.userService.findByUsername(username);
    }


    @IsPublic()
    @Post()
    create1(@Body() firstStepRegistrationDto: FirstStepRegistrationDto) {
        return this.userService.create1(firstStepRegistrationDto);
    }


    @IsPublic()
    @Post()
    create2(@Body() secondStepRegistrationDto: SecondtStepRegistrationDto) {
        return this.userService.create2(secondStepRegistrationDto);
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
