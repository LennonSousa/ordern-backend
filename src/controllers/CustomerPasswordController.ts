import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import bcrypt from 'bcrypt'
import { isBefore } from 'date-fns';

import CustomersModel from '../models/CustomersModel';
import CustomerResetModel from '../models/CustomerResetModel';
import mailer from '../modules/mailer';

export default {
    async update(request: Request, response: Response) {
        const { customerId } = request.params;

        const {
            password
        } = request.body;

        const customersRepository = getRepository(CustomersModel);
        const customerResetRepository = getRepository(CustomerResetModel);

        const customerResetVerify = await customerResetRepository.findOneOrFail(customerId); // Find the user password request.

        const customerVerify = await customersRepository.findOneOrFail({ where: { email: customerResetVerify.email } }); // Search for a user with tha same e-mail tha new user.

        if (isBefore(new Date(customerResetVerify.expire), new Date()))
            return response.status(403).send({ error: 'Customer not authorized!' });

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

        await customersRepository.update(customerVerify.id, customer);

        await customerResetRepository.delete(customerResetVerify.id);

        await mailer.sendCustomerConfirmedResetPassword(customerVerify.name.split(' ', 1)[0], customerVerify.email);

        return response.status(204).send();
    }
}