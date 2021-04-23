import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import mailer from '../modules/mailer';

import userView from '../views/userView';
import { UsersRepository } from '../repositories/UsersRepository';

export default {
    async index(request: Request, response: Response) {
        const usersRepository = getCustomRepository(UsersRepository);

        const users = await usersRepository.find({
            relations: ['type']
        });

        return response.json(userView.renderMany(users));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOneOrFail(id, {
            relations: ['type']
        });

        return response.json(userView.render(user));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            birth,
            email,
            type
        } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);

        const data = {
            name,
            birth,
            email,
            type
        };

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

        const foundUser = await usersRepository.findOne({
            where: [
                { email }
            ]
        });

        if (foundUser && foundUser.active) return response.status(400).json({ error: 'User already exists and activated!' });

        // If dosen't exists, create a new user with a temporary password and send a e-mail.
        if (!foundUser) await usersRepository.save(newUser);
        else if (!foundUser.active) {
            const { id } = foundUser;

            await usersRepository.update(id, newUser);
        }

        await mailer.sendNewUserEmail(name, email, `${process.env.APP_URL}/users/authenticate/new?email=${email}&token=${tempPassword}`).then(() => {
            return response.status(200).json();
        });
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            name,
            cpf,
            birth,
            phone,
            active,
            paused,
            type
        } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);

        const data = {
            name,
            cpf,
            birth,
            phone,
            active,
            paused,
            type
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            cpf: Yup.string().notRequired(),
            birth: Yup.date().required(),
            phone: Yup.string().notRequired(),
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

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const usersRepository = getCustomRepository(UsersRepository);

        await usersRepository.delete(id);

        return response.status(204).send();
    }
}