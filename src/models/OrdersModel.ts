import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import OrderStatus from './OrderStatusModel';
import OrderItem from './OrderItemsModel';

@Entity('orders')
export default class OrdersModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    tracker: string;

    @Column()
    customer_id: string;

    @Column()
    customer: string;

    @Column()
    ordered_at: Date;

    @Column()
    delivery_in: Date;

    @Column()
    placed_at: Date;

    @Column()
    delivered_at: Date;

    @Column()
    sub_total: number;

    @Column()
    cupom: string;

    @Column()
    delivery_tax: number;

    @Column()
    delivery_type: string;

    @Column()
    delivery_estimated: number;

    @Column()
    discount: number;

    @Column()
    fee: number;

    @Column()
    total: number;

    @Column()
    payment: string;

    @Column()
    payment_type: string;

    @Column()
    paid: boolean;

    @Column()
    address: string;

    @Column()
    reason_cancellation: string;

    @Column()
    cancelled_at: Date;

    @ManyToOne(() => OrderStatus, orderStatus => orderStatus.orders)
    @JoinColumn({ name: 'order_status_id' })
    orderStatus: OrderStatus;

    @OneToMany(() => OrderItem, orderItem => orderItem.order, {
        cascade: ['insert', 'update', 'remove']
    })
    @JoinColumn({ name: 'order_id' })
    orderItems: OrderItem[];
}