import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Customer from './CustomersModel';

@Entity('customer_payments')
export default class ClientPaymentsModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    card_number: string;

    @Column()
    exp_month: string;

    @Column()
    exp_year: string;

    @Column()
    name: string;

    @Column()
    cpf: string;

    @ManyToOne(() => Customer, customer => customer.payments)
    @JoinColumn({ name: 'client_id' })
    customer: Customer;
}