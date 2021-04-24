import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Product from './ProductsModel'

@Entity('product_values')
export default class ProductValuesModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @Column()
    value: number;

    @Column()
    order: number;

    @ManyToOne(() => Product, product => product.values)
    @JoinColumn({ name: 'product_id'})
    product: Product;
}