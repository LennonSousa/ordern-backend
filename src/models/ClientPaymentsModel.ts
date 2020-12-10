import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Client from './ClientsModel';

@Entity('client_payments')
export default class ClientPaymentsModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    card_number: string;

    @Column()
    valid: string;

    @Column()
    cvv: string;

    @Column()
    name: string;

    @Column()
    cpf: string;

    @ManyToOne(() => Client, client => client.payments)
    @JoinColumn({ name: 'client_id' })
    client: Client;
}