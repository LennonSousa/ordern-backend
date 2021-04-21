import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Product from './ProductsModel';

@Entity('product_images')
export default class ProductImagesModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    path: string;

    @ManyToOne(() => Product, product => product.images)
    @JoinColumn({ name: 'product_id' })
    product: Product;
}