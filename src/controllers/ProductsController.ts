import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import productView from '../views/productView';
import ProductsModel from '../models/ProductsModel';

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

        product.image = product.image ? `http://${request.headers.host}/uploads/${product.image}` : product.image;

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
            category
        } = request.body;

        maiority = maiority === 'true' ? true : false;
        price_one = price_one === 'true' ? true : false;
        discount = discount === 'true' ? true : false;
        available_all = available_all === 'true' ? true : false;
        price = Number(price);
        discount_price = discount_price && Number(discount_price);

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
                discount: Yup.boolean().notRequired(),
                discount_price: Yup.number().notRequired(),
                paused: Yup.boolean().notRequired(),
                order: Yup.number().required(),
                available_all: Yup.boolean().notRequired(),
                category: Yup.number().required()
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const product = productsRepository.create(data);

            await productsRepository.save(product);

            return response.status(201).json(productView.render(product));
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
                discount: Yup.boolean().notRequired(),
                discount_price: Yup.number().notRequired(),
                paused: Yup.boolean().notRequired(),
                order: Yup.number().required(),
                available_all: Yup.boolean().notRequired(),
                category: Yup.number().required()
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const product = productsRepository.create(data);

            await productsRepository.save(product);

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
            category
        } = request.body;

        maiority = maiority === 'true' ? true : false;
        price_one = price_one === 'true' ? true : false;
        discount = discount === 'true' ? true : false;
        available_all = available_all === 'true' ? true : false;
        price = Number(price);
        discount_price = discount_price && Number(discount_price);

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
                discount: Yup.boolean().notRequired(),
                discount_price: Yup.number().notRequired(),
                paused: Yup.boolean().notRequired(),
                order: Yup.number().required(),
                available_all: Yup.boolean().notRequired(),
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