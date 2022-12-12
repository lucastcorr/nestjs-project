import { IsString } from "class-validator";

export class ChangePasswordDto {
    @IsString()
    id: string;

    @IsString()
    password: string;

    @IsString()
    twoFactorAuth: string;
}