import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('credit_brands')
export default class CreditBrandsModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    code: string;
}