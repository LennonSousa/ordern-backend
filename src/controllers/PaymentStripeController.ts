import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import paymentStripeView from '../views/paymentStripeView';
import PaymentStripeModel from '../models/PaymentStripeModel';

export default {
    async index(request: Request, response: Response) {
        const paymentStripeRepository = getRepository(PaymentStripeModel);

        const paymentStripe = await paymentStripeRepository.findOne();

        if (paymentStripe)
            return response.json(paymentStripeView.renderPublic(paymentStripe));
        else
            return response.status(204).json();
    },

    async show() {
        const paymentStripeRepository = getRepository(PaymentStripeModel);

        const paymentStripe = await paymentStripeRepository.findOne();

        if (paymentStripe)
            return paymentStripeView.renderSecret(paymentStripe);
        else
            null;
    },

    async create(request: Request, response: Response) {
        const {
            pk_live,
            sk_live,
            active
        } = request.body;

        const paymentStripeRepository = getRepository(PaymentStripeModel);

        const data = {
            pk_live,
            sk_live,
            active
        };

        const schema = Yup.object().shape({
            pk_live: Yup.string().required(),
            sk_live: Yup.string().required(),
            active: Yup.boolean().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const debitBrand = paymentStripeRepository.create(data);

        await paymentStripeRepository.save(debitBrand);

        return response.status(201).json(debitBrand);
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            pk_live,
            sk_live,
            active
        } = request.body;

        const paymentStripeRepository = getRepository(PaymentStripeModel);

        const data = {
            pk_live,
            sk_live,
            active
        };

        const schema = Yup.object().shape({
            pk_live: Yup.string().required(),
            sk_live: Yup.string().required(),
            active: Yup.boolean().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const debitBrand = paymentStripeRepository.create(data);

        await paymentStripeRepository.update(id, debitBrand);

        return response.status(204).json(debitBrand);
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const paymentStripeRepository = getRepository(PaymentStripeModel);

        await paymentStripeRepository.delete(id);

        return response.status(204).send();
    }
}