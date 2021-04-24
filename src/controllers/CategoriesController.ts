require('dotenv/config');
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import categoryView from '../views/categoryView';
import { CategoriesRepository } from '../repositories/CategoriesRepository';

export default {
    async index(request: Request, response: Response) {
        const categoriesRepository = getCustomRepository(CategoriesRepository);

        const categories = await categoriesRepository.find({
            order: {
                order: "ASC"
            },
            relations: [
                'products',
                'products.images',
                'products.category',
                'products.values',
                'products.categoriesAdditional',
                'products.categoriesAdditional.productAdditional',
                'products.categoriesAdditional.productAdditional.additional',
                'products.categoriesAdditional.productAdditional.categoryAdditional',
                'products.availables'
            ]
        });

        return response.json(categoryView.renderMany(categories));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const categoriesRepository = getCustomRepository(CategoriesRepository);

        const category = await categoriesRepository.findOneOrFail(id, {
            relations: [
                'products',
                'products.images',
                'products.category',
                'products.values',
                'products.categoriesAdditional',
                'products.categoriesAdditional.productAdditional',
                'products.categoriesAdditional.productAdditional.additional',
                'products.categoriesAdditional.productAdditional.categoryAdditional',
                'products.availables'
            ]
        });

        return response.json(categoryView.render(category));
    },

    async create(request: Request, response: Response) {
        const {
            title,
            paused,
            order,
            store
        } = request.body;

        const categoriesRepository = getCustomRepository(CategoriesRepository);

        const data = {
            title,
            paused,
            order,
            store
        };

        const schema = Yup.object().shape({
            title: Yup.string().required(),
            paused: Yup.boolean().required(),
            order: Yup.number().required(),
            store: Yup.string().required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const category = categoriesRepository.create(data);

        await categoriesRepository.save(category);

        return response.status(201).json(category);
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            title,
            paused,
            order
        } = request.body;

        const categoriesRepository = getCustomRepository(CategoriesRepository);

        const data = {
            title,
            paused,
            order
        };

        const schema = Yup.object().shape({
            title: Yup.string().required(),
            paused: Yup.boolean().required(),
            order: Yup.number().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const category = categoriesRepository.create(data);

        await categoriesRepository.update(id, category);

        return response.status(204).json(category);
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const categoriesRepository = getCustomRepository(CategoriesRepository);

        await categoriesRepository.delete(id);

        return response.status(204).send();
    }
}