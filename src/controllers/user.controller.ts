import { Controller, Delete, Get, Patch, Post, Body } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators';
import { ChangeEmailDto } from 'src/dtos/user/change-email.dto';
import { ChangePasswordDto } from 'src/dtos/user/change-password.dto';
import { DeleteUserDto } from 'src/dtos/user/delete-user.dto';
import { FirstStepRegistrationDto } from 'src/dtos/user/first-step-registration.dto';
import { SecondtStepRegistrationDto } from 'src/dtos/user/second-step-registration.dto';
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
    @Post('register')
    create1(@Body() firstStepRegistrationDto: FirstStepRegistrationDto) {
        return this.userService.createUser1(firstStepRegistrationDto);
    }


    @IsPublic()
    @Post('register/validate')
    create2(@Body() secondStepRegistrationDto: SecondtStepRegistrationDto) {
        return this.userService.createUser2(secondStepRegistrationDto);
    }


    @Patch('/change/password')
    updatePassword(@Body() changePasswordDto: ChangePasswordDto) {
        return this.userService.changePassword(changePasswordDto);
    }


    @Patch('/change/email')
    updateEmail(@Body() ChangeEmailDto: ChangeEmailDto) {
        return this.userService.changeEmail(ChangeEmailDto);
    }
    

    @IsPublic()
    @Delete()
    delete(@Body() deleteUserDto: DeleteUserDto) {
        return this.userService.deleteUser(deleteUserDto);
    }

    
}
