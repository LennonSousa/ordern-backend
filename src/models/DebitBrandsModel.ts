import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('debit_brands')
export default class DebitBrandsModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    code: string;
}