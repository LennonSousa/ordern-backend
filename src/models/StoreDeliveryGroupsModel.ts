import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('store_delivery_groups')
export default class StoreDeliveryGroupsModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    estimated: number;
}