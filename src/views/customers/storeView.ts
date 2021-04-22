import Store from '../../models/StoresModel';
import openedDayView from '../../views/openedDayView';
import storeShipmentView from '../../views/storeShipmentView';
import paymentDeliveryView from '../storePaymentDeliveryView';
import orderStatusView from '../../views/orderStatusView';
import additionalView from '../../views/additionalView';
import productHighlightView from '../../views/productHighlightView';
import categoryView from './categoryView';

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
            openedDays: openedDayView.renderMany(store.openedDays),
            shipments: storeShipmentView.renderMany(store.shipments),
            paymentsDelivery: paymentDeliveryView.renderMany(store.paymentsDelivery),
            orderStatus: orderStatusView.renderMany(store.orderStatus),
            categories: store.categories ? categoryView.renderMany(store.categories) : [],
            productsHighlights: store.productsHighlights ? productHighlightView.renderMany(store.productsHighlights) : [],
        }
    },

    renderMany(stores: Store[]) {
        return stores.map(store => this.render(store));
    }
}