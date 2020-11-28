require('dotenv/config');
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//import crypto from 'crypto';
//import mailer from '../modules/mailer';

import UsersModel from '../models/UsersModel';

export default {
    async create(request: Request, response: Response) {
        const {
            email,
            password,
        } = request.body;

        const usersRepository = getRepository(UsersModel);

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

        const userAuth = await usersRepository.findOne({
            where: [
                { email: email }
            ]
        });

        if (!userAuth)
            return response.status(400).json({
                error: 'User e-mail or password dosen\'t exists.'
            });

        if (!await bcrypt.compare(password, userAuth.password))
            return response.status(400).json({
                error: 'User e-mail or password dosen\'t exists.'
            });

        if (process.env.JWT_SECRET) {
            const token = jwt.sign({ id: userAuth.id }, process.env.JWT_SECRET, {
                expiresIn: "1d"
            });

            const { id, name } = userAuth;

            return response.status(201).json({ id, name, email, token: token });
        }

        return response.status(500).json({ message: 'Internal server error' });
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            name,
            cpf,
            birth,
            phone,
            email,
            active,
            paused,
            type
        } = request.body;

        const usersRepository = getRepository(UsersModel);

        const data = {
            name,
            cpf,
            birth,
            phone,
            email,
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
    }
}