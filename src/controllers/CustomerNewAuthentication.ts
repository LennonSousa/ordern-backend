import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import CustomersModel from '../models/CustomersModel';
import CustomerNewModel from '../models/CustomerNewModel';
import mailer from '../modules/mailer';

require('dotenv/config');

export default {
    async create(request: Request, response: Response) {
        const { email } = request.body;

        const customerRepository = getRepository(CustomersModel);

        const data = {
            email
        };

        const schema = Yup.object().shape({
            email: Yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const customer = await customerRepository.findOne({
            where: [
                { email }
            ]
        });

        if (customer) return response.status(400).json({ message: 'Customer already exists!' });

        const customerNewRepository = getRepository(CustomerNewModel);

        const tokenEmail = crypto.randomBytes(3).toString('hex');

        const expireHour = new Date();
        expireHour.setHours(expireHour.getHours() + 1);

        const hash = await bcrypt.hash(tokenEmail, 10);

        const customerNewExists = await customerNewRepository.findOne({
            where: [
                { email }
            ]
        });

        const customerNew = customerNewRepository.create({
            email,
            token: hash,
            expire: expireHour,
            activated: false
        });

        console.log('Customer new: ', customerNew);

        if (customerNewExists) {
            const { id } = customerNewExists;

            await customerNewRepository.update(id, customerNew);

            console.log('New customer exists!');
        }
        else {
            await customerNewRepository.save(customerNew);

            console.log('New customer dosen\'t exists!');
        }

        const variables = {
            store_name: process.env.RESTAURANT_NAME,
            name: 'Lennon',
            token: tokenEmail
        }

        mailer.execute(email, "Bem-vindo(a)", variables, "new-user").then(() => {
            return response.status(201).json();
        });
    },

    async update(request: Request, response: Response) {
        const { email, token } = request.body;

        const customerNewRepository = getRepository(CustomerNewModel);

        const data = {
            email,
            token
        };

        const schema = Yup.object().shape({
            email: Yup.string().required(),
            token: Yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const customerNewAuth = await customerNewRepository.findOne({
            where: [
                { email: email }
            ]
        });

        if (!customerNewAuth)
            return response.status(400).json({
                error: 'Customer e-mail or token dosen\'t exists.'
            });

        if (!await bcrypt.compare(token, customerNewAuth.token))
            return response.status(400).json({
                error: 'Customer e-mail or token dosen\'t exists.'
            });

        const now = new Date();

        if (customerNewAuth.expire <= now)
            return response.status(400).json({
                error: 'Customer activatiion token expired.'
            });

        if (process.env.CUSTOMER_JWT_SECRET) {
            const newToken = jwt.sign({ id: customerNewAuth.id }, process.env.CUSTOMER_JWT_SECRET, {
                expiresIn: "1h"
            });

            const { id, email } = customerNewAuth;

            const customerNew = customerNewRepository.create({ activated: true });

            await customerNewRepository.update(id, customerNew);

            return response.status(201).json({ id, email, token: newToken });
        }

        return response.status(500).json({ message: 'Internal server error' });
    }
}