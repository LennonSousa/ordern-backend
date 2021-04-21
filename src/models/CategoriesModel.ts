import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

import Product from './ProductsModel';
import Store from './StoresModel';

@Entity('categories')
export default class CategoriesModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: number;

    @Column()
    title: string;

    @Column()
    paused: boolean;

    @Column()
    order: number;

    @OneToMany(() => Product, product => product.category)
    @JoinColumn({ name: 'category_id' })
    products: Product[];

    @ManyToOne(() => Store, store => store.categories)
    @JoinColumn({ name: 'store_id'})
    store: Store;
}