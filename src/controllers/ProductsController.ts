import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import productView from '../views/productView';
import { ProductsRepository } from '../repositories/ProductsRepository';
import { ProductImagesRepository } from '../repositories/ProductImagesRepository';
import ProductAvailabelsController from './ProductAvailablesController';

export default {
    async index(request: Request, response: Response) {
        const productsRepository = getCustomRepository(ProductsRepository);

        const products = await productsRepository.find({
            order: {
                order: "ASC"
            },
            relations: [
                'category',
                'images',
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

        const productsRepository = getCustomRepository(ProductsRepository);

        const product = await productsRepository.findOneOrFail(id, {
            relations: [
                'category',
                'images',
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

        const productsRepository = getCustomRepository(ProductsRepository);

        if (request.files) {
            const requestImages = request.files as Express.Multer.File[];

            const images = requestImages.map(image => {
                return { path: image.filename }
            });

            const data = {
                title,
                description,
                images,
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
                category,
                availables: ProductAvailabelsController.generate(),
            };

            const schema = Yup.object().shape({
                title: Yup.string().required(),
                description: Yup.string().notRequired(),
                images: Yup.array(
                    Yup.object().shape({
                        path: Yup.string().required(),
                    })
                ).notRequired(),
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
                category: Yup.string().required(),
                availables: Yup.array(
                    Yup.object().shape({
                        week_day: Yup.number().required(),
                    })
                ).required(),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const product = productsRepository.create(data);

            await productsRepository.save(product);

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
                category,
                availables: ProductAvailabelsController.generate(),
            };

            const schema = Yup.object().shape({
                title: Yup.string().required(),
                description: Yup.string().notRequired(),
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
                category: Yup.number().required(),
                availables: Yup.array(
                    Yup.object().shape({
                        week_day: Yup.number().required(),
                    })
                ).required(),
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
            on_request,
            category,
        } = request.body;

        price = Number(price);
        discount_price = discount_price && Number(discount_price);

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

        const productsRepository = getCustomRepository(ProductsRepository);

        if (request.files) {
            const requestImages = request.files as Express.Multer.File[];
            
            const images = requestImages.map(image => {
                return { path: image.filename }
            });

            const productImagesRepository = getCustomRepository(ProductImagesRepository);

            const productImage = await productImagesRepository.findOne();

            if (productImage) {
                const image = productImagesRepository.create({ path: images[0].path });

                await productImagesRepository.update(productImage.id, image);
            }

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
                category,
            };

            const schema = Yup.object().shape({
                title: Yup.string().required(),
                description: Yup.string().notRequired(),
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
                category: Yup.string().required(),
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
                category,
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
                category: Yup.string().required(),
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

        const productsRepository = getCustomRepository(ProductsRepository);

        await productsRepository.delete(id);

        return response.status(204).json();
    }
}