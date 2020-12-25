import Order from '../models/OrdersModel'

export default {
    render(order: Order) {
        return {
            id: order.id,
            client_id: order.client_id,
            client: order.client,
            ordered: order.ordered,
            delivery: order.delivery,
            delivered: order.delivered,
            sub_total: order.sub_total,
            cupom: order.cupom,
            delivery_tax: order.delivery_tax,
            fee: order.fee,
            total: order.total,
            payment: order.payment,
            paid: order.paid,
            address: order.address,
            reason_cancellation: order.reason_cancellation,
            orderStatus: order.orderStatus,
            orderItems: order.orderItems
        }
    },

    renderMany(orders: Order[]) {
        return orders.map(order => this.render(order));
    }
}