import { IsNumber, IsString } from "class-validator";

export class RemoveMoneyDto {
    @IsString()
    id: string;
    
    @IsNumber()
    amount: number;

    @IsString()
    label: string;
}