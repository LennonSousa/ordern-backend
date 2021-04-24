import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import WeekDay from './StoreOpenedDaysModel'

@Entity('store_opened_schedules')
export default class StoreOpenedSchedules {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    from: number;

    @Column()
    to: number;

    @Column()
    paused: string;

    @ManyToOne(() => WeekDay, weekDay => weekDay.daySchedules)
    @JoinColumn({ name: 'week_day_id' })
    weedDay: WeekDay;
}