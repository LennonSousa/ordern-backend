import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('store_shipments')
export default class StoreShipmentsModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column()
    active: boolean;
}