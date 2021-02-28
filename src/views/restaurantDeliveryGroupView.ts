import DeliveryGroup from '../models/RestaurantDeliveryGroupsModel'

export default {
    render(deliveryGroup: DeliveryGroup) {
        return {
            id: deliveryGroup.id,
            description: deliveryGroup.description,
            price: deliveryGroup.price,
            estimated: deliveryGroup.estimated
        }
    },

    renderMany(deliveryGroups: DeliveryGroup[]) {
        return deliveryGroups.map(deliveryGroup => this.render(deliveryGroup));
    }
}