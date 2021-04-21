import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import WeekDay from './StoreOpenedDaysModel'

@Entity('store_opened_schedules')
export default class StoreOpenedSchedules {
    @PrimaryGeneratedColumn('uuid')
    readonly id: number;

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