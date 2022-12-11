import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Wallet } from "./wallet.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    username: string;  

    @Column({unique: true})
    email: string;

    @Column()
    twoFactorAuth: string;

    @Column()
    password: string;

    @Column()
    phoneNumber: string;

    @CreateDateColumn()
    createdAt: Date;

    @BeforeInsert()
    generatedId() {
        if (this.id) {
            return;
        }
        this.id = uuidv4();
    }

    @OneToMany(() => Wallet, (wallet) => wallet.user)
    wallets: Wallet[];
    cascade: true;
}