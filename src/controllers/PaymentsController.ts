require('dotenv/config');
import { Request, Response } from 'express';
import * as Yup from 'yup';

import PaymentStripeController from './PaymentStripeController';

export default {
    async create(request: Request, response: Response) {
        const paymentStripe = await PaymentStripeController.show();

        if (paymentStripe) {
            const stripe = require('stripe')(paymentStripe.sk_live);

            const { amount, tokenId, description, email } = request.body;

            const data = {
                amount,
                tokenId,
                description,
                email
            }

            const schema = Yup.object().shape({
                amount: Yup.number().required(),
                tokenId: Yup.string().required(),
                description: Yup.string().required(),
                email: Yup.string().email().required()
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            return stripe.charges
                .create({
                    amount, // Unit: cents
                    currency: 'brl',
                    source: tokenId,
                    description: description,
                    receipt_email: email
                })
                .then((result: any) => response.status(200).json(result))
                .catch((err: any) => {
                    response.status(400).json(err);
                });
        }
    },

    async update(request: Request, response: Response) {
    },

    async delete(request: Request, response: Response) {
    }
}