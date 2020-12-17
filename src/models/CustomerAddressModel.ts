import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Client from './ClientsModel';

@Entity('client_address')
export default class ClientAddressModel {
    @PrimaryGeneratedColumn()
    id: number;

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
    country: string;

    @Column()
    type: string;

    @ManyToOne(() => Client, client => client.address)
    @JoinColumn({ name: 'client_id' })
    client: Client;
}