import { Request, Response } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import userTypeView from '../views/userTypeView';
import UserTypesModel from '../models/UserTypesModel';
import { UserTypesRepository } from '../repositories/UserTypesRepository';

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

    generate() {
        const userTypes = [
            {
                type: 'Administrador',
                description: 'Acesso total a todas as seções e edições.',
                code: 1
            },
            {
                type: 'Gerente',
                description: 'Acesso a todas as seções, com restrições relacionadas a edição de dados da loja e financeiros.',
                code: 2
            },
            {
                type: 'Operador',
                description: 'Acesso restrito às seções de Pedidos e Cardápio (pode somente alterar visibilidade dos produtos.',
                code: 3
            },
            {
                type: 'Entregador',
                description: 'Acesso aos pedidos pendentes.',
                code: 4
            }
        ];

        return userTypes;
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