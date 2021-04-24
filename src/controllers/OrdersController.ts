import { Request, Response } from 'express';
import { Between, getRepository } from 'typeorm';
import * as Yup from 'yup';
import { format } from 'date-fns';

import OrderWebSocketHandler from './OrderWebSocketHandlers';
import orderView from '../views/orderView';
import OrderModel from '../models/OrdersModel';
import CustomersModel from '../models/CustomersModel';
import OrderStatusModel from '../models/OrderStatusModel';

export default {
    async index(request: Request, response: Response) {
        const { start, end } = request.query;

        const orderRepository = getRepository(OrderModel);

        const orders = await orderRepository.find({
            where: { ordered_at: Between(start, end) },
            order: {
                ordered_at: "DESC"
            },
            relations: [
                'orderStatus',
                'orderItems',
                'orderItems.orderItemAdditionals'
            ]
        });

        return response.json(orderView.renderMany(orders));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const orderRepository = getRepository(OrderModel);

        const order = await orderRepository.findOneOrFail(id, {
            relations: [
                'orderStatus',
                'orderItems',
                'orderItems.orderItemAdditionals'
            ]
        });

        return response.json(orderView.render(order));
    },

    async create(request: Request, response: Response) {
        const { customerId } = request.params;

        const customersRepository = getRepository(CustomersModel);

        const customer = await customersRepository.findOneOrFail(customerId);

        const {
            tracker,
            delivery_in,
            sub_total,
            cupom,
            delivery_tax,
            delivery_type,
            delivery_estimated,
            discount,
            fee,
            total,
            payment,
            payment_type,
            paid,
            address,
            orderItems
        } = request.body;

        const orderRepository = getRepository(OrderModel);

        const orderStatusRepository = getRepository(OrderStatusModel);

        const orderStatusToSave = await orderStatusRepository.findOneOrFail({ where: { order: 1 } });

        const data = {
            tracker,
            client_id: customer.id,
            client: customer.name,
            ordered_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            delivery_in,
            placed_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            delivered_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            sub_total,
            cupom,
            delivery_tax,
            delivery_type,
            delivery_estimated,
            discount,
            fee,
            total,
            payment,
            payment_type,
            paid,
            address,
            cancelled_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            orderStatus: orderStatusToSave.order as any,
            orderItems
        };

        const schema = Yup.object().shape({
            tracker: Yup.string().required(),
            client_id: Yup.number().required(),
            client: Yup.string().required(),
            ordered_at: Yup.date().required(),
            delivery_in: Yup.date().required(),
            placed_at: Yup.date().required(),
            delivered_at: Yup.date().required(),
            sub_total: Yup.number().required(),
            cupom: Yup.string().notRequired(),
            delivery_tax: Yup.number().required(),
            delivery_type: Yup.string().notRequired(),
            delivery_estimated: Yup.number().required(),
            discount: Yup.number().required(),
            fee: Yup.number().required(),
            total: Yup.number().required(),
            payment: Yup.string().required(),
            payment_type: Yup.string().required(),
            paid: Yup.boolean().notRequired(),
            address: Yup.string().required(),
            cancelled_at: Yup.date().required(),
            orderStatus: Yup.number().required(),
            orderItems: Yup.array(
                Yup.object().shape({
                    amount: Yup.number().required(),
                    name: Yup.string().required(),
                    value: Yup.number().required(),
                    notes: Yup.string().notRequired(),
                    orderItemAdditionals: Yup.array(
                        Yup.object().shape({
                            amount: Yup.number().required(),
                            name: Yup.string().required(),
                            value: Yup.number().required(),
                        })
                    ).notRequired(),
                })
            ).required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const order = orderRepository.create(data);

        await orderRepository.save(order);

        OrderWebSocketHandler.create();

        return response.status(201).json(order);
    },

    async update(request: Request, response: Response) {
        const { customerId, id } = request.params;

        const {
            reason_cancellation,
        } = request.body;

        const orderRepository = getRepository(OrderModel);

        const orderVerify = await orderRepository.findOneOrFail(id);

        if (orderVerify.customer_id !== customerId) return response.status(403).send({ error: 'Customer not authorized!' });

        const orderStatusRepository = getRepository(OrderStatusModel);

        const orderStatusToSave = await orderStatusRepository.findOneOrFail({ where: { order: 5 } });

        const data = {
            reason_cancellation,
            cancelled_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            orderStatus: orderStatusToSave.id as any,
        };

        const schema = Yup.object().shape({
            reason_cancellation: Yup.string().required(),
            cancelled_at: Yup.date().required(),
            orderStatus: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const order = orderRepository.create(data);

        await orderRepository.update(id, order);

        OrderWebSocketHandler.update();

        return response.status(204).json(order);
    },

    // async delete(request: Request, response: Response) {
    //     const { id } = request.params;

    //     const orderRepository = getRepository(OrderModel);

    //     await orderRepository.delete(id);

    //     return response.status(204).send();
    // }
}