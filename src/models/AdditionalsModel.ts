import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany } from 'typeorm';
import ProductAdditional from './ProductAdditionalsModel';

@Entity('additionals')
export default class AdditionalModels {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    code: string;

    @Column()
    paused: boolean;

    @OneToMany(() => ProductAdditional, productAdditional => productAdditional.additional)
    @JoinColumn({ name: 'id' })
    productAdditionals: ProductAdditional[];
}