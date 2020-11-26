import DaySchedule from '../models/DaySchedulesModel'

export default {
    render(daySchedule: DaySchedule) {
        return {
            id: daySchedule.id,
            from: daySchedule.from,
            to: daySchedule.to,
            paused: daySchedule.paused,
            weedDay: daySchedule.weedDay
        }
    },

    renderMany(daySchedules: DaySchedule[]) {
        return daySchedules.map(daySchedule => this.render(daySchedule));
    }
}