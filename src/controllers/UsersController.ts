import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import mailer from '../modules/mailer';
import { format } from 'date-fns';

import userView from '../views/userView';
import UsersModel from '../models/UsersModel';

export default {
    async index(request: Request, response: Response) {
        const usersRepository = getRepository(UsersModel);

        const users = await usersRepository.find({
            relations: ['type']
        });

        return response.json(userView.renderMany(users));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const usersRepository = getRepository(UsersModel);

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

        const usersRepository = getRepository(UsersModel);

        const data = {
            name,
            birth,
            email,
            created_at : format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            type
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            birth: Yup.date().required(),
            email: Yup.string().required(),
            created_at: Yup.date().required(),
            type: Yup.number().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const findedUser = await usersRepository.findOne({
            where: [
                { email, active: 1 }
            ]
        });

        if (!findedUser) {
            const tempPassword = crypto.randomBytes(6).toString('hex');
            const hash = await bcrypt.hash(tempPassword, 10);

            const newUser = usersRepository.create({
                name,
                birth,
                email,
                active: false,
                paused: false,
                type
            });

            await usersRepository.save(newUser);

            try {
                // mailer.sendMail({
                //     to: email,
                //     from: `${process.env.RESTAURANT_NAME} ${process.env.EMAIL_USER}`,
                //     subject: "Bem-vindo(a)",
                //     text: `Ficamos felizes de ver você por aqui. Use o código a seguir para prosseguir: ${hash}`,
                //     html: `<h2>Ficamos felizes de ver você por aqui.</h2><p>No aplicativo, use o link para prosseguir: <a> href="${process.env.HOST_API}/${hash}"</a></p>`,
                // }, err => {
                //     if (err) {
                //         console.log('E-mail send error: ', err);

                //         return response.status(500).json({ message: 'Internal server error' });
                //     }
                //     else
                //         return response.status(204).json();
                // });


            }
            catch (err) {
                return response.status(500).json({ message: 'Internal server error' });
            }

        }
        else
            return response.status(200).json();
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
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const usersRepository = getRepository(UsersModel);

        await usersRepository.delete(id);

        return response.status(204).send();
    }
}