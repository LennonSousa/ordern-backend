import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import ProductAdditional from './ProductAdditionalsModel';
import Store from './StoresModel';

@Entity('additionals')
export default class AdditionalModels {
    @PrimaryGeneratedColumn('uuid')
    readonly id: number;

    @Column()
    title: string;

    @Column()
    code: string;

    @Column()
    paused: boolean;

    @OneToMany(() => ProductAdditional, productAdditional => productAdditional.additional)
    @JoinColumn({ name: 'id' })
    productAdditionals: ProductAdditional[];

    @ManyToOne(() => Store, store => store.additionals)
    @JoinColumn({ name: 'store_id'})
    store: Store;
}