import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import bcrypt from 'bcrypt';

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

        const user = await usersRepository.findOneOrFail(id,{
            relations: ['type']
        });

        return response.json(userView.render(user));
    },

    async create(request: Request, response: Response) {
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

        await usersRepository.save(user);

        return response.status(201).send();
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