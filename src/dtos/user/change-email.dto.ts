import { IsEmail, IsString } from "class-validator";

export class ChangeEmailDto {
    @IsEmail()
    email: string;

    @IsString()
    twoFactorAuth: string;
}