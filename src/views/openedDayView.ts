import OpenedDay from '../models/OpenedDaysModel'

export default {
    render(openedDay: OpenedDay) {
        return {
            id: openedDay.id,
            week_day: openedDay.week_day,
            opened: openedDay.opened,
            daySchedules: openedDay.daySchedule
        }
    },

    renderMany(openedDays: OpenedDay[]) {
        return openedDays.map(openedDay => this.render(openedDay));
    }
}