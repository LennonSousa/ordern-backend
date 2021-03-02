import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import productView from '../views/productView';
import ProductsModel from '../models/ProductsModel';
import ProductAvailabelsModel from '../models/ProductAvailablesModel';

export default {
    async index(request: Request, response: Response) {
        const productsRepository = getRepository(ProductsModel);

        const products = await productsRepository.find({
            order: {
                order: "ASC"
            },
            relations: [
                'category',
                'values',
                'categoriesAdditional',
                'categoriesAdditional.productAdditional',
                'categoriesAdditional.productAdditional.additional',
                'categoriesAdditional.productAdditional.categoryAdditional',
                'availables'
            ]
        });

        return response.json(productView.renderMany(products));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const productsRepository = getRepository(ProductsModel);

        const product = await productsRepository.findOneOrFail(id, {
            relations: [
                'category',
                'values',
                'categoriesAdditional',
                'categoriesAdditional.productAdditional',
                'categoriesAdditional.productAdditional.additional',
                'categoriesAdditional.productAdditional.categoryAdditional',
                'availables'
            ]
        });

        return response.json(productView.render(product));
    },

    async create(request: Request, response: Response) {
        let {
            title,
            description,
            maiority,
            code,
            price_one,
            price,
            discount,
            discount_price,
            paused,
            order,
            available_all,
            on_request,
            category
        } = request.body;

        price = Number(price);
        discount_price = discount_price && Number(discount_price);
        category = Number(category);

        if (price_one)
            price_one = Yup.boolean().cast(price_one);

        if (discount)
            discount = Yup.boolean().cast(discount);

        if (paused)
            paused = Yup.boolean().cast(paused);

        if (available_all)
            available_all = Yup.boolean().cast(available_all);

        if (on_request)
            on_request = Yup.boolean().cast(on_request);

        const productsRepository = getRepository(ProductsModel);

        if (request.file) {
            const requestImages = request.file as Express.Multer.File;

            const image = requestImages;

            const data = {
                title,
                description,
                image: image.filename,
                maiority,
                code,
                price_one,
                price,
                discount,
                discount_price,
                paused,
                order,
                available_all,
                on_request,
                category
            };

            const schema = Yup.object().shape({
                title: Yup.string().required(),
                description: Yup.string().notRequired(),
                image: Yup.string().notRequired(),
                maiority: Yup.boolean().required(),
                code: Yup.string().notRequired(),
                price_one: Yup.boolean().required(),
                price: Yup.number().required(),
                paused: Yup.boolean().notRequired(),
                discount: Yup.boolean().notRequired(),
                discount_price: Yup.number().notRequired(),
                order: Yup.number().required(),
                available_all: Yup.boolean().notRequired(),
                on_request: Yup.boolean().notRequired(),
                category: Yup.number().required()
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const product = productsRepository.create(data);

            await productsRepository.save(product);

            const productAvailabelsRepository = getRepository(ProductAvailabelsModel);

            for (let x = 0; x < 7; x++) {
                const productAvailable = productAvailabelsRepository.create({
                    week_day: x,
                    product: product
                });

                await productAvailabelsRepository.save(productAvailable);
            }

            return response.status(201).json(product.id);
        }
        else {
            const data = {
                title,
                description,
                maiority,
                code,
                price_one,
                price,
                discount,
                discount_price,
                paused,
                order,
                available_all,
                on_request,
                category
            };

            const schema = Yup.object().shape({
                title: Yup.string().required(),
                description: Yup.string().notRequired(),
                image: Yup.string().notRequired(),
                maiority: Yup.boolean().required(),
                code: Yup.string().notRequired(),
                price_one: Yup.boolean().required(),
                price: Yup.number().required(),
                paused: Yup.boolean().notRequired(),
                discount: Yup.boolean().notRequired(),
                discount_price: Yup.number().notRequired(),
                order: Yup.number().required(),
                available_all: Yup.boolean().notRequired(),
                on_request: Yup.boolean().notRequired(),
                category: Yup.number().required()
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const product = productsRepository.create(data);

            await productsRepository.save(product);

            const productAvailabelsRepository = getRepository(ProductAvailabelsModel);

            for (let x = 0; x < 7; x++) {
                const productAvailable = productAvailabelsRepository.create({
                    week_day: x,
                    product: product
                });

                await productAvailabelsRepository.save(productAvailable);
            }

            return response.status(201).json(productView.render(product));
        }
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        let {
            title,
            description,
            maiority,
            code,
            price_one,
            price,
            discount,
            discount_price,
            paused,
            order,
            available_all,
            on_request,
            category
        } = request.body;

        price = Number(price);
        discount_price = discount_price && Number(discount_price);
        category = Number(category);

        if (price_one)
            price_one = Yup.boolean().cast(price_one);

        if (discount)
            discount = Yup.boolean().cast(discount);

        if (paused)
            paused = Yup.boolean().cast(paused);

        if (available_all)
            available_all = Yup.boolean().cast(available_all);

        if (on_request)
            on_request = Yup.boolean().cast(on_request);

        const productsRepository = getRepository(ProductsModel);

        if (request.file) {
            const requestImages = request.file as Express.Multer.File;

            const image = requestImages;

            const data = {
                title,
                description,
                image: image.filename,
                maiority,
                code,
                price_one,
                price,
                discount,
                discount_price,
                paused,
                order,
                available_all,
                on_request,
                category
            };

            const schema = Yup.object().shape({
                title: Yup.string().required(),
                description: Yup.string().notRequired(),
                image: Yup.string().notRequired(),
                maiority: Yup.boolean().required(),
                code: Yup.string().notRequired(),
                price_one: Yup.boolean().required(),
                price: Yup.number().required(),
                paused: Yup.boolean().notRequired(),
                discount: Yup.boolean().notRequired(),
                discount_price: Yup.number().notRequired(),
                order: Yup.number().required(),
                available_all: Yup.boolean().notRequired(),
                on_request: Yup.boolean().notRequired(),
                category: Yup.number().required()
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const product = productsRepository.create(data);

            await productsRepository.update(id, product);

            return response.status(204).json(product);
        }
        else {
            const data = {
                title,
                description,
                maiority,
                code,
                price_one,
                price,
                discount,
                discount_price,
                paused,
                order,
                available_all,
                on_request,
                category
            };

            const schema = Yup.object().shape({
                title: Yup.string().required(),
                description: Yup.string().notRequired(),
                image: Yup.string().notRequired(),
                maiority: Yup.boolean().required(),
                code: Yup.string().notRequired(),
                price_one: Yup.boolean().required(),
                price: Yup.number().required(),
                paused: Yup.boolean().notRequired(),
                discount: Yup.boolean().notRequired(),
                discount_price: Yup.number().notRequired(),
                order: Yup.number().required(),
                available_all: Yup.boolean().notRequired(),
                on_request: Yup.boolean().notRequired(),
                category: Yup.number().required()
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const product = productsRepository.create(data);

            await productsRepository.update(id, product);

            return response.status(204).json(product);
        }
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const productsRepository = getRepository(ProductsModel);

        await productsRepository.delete(id);

        return response.status(204).send();
    }
}