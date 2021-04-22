import { getDay, getHours, getMinutes } from 'date-fns';

import Product from '../models/ProductsModel';

import { convertHourToMinutes } from '../utils/convertHourToMinutes';

export default {
    verifyProducstAvailable(products: Product[]) {
        let updatedProducts: Product[] = [];

        products.forEach(product => {
            if (product.paused) return; // Not paused!

            if (product.available_all) {
                updatedProducts.push(product);
                return; // Not paused and always available on this day!
            }

            const weekDay = getDay(new Date());

            const todayAvailable = product.availables.find(item => { return item.week_day === weekDay && item.available });

            if (!todayAvailable) return; // Not available today

            if (!todayAvailable.available) return; // Not available on this day!

            // Available today
            if (todayAvailable.all_day) { // Available through all today
                updatedProducts.push(product);
                return;
            }

            const now = new Date();
            const minutesNow = convertHourToMinutes(`${getHours(now)}:${getMinutes(now)}`);

            if (todayAvailable.shift_01) {
                if (minutesNow >= todayAvailable.shift_01_from
                    && minutesNow <= todayAvailable.shift_01_to) // Available today in first shift time
                    updatedProducts.push(product);
                return;
            }

            if (todayAvailable.shift_02) {
                if (minutesNow >= todayAvailable.shift_02_from
                    && minutesNow <= todayAvailable.shift_02_to) // Available today in second shift time
                    updatedProducts.push(product);
                return;
            }

        });

        return updatedProducts;
    }
}