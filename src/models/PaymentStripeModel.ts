import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment_stripe')
export default class CreditBrandsModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pk_live: string;

    @Column()
    sk_live: string;

    @Column()
    active: boolean;
}