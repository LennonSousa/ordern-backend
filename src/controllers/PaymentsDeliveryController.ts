import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import paymentDeliveryView from '../views/paymentDeliveryView';
import PaymentsDeliveryModel from '../models/PaymentsDeliveryModel';

export default {
    async index(request: Request, response: Response) {
        const paymentDeliveryRepository = getRepository(PaymentsDeliveryModel);

        const paymentsDelivery = await paymentDeliveryRepository.find();

        return response.json(paymentDeliveryView.renderMany(paymentsDelivery));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const paymentDeliveryRepository = getRepository(PaymentsDeliveryModel);

        const paymentDelivery = await paymentDeliveryRepository.findOneOrFail(id);

        return response.json(paymentDeliveryView.render(paymentDelivery));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            code,
            active
        } = request.body;

        const paymentDeliveryRepository = getRepository(PaymentsDeliveryModel);

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

        const paymentDelivery = paymentDeliveryRepository.create(data);

        await paymentDeliveryRepository.save(paymentDelivery);

        return response.status(201).json(paymentDelivery);
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            name,
            code,
            active
        } = request.body;

        const paymentDeliveryRepository = getRepository(PaymentsDeliveryModel);

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

        const paymentDelivery = paymentDeliveryRepository.create(data);

        await paymentDeliveryRepository.update(id, paymentDelivery);

        return response.status(204).json(paymentDelivery);
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const paymentDeliveryRepository = getRepository(PaymentsDeliveryModel);

        await paymentDeliveryRepository.delete(id);

        return response.status(204).send();
    }
}