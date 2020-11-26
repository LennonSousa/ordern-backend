import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Order from './OrdersModel';

@Entity('order_items')
export default class ProductModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column()
    name: string;

    @Column()
    value: number;

    @Column()
    additional: boolean;

    @Column()
    additional_item: number;

    @ManyToOne(() => Order, order => order.orderItems)
    @JoinColumn({ name: 'order_id'})
    order: Order;
}