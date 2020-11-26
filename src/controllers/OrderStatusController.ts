import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import orderStatusView from '../views/orderStatusView';
import OrderStatusModel from '../models/OrderStatusModel';

export default {
    async index(request: Request, response: Response) {
        const orderStatusRepository = getRepository(OrderStatusModel);

        const orderStatus = await orderStatusRepository.find({
            order: {
                order: "ASC"
            }
        });

        return response.json(orderStatusView.renderMany(orderStatus));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const orderStatusRepository = getRepository(OrderStatusModel);

        const orderStatus = await orderStatusRepository.findOneOrFail(id);

        return response.json(orderStatusView.render(orderStatus));
    },

    async create(request: Request, response: Response) {
        const {
            title,
            description,
            order
        } = request.body;

        const orderStatusRepository = getRepository(OrderStatusModel);

        const data = {
            title,
            description,
            order
        };

        const schema = Yup.object().shape({
            title: Yup.string().required(),
            description: Yup.boolean().required(),
            order: Yup.number().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const orderStatus = orderStatusRepository.create(data);

        await orderStatusRepository.save(orderStatus);

        return response.status(201).json(orderStatus);
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            title,
            description,
            order
        } = request.body;

        const orderStatusRepository = getRepository(OrderStatusModel);

        const data = {
            title,
            description,
            order
        };

        const schema = Yup.object().shape({
            title: Yup.string().required(),
            description: Yup.boolean().required(),
            order: Yup.number().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const orderStatus = orderStatusRepository.create(data);

        await orderStatusRepository.update(id, orderStatus);

        return response.status(204).json(orderStatus);
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const orderStatusRepository = getRepository(OrderStatusModel);

        await orderStatusRepository.delete(id);

        return response.status(204).send();
    }
}