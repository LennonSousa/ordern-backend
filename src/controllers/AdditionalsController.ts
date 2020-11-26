import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import additionalView from '../views/additionalView';
import AdditionalsModel from '../models/AdditionalsModel';

export default {
    async index(request: Request, response: Response) {
        const additionalsRepository = getRepository(AdditionalsModel);

        const additionals = await additionalsRepository.find(
            {
                relations: ['productAdditionals']
            }
        );

        return response.json(additionalView.renderMany(additionals));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const additionalsRepository = getRepository(AdditionalsModel);

        const additionals = await additionalsRepository.findOneOrFail(id,
            {
                relations: ['productAdditionals']
            }
        );

        return response.json(additionalView.render(additionals));
    },

    async create(request: Request, response: Response) {
        const {
            title,
            code,
            paused
        } = request.body;

        const additionalsRepository = getRepository(AdditionalsModel);

        const data = {
            title,
            code,
            paused
        };

        const schema = Yup.object().shape({
            title: Yup.string().required(),
            code: Yup.string().notRequired(),
            paused: Yup.boolean().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const additional = additionalsRepository.create(data);

        await additionalsRepository.save(additional);

        return response.status(201).json(additional);
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            title,
            code,
            paused
        } = request.body;

        const additionalsRepository = getRepository(AdditionalsModel);

        const data = {
            title,
            code,
            paused
        };

        const schema = Yup.object().shape({
            title: Yup.string().required(),
            code: Yup.string().notRequired(),
            paused: Yup.boolean().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const additional = additionalsRepository.create(data);

        await additionalsRepository.update(id, additional);

        return response.status(204).json(additional);
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const additionalsRepository = getRepository(AdditionalsModel);

        await additionalsRepository.delete(id);

        return response.status(204).send();
    }
}