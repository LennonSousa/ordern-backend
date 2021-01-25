import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('restaurants')
export default class RestaurantsModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    phone: string;

    @Column()
    description: string;

    @Column()
    min_order: number;

    @Column()
    cover: string;

    @Column()
    avatar: string;

    @Column()
    zip_code: string;

    @Column()
    street: string;

    @Column()
    number: string;

    @Column()
    group: string;

    @Column()
    city: string;

    @Column()
    country: string;

    @Column()
    latitude: string;

    @Column()
    longitude: string;

    @Column()
    free_shipping: number;
}