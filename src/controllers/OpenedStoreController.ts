import { getDay, getHours, getMinutes } from 'date-fns';

import StoreOpenedDaysModel from '../models/StoreOpenedDaysModel';
import { convertHourToMinutes } from '../utils/convertHourToMinutes';

export default {
    async isOpenedStore(openedDays: StoreOpenedDaysModel[]) {
        let isOpened = false;

        const weekDay = getDay(new Date());

        const todayAvailable = openedDays.find(item => { return item.week_day === weekDay && item.opened });

        const now = new Date();

        if (!todayAvailable) return false;

        const minutesNow = convertHourToMinutes(`${getHours(now)}:${getMinutes(now)}`);

        todayAvailable.daySchedules.forEach(daySchedule => {
            if (!daySchedule.paused && minutesNow >= daySchedule.from && minutesNow <= daySchedule.to) isOpened = true;
        });

        return isOpened;
    },
}