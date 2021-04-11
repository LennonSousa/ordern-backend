import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mailer from '../modules/mailer';

import UsersModel from '../models/UsersModel';
import userView from '../views/userView';

export default {
    async show(request: Request, response: Response) {
        const { email, token } = request.query;

        const userNewRepository = getRepository(UsersModel);

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

        const userNewAuth = await userNewRepository.findOne({
            where: [
                { email, active: 0 }
            ],
            relations: ['type']
        });

        if (!userNewAuth)
            return response.status(400).json({
                error: 'User e-mail or token dosen\'t exists.'
            });

        if (!await bcrypt.compare(token, userNewAuth.password))
            return response.status(400).json({
                error: 'User e-mail or token dosen\'t exists.'
            });

        if (process.env.USER_JWT_SECRET) {
            const newToken = jwt.sign({ id: userNewAuth.id }, process.env.USER_JWT_SECRET, {
                expiresIn: "1h"
            });

            return response.status(201).json({ user: userView.render(userNewAuth), token: newToken });
        }

        return response.status(500).json({ message: 'Internal server error' });
    },

    async create(request: Request, response: Response) {
        const {
            name,
            birth,
            email,
            type
        } = request.body;

        const usersRepository = getRepository(UsersModel);

        const data = {
            name,
            birth,
            email,
            type
        };

        // Validation fields.
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            birth: Yup.date().required(),
            email: Yup.string().required(),
            type: Yup.number().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const tempPassword = crypto.randomBytes(10).toString('hex');
        const hash = await bcrypt.hash(tempPassword, 10);

        const newUser = usersRepository.create({
            name,
            birth,
            email,
            password: hash,
            active: false,
            paused: false,
            type
        });

        // If users already exists.
        const findedUser = await usersRepository.findOne({
            where: [
                { email }
            ]
        });

        // If dosen't exists, create a new user with a temporary password and send a e-mail.
        if (!findedUser) {
            await usersRepository.save(newUser);

            try {
                mailer.sendMail({
                    to: email,
                    from: `${process.env.RESTAURANT_NAME} ${process.env.EMAIL_USER}`,
                    subject: "Bem-vindo(a)",
                    text: `Ficamos felizes de ver você por aqui. Use o código a seguir para prosseguir: ${tempPassword}`,
                    html: `<h2>Olá ${name}</h2>` +
                        `<p>Você foi convidado para ser integrante no sistema de gerenciamento do estabelecimento ${process.env.RESTAURANT_NAME}.</p>` +
                        `<p>Clique no link a seguir para aceitar e concluir o seu cadastro.</p>` +
                        `<p><a href="${process.env.APP_URL}/users/authenticate/new?email=${email}&token=${tempPassword}"/>Ativar registro</a></p>`,
                }, err => {
                    if (err) {
                        console.log('E-mail send error: ', err);

                        return response.status(500).json({ message: 'Internal server error' });
                    }
                    else
                        return response.status(204).json();
                });
            }
            catch (err) {
                return response.status(500).json({ message: 'Internal server error' });
            }

        }
        else if (!findedUser.active) {
            const { id } = findedUser;

            await usersRepository.update(id, newUser);

            try {
                mailer.sendMail({
                    to: email,
                    from: `${process.env.RESTAURANT_NAME} ${process.env.EMAIL_USER}`,
                    subject: "Bem-vindo(a)",
                    text: `Ficamos felizes de ver você por aqui. Use o código a seguir para prosseguir: ${tempPassword}`,
                    html: `<h2>Olá ${name}</h2>` +
                        `<p>Você foi convidado para ser integrante no sistema de gerenciamento do estabelecimento ${process.env.RESTAURANT_NAME}.</p>` +
                        `<p>Clique no link a seguir para aceitar e concluir o seu cadastro.</p>` +
                        `<p><a href="${process.env.APP_URL}/users/authenticate/new?email=${email}&token=${tempPassword}"/>Ativar registro</a></p>`,
                }, err => {
                    if (err) {
                        console.log('E-mail send error: ', err);

                        return response.status(500).json({ message: 'Internal server error' });
                    }
                    else
                        return response.status(204).json();
                });
            }
            catch (err) {
                return response.status(500).json({ message: 'Internal server error' });
            }
        }
        else
            return response.status(200).json({ message: 'User already exists and activated!' });
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            name,
            cpf,
            birth,
            phone,
            email,
            password,
            active,
            paused,
            type
        } = request.body;

        const usersRepository = getRepository(UsersModel);

        const hash = await bcrypt.hash(password, 10);

        const data = {
            name,
            cpf,
            birth,
            phone,
            email,
            password: hash,
            active,
            paused,
            type
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            cpf: Yup.string().notRequired(),
            birth: Yup.date().required(),
            phone: Yup.string().notRequired(),
            email: Yup.string().required(),
            password: Yup.string().required(),
            active: Yup.boolean().required(),
            paused: Yup.boolean().required(),
            type: Yup.number().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const user = usersRepository.create(data);

        await usersRepository.update(id, user);

        return response.status(204).json(user);
    },
}