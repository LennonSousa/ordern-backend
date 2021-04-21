require('dotenv/config');
import Restaurant from '../models/StoresModel'

export default {
    render(restaurant: Restaurant) {
        return {
            id: restaurant.id,
            title: restaurant.title,
            phone: restaurant.phone,
            description: restaurant.description,
            min_order: restaurant.min_order,
            cover: `${process.env.HOST_API}/uploads/${restaurant.cover}`,
            avatar: `${process.env.HOST_API}/uploads/${restaurant.avatar}`,
            zip_code: restaurant.zip_code,
            street: restaurant.street,
            number: restaurant.number,
            group: restaurant.group,
            city: restaurant.city,
            country: restaurant.country,
            latitude: restaurant.latitude,
            longitude: restaurant.longitude,
            free_shipping: restaurant.free_shipping,
            highlights: restaurant.highlights,
            highlights_title: restaurant.highlights_title
        }
    },

    renderMany(restaurants: Restaurant[]) {
        return restaurants.map(resturant => this.render(resturant));
    }
}