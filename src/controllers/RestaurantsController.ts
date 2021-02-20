import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import restaurantView from '../views/restaurantView';
import RestaurantsModel from '../models/RestaurantsModel';
import OpenedDaysModel from '../models/OpenedDaysModel';
import DaySchedules from '../models/DaySchedulesModel';

export default {
    async index(request: Request, response: Response) {
        const restaurantsRepository = getRepository(RestaurantsModel);

        const restaurants = await restaurantsRepository.find();

        return response.json(restaurantView.renderMany(restaurants));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const restaurantsRepository = getRepository(RestaurantsModel);

        const restaurant = await restaurantsRepository.findOneOrFail(id);

        return response.json(restaurantView.render(restaurant));
    },

    async create(request: Request, response: Response) {
        const {
            title,
            phone,
            description,
            min_order,
            zip_code,
            street,
            number,
            group,
            city,
            country,
            latitude,
            longitude,
            free_shipping,
            highlights,
            highlights_title
        } = request.body;

        const restaurantsRepository = getRepository(RestaurantsModel);

        const requestImages = request.files as { [fieldname: string]: Express.Multer.File[] };

        const { cover, avatar } = requestImages;

        const data = {
            title,
            phone,
            description,
            min_order,
            cover: cover[0].filename,
            avatar: avatar[0].filename,
            zip_code,
            street,
            number,
            group,
            city,
            country,
            latitude,
            longitude,
            free_shipping,
            highlights,
            highlights_title
        };

        const schema = Yup.object().shape({
            title: Yup.string().required(),
            phone: Yup.string().notRequired(),
            description: Yup.string().notRequired().max(300),
            min_order: Yup.number().required(),
            cover: Yup.string().notRequired(),
            avatar: Yup.string().notRequired(),
            zip_code: Yup.string().required(),
            street: Yup.string().required(),
            number: Yup.string().required(),
            group: Yup.string().required(),
            city: Yup.string().required(),
            country: Yup.string().required(),
            latitude: Yup.string().required(),
            longitude: Yup.string().required(),
            free_shipping: Yup.number().required(),
            highlights: Yup.boolean().notRequired(),
            highlights_title: Yup.string().notRequired()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const restaurant = restaurantsRepository.create(data);

        await restaurantsRepository.save(restaurant);

        const openedDaysRepository = getRepository(OpenedDaysModel);
        const daySchedulesRepository = getRepository(DaySchedules);

        // Creating seven days default.
        for (let x = 0; x < 7; x++) {
            const openedDay = openedDaysRepository.create({
                week_day: x
            });

            await openedDaysRepository.save(openedDay);

            // Creating for each ond day a schedule default.
            const daySchedule = daySchedulesRepository.create({ weedDay: openedDay })

            await daySchedulesRepository.save(daySchedule);
        }

        return response.status(201).json(restaurant);
    },

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const {
            title,
            phone,
            description,
            min_order,
            zip_code,
            street,
            number,
            group,
            city,
            country,
            latitude,
            longitude,
            free_shipping,
            highlights,
            highlights_title
        } = request.body;

        const restaurantsRepository = getRepository(RestaurantsModel);

        const data = {
            title,
            phone,
            description,
            min_order,
            zip_code,
            street,
            number,
            group,
            city,
            country,
            latitude,
            longitude,
            free_shipping,
            highlights,
            highlights_title
        };

        const schema = Yup.object().shape({
            title: Yup.string().required(),
            phone: Yup.string().notRequired(),
            description: Yup.string().notRequired().max(300),
            min_order: Yup.number().required(),
            zip_code: Yup.string().required(),
            street: Yup.string().required(),
            number: Yup.string().required(),
            group: Yup.string().required(),
            city: Yup.string().required(),
            country: Yup.string().required(),
            latitude: Yup.string().required(),
            longitude: Yup.string().required(),
            free_shipping: Yup.number().required(),
            highlights: Yup.boolean().notRequired(),
            highlights_title: Yup.string().notRequired()
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const restaurant = restaurantsRepository.create(data);

        await restaurantsRepository.update(id, restaurant);

        return response.status(204).json(restaurant);
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const restaurantsRepository = getRepository(RestaurantsModel);

        await restaurantsRepository.delete(id);

        return response.status(204).send();
    }
}