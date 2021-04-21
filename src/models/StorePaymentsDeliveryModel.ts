import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import Store from './StoresModel';

@Entity('store_payments_delivery')
export default class StorePaymentsDeliveryModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column()
    active: boolean;

    @ManyToOne(() => Store, store => store.paymentsDelivery)
    @JoinColumn({ name: 'store_id'})
    store: Store;
}