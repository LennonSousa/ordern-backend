import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Order from './OrderItemsModel';

@Entity('order_item_additionals')
export default class OrderItemAdditionalsModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column()
    name: string;

    @Column()
    value: number;

    @ManyToOne(() => Order, order => order.orderItemAdditionals)
    @JoinColumn({ name: 'order_item_id'})
    orderItem: Order;
}