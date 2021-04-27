import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import { StoresRepository } from '../repositories/StoresRepository';
import { StoreNewRepository } from '../repositories/StoreNewRepository';

import storeView from '../views/storeView';
import storeCustomerView from '../views/customers/storeView';
import UserTypesController from './UserTypesController';
import OpenedDaysController from './OpenedDaysController';
import StoreShipmentsController from './StoreShipmentsController';
import StorePaymentsDeliveryController from './StorePaymentsDeliveryController';
import OrderStatusController from './OrderStatusController';
import OpenedStoreController from './OpenedStoreController';
import StorePaymentStripeController from './StorePaymentStripeController';

export default {
    async index(request: Request, response: Response) {
        const restaurantsRepository = getCustomRepository(StoresRepository);

        const store = await restaurantsRepository.find();

        if (store.length > 0) return response.json(storeView.render(store[0]));

        return response.status(400).json({ error: 'Cannot find store!' });
    },

    async show(request: Request, response: Response) {
        const storeRepository = getCustomRepository(StoresRepository);

        const stores = await storeRepository.find({
            relations: [
                'openedDays',
                'openedDays.daySchedules',
                'orderStatus',
                'categories',
                'categories.products',
                'categories.products.category',
                'categories.products.images',
                'categories.products.values',
                'categories.products.categoriesAdditional',
                'categories.products.categoriesAdditional.productAdditional',
                'categories.products.categoriesAdditional.productAdditional.additional',
                'categories.products.categoriesAdditional.productAdditional.categoryAdditional',
                'categories.products.availables',
                'productsHighlights',
                'productsHighlights.product',
            ]
        });

        if (stores.length > 0) {
            const store = stores[0];

            const isOpened = await OpenedStoreController.isOpenedStore(store.openedDays);

            return response.status(200).json({ ...storeCustomerView.render(store), opened: isOpened });
        }

        return response.status(400).json({ error: 'Cannot find store!' });
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
            complement,
            city,
            state,
            latitude,
            longitude,
            free_shipping,
            highlights,
            highlights_title
        } = request.body;

        const storeNewRepository = getCustomRepository(StoreNewRepository);
        const storeNews = await storeNewRepository.find();
        if (storeNews.length < 1) return response.status(404).json();

        const storesRepository = getCustomRepository(StoresRepository);
        const store = await storesRepository.find();
        if (store.length > 0) return response.status(404).json();

        const requestImages = request.files as { [fieldname: string]: Express.Multer.File[] };

        const { cover, avatar } = requestImages;

        const data = {
            title,
            phone,
            description,
            min_order: Number(min_order),
            cover: cover[0].filename,
            avatar: avatar[0].filename,
            zip_code,
            street,
            number,
            group,
            complement,
            city,
            state,
            latitude,
            longitude,
            free_shipping,
            highlights,
            highlights_title,
            userTypes: UserTypesController.generate(),
            openedDays: OpenedDaysController.generate(),
            shipments: StoreShipmentsController.generate(),
            paymentsDelivery: StorePaymentsDeliveryController.generate(),
            orderStatus: OrderStatusController.generate(),
        };

        const schema = Yup.object().shape({
            title: Yup.string().required(),
            phone: Yup.string().notRequired(),
            description: Yup.string().notRequired().max(255),
            min_order: Yup.number().required(),
            cover: Yup.string().notRequired(),
            avatar: Yup.string().notRequired(),
            zip_code: Yup.string().required(),
            street: Yup.string().required(),
            number: Yup.string().required(),
            group: Yup.string().required(),
            complement: Yup.string().notRequired(),
            city: Yup.string().required(),
            state: Yup.string().required(),
            latitude: Yup.string().required(),
            longitude: Yup.string().required(),
            free_shipping: Yup.number().notRequired(),
            highlights: Yup.boolean().notRequired(),
            highlights_title: Yup.string().notRequired(),
            userTypes: Yup.array(
                Yup.object().shape({
                    type: Yup.string().required(),
                    description: Yup.string().required(),
                    code: Yup.string().required(),
                })
            ).required(),
            openedDays: Yup.array(
                Yup.object().shape({
                    week_day: Yup.number().required(),
                })
            ).required(),
            shipments: Yup.array(
                Yup.object().shape({
                    name: Yup.string().required(),
                    code: Yup.string().required(),
                })
            ).required(),
            paymentsDelivery: Yup.array(
                Yup.object().shape({
                    name: Yup.string().required(),
                    code: Yup.string().required(),
                })
            ).required(),
            orderStatus: Yup.array(
                Yup.object().shape({
                    title: Yup.string().required(),
                    description: Yup.string().required(),
                    order: Yup.number().required(),
                })
            ).required(),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const restaurant = storesRepository.create(data);

        await storesRepository.save(restaurant);

        await StorePaymentStripeController.generate();

        // Deleting a new store tokens.
        storeNews.forEach(async storeNew => {
            await storeNewRepository.delete(storeNew.id);
        });

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
            complement,
            city,
            state,
            latitude,
            longitude,
            free_shipping,
            highlights,
            highlights_title
        } = request.body;

        const restaurantsRepository = getCustomRepository(StoresRepository);

        const data = {
            title,
            phone,
            description,
            min_order,
            zip_code,
            street,
            number,
            group,
            complement,
            city,
            state,
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
            complement: Yup.string().notRequired(),
            city: Yup.string().required(),
            state: Yup.string().required(),
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
    }
}