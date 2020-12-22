import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import ClientAddress from './CustomerAddressModel';
import ClientPayment from './CustomerPaymentsModel';

@Entity('clients')
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

    @OneToMany(() => ClientAddress, clientAddress => clientAddress.client, {
        cascade: ['insert', 'update', 'remove']
    })
    @JoinColumn({ name: 'id' })
    address: ClientAddress[];

    @OneToMany(() => ClientPayment, clientPayment => clientPayment.client, {
        cascade: ['insert', 'update', 'remove']
    })
    @JoinColumn({ name: 'id' })
    payments: ClientPayment[];
}