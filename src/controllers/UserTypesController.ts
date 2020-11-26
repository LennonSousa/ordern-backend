import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import userTypeView from '../views/userTypeView';
import UserTypesModel from '../models/UserTypesModel';

export default {
    async index(request: Request, response: Response) {
        const userTypesRepository = getRepository(UserTypesModel);

        const userTypes = await userTypesRepository.find();

        return response.json(userTypeView.renderMany(userTypes));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const userTypesRepository = getRepository(UserTypesModel);

        const userType = await userTypesRepository.findOneOrFail(id);

        return response.json(userTypeView.render(userType));
    },

    async create(request: Request, response: Response) {
        const {
            type,
            description,
            code
        } = request.body;

        const userTypesRepository = getRepository(UserTypesModel);

        const data = {
            type,
            description,
            code
        };

        const schema = Yup.object().shape({
            type: Yup.string().required(),
            description: Yup.string().required(),
            code: Yup.number().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const userType = userTypesRepository.create(data);

        await userTypesRepository.save(userType);

        return response.status(201).send();
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            type,
            description,
            code
        } = request.body;

        const userTypesRepository = getRepository(UserTypesModel);

        const requestImages = request.files as { [fieldname: string]: Express.Multer.File[] };

        const { cover, avatar } = requestImages;

        const data = {
            type,
            description,
            code
        };

        const schema = Yup.object().shape({
            type: Yup.string().required(),
            description: Yup.string().required(),
            code: Yup.number().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const userType = userTypesRepository.create(data);

        await userTypesRepository.update(id, userType);

        return response.status(204).json(userType);
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const userTypesRepository = getRepository(UserTypesModel);

        await userTypesRepository.delete(id);

        return response.status(204).send();
    }
}