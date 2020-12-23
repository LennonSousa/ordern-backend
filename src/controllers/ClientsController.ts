import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import bcrypt from 'bcrypt'

import clientView from '../views/clientView';
import ClientsModel from '../models/ClientsModel';
import { decrypt } from '../utils/encryptDecrypt';

export default {
    async index(request: Request, response: Response) {
        const clientsRepository = getRepository(ClientsModel);

        const clients = await clientsRepository.find({
            relations: ['address', 'payments']
        });

        return response.json(clientView.renderMany(clients));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const clientsRepository = getRepository(ClientsModel);

        let client = await clientsRepository.findOneOrFail(id, {
            relations: ['address', 'payments']
        });

        client = {
            ...client, payments: client.payments.map(payment => {
                return {...payment, card_number: decrypt(payment.card_number)};
            })
        }

        return response.json(clientView.render(client));
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
            address,
            payments
        } = request.body;

        const clientsRepository = getRepository(ClientsModel);

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
            address,
            payments
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
            address: Yup.array(
                Yup.object().shape({
                    zip_code: Yup.string().required(),
                    street: Yup.string().required(),
                    number: Yup.string().notRequired(),
                    group: Yup.string().notRequired(),
                    complement: Yup.string().notRequired(),
                    city: Yup.string().required(),
                    country: Yup.string().required(),
                    type: Yup.string().required(),
                })
            ).notRequired(),
            payments: Yup.array(
                Yup.object().shape({
                    card_number: Yup.string().required(),
                    valid: Yup.string().required(),
                    cvv: Yup.string().required(),
                    name: Yup.string().required(),
                    cpf: Yup.string().required(),
                })
            ).notRequired()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const client = clientsRepository.create(data);

        await clientsRepository.save(client);

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
            address,
            payments
        } = request.body;

        const clientsRepository = getRepository(ClientsModel);

        const data = {
            name,
            cpf,
            birth,
            phone,
            email,
            active,
            paused,
            address,
            payments
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            cpf: Yup.string().notRequired(),
            birth: Yup.date().required(),
            phone: Yup.string().notRequired(),
            email: Yup.string().required(),
            active: Yup.boolean().required(),
            paused: Yup.boolean().required(),
            address: Yup.array(
                Yup.object().shape({
                    zip_code: Yup.string().required(),
                    street: Yup.string().required(),
                    number: Yup.string().notRequired(),
                    group: Yup.string().notRequired(),
                    complement: Yup.string().notRequired(),
                    city: Yup.string().required(),
                    country: Yup.string().required(),
                    type: Yup.string().required(),
                })
            ).notRequired(),
            payments: Yup.array(
                Yup.object().shape({

                }).notRequired()
            ).notRequired()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const client = clientsRepository.create(data);

        await clientsRepository.update(id, client);

        return response.status(204).json(client);
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const clientsRepository = getRepository(ClientsModel);

        await clientsRepository.delete(id);

        return response.status(204).send();
    }
}