import Order from '../models/OrdersModel'

export default {
    render(order: Order) {
        return {
            tracker: order.tracker,
            id: order.id,
            client_id: order.client_id,
            client: order.client,
            ordered_at: order.ordered_at,
            delivery_in: order.delivery_in,
            placed_at: order.placed_at,
            delivered_at: order.delivered_at,
            sub_total: order.sub_total,
            cupom: order.cupom,
            delivery_tax: order.delivery_tax,
            delivery_type: order.delivery_type,
            delivery_estimated: order.delivery_estimated,
            discount: order.discount,
            fee: order.fee,
            total: order.total,
            payment: order.payment,
            payment_type: order.payment_type,
            paid: order.paid,
            address: order.address,
            reason_cancellation: order.reason_cancellation,
            cancelled_at: order.cancelled_at,
            orderStatus: order.orderStatus,
            orderItems: order.orderItems
        }
    },

    renderMany(orders: Order[]) {
        return orders.map(order => this.render(order));
    }
}