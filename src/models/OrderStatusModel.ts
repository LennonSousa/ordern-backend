import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Order from './OrdersModel'

@Entity('order_status')
export default class RestaurantsModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    order: number;

    @OneToMany(() => Order, order => order.orderStatus)
    @JoinColumn({ name: 'id' })
    orders: Order[];
}