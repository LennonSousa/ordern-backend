import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customer_new')
export default class CustomerNewModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    token: string;

    @Column()
    expire: Date;

    @Column()
    activated: boolean;
}