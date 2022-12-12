import { IsEmail, IsString } from "class-validator";

export class ChangeEmailDto {
    @IsString()
    id: string;

    @IsEmail()
    email: string;
}