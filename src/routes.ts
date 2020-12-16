import express from 'express';
import multer from 'multer';

import authMiddleware from '../src/middlewares/auth';
import uploadConfig from './config/upload';

import RestaurantsController from './controllers/RestaurantsController';
import RestaurantsCoverController from './controllers/RestaurantsCoverController';
import RestaurantsAvatarController from './controllers/RestaurantsAvatarController';
import UsersAuthenticationsController from './controllers/UsersAuthenticationController';
import UserTypesController from './controllers/UserTypesController';
import UsersController from './controllers/UsersController';
import OpenedDaysController from './controllers/OpenedDaysController';
import DaySchedulesController from './controllers/DaySchedulesController';
import CategoriesController from './controllers/CategoriesController';
import AdditionalsController from './controllers/AdditionalsController';
import ProductsController from './controllers/ProductsController';
import ProductValuesController from './controllers/ProductValuesController';
import ProductCategoriesAdditionalController from './controllers/ProductCategoriesAdditionalController';
import ProductAdditionalsController from './controllers/ProductAdditionalsController';
import ProductAvailablesController from './controllers/ProductAvailablesController';
import OrderStatus from './controllers/OrderStatusController';
import Orders from './controllers/OrdersController';
import NewCustomersAuthenticationController from './controllers/NewCustomerAuthentication';
import ClientsAuthenticationsController from './controllers/ClientsAuthenticationController';
import Clients from './controllers/ClientsController';

const routes = express.Router();
const upload = multer(uploadConfig);

routes.use(authMiddleware);

routes.get('/restaurants', RestaurantsController.index);
routes.get('/restaurants/:id', RestaurantsController.show);
routes.post('/restaurants', upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'avatar', maxCount: 1 }]), RestaurantsController.create);
routes.put('/restaurants/:id', RestaurantsController.update);
routes.delete('/restaurants/:id', RestaurantsController.delete);

routes.put('/restaurant/cover/:id', upload.single('cover'), RestaurantsCoverController.update);
routes.put('/restaurant/avatar/:id', upload.single('avatar'), RestaurantsAvatarController.update);

routes.get('/user/types', UserTypesController.index);
routes.get('/user/types/:id', UserTypesController.show);
routes.post('/user/types', UserTypesController.create);

routes.post('/users/authenticate', UsersAuthenticationsController.create);

routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);
routes.post('/users', UsersController.create);
routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.delete);

routes.get('/restaurant/opened-days', OpenedDaysController.index);
routes.get('/restaurant/opened-days/:id', OpenedDaysController.show);
routes.post('/restaurant/opened-days', OpenedDaysController.create);
routes.put('/restaurant/opened-days/:id', OpenedDaysController.update);
routes.delete('/restaurant/opened-days/:id', OpenedDaysController.delete);

routes.get('/restaurant/opened-day/schedules', DaySchedulesController.index);
routes.get('/restaurant/opened-day/schedules/:id', DaySchedulesController.show);
routes.post('/restaurant/opened-day/schedules', DaySchedulesController.create);
routes.put('/restaurant/opened-day/schedules/:id', DaySchedulesController.update);
routes.delete('/restaurant/opened-day/schedules/:id', DaySchedulesController.delete);

routes.get('/categories', CategoriesController.index);
routes.get('/categories/:id', CategoriesController.show);
routes.post('/categories', CategoriesController.create);
routes.put('/categories/:id', CategoriesController.update);
routes.delete('/categories/:id', CategoriesController.delete);

routes.get('/additionals', AdditionalsController.index);
routes.get('/additionals/:id', AdditionalsController.show);
routes.post('/additionals', AdditionalsController.create);
routes.put('/additionals/:id', AdditionalsController.update);
routes.delete('/additionals/:id', AdditionalsController.delete);

routes.get('/products', ProductsController.index);
routes.get('/products/:id', ProductsController.show);
routes.post('/products', upload.single('image'), ProductsController.create);
routes.put('/products/:id', upload.single('image'), ProductsController.update);
routes.delete('/products/:id', ProductsController.delete);

routes.get('/product/values', ProductValuesController.index);
routes.get('/product/values/:id', ProductValuesController.show);
routes.post('/product/values', ProductValuesController.create);
routes.put('/product/values/:id', ProductValuesController.update);
routes.delete('/product/values/:id', ProductValuesController.delete);

routes.get('/product/categories', ProductCategoriesAdditionalController.index);
routes.get('/product/categories/:id', ProductCategoriesAdditionalController.show);
routes.post('/product/categories', ProductCategoriesAdditionalController.create);
routes.put('/product/categories/:id', ProductCategoriesAdditionalController.update);
routes.delete('/product/categories/:id', ProductCategoriesAdditionalController.delete);

routes.get('/product/additionals', ProductAdditionalsController.index);
routes.get('/product/additionals/:id', ProductAdditionalsController.show);
routes.post('/product/additionals', ProductAdditionalsController.create);
routes.put('/product/additionals/:id', ProductAdditionalsController.update);
routes.delete('/product/additionals/:id', ProductAdditionalsController.delete);

routes.put('/product/availables/:id', ProductAvailablesController.update);

routes.get('/order-status', OrderStatus.index);

routes.get('/orders', Orders.index);
routes.get('/orders/:id', Orders.show);
routes.post('/orders', Orders.create);
routes.put('/orders/:id', Orders.update);
routes.delete('/orders/:id', Orders.delete);

routes.post('/customer/new', NewCustomersAuthenticationController.create);
routes.put('/customer/new', NewCustomersAuthenticationController.update);

routes.post('/clients/authenticate', ClientsAuthenticationsController.create);

routes.get('/clients', Clients.index);
routes.get('/clients/:id', Clients.show);
routes.post('/clients', Clients.create);
routes.put('/clients/:id', Clients.update);
routes.delete('/clients/:id', Clients.delete);

export default routes;