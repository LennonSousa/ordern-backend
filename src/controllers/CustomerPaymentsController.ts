import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import { encrypt } from '../utils/encryptDecrypt';

import CustomerPaymentsModel from '../models/CustomerPaymentsModel';

export default {
    async create(request: Request, response: Response) {
        const {
            card_number,
            valid,
            cvv,
            name,
            cpf,
            client
        } = request.body;

        const cardNumberEncrypted = encrypt(card_number);

        const customerPaymentsRepository = getRepository(CustomerPaymentsModel);

        const data = {
            card_number: cardNumberEncrypted,
            valid,
            cvv,
            name,
            cpf,
            client
        };

        const schema = Yup.object().shape({
            card_number: Yup.string().required(),
            valid: Yup.string().required(),
            cvv: Yup.string().required(),
            name: Yup.string().required(),
            cpf: Yup.string().required(),
            client: Yup.number().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const customerPayment = customerPaymentsRepository.create(data);

        await customerPaymentsRepository.save(customerPayment);

        return response.status(201).send();
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            card_number,
            valid,
            cvv,
            name,
            cpf,
            client
        } = request.body;

        const cardNumberEncrypted = encrypt(card_number);

        const customerPaymentsRepository = getRepository(CustomerPaymentsModel);

        const data = {
            card_number: cardNumberEncrypted,
            valid,
            cvv,
            name,
            cpf,
            client
        };

        const schema = Yup.object().shape({
            card_number: Yup.string().required(),
            valid: Yup.string().required(),
            cvv: Yup.string().required(),
            name: Yup.string().required(),
            cpf: Yup.string().required(),
            client: Yup.number().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const customerPayment = customerPaymentsRepository.create(data);

        await customerPaymentsRepository.update(id, customerPayment);

        return response.status(204).json(customerPayment);
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const customerPaymentsRepository = getRepository(CustomerPaymentsModel);

        await customerPaymentsRepository.delete(id);

        return response.status(204).send();
    }
}