import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import productCategorieAdditionalView from '../views/productCategorieAdditionalView';
import ProductCategoriesAdditionalModel from '../models/ProductCategoriesAdditionalModel';

export default {
    async index(request: Request, response: Response) {
        const productCategoriesAdditionalRepository = getRepository(ProductCategoriesAdditionalModel);

        const productCategoriesAdditional = await productCategoriesAdditionalRepository.find({
            relations: ['productAdditional']
        });

        return response.json(productCategorieAdditionalView.renderMany(productCategoriesAdditional));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const productCategoriesAdditionalRepository = getRepository(ProductCategoriesAdditionalModel);

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
            order,
            product
        } = request.body;

        const productCategoriesAdditionalRepository = getRepository(ProductCategoriesAdditionalModel);

        const data = {
            title,
            min,
            max,
            order,
            product
        };

        const schema = Yup.object().shape({
            title: Yup.string().notRequired(),
            min: Yup.number().required(),
            max: Yup.number().required(),
            order: Yup.number().required(),
            product: Yup.number().required()
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
            order,
            product
        } = request.body;

        const productCategoriesAdditionalRepository = getRepository(ProductCategoriesAdditionalModel);

        const data = {
            title,
            min,
            max,
            order,
            product
        };

        const schema = Yup.object().shape({
            title: Yup.string().notRequired(),
            min: Yup.number().required(),
            max: Yup.number().required(),
            order: Yup.number().required(),
            product: Yup.number().required()
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

        const productCategoriesAdditionalRepository = getRepository(ProductCategoriesAdditionalModel);

        await productCategoriesAdditionalRepository.delete(id);

        return response.status(204).send();
    }
}