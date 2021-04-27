import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import Product from './ProductsModel';
import ProductAdditional from './ProductAdditionalsModel';

@Entity('product_categories_additional')
export default class ProductCateoriesAdditional {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    min: number;

    @Column()
    max: number;

    @Column()
    repeat: boolean;

    @Column()
    order: number;

    @OneToMany(() => ProductAdditional, productAdditional => productAdditional.categoryAdditional)
    @JoinColumn({ name: 'id' })
    productAdditional: ProductAdditional[];

    @ManyToOne(() => Product, userType => userType.categoriesAdditional)
    @JoinColumn({ name: 'product_id'})
    product: Product;
}