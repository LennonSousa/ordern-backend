import Store from '../models/StoresModel';

require('dotenv/config');

export default {
    render(store: Store) {
        return {
            id: store.id,
            title: store.title,
            phone: store.phone,
            description: store.description,
            min_order: store.min_order,
            cover: `${process.env.HOST_API}/uploads/${store.cover}`,
            avatar: `${process.env.HOST_API}/uploads/${store.avatar}`,
            zip_code: store.zip_code,
            street: store.street,
            number: store.number,
            group: store.group,
            complement: store.complement,
            city: store.city,
            country: store.state,
            latitude: store.latitude,
            longitude: store.longitude,
            free_shipping: store.free_shipping,
            highlights: store.highlights,
            highlights_title: store.highlights_title,
        }
    },

    renderMany(stores: Store[]) {
        return stores.map(store => this.render(store));
    }
}