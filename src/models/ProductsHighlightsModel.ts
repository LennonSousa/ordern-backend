import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import Product from './ProductsModel';

@Entity('products_highlights')
export default class CreditBrandsModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    active: boolean;

    @OneToOne(() => Product, product => product.productHighlight)
    @JoinColumn({ name: 'product_id' })
    product: Product;
}