import { IsString } from "class-validator";

export class getBalanceDto {
    @IsString()
    id: string;

    @IsString()
    label: string;
}