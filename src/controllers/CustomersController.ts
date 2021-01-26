import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import bcrypt from 'bcrypt'

import customerView from '../views/customersView';
import CustomersModel from '../models/CustomersModel';
import { decrypt } from '../utils/encryptDecrypt';

export default {
    async index(request: Request, response: Response) {
        const clientsRepository = getRepository(CustomersModel);

        const customers = await clientsRepository.find({
            relations: ['address', 'payments']
        });

        return response.json(customerView.renderMany(customers));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const customersRepository = getRepository(CustomersModel);

        let customer = await customersRepository.findOneOrFail(id, {
            relations: ['address', 'payments']
        });

        customer = {
            ...customer, payments: customer.payments.map(payment => {
                return { ...payment, card_number: decrypt(payment.card_number) };
            })
        }

        return response.json(customerView.render(customer));
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

        const customersRepository = getRepository(CustomersModel);

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

        const client = customersRepository.create(data);

        await customersRepository.save(client);

        return response.status(201).send();
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            name,
            cpf,
            birth,
            phone,
            active,
            paused
        } = request.body;

        const customersRepository = getRepository(CustomersModel);

        const data = {
            name,
            cpf,
            birth,
            phone,
            active,
            paused
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            cpf: Yup.string().notRequired(),
            birth: Yup.date().required(),
            phone: Yup.string().notRequired(),
            active: Yup.boolean().required(),
            paused: Yup.boolean().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const customer = customersRepository.create(data);

        await customersRepository.update(id, customer);

        return response.status(204).json(customer);
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const customersRepository = getRepository(CustomersModel);

        await customersRepository.delete(id);

        return response.status(204).send();
    }
}