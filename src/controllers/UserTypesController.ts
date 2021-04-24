import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import userTypeView from '../views/userTypeView';
import { UserTypesRepository } from '../repositories/UserTypesRepository';

export default {
    async index(request: Request, response: Response) {
        const userTypesRepository = getCustomRepository(UserTypesRepository);

        const userTypes = await userTypesRepository.find();

        return response.json(userTypeView.renderMany(userTypes));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const userTypesRepository = getCustomRepository(UserTypesRepository);

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
}