import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payments_delivery')
export default class PaymentsDeliveryModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column()
    active: boolean;
}