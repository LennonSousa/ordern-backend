import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

import Order from './OrdersModel'
import Store from './StoresModel';

@Entity('order_status')
export default class OrderStatusModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    order: number;

    @OneToMany(() => Order, order => order.orderStatus)
    @JoinColumn({ name: 'order_status_id' })
    orders: Order[];

    @ManyToOne(() => Store, store => store.orderStatus)
    @JoinColumn({ name: 'store_id'})
    store: Store;
}