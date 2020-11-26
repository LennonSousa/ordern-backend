import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import User from './UsersModel'

@Entity('user_types')
export default class RestaurantsModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    description: string;

    @Column()
    code: number;

    @OneToMany(() => User, user => user.type)
    @JoinColumn({ name: 'id' })
    user: User[];
}