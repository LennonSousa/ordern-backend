import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import orderView from '../views/orderView';
import OrderModel from '../models/OrdersModel';

export default {
    async index(request: Request, response: Response) {
        const { id } = request.params;

        const customerOrdersRepository = getRepository(OrderModel);

        const customerOrders = await customerOrdersRepository.find({
            where: { client_id: id },
            order: {
                ordered_at: "DESC"
            },
            relations: [
                'orderStatus',
                'orderItems',
                'orderItems.orderItemAdditionals'
            ]
        });

        return response.json(orderView.renderMany(customerOrders));
    }
}