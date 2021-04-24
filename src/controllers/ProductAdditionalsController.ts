import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import productAdditionalView from '../views/productAdditionalView';
import { ProductAdditionalsRepository } from '../repositories/ProductAdditionalsRepository';

export default {
    async index(request: Request, response: Response) {
        const productAdditionalsRepository = getCustomRepository(ProductAdditionalsRepository);

        const productAdditionals = await productAdditionalsRepository.find();

        return response.json(productAdditionalView.renderMany(productAdditionals));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const productAdditionalsRepository = getCustomRepository(ProductAdditionalsRepository);

        const productAdditional = await productAdditionalsRepository.findOneOrFail(id);

        return response.json(productAdditionalView.render(productAdditional));
    },

    async create(request: Request, response: Response) {
        let {
            pdv,
            price,
            order,
            additional,
            categoryAdditional
        } = request.body;

        price = Number(price);

        const productAdditionalsRepository = getCustomRepository(ProductAdditionalsRepository);

        const data = {
            pdv,
            price,
            order,
            additional,
            categoryAdditional
        };

        const schema = Yup.object().shape({
            pdv: Yup.string().notRequired(),
            price: Yup.number().required(),
            order: Yup.number().notRequired(),
            additional: Yup.string().required(),
            categoryAdditional: Yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const productAdditional = productAdditionalsRepository.create(data);

        await productAdditionalsRepository.save(productAdditional);

        return response.status(201).json(productAdditional);
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        let {
            pdv,
            price,
            order,
            additional,
            categoryAdditional
        } = request.body;

        price = Number(price);

        const productAdditionalsRepository = getCustomRepository(ProductAdditionalsRepository);

        const data = {
            pdv,
            price,
            order,
            additional,
            categoryAdditional
        };

        const schema = Yup.object().shape({
            pdv: Yup.string().notRequired(),
            price: Yup.number().required(),
            order: Yup.number().notRequired(),
            additional: Yup.string().required(),
            categoryAdditional: Yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const productAdditional = productAdditionalsRepository.create(data);

        await productAdditionalsRepository.update(id, productAdditional);

        return response.status(204).json(productAdditional);
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const productAdditionalsRepository = getCustomRepository(ProductAdditionalsRepository);

        await productAdditionalsRepository.delete(id);

        return response.status(204).send();
    }
}