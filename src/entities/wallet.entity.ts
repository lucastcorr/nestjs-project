import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn()
    id: string;
}