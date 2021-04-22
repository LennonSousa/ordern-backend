import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import Category from './CategoriesModel';
import ProductImages from './ProductImagesModel';
import Value from './ProductValuesModel';
import CategoryAdditional from './ProductCategoriesAdditionalModel';
import Available from './ProductAvailablesModel';
import ProductsHighlights from './ProductsHighlightsModel';

@Entity('products')
export default class ProductModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: number;

    @Column()
    title: string;

    @Column()
    description: string;

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

    @Column()
    on_request: boolean;

    @ManyToOne(() => Category, category => category.products)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @OneToMany(() => ProductImages, productImage => productImage.product, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'product_id' })
    images: ProductImages[]

    @OneToMany(() => Value, value => value.product, {
        cascade: ['insert', 'update', 'remove']
    })
    @JoinColumn({ name: 'id' })
    values: Value[];

    @OneToMany(() => CategoryAdditional, category => category.product)
    @JoinColumn({ name: 'id' })
    categoriesAdditional: CategoryAdditional[];

    @OneToMany(() => Available, available => available.product)
    @JoinColumn({ name: 'id' })
    availables: Available[];

    @OneToOne(() => ProductsHighlights, productHighlight => productHighlight.product, {
        cascade: ['update', 'remove']
    })
    @JoinColumn({ name: 'id' })
    productHighlight: ProductsHighlights;
}