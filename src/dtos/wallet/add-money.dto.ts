import { IsNumber, IsString } from "class-validator";

export class AddMoneyDto {
    @IsString()
    id: string;
    
    @IsNumber()
    amount: number;

    @IsString()
    label: string;
}