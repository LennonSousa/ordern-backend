import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import CustomerAddress from './CustomerAddressModel';
import CustomerPayment from './CustomerPaymentsModel';
import Orders from './OrdersModel';

@Entity('customers')
export default class CustomersModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    cpf: string;

    @Column()
    birth: Date;

    @Column()
    phone: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    active: boolean;

    @Column()
    paused: boolean;

    @Column()
    created_at: Date;

    @OneToMany(() => CustomerAddress, customerAddress => customerAddress.customer, {
        cascade: ['insert', 'update', 'remove']
    })
    @JoinColumn({ name: 'id' })
    address: CustomerAddress[];

    @OneToMany(() => CustomerPayment, customerPayment => customerPayment.customer, {
        cascade: ['insert', 'update', 'remove']
    })
    @JoinColumn({ name: 'id' })
    payments: CustomerPayment[];

    orders: Orders[];
}