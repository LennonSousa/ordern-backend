import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import openedDayView from '../views/openedDayView';
import { StoreOpenedDaysRepository } from '../repositories/StoreOpenedDaysRepository'
import StoreOpenedDaysModel from '../models/StoreOpenedDaysModel';

export default {
    async index(request: Request, response: Response) {
        const openedDaysRepository = getCustomRepository(StoreOpenedDaysRepository);

        const openedDays = await openedDaysRepository.find({
            relations: ['daySchedules']
        });

        return response.json(openedDayView.renderMany(openedDays));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const openedDaysRepository = getCustomRepository(StoreOpenedDaysRepository);

        const user = await openedDaysRepository.findOneOrFail(id, {
            relations: ['daySchedules']
        });

        return response.json(openedDayView.render(user));
    },

    generate() {
        const productAvailablesRepository = getCustomRepository(StoreOpenedDaysRepository);
        const openedDays: StoreOpenedDaysModel[] = [];

        for(let x = 0; x < 7; x++){
            const data = {
                week_day: x,
            }

            openedDays.push(productAvailablesRepository.create(data));
        }

        return openedDays;
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            week_day,
            opened
        } = request.body;

        const openedDaysRepository = getCustomRepository(StoreOpenedDaysRepository);

        const data = {
            week_day,
            opened
        };

        const schema = Yup.object().shape({
            opened: Yup.boolean().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const openedDay = openedDaysRepository.create(data);

        await openedDaysRepository.update(id, openedDay);

        return response.status(204).json(openedDay);
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const openedDaysRepository = getCustomRepository(StoreOpenedDaysRepository);

        await openedDaysRepository.delete(id);

        return response.status(204).send();
    }
}