import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Customer from './CustomersModel';

@Entity('customer_address')
export default class ClientAddressModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    zip_code: string;

    @Column()
    street: string;

    @Column()
    number: string;

    @Column()
    group: string;

    @Column()
    complement: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    type: string;

    @ManyToOne(() => Customer, customer => customer.address)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;
}