require('dotenv/config');
import { Request, Response } from 'express';

export default {
    async create(request: Request, response: Response) {
        if (process.env.STRIP_SECRET_KEY) {
            const stripe = require('stripe')(process.env.STRIP_SECRET_KEY);

            const { amount, tokenId } = request.body;

            return stripe.charges
                .create({
                    amount, // Unit: cents
                    currency: 'brl',
                    source: tokenId,
                    description: 'Test payment',
                    receipt_email: 'lennonsousa@outlook.com'
                })
                .then((result: any) => response.status(200).json(result));
        }
    },

    async update(request: Request, response: Response) {
    },

    async delete(request: Request, response: Response) {
    }
}