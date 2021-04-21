import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('store_payment_stripe')
export default class StorePaymentStripeModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pk_live: string;

    @Column()
    sk_live: string;

    @Column()
    active: boolean;
}