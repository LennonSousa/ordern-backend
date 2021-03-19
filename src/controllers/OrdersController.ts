import { Request, Response } from 'express';
import { Between, getRepository } from 'typeorm';
import * as Yup from 'yup';
import { format } from 'date-fns';

import OrderWebSocketHandler from './OrderWebSocketHandlers';
import orderView from '../views/orderView';
import OrderModel from '../models/OrdersModel';

export default {
    async index(request: Request, response: Response) {
        const { start, end } = request.query;

        const orderRepository = getRepository(OrderModel);

        const orders = await orderRepository.find({
            where: { ordered: Between(start, end) },
            order: {
                ordered: "DESC"
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
        const {
            tracker,
            client_id,
            client,
            sub_total,
            cupom,
            delivery_tax,
            delivery_type,
            discount,
            fee,
            total,
            payment,
            payment_type,
            paid,
            address,
            reason_cancellation,
            orderStatus,
            orderItems
        } = request.body;

        const orderRepository = getRepository(OrderModel);

        const data = {
            tracker,
            client_id,
            client,
            ordered: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            delivery: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            delivered: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            sub_total,
            cupom,
            delivery_tax,
            delivery_type,
            discount,
            fee,
            total,
            payment,
            payment_type,
            paid,
            address,
            reason_cancellation,
            orderStatus,
            orderItems
        };

        const schema = Yup.object().shape({
            tracker: Yup.string().required(),
            client_id: Yup.number().required(),
            client: Yup.string().required(),
            ordered: Yup.date().required(),
            delivery: Yup.date().required(),
            delivered: Yup.date().required(),
            sub_total: Yup.number().required(),
            cupom: Yup.string().notRequired(),
            delivery_tax: Yup.number().required(),
            delivery_type: Yup.string().notRequired(),
            discount: Yup.number().required(),
            fee: Yup.number().required(),
            total: Yup.number().required(),
            payment: Yup.string().required(),
            payment_type: Yup.string().required(),
            paid: Yup.boolean().notRequired(),
            address: Yup.string().required(),
            reason_cancellation: Yup.string().notRequired(),
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
        const { id } = request.params;

        const {
            tracker,
            client_id,
            client,
            ordered,
            delivery,
            delivered,
            sub_total,
            cupom,
            delivery_tax,
            delivery_type,
            discount,
            fee,
            total,
            payment,
            payment_type,
            paid,
            address,
            reason_cancellation,
            orderStatus,
            orderItems
        } = request.body;

        const orderRepository = getRepository(OrderModel);

        const data = {
            tracker,
            client_id,
            client,
            ordered,
            delivery,
            delivered,
            sub_total,
            cupom,
            delivery_tax,
            delivery_type,
            discount,
            fee,
            total,
            payment,
            payment_type,
            paid,
            address,
            reason_cancellation,
            orderStatus,
            orderItems
        };

        const schema = Yup.object().shape({
            tracker: Yup.string().notRequired(),
            client_id: Yup.number().notRequired(),
            client: Yup.string().required(),
            ordered: Yup.date().notRequired(),
            delivery: Yup.date().notRequired(),
            delivered: Yup.date().notRequired(),
            sub_total: Yup.number().notRequired(),
            cupom: Yup.string().notRequired(),
            delivery_tax: Yup.number().notRequired(),
            delivery_type: Yup.string().notRequired(),
            discount: Yup.number().notRequired(),
            fee: Yup.number().notRequired(),
            total: Yup.number().notRequired(),
            payment: Yup.string().notRequired(),
            payment_type: Yup.string().notRequired(),
            paid: Yup.boolean().notRequired(),
            address: Yup.string().notRequired(),
            reason_cancellation: Yup.string().notRequired(),
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
            ).notRequired(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const order = orderRepository.create(data);

        await orderRepository.update(id, order);

        OrderWebSocketHandler.update();

        return response.status(204).json(order);
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const orderRepository = getRepository(OrderModel);

        await orderRepository.delete(id);

        return response.status(204).send();
    }
}