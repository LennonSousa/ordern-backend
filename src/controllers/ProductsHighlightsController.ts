require('dotenv/config');
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import productHighlightView from '../views/productHighlightView';
import ProductsHighlightsModel from '../models/ProductsHighlightsModel';

export default {
    async index(request: Request, response: Response) {
        const productsHighlightsRepository = getRepository(ProductsHighlightsModel);

        const productsHighlights = await productsHighlightsRepository.find({
            relations: [
                'product',
                'product.values',
                'product.availables'
            ]
        });

        const productsHighlightsUpdated = productsHighlights.map(highlight => {
            return {
                ...highlight, product: {
                    ...highlight.product, image: highlight.product.image ? `${process.env.HOST_API}/uploads/${highlight.product.image}` : highlight.product.image
                }
            };
        });

        return response.json(productHighlightView.renderMany(productsHighlightsUpdated));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const productsHighlightsRepository = getRepository(ProductsHighlightsModel);

        const productHighlight = await productsHighlightsRepository.findOneOrFail(id, {
            relations: [
                'product',
                'product.values',
                'product.availables'
            ]
        });

        return response.json(productHighlightView.render(productHighlight));
    },

    async create(request: Request, response: Response) {
        const {
            active,
            product
        } = request.body;

        const productsHighlightsRepository = getRepository(ProductsHighlightsModel);

        const data = {
            active,
            product
        };

        const schema = Yup.object().shape({
            active: Yup.boolean().notRequired(),
            product: Yup.number().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const productsHighlights = productsHighlightsRepository.create(data);

        await productsHighlightsRepository.save(productsHighlights);

        return response.status(201).json(productsHighlights);
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            active,
            product
        } = request.body;

        const productsHighlightsRepository = getRepository(ProductsHighlightsModel);

        const data = {
            active,
            product
        };

        const schema = Yup.object().shape({
            active: Yup.boolean().notRequired(),
            product: Yup.number().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const productsHighlight = productsHighlightsRepository.create(data);

        await productsHighlightsRepository.update(id, productsHighlight);

        return response.status(204).json(productsHighlight);
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const productsHighlightsRepository = getRepository(ProductsHighlightsModel);

        await productsHighlightsRepository.delete(id);

        return response.status(204).send();
    }
}