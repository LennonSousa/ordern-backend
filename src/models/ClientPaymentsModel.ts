import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Client from './ClientsModel';

@Entity('client_payments')
export default class ClientPaymentsModel {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Client, client => client.payments)
    @JoinColumn({ name: 'client_id' })
    client: Client;
}