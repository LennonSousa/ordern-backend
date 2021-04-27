import { Request, Response } from 'express';
import { getRepository, Like } from 'typeorm';

import orderView from '../views/orderView';
import OrderModel from '../models/OrdersModel';

export default {
    async index(request: Request, response: Response) {
        const { id } = request.params;

        const customerOrdersRepository = getRepository(OrderModel);

        const customerOrders = await customerOrdersRepository.find({
            where: { customer_id: id },
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
    },

    async tracker(request: Request, response: Response) {
        const { tracker } = request.params;

        const customerOrdersRepository = getRepository(OrderModel);

        const customerOrders = await customerOrdersRepository.find({
            where: { tracker },
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
    },

    async customer(request: Request, response: Response) {
        const { customer } = request.params;

        const customerOrdersRepository = getRepository(OrderModel);

        const customerOrders = await customerOrdersRepository.find({
            where: { customer: Like(`%${customer}%`) },
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