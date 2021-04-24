import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import productCategorieAdditionalView from '../views/productCategorieAdditionalView';
import { ProductCategoriesAdditionalRepository } from '../repositories/ProductCategoriesAdditionalRepository';

export default {
    async index(request: Request, response: Response) {
        const productCategoriesAdditionalRepository = getCustomRepository(ProductCategoriesAdditionalRepository);

        const productCategoriesAdditional = await productCategoriesAdditionalRepository.find({
            relations: ['productAdditional']
        });

        return response.json(productCategorieAdditionalView.renderMany(productCategoriesAdditional));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const productCategoriesAdditionalRepository = getCustomRepository(ProductCategoriesAdditionalRepository);

        const productCategorieAdditional = await productCategoriesAdditionalRepository.findOneOrFail(id,
            {
                relations: ['productAdditional', "productAdditional.additional"]
            }
        );

        return response.json(productCategorieAdditionalView.render(productCategorieAdditional));
    },

    async create(request: Request, response: Response) {
        const {
            title,
            min,
            max,
            repeat,
            order,
            product
        } = request.body;

        const productCategoriesAdditionalRepository = getCustomRepository(ProductCategoriesAdditionalRepository);

        const data = {
            title,
            min,
            max,
            repeat,
            order,
            product
        };

        const schema = Yup.object().shape({
            title: Yup.string().notRequired(),
            min: Yup.number().required(),
            max: Yup.number().required(),
            repeat: Yup.boolean().notRequired(),
            order: Yup.number().required(),
            product: Yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const productCategorieAdditional = productCategoriesAdditionalRepository.create(data);

        await productCategoriesAdditionalRepository.save(productCategorieAdditional);

        return response.status(201).json(productCategorieAdditional);
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            title,
            min,
            max,
            repeat,
            order,
            product
        } = request.body;

        const productCategoriesAdditionalRepository = getCustomRepository(ProductCategoriesAdditionalRepository);

        const data = {
            title,
            min,
            max,
            repeat,
            order,
            product
        };

        const schema = Yup.object().shape({
            title: Yup.string().notRequired(),
            min: Yup.number().required(),
            max: Yup.number().required(),
            repeat: Yup.boolean().notRequired(),
            order: Yup.number().required(),
            product: Yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const productCategorieAdditional = productCategoriesAdditionalRepository.create(data);

        await productCategoriesAdditionalRepository.update(id, productCategorieAdditional);

        return response.status(204).json(productCategorieAdditional);
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const productCategoriesAdditionalRepository = getCustomRepository(ProductCategoriesAdditionalRepository);

        await productCategoriesAdditionalRepository.delete(id);

        return response.status(204).send();
    }
}