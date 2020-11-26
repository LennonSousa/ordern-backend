import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import Category from './CategoriesModel';
import Value from './ProductValuesModel';
import CategoryAdditional from './ProductCategoriesAdditionalModel';
import Available from './ProductAvailablesModel';

@Entity('products')
export default class ProductModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    maiority: boolean;

    @Column()
    code: string;

    @Column()
    price_one: boolean;

    @Column()
    price: number;

    @Column()
    discount: boolean;

    @Column()
    discount_price: number;

    @Column()
    paused: boolean;

    @Column()
    order: number;

    @Column()
    available_all: boolean;

    @ManyToOne(() => Category, category => category.products)
    @JoinColumn({ name: 'category_id'})
    category: Category;

    @OneToMany(() => Value, value => value.product, {
        cascade: ['insert', 'update', 'remove']
    })
    @JoinColumn({ name: 'id'})
    values: Value[];

    @OneToMany(() => CategoryAdditional, category => category.product)
    @JoinColumn({ name: 'id'})
    categoriesAdditional: CategoryAdditional[];

    @OneToMany(() => Available, available => available.product)
    @JoinColumn({ name: 'id' })
    availables: Available[];
}