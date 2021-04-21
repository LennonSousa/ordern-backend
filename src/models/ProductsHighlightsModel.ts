import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn } from 'typeorm';

import Product from './ProductsModel';
import Store from './StoresModel';

@Entity('products_highlights')
export default class ProductsHighlightsModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    active: boolean;

    @OneToOne(() => Product, product => product.productHighlight)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @ManyToOne(() => Store, store => store.productsHighlights)
    @JoinColumn({ name: 'store_id'})
    store: Store;
}