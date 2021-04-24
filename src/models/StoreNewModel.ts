import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('store_new')
export default class StoreNewModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    token: string;

    @Column()
    expire: Date;
}