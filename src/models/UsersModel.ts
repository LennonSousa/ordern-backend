import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import UserType from './UserTypesModel'

@Entity('users')
export default class UsersModel {
    @PrimaryGeneratedColumn()
    id: number;

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

    @ManyToOne(() => UserType, userType => userType.user)
    @JoinColumn({ name: 'type_id'})
    type: UserType;
}