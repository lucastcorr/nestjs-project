import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    password: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;
}