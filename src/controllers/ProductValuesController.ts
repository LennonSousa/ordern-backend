import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import productValueView from '../views/productValueView';
import { ProductValuesRepository } from '../repositories/ProductValuesRepository';

export default {
    async index(request: Request, response: Response) {
        const productValuesRepository = getCustomRepository(ProductValuesRepository);

        const productValues = await productValuesRepository.find();

        return response.json(productValueView.renderMany(productValues));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const productValuesRepository = getCustomRepository(ProductValuesRepository);

        const productValue = await productValuesRepository.findOneOrFail(id);

        return response.json(productValueView.render(productValue));
    },

    async create(request: Request, response: Response) {
        const {
            description,
            value,
            order,
            product
        } = request.body;

        const productValuesRepository = getCustomRepository(ProductValuesRepository);

        const data = {
            description,
            value,
            order,
            product
        };

        const schema = Yup.object().shape({
            description: Yup.string().notRequired(),
            value: Yup.number().notRequired(),
            order: Yup.number().required(),
            product: Yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const productValue = productValuesRepository.create(data);

        await productValuesRepository.save(productValue);

        return response.status(201).json(productValue);
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            description,
            value,
            order,
            product
        } = request.body;

        const productValuesRepository = getCustomRepository(ProductValuesRepository);

        const data = {
            description,
            value,
            order,
            product
        };

        const schema = Yup.object().shape({
            description: Yup.string().notRequired(),
            value: Yup.number().notRequired(),
            order: Yup.number().required(),
            product: Yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const productValue = productValuesRepository.create(data);

        await productValuesRepository.update(id, productValue);

        return response.status(204).json(productValue);
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const productValuesRepository = getCustomRepository(ProductValuesRepository);

        await productValuesRepository.delete(id);

        return response.status(204).send();
    }
}