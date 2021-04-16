import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import CustomerAddressModel from '../models/CustomerAddressModel';

export default {
    async create(request: Request, response: Response) {
        const { customerId } = request.params;

        const {
            zip_code,
            street,
            number,
            group,
            complement,
            city,
            country,
            type,
        } = request.body;

        const customerAddressRepository = getRepository(CustomerAddressModel);

        const data = {
            zip_code,
            street,
            number,
            group,
            complement,
            city,
            country,
            type,
            customer: customerId as any,
        };

        const schema = Yup.object().shape({
            zip_code: Yup.string().required(),
            street: Yup.string().required(),
            number: Yup.date().required(),
            group: Yup.string().required(),
            complement: Yup.string().notRequired(),
            city: Yup.string().required(),
            country: Yup.string().required(),
            type: Yup.string().required(),
            customer: Yup.number().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const customerAddress = customerAddressRepository.create(data);

        await customerAddressRepository.save(customerAddress);

        return response.status(201).send();
    },

    async update(request: Request, response: Response) {
        const { customerId, id } = request.params;

        const {
            zip_code,
            street,
            number,
            group,
            complement,
            city,
            country,
            type,
        } = request.body;

        const customerAddressRepository = getRepository(CustomerAddressModel);

        const addressVerify = await customerAddressRepository.findOneOrFail(id, { relations: ['customer'] });

        if (String(addressVerify.customer.id) !== String(customerId)) return response.status(403).send({ error: 'Customer not authorized!' });

        const data = {
            zip_code,
            street,
            number,
            group,
            complement,
            city,
            country,
            type,
        };

        const schema = Yup.object().shape({
            zip_code: Yup.string().required(),
            street: Yup.string().required(),
            number: Yup.date().required(),
            group: Yup.string().required(),
            complement: Yup.string().notRequired(),
            city: Yup.string().required(),
            country: Yup.string().required(),
            type: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const customerAddress = customerAddressRepository.create(data);

        await customerAddressRepository.update(id, customerAddress);

        return response.status(204).json(customerAddress);
    },

    async delete(request: Request, response: Response) {
        const { customerId, id } = request.params;

        const customerAddressRepository = getRepository(CustomerAddressModel);

        const paymentVerify = await customerAddressRepository.findOneOrFail(id, { relations: ['customer'] });

        if (String(paymentVerify.customer.id) !== String(customerId)) return response.status(403).send({ error: 'Customer not authorized!' });

        await customerAddressRepository.delete(id);

        return response.status(204).send();
    }
}