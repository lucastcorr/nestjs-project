import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserDto {
    
    @IsString()
    id: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    twoFactorAuth: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}