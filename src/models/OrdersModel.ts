import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import OrderStatus from './OrderStatusModel';
import OrderItem from './OrderItemsModel';

@Entity('orders')
export default class ProductModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    client_id: number;

    @Column()
    tracker: string;

    @Column()
    client: string;

    @Column()
    ordered: Date;

    @Column()
    delivery: Date;

    @Column()
    delivered: Date;

    @Column()
    sub_total: number;

    @Column()
    cupom: string;

    @Column()
    delivery_tax: number;

    @Column()
    delivery_type: string;

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

    @ManyToOne(() => OrderStatus, orderStatus => orderStatus.orders)
    @JoinColumn({ name: 'order_status_id' })
    orderStatus: OrderStatus;

    @OneToMany(() => OrderItem, orderItem => orderItem.order, {
        cascade: ['insert', 'update', 'remove']
    })
    @JoinColumn({ name: 'order_id' })
    orderItems: OrderItem[];
}