import StoreShipments from '../models/StoreShipmentsModel'

export default {
    render(storeShipment: StoreShipments) {
        return {
            id: storeShipment.id,
            name: storeShipment.name,
            code: storeShipment.code,
            active: storeShipment.active,
            default_price: storeShipment.default_price,
        }
    },

    renderMany(storeShipments: StoreShipments[]) {
        return storeShipments.map(storeShipment => this.render(storeShipment));
    }
}