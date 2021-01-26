require('dotenv/config');
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import CustomersModel from '../models/CustomersModel';
import CustomerResetModel from '../models/CustomerResetModel';
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

        if (customer) {
            const customerResetRepository = getRepository(CustomerResetModel);

            const tokenEmail = crypto.randomBytes(3).toString('hex');

            const expireHour = new Date();
            expireHour.setHours(expireHour.getHours() + 1);

            const hash = await bcrypt.hash(tokenEmail, 10);

            const customerResetExists = await customerResetRepository.findOne({
                where: [
                    { email: email }
                ]
            });

            if (customerResetExists) {
                const { id } = customerResetExists;
                const customerNew = customerResetRepository.create({
                    token: hash, expire: expireHour, activated: false
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

            if (process.env.EMAIL_USER) {
                try {
                    mailer.sendMail({
                        to: email,
                        from: process.env.EMAIL_USER,
                        subject: "Olá",
                        text: `Você solicitou a mudança da sua senha. Use o código a seguir para prosseguir: ${tokenEmail}`,
                        html: `<h2>Você solicitou a mudança da sua senha.</h2><p>No aplicatico, use o código a seguir para prosseguir: <b>${tokenEmail}</b></p>`,
                    }, err => {
                        if (err) {
                            console.log('E-mail send error: ', err);

                            return response.status(500).json({ message: 'Internal server error' });
                        }
                        else
                            return response.status(200).json();
                    });


                }
                catch (err) {
                    return response.status(500).json({ message: 'Internal server error' });
                }

            }
            else
                return response.status(500).json({ message: 'Internal server error' });

        }
        else
            return response.status(204).json();
    },

    async update(request: Request, response: Response) {
        const { email, token } = request.body;

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

        const customerResetAuth = await customerResetRepository.findOne({
            where: [
                { email: email }
            ]
        });

        if (!customerResetAuth)
            return response.status(400).json({
                error: 'Customer e-mail or token dosen\'t exists.'
            });

        if (!await bcrypt.compare(token, customerResetAuth.token))
            return response.status(400).json({
                error: 'Customer e-mail or token dosen\'t exists.'
            });

        const now = new Date();

        if (customerResetAuth.expire <= now)
            return response.status(400).json({
                error: 'Customer activatiion token expired.'
            });

        if (process.env.JWT_SECRET) {
            const resetToken = jwt.sign({ id: customerResetAuth.id }, process.env.JWT_SECRET, {
                expiresIn: "1h"
            });

            const { id, email } = customerResetAuth;

            const customerReset = customerResetRepository.create({ activated: true });

            await customerResetRepository.update(id, customerReset);

            return response.status(201).json({ id, email, token: resetToken });
        }

        return response.status(500).json({ message: 'Internal server error' });
    }
}