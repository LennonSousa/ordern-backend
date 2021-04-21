import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import paymentDeliveryView from '../views/storePaymentDeliveryView';
import { StorePaymentsDeliveryRepository } from '../repositories/StorePaymentsDeliveryRepository';

export default {
    async index(request: Request, response: Response) {
        const paymentDeliveryRepository = getCustomRepository(StorePaymentsDeliveryRepository);

        const paymentsDelivery = await paymentDeliveryRepository.find();

        return response.json(paymentDeliveryView.renderMany(paymentsDelivery));
    },

    generate() {
        const paymentsDelivery = [
            {
                name: 'Dinheiro',
                code: 'money'
            },
            {
                name: 'Débito',
                code: 'debit'
            },
            {
                name: 'Crédito',
                code: 'credit'
            }
        ];

        return paymentsDelivery;
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            active
        } = request.body;

        const paymentDeliveryRepository = getCustomRepository(StorePaymentsDeliveryRepository);

        const data = {
            active
        };

        const schema = Yup.object().shape({
            active: Yup.boolean().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const paymentDelivery = paymentDeliveryRepository.create(data);

        await paymentDeliveryRepository.update(id, paymentDelivery);

        return response.status(204).json(paymentDelivery);
    },
}