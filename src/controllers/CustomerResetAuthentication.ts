import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { addHours, isBefore } from 'date-fns';

import CustomersModel from '../models/CustomersModel';
import CustomerResetModel from '../models/CustomerResetModel';
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

        if (!customer) return response.status(403).json({ error: 'Customer e-mail dosen\'t exists!' });

        if (!customer.active || customer.paused) return response.status(401).json({ error: 'Customer e-mail dosen\'t exists!' });

        const customerResetRepository = getRepository(CustomerResetModel);

        const tokenEmail = crypto.randomBytes(3).toString('hex');
        const hash = await bcrypt.hash(tokenEmail, 10);

        const expireHour = addHours(new Date(), 6);

        const customerResetExists = await customerResetRepository.findOne({
            where: [
                { email }
            ]
        });

        if (customerResetExists) {
            const { id } = customerResetExists;
            const customerNew = customerResetRepository.create({
                token: hash,
                expire: expireHour,
                activated: false,
            });

            await customerResetRepository.update(id, customerNew);
        }
        else {
            const customerReset = customerResetRepository.create({
                email,
                token: hash,
                expire: expireHour
            });

            await customerResetRepository.save(customerReset);
        }

        await mailer.sendCustomerResetPassword(customer.name.split(' ', 1)[0], email, tokenEmail).then(() => {
            return response.status(200).json();
        });
    },

    async update(request: Request, response: Response) {
        const { email, token } = request.body;

        const customerRepository = getRepository(CustomersModel);
        const customerResetRepository = getRepository(CustomerResetModel);

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

        const customer = await customerRepository.findOne({
            where: [
                { email }
            ]
        });

        const customerResetAuth = await customerResetRepository.findOne({
            where: [
                { email }
            ]
        });

        if (!customer)
            return response.status(400).json({
                error: 'Customer e-mail or token dosen\'t exists.'
            });

        if (!customerResetAuth)
            return response.status(400).json({
                error: 'Customer e-mail or token dosen\'t exists.'
            });

        if (customerResetAuth.activated)
            return response.status(401).json({
                error: 'Customer token was already activated.'
            });

        if (isBefore(new Date(customerResetAuth.expire), new Date()))
            return response.status(403).json({
                error: 'Customer activatiion token expired.'
            });

        if (!await bcrypt.compare(token, customerResetAuth.token))
            return response.status(401).json({
                error: 'Customer e-mail or token dosen\'t exists.'
            });

        if (process.env.CUSTOMER_JWT_SECRET) {
            const resetToken = jwt.sign({ id: customerResetAuth.id }, process.env.CUSTOMER_JWT_SECRET, {
                expiresIn: "1h"
            });

            const { id, email } = customerResetAuth;

            const customerReset = customerResetRepository.create({ activated: true });

            await customerResetRepository.update(id, customerReset);

            return response.status(200).json({ id, email, token: resetToken });
        }

        return response.status(500).json({ error: 'Internal server error.' });
    }
}