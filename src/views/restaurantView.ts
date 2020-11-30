require('dotenv/config');
import Restaurant from '../models/RestaurantsModel'

export default {
    render(restaurant: Restaurant) {
        return {
            id: restaurant.id,
            title: restaurant.title,
            phone: restaurant.phone,
            description: restaurant.description,
            min_order: restaurant.min_order,
            cover: `http://${process.env.HOST_API}/uploads/${restaurant.cover}`,
            avatar: `http://${process.env.HOST_API}/uploads/${restaurant.avatar}`,
            zip_code: restaurant.zip_code,
            street: restaurant.street,
            number: restaurant.number,
            group: restaurant.group,
            city: restaurant.city,
            country: restaurant.country,
        }
    },

    renderMany(restaurants: Restaurant[]) {
        return restaurants.map(resturant => this.render(resturant));
    }
}