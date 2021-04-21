import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import UserType from './UserTypesModel'

@Entity('users')
export default class UsersModel {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    cpf: string;

    @Column()
    birth: Date;

    @Column()
    phone: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    active: boolean;

    @Column()
    paused: boolean;

    @Column()
    created_at: Date;

    @ManyToOne(() => UserType, userType => userType.users)
    @JoinColumn({ name: 'type_id'})
    type: UserType;
}