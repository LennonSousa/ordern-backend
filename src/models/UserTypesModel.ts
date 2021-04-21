import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

import Store from './StoresModel';
import User from './UsersModel';

@Entity('user_types')
export default class UserTypesModel {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    type: string;

    @Column()
    description: string;

    @Column()
    code: number;

    @ManyToOne(() => Store, store => store.userTypes)
    @JoinColumn({ name: 'store_id'})
    store: Store;

    @OneToMany(() => User, user => user.type)
    @JoinColumn({ name: 'type_id' })
    users: User[];
}