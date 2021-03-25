import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import restaurantDeliveryGroupView from '../views/restaurantDeliveryGroupView';
import RestaurantDeliveryGroupsModel from '../models/RestaurantDeliveryGroupsModel';

export default {
    async index(request: Request, response: Response) {
        const deliveryGroupsRepository = getRepository(RestaurantDeliveryGroupsModel);

        const deliveryGroups = await deliveryGroupsRepository.find();

        return response.json(restaurantDeliveryGroupView.renderMany(deliveryGroups));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const deliveryGroupRepository = getRepository(RestaurantDeliveryGroupsModel);

        const deliveryGroup = await deliveryGroupRepository.findOneOrFail(id);

        return response.json(restaurantDeliveryGroupView.render(deliveryGroup));
    },

    async create(request: Request, response: Response) {
        const {
            description,
            price,
            estimated
        } = request.body;

        const deliveryGroupRepository = getRepository(RestaurantDeliveryGroupsModel);

        const data = {
            description,
            price,
            estimated
        };

        const schema = Yup.object().shape({
            description: Yup.string().required(),
            price: Yup.number().required(),
            estimated: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const deliveryGroup = deliveryGroupRepository.create(data);

        await deliveryGroupRepository.save(deliveryGroup);

        return response.status(201).json(deliveryGroup);
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            description,
            price,
            estimated
        } = request.body;

        const deliveryGroupRepository = getRepository(RestaurantDeliveryGroupsModel);

        const data = {
            description,
            price,
            estimated
        };

        const schema = Yup.object().shape({
            description: Yup.string().required(),
            price: Yup.number().required(),
            estimated: Yup.number().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const deliveryGroup = deliveryGroupRepository.create(data);

        await deliveryGroupRepository.update(id, deliveryGroup);

        return response.status(204).json(deliveryGroup);
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const deliveryGroupRepository = getRepository(RestaurantDeliveryGroupsModel);

        await deliveryGroupRepository.delete(id);

        return response.status(204).send();
    }
}