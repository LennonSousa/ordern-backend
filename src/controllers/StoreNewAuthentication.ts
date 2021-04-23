import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import { isBefore } from 'date-fns';
import jwt from 'jsonwebtoken';

import { StoreNewRepository } from '../repositories/StoreNewRepository';

require('dotenv/config');

export default {
    async create(request: Request, response: Response) {
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

        if (newStore && newStore.activated) return response.status(400).json({ error: 'Store already exists and activated!' });

        if (isBefore(new Date(newStore.expire), new Date()))
            return response.status(403).json({
                error: 'Activatiion token expired.'
            });

        if (process.env.USER_JWT_SECRET) {
            const newToken = jwt.sign({ id: newStore.id }, process.env.USER_JWT_SECRET, {
                expiresIn: "1h"
            });

            const { id, email } = newStore;

            const updatedNewStore = storeNewRepository.create({ activated: true });

            await storeNewRepository.update(id, updatedNewStore);

            return response.status(201).json({ id, email, token: newToken });
        }

        return response.status(500).json({ error: 'Internal server error.' });
    },
}