import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class SecondtStepRegistrationDto {
    
    @IsString()
    @IsNotEmpty()
    twoFactorAuth: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    password: string;
}  