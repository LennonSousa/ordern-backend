import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Additional from './AdditionalsModel';
import CategoryAdditional from './ProductCategoriesAdditionalModel';

@Entity('product_additionals')
export default class ProductAdditionalsModel {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    pdv: string;

    @Column()
    price: number;

    @Column()
    order: number;

    @ManyToOne(() => Additional, additional => additional.productAdditionals)
    @JoinColumn({ name: 'additional_id' })
    additional: Additional;

    @ManyToOne(() => CategoryAdditional, categoryAdditional => categoryAdditional.productAdditional)
    @JoinColumn({ name: 'category_id' })
    categoryAdditional: CategoryAdditional;
}