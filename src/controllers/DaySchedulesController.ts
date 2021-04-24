import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import dayScheduleView from '../views/dayScheduleView';
import { StoreOpenedSchedulesRepository } from '../repositories/StoreOpenedSchedulesRepository';

export default {
    async index(request: Request, response: Response) {
        const daySchedulesRepository = getCustomRepository(StoreOpenedSchedulesRepository);

        const daySchedules = await daySchedulesRepository.find();

        return response.json(dayScheduleView.renderMany(daySchedules));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const daySchedulesRepository = getCustomRepository(StoreOpenedSchedulesRepository);

        const daySchedule = await daySchedulesRepository.findOneOrFail(id);

        return response.json(dayScheduleView.render(daySchedule));
    },

    async create(request: Request, response: Response) {
        const {
            from,
            to,
            paused,
            weedDay
        } = request.body;

        const daySchedulesRepository = getCustomRepository(StoreOpenedSchedulesRepository);

        const data = {
            from,
            to,
            paused,
            weedDay
        };

        const schema = Yup.object().shape({
            from: Yup.number().required(),
            to: Yup.number().notRequired(),
            paused: Yup.boolean().required(),
            weedDay: Yup.number().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const daySchedule = daySchedulesRepository.create(data);

        await daySchedulesRepository.save(daySchedule);

        return response.status(201).json(daySchedule);
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            from,
            to,
            paused
        } = request.body;

        const daySchedulesRepository = getCustomRepository(StoreOpenedSchedulesRepository);

        const data = {
            from,
            to,
            paused
        };

        const schema = Yup.object().shape({
            from: Yup.number().required(),
            to: Yup.number().notRequired(),
            paused: Yup.boolean().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const daySchedule = daySchedulesRepository.create(data);

        await daySchedulesRepository.update(id, daySchedule);

        return response.status(204).json(daySchedule);
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const daySchedulesRepository = getCustomRepository(StoreOpenedSchedulesRepository);

        await daySchedulesRepository.delete(id);

        return response.status(204).send();
    }
}