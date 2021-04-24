import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import paymentStripeView from '../views/storePaymentStripeView';
import { StorePaymentStripeRepository } from '../repositories/StorePaymentStripe';

export default {
    async index(request: Request, response: Response) {
        const paymentStripeRepository = getCustomRepository(StorePaymentStripeRepository);

        const paymentStripe = await paymentStripeRepository.findOne();

        if (paymentStripe)
            return response.json(paymentStripeView.renderPublic(paymentStripe));
        else
            return response.status(204).json();
    },

    async indexSecret(request: Request, response: Response) {
        const paymentStripeRepository = getCustomRepository(StorePaymentStripeRepository);

        const paymentStripe = await paymentStripeRepository.findOne();

        if (paymentStripe)
            return response.json(paymentStripeView.renderSecret(paymentStripe));
        else
            return response.status(204).json();
    },

    async show() {
        const paymentStripeRepository = getCustomRepository(StorePaymentStripeRepository);

        const paymentStripe = await paymentStripeRepository.findOne();

        if (paymentStripe)
            return paymentStripeView.renderSecret(paymentStripe);
        else
            null;
    },

    async generate() {
        const paymentStripeRepository = getCustomRepository(StorePaymentStripeRepository);

        const data = {
            pk_live: '',
            sk_live: '',
            active: false,
        };

        const schema = Yup.object().shape({
            pk_live: Yup.string().required(),
            sk_live: Yup.string().required(),
            active: Yup.boolean().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const paymentStripe = paymentStripeRepository.create(data);

        await paymentStripeRepository.save(paymentStripe);
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            pk_live,
            sk_live,
            active
        } = request.body;

        const paymentStripeRepository = getCustomRepository(StorePaymentStripeRepository);

        const data = {
            pk_live,
            sk_live,
            active
        };

        const schema = Yup.object().shape({
            pk_live: Yup.string().required(),
            sk_live: Yup.string().required(),
            active: Yup.boolean().notRequired()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const paymentStripe = paymentStripeRepository.create(data);

        await paymentStripeRepository.update(id, paymentStripe);

        return response.status(204).json(paymentStripe);
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const paymentStripeRepository = getCustomRepository(StorePaymentStripeRepository);

        await paymentStripeRepository.delete(id);

        return response.status(204).send();
    }
}