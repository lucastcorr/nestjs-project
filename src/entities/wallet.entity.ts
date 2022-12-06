import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('wallets')
export class Wallet {
    @PrimaryGeneratedColumn()
    id: string;
}