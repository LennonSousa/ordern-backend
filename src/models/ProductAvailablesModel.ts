import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Product from './ProductsModel'

@Entity('product_availables')
export default class ProductValuesModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    week_day: number;

    @Column()
    available: boolean;

    @Column()
    all_day: boolean;

    @Column()
    shift_01: boolean;

    @Column()
    shift_01_from: number;

    @Column()
    shift_01_to: number;

    @Column()
    shift_02: boolean;

    @Column()
    shift_02_from: number;

    @Column()
    shift_02_to: number;

    @ManyToOne(() => Product, product => product.values)
    @JoinColumn({ name: 'product_id'})
    product: Product;
}