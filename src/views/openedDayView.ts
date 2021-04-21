import OpenedDay from '../models/StoreOpenedDaysModel'
import dayScheduleView from '../views/dayScheduleView';

export default {
    render(openedDay: OpenedDay) {
        return {
            id: openedDay.id,
            week_day: openedDay.week_day,
            opened: openedDay.opened,
            daySchedules: openedDay.daySchedule ? dayScheduleView.renderMany(openedDay.daySchedule) : []
        }
    },

    renderMany(openedDays: OpenedDay[]) {
        return openedDays.map(openedDay => this.render(openedDay));
    }
}