import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import { ProductAvailablesRepository } from '../repositories/ProductAvailablesRepository';
import ProductAvailablesModel from '../models/ProductAvailablesModel';

export default {
    generate() {
        const productAvailablesRepository = getCustomRepository(ProductAvailablesRepository);
        const productAvailables: ProductAvailablesModel[] = [];

        for(let x = 0; x < 7; x++){
            const data = {
                week_day: x,
            }

            productAvailables.push(productAvailablesRepository.create(data));
        }

        return productAvailables;
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            week_day,
            available,
            all_day,
            shift_01,
            shift_01_from,
            shift_01_to,
            shift_02,
            shift_02_from,
            shift_02_to,
            product
        } = request.body;

        const productAvailablessRepository = getCustomRepository(ProductAvailablesRepository);

        const data = {
            week_day,
            available,
            all_day,
            shift_01,
            shift_01_from,
            shift_01_to,
            shift_02,
            shift_02_from,
            shift_02_to,
            product
        };

        const schema = Yup.object().shape({
            week_day: Yup.number().notRequired(),
            available: Yup.boolean().notRequired(),
            all_day: Yup.boolean().required(),
            shift_01: Yup.boolean().required(),
            shift_01_from: Yup.number().notRequired(),
            shift_01_to: Yup.number().notRequired(),
            shift_02: Yup.boolean().required(),
            shift_02_from: Yup.number().notRequired(),
            shift_02_to: Yup.number().notRequired(),
            product: Yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const productAvailable = productAvailablessRepository.create(data);

        await productAvailablessRepository.update(id, productAvailable);

        return response.status(204).json(productAvailable);
    }
}