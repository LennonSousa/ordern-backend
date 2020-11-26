import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import RestaurantsModel from '../models/RestaurantsModel';

export default {
    async update(request: Request, response: Response) {
        const { id } = request.params;

        console.log(request.file);

        const cover = request.file as Express.Multer.File ;

        const restaurantsRepository = getRepository(RestaurantsModel);

        const data = {
            cover: cover.filename
        };

        const schema = Yup.object().shape({
            cover: Yup.string().notRequired()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const restaurant = restaurantsRepository.create(data);

        await restaurantsRepository.update(id, restaurant);

        return response.status(204).json(restaurant);
    }
}