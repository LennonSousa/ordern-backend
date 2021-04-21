import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import Store from './StoresModel';

@Entity('store_shipments')
export default class StoreShipmentsModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column()
    active: boolean;

    @Column()
    default_price: number;

    @ManyToOne(() => Store, store => store.shipments)
    @JoinColumn({ name: 'store_id'})
    store: Store;
}