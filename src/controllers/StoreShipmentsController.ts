import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import { StoreShipmentRepository } from '../repositories/StoreShipmentRepository';
import storeShipmentView from '../views/storeShipmentView';

export default {
    async index(request: Request, response: Response) {
        const paymentDeliveryRepository = getCustomRepository(StoreShipmentRepository);

        const paymentsDelivery = await paymentDeliveryRepository.find();

        return response.json(storeShipmentView.renderMany(paymentsDelivery));
    },

    generate() {
        const storeShipments = [
            {
                name: 'Entrega por grupo de bairros',
                code: 'neighborhoods'
            },
            {
                name: 'Retirada',
                code: 'pickup'
            },
        ];

        return storeShipments;
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            active,
            default_price
        } = request.body;

        const storeShipmentsRepository = getCustomRepository(StoreShipmentRepository);

        const data = {
            active,
            default_price
        };

        const schema = Yup.object().shape({
            active: Yup.boolean().required(),
            default_price: Yup.number().notRequired(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const storeShipment = storeShipmentsRepository.create(data);

        await storeShipmentsRepository.update(id, storeShipment);

        return response.status(204);
    },
}