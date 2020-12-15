require('dotenv/config');
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import CustomersModel from '../models/ClientsModel';
import CustomerNewModel from '../models/CustomerNewModel';
import mailer from '../modules/mailer';

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
                { email: email }
            ]
        });

        if (!customer) {
            const customerNewRepository = getRepository(CustomerNewModel);

            const tokenEmail = crypto.randomBytes(2).toString('hex');

            const expireHour = new Date();
            expireHour.setHours(expireHour.getHours() + 1);

            const hash = await bcrypt.hash(tokenEmail, 10);

            const customerNewExists = await customerNewRepository.findOne({
                where: [
                    { email: email }
                ]
            });

            if (customerNewExists) {
                const { id } = customerNewExists;
                const customerNew = customerNewRepository.create({ token: hash, activated: false });

                await customerNewRepository.update(id, customerNew);
            }
            else {
                const customerNew = customerNewRepository.create({
                    email,
                    token: hash,
                    expire: expireHour
                });

                await customerNewRepository.save(customerNew);
            }

            mailer.sendMail({
                to: email,
                from: 'lennonsousa@outlook.com',
                subject: "Bem-vindo(a)",
                text: `Ficamos felizes de ver você por aqui. Use o código a seguir para prosseguir: ${tokenEmail}`,
                html: `<h2>Ficamos felizes de ver você por aqui</h2><p>Use o código a seguir para prosseguir: ${tokenEmail}</p>`,
            }, err => {
                if (err) return response.status(204).json();
            });

            return response.status(204).json();
        }

        return response.status(200).json();
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

        if (process.env.JWT_SECRET) {
            const newToken = jwt.sign({ id: customerNewAuth.id }, process.env.JWT_SECRET, {
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