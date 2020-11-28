import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import dayScheduleView from '../views/categoryView';
import CategoriesModel from '../models/CategoriesModel';

export default {
    async index(request: Request, response: Response) {
        const categoriesRepository = getRepository(CategoriesModel);

        const categories = await categoriesRepository.find({
            order: {
                order: "ASC"
            },
            relations: [
                'products',
                'products.category',
                'products.values',
                'products.categoriesAdditional',
                'products.categoriesAdditional.productAdditional',
                'products.categoriesAdditional.productAdditional.additional',
                'products.categoriesAdditional.productAdditional.categoryAdditional',
                'products.availables'
            ]
        });

        const categoriesSorted = categories.map(category => {
            const productsUpdated = category.products.map(product => {
                const productUpdated = { ...product, image: product.image ? `http://${request.headers.host}/uploads/${product.image}` : product.image };

                const productCategoriesAdditional = productUpdated.categoriesAdditional.map(categoryAdditional => {
                    // Sorting additionals
                    categoryAdditional.productAdditional.sort((a, b) => a.order - b.order);

                    return categoryAdditional;
                });

                // Sorting categories additional
                productCategoriesAdditional.sort((a, b) => a.order - b.order);

                return { ...productUpdated, categoriesAdditional: productCategoriesAdditional };
            });

            // Sorting products
            productsUpdated.sort((a, b) => a.order - b.order);

            return { ...category, products: productsUpdated };
        })

        return response.json(dayScheduleView.renderMany(categoriesSorted));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const categoriesRepository = getRepository(CategoriesModel);

        const category = await categoriesRepository.findOneOrFail(id, {
            relations: ['products', 'products.category']
        });

        return response.json(dayScheduleView.render(category));
    },

    async create(request: Request, response: Response) {
        const {
            title,
            paused,
            order
        } = request.body;

        const categoriesRepository = getRepository(CategoriesModel);

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

        const categoriesRepository = getRepository(CategoriesModel);

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

        const categoriesRepository = getRepository(CategoriesModel);

        await categoriesRepository.delete(id);

        return response.status(204).send();
    }
}