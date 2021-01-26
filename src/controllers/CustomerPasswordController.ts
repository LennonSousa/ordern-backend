import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import bcrypt from 'bcrypt'

import CustomersModel from '../models/CustomersModel';

export default {
    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            password
        } = request.body;

        const customersRepository = getRepository(CustomersModel);

        const hash = await bcrypt.hash(password, 10);

        const data = {
            password: hash
        };

        const schema = Yup.object().shape({
            password: Yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const customer = customersRepository.create(data);

        await customersRepository.update(id, customer);

        return response.status(204).json(customer);
    }
}