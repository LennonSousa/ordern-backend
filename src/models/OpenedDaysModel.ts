import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import DaySchedule from './DaySchedulesModel'

@Entity('restaurant_opened_days')
export default class OpenedDaysModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    week_day: number;

    @Column()
    opened: boolean;

    @OneToMany(() => DaySchedule, daySchedule => daySchedule.weedDay)
    @JoinColumn({ name: 'id' })
    daySchedule: DaySchedule[];
}