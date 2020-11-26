import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import openedDayView from '../views/openedDayView';
import OpenedDaysModel from '../models/OpenedDaysModel';

export default {
    async index(request: Request, response: Response) {
        const openedDaysRepository = getRepository(OpenedDaysModel);

        const openedDays = await openedDaysRepository.find({
            relations: ['daySchedule']
        });

        return response.json(openedDayView.renderMany(openedDays));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const openedDaysRepository = getRepository(OpenedDaysModel);

        const user = await openedDaysRepository.findOneOrFail(id, {
            relations: ['daySchedule']
        });

        return response.json(openedDayView.render(user));
    },

    async create(request: Request, response: Response) {
        const {
            week_day,
            opened
        } = request.body;

        const openedDaysRepository = getRepository(OpenedDaysModel);

        const data = {
            week_day,
            opened
        };

        const schema = Yup.object().shape({
            week_day: Yup.number().required(),
            opened: Yup.boolean().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const openedDay = openedDaysRepository.create(data);

        await openedDaysRepository.save(openedDay);

        return response.status(201).send();
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            week_day,
            opened
        } = request.body;

        const openedDaysRepository = getRepository(OpenedDaysModel);

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

        const openedDaysRepository = getRepository(OpenedDaysModel);

        await openedDaysRepository.delete(id);

        return response.status(204).send();
    }
}