import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('restaurant_delivery_groups')
export default class ProductValuesModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    price: number;
}