import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import customerView from '../views/customersView';
import CustomersModel from '../models/CustomersModel';
import { decrypt } from '../utils/encryptDecrypt';

require('dotenv/config');

export default {
    async create(request: Request, response: Response) {
        const {
            email,
            password,
        } = request.body;

        const customerRepository = getRepository(CustomersModel);

        const data = {
            email,
            password
        };

        const schema = Yup.object().shape({
            email: Yup.string().required(),
            password: Yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        let customerAuth = await customerRepository.findOne({
            relations: ['address', 'payments'],
            where: [
                { email: email, active: 1, paused: 0 }
            ]
        });

        if (!customerAuth)
            return response.status(400).json({
                error: 'Customer e-mail or password dosen\'t exists.'
            });

        if (!await bcrypt.compare(password, customerAuth.password))
            return response.status(400).json({
                error: 'Customer e-mail or password dosen\'t exists.'
            });

        if (process.env.CUSTOMER_JWT_SECRET) {
            const token = jwt.sign({ id: customerAuth.id }, process.env.CUSTOMER_JWT_SECRET, {
                expiresIn: "1d"
            });

            customerAuth = {
                ...customerAuth, payments: customerAuth.payments.map(payment => {
                    return { ...payment, card_number: decrypt(payment.card_number) };
                })
            }

            return response.status(201).json({ ...customerView.render(customerAuth), token: token });
        }

        return response.status(500).json({ message: 'Internal server error' });
    },
}