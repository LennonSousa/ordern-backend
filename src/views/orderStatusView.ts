import OrderStatus from '../models/OrderStatusModel'

export default {
    render(orderStatus: OrderStatus) {
        return {
            id: orderStatus.id,
            title: orderStatus.title,
            description: orderStatus.description,
            order: orderStatus.order,
        }
    },

    renderMany(orderStatus: OrderStatus[]) {
        return orderStatus.map(orderStatusItem => this.render(orderStatusItem));
    }
}