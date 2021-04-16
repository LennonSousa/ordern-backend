import { Request, Response } from 'express';
import { Between, getRepository } from 'typeorm';
import * as Yup from 'yup';
import bcrypt from 'bcrypt'
import { format } from 'date-fns';

import customerView from '../views/customersView';
import CustomersModel from '../models/CustomersModel';
import OrderModel from '../models/OrdersModel';
import { decrypt } from '../utils/encryptDecrypt';

export default {
    async index(request: Request, response: Response) {
        const { start, end } = request.query;

        const clientsRepository = getRepository(CustomersModel);

        if (start && end) {
            const customers = await clientsRepository.find({
                where: { created_at: Between(start, end) },
                order: {
                    created_at: "DESC"
                },
                relations: ['address']
            });

            return response.json(customerView.renderMany(customers));
        }
        else {
            const customers = await clientsRepository.find({
                relations: ['address']
            });

            return response.json(customerView.renderMany(customers));
        }
    },

    async show(request: Request, response: Response) {
        const { customerId } = request.params;

        const customersRepository = getRepository(CustomersModel);

        let customer = await customersRepository.findOneOrFail(customerId, {
            relations: ['address', 'payments']
        });

        const customerOrdersRepository = getRepository(OrderModel);

        const customerOrders = await customerOrdersRepository.find({
            where: { client_id: customer.id },
            order: {
                ordered_at: "DESC"
            },
            relations: [
                'orderStatus',
                'orderItems',
                'orderItems.orderItemAdditionals'
            ]
        });

        customer = {
            ...customer,
            payments: customer.payments.map(payment => {
                return { ...payment, card_number: decrypt(payment.card_number) };
            }),
            orders: customerOrders,
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
            active: true,
            paused: false,
            created_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
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
            created_at: Yup.date().required(),
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
        const { customerId } = request.params;

        const {
            name,
            cpf,
            birth,
            phone,
            active,
            paused
        } = request.body;

        const customersRepository = getRepository(CustomersModel);

        const customerVerify = await customersRepository.findOneOrFail(customerId);

        if (String(customerVerify.id) !== String(customerId)) return response.status(403).send({ error: 'Customer not authorized!' });

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
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const customer = customersRepository.create(data);

        await customersRepository.update(customerId, customer);

        return response.status(204).json(customer);
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const customersRepository = getRepository(CustomersModel);

        await customersRepository.delete(id);

        return response.status(204).send();
    }
}