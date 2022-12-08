import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Wallet } from "./wallet.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    username: string;  

    @Column()
    email: string;

    @Column()
    twoFactorAuth: string;

    @Column()
    password: string;

    @Column()
    phoneNumber: string;

    

    @BeforeInsert()
    generatedId() {
        if (this.id) {
            return;
        }

        this.id = uuidv4();
    }

    @OneToMany(() => Wallet, (wallet) => wallet.user)
    wallets: Wallet[];
}