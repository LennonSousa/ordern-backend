import PaymentsDelivery from '../models/StorePaymentsDeliveryModel'

export default {
    render(paymentDelivery: PaymentsDelivery) {
        return {
            id: paymentDelivery.id,
            name: paymentDelivery.name,
            code: paymentDelivery.code,
            active: paymentDelivery.active
        }
    },

    renderMany(paymentsDelivery: PaymentsDelivery[]) {
        return paymentsDelivery.map(paymentDelivery => this.render(paymentDelivery));
    }
}