import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import debitBrandView from '../views/debitBrandView';
import DebitBrandsModel from '../models/DebitBrandsModel';

export default {
    async index(request: Request, response: Response) {
        const debitBrandsRepository = getRepository(DebitBrandsModel);

        const debitBrands = await debitBrandsRepository.find();

        return response.json(debitBrandView.renderMany(debitBrands));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const debitBrandsRepository = getRepository(DebitBrandsModel);

        const debitBrand = await debitBrandsRepository.findOneOrFail(id);

        return response.json(debitBrandView.render(debitBrand));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            code
        } = request.body;

        const debitBrandsRepository = getRepository(DebitBrandsModel);

        const data = {
            name,
            code
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            code: Yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const debitBrand = debitBrandsRepository.create(data);

        await debitBrandsRepository.save(debitBrand);

        return response.status(201).json(debitBrand);
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            name,
            code
        } = request.body;

        const debitBrandsRepository = getRepository(DebitBrandsModel);

        const data = {
            name,
            code
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            code: Yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const debitBrand = debitBrandsRepository.create(data);

        await debitBrandsRepository.update(id, debitBrand);

        return response.status(204).json(debitBrand);
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const debitBrandsRepository = getRepository(DebitBrandsModel);

        await debitBrandsRepository.delete(id);

        return response.status(204).send();
    }
}