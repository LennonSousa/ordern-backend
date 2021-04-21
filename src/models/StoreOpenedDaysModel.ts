import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

import Store from './StoresModel';
import DaySchedule from './StoreOpenedSchedulesModel'

@Entity('store_opened_days')
export default class StoreOpenedDaysModel {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    week_day: number;

    @Column()
    opened: boolean;

    @ManyToOne(() => Store, store => store.openedDays)
    @JoinColumn({ name: 'store_id'})
    store: Store;

    @OneToMany(() => DaySchedule, daySchedule => daySchedule.weedDay, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'week_day_id' })
    daySchedule: DaySchedule[];
}