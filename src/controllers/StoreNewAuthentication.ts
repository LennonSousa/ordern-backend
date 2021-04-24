import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import { isBefore } from 'date-fns';
import jwt from 'jsonwebtoken';

import { StoresRepository } from '../repositories/StoresRepository';
import { StoreNewRepository } from '../repositories/StoreNewRepository';

require('dotenv/config');

export default {
    async create(request: Request, response: Response) {
        const storesRepository = getCustomRepository(StoresRepository);

        const store = await storesRepository.find();

        if (store.length > 0) return response.status(404).json();

        const { email, token } = request.body;

        const storeNewRepository = getCustomRepository(StoreNewRepository);

        const data = {
            email,
            token
        };

        const schema = Yup.object().shape({
            email: Yup.string().required(),
            token: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const newStore = await storeNewRepository.findOneOrFail({
            where: [
                { email, token }
            ]
        });

        if (isBefore(new Date(newStore.expire), new Date()))
            return response.status(403).json({
                error: 'Activatiion token expired.'
            });

        if (process.env.USER_JWT_SECRET) {
            const newToken = jwt.sign({ id: newStore.id }, process.env.USER_JWT_SECRET, {
                expiresIn: "1h"
            });

            const { id, email } = newStore;

            return response.status(201).json({ id, email, token: newToken });
        }

        return response.status(500).json({ error: 'Internal server error.' });
    },
}