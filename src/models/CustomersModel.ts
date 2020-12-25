import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import CustomerAddress from './CustomerAddressModel';
import CustomerPayment from './CustomerPaymentsModel';

@Entity('customers')
export default class ClientsModel {
    @PrimaryGeneratedColumn()
    id: number;
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
}