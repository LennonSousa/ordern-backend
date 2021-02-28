import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import storeShipmentView from '../views/storeShipmentView';
import StoreShipments from '../models/StoreShipmentsModel';

export default {
    async index(request: Request, response: Response) {
        const storeShipmentsRepository = getRepository(StoreShipments);

        const storeShipments = await storeShipmentsRepository.find();

        return response.json(storeShipmentView.renderMany(storeShipments));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const storeShipmentsRepository = getRepository(StoreShipments);

        const storeShipment = await storeShipmentsRepository.findOneOrFail(id);

        return response.json(storeShipmentView.render(storeShipment));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            code,
            active
        } = request.body;

        const storeShipmentsRepository = getRepository(StoreShipments);

        const data = {
            name,
            code,
            active
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            code: Yup.string().required(),
            active: Yup.boolean().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const storeShipment = storeShipmentsRepository.create(data);

        await storeShipmentsRepository.save(storeShipment);

        return response.status(201).json(storeShipment);
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            name,
            code,
            active
        } = request.body;

        const storeShipmentsRepository = getRepository(StoreShipments);

        const data = {
            name,
            code,
            active
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            code: Yup.string().required(),
            active: Yup.boolean().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const storeShipment = storeShipmentsRepository.create(data);

        await storeShipmentsRepository.update(id, storeShipment);

        return response.status(204).json(storeShipment);
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const storeShipmentsRepository = getRepository(StoreShipments);

        await storeShipmentsRepository.delete(id);

        return response.status(204).send();
    }
}