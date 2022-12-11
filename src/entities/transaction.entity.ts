import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Wallet } from "./wallet.entity";

@Entity('transactions')
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column()
    walletSource: string;

    @Column()
    walletTarget: string;

    @Column()
    amount: number;

    @CreateDateColumn()
    createdAt: Date;

    @BeforeInsert()
    generatedId() {
        if (this.id) {
            return;
        }
        this.id = uuidv4();
    }

    @ManyToOne(() => Wallet, (wallet) => wallet.transactions)
    wallet: Wallet;
}