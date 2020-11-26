import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import WeekDay from './OpenedDaysModel'

@Entity('restaurant_day_schedules')
export default class DaySchedulesModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    from: string;

    @Column()
    to: string;

    @Column()
    paused: string;

    @ManyToOne(() => WeekDay, weekDay => weekDay.daySchedule)
    @JoinColumn({ name: 'week_day_id' })
    weedDay: WeekDay;
}