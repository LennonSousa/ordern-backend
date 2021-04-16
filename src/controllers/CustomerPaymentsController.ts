import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import { encrypt } from '../utils/encryptDecrypt';

import CustomerPaymentsModel from '../models/CustomerPaymentsModel';
import customerPaymentView from '../views/customerPaymentView';

export default {
    async show(request: Request, response: Response) {
        const { customerId, id } = request.params;

        const customerPaymentsRepository = getRepository(CustomerPaymentsModel);

        const customerPayment = await customerPaymentsRepository.findOneOrFail(id, {
            relations: ['customer'],
            where: { customer: customerId }
        });

        return response.json(customerPaymentView.render(customerPayment));
    },

    async create(request: Request, response: Response) {
        const { customerId } = request.params;

        const {
            card_number,
            brand,
            exp_month,
            exp_year,
            name,
            cpf,
        } = request.body;

        const cardNumberEncrypted = encrypt(card_number);

        const customerPaymentsRepository = getRepository(CustomerPaymentsModel);

        const data = {
            card_number: cardNumberEncrypted,
            brand,
            exp_month,
            exp_year,
            name,
            cpf,
            customer: customerId as any,
        };

        const schema = Yup.object().shape({
            card_number: Yup.string().required(),
            brand: Yup.string().required(),
            exp_month: Yup.string().required(),
            exp_year: Yup.string().required(),
            name: Yup.string().required(),
            cpf: Yup.string().required(),
            customer: Yup.number().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const customerPayment = customerPaymentsRepository.create(data);

        await customerPaymentsRepository.save(customerPayment);

        return response.status(201).send();
    },

    async update(request: Request, response: Response) {
        const { customerId, id } = request.params;

        const {
            card_number,
            brand,
            exp_month,
            exp_year,
            name,
            cpf
        } = request.body;

        const cardNumberEncrypted = encrypt(card_number);

        const customerPaymentsRepository = getRepository(CustomerPaymentsModel);

        const paymentVerify = await customerPaymentsRepository.findOneOrFail(id, { relations: ['customer'] });

        if (String(paymentVerify.customer.id) !== String(customerId)) return response.status(403).send({ error: 'Customer not authorized!' });

        const data = {
            card_number: cardNumberEncrypted,
            brand,
            exp_month,
            exp_year,
            name,
            cpf
        };

        const schema = Yup.object().shape({
            card_number: Yup.string().required(),
            brand: Yup.string().required(),
            exp_month: Yup.string().required(),
            exp_year: Yup.string().required(),
            name: Yup.string().required(),
            cpf: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const customerPayment = customerPaymentsRepository.create(data);

        await customerPaymentsRepository.update(id, customerPayment);

        return response.status(204).json(customerPayment);
    },

    async delete(request: Request, response: Response) {
        const { customerId, id } = request.params;

        const customerPaymentsRepository = getRepository(CustomerPaymentsModel);

        const paymentVerify = await customerPaymentsRepository.findOneOrFail(id, { relations: ['customer'] });

        if (String(paymentVerify.customer.id) !== String(customerId)) return response.status(403).send({ error: 'Customer not authorized!' });

        await customerPaymentsRepository.delete(id);

        return response.status(204).send();
    }
}