import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Transaction } from "./transaction.entity";
import { User } from "./user.entity";

@Entity('wallets')
export class Wallet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column()
    amount: number;

    @Column()
    label: string;

    @CreateDateColumn()
    createdAt: Date;

    @BeforeInsert()
    generatedId() {
        if (this.id) {
            return;
        }
        this.id = uuidv4();
    }

    @ManyToOne(() => User, (user) => user.wallets)
    user: User;

    @OneToMany(() => Transaction, (transaction) => transaction.wallet)
    transactions: Transaction[];
}