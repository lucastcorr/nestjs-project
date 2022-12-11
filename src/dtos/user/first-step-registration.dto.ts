import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class FirstStepRegistrationDto {
    
    // @IsString()
    // id: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsString()
    twoFactorAuth?: string;
}  