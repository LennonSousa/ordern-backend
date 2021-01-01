import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_values')
export default class ProductValuesModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    price: number;
}