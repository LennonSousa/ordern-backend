import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import creditBrandView from '../views/creditBrandView';
import CreditBrandsModel from '../models/CreditBrandsModel';

export default {
    async index(request: Request, response: Response) {
        const creditBrandsRepository = getRepository(CreditBrandsModel);

        const creditBrands = await creditBrandsRepository.find();

        return response.json(creditBrandView.renderMany(creditBrands));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const creditBrandsRepository = getRepository(CreditBrandsModel);

        const creditBrand = await creditBrandsRepository.findOneOrFail(id);

        return response.json(creditBrandView.render(creditBrand));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            code
        } = request.body;

        const creditBrandsRepository = getRepository(CreditBrandsModel);

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

        const creditBrand = creditBrandsRepository.create(data);

        await creditBrandsRepository.save(creditBrand);

        return response.status(201).json(creditBrand);
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            name,
            code
        } = request.body;

        const creditBrandsRepository = getRepository(CreditBrandsModel);

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

        const creditBrand = creditBrandsRepository.create(data);

        await creditBrandsRepository.update(id, creditBrand);

        return response.status(204).json(creditBrand);
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const creditBrandsRepository = getRepository(CreditBrandsModel);

        await creditBrandsRepository.delete(id);

        return response.status(204).send();
    }
}