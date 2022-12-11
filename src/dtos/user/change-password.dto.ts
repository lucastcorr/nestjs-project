import { IsString } from "class-validator";

export class ChangePasswordDto {
    @IsString()
    password: string;

    @IsString()
    twoFactorAuth: string;
}