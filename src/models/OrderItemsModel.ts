import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import Order from './OrdersModel';
import OrderItemAdditionals from './OrderItemAdditionalsModel';

@Entity('order_items')
export default class OrderItemsModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column()
    name: string;

    @Column()
    value: number;

    @ManyToOne(() => Order, order => order.orderItems)
    @JoinColumn({ name: 'order_id'})
    order: Order;

    @OneToMany(() => OrderItemAdditionals, orderItemAdditionals => orderItemAdditionals.orderItem, {
        cascade: ['insert', 'update', 'remove']
    })
    @JoinColumn({ name: 'order_item_id' })
    orderItemAdditionals: OrderItemAdditionals[];
}