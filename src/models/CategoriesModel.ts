import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Product from './ProductsModel'

@Entity('categories')
export default class CategoriesModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    paused: boolean;

    @Column()
    order: number;

    @OneToMany(() => Product, product => product.category)
    @JoinColumn({ name: 'id' })
    products: Product[];
}