import express from 'express';
import multer from 'multer';

import authMiddleware from '../src/middlewares/auth';
import uploadConfig from './config/upload';

import RestaurantsController from './controllers/RestaurantsController';
import RestaurantsCoverController from './controllers/RestaurantsCoverController';
import RestaurantsAvatarController from './controllers/RestaurantsAvatarController';
import RestaurantDeliveryGroupsController from './controllers/RestaurantDeliveryGroupsController';
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
import OrderStatusController from './controllers/OrderStatusController';
import OrdersController from './controllers/OrdersController';
import CustomerNewAuthenticationController from './controllers/CustomerNewAuthentication';
import CustomerResetAuthenticationController from './controllers/CustomerResetAuthentication';
import CustomerPasswordController from './controllers/CustomerPasswordController';
import ClientsAuthenticationsController from './controllers/CustomersAuthenticationController';
import CustomersController from './controllers/CustomersController';
import CustomerAddressController from './controllers/CustomerAddressController';
import CustomerPaymentsController from './controllers/CustomerPaymentsController';
import PaymentsController from './controllers/PaymentsController';
import CustomerOrdersController from './controllers/CustomerOrdersController';
import CreditBrandsController from './controllers/CreditBrandsController';
import DebitBrandsController from './controllers/DebitBrandsController';
import PaymentStripeController from './controllers/PaymentStripeController';
import PaymentsDeliveryController from './controllers/PaymentsDeliveryController';

const routes = express.Router();
const upload = multer(uploadConfig);

routes.use(authMiddleware);

routes.get('/', function (request, response) {
    return response.status(202).json();
})

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

routes.get('/restaurant/delivery-groups', RestaurantDeliveryGroupsController.index);
routes.get('/restaurant/delivery-groups/:id', RestaurantDeliveryGroupsController.show);
routes.post('/restaurant/delivery-groups', RestaurantDeliveryGroupsController.create);
routes.put('/restaurant/delivery-groups/:id', RestaurantDeliveryGroupsController.update);
routes.delete('/restaurant/delivery-groups/:id', RestaurantDeliveryGroupsController.delete);

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

routes.get('/order-status', OrderStatusController.index);

routes.get('/orders', OrdersController.index);
routes.get('/orders/:id', OrdersController.show);
routes.post('/orders', OrdersController.create);
routes.put('/orders/:id', OrdersController.update);
routes.delete('/orders/:id', OrdersController.delete);

routes.post('/customer/new', CustomerNewAuthenticationController.create);
routes.put('/customer/new', CustomerNewAuthenticationController.update);

routes.post('/customer/reset', CustomerResetAuthenticationController.create);
routes.put('/customer/reset', CustomerResetAuthenticationController.update);

routes.put('/customer/password/:id', CustomerPasswordController.update);

routes.post('/customer/authenticate', ClientsAuthenticationsController.create);

routes.get('/customer', CustomersController.index);
routes.get('/customer/:id', CustomersController.show);
routes.post('/customer', CustomersController.create);
routes.put('/customer/:id', CustomersController.update);
routes.delete('/customer/:id', CustomersController.delete);

routes.post('/customer/address', CustomerAddressController.create);
routes.put('/customer/address/:id', CustomerAddressController.update);
routes.delete('/customer/address/:id', CustomerAddressController.delete);

routes.post('/customer/payments', CustomerPaymentsController.create);
routes.put('/customer/payments/:id', CustomerPaymentsController.update);
routes.delete('/customer/payments/:id', CustomerPaymentsController.delete);

routes.get('/customer/orders/:id', CustomerOrdersController.index);

routes.post('/payments/dopayments', PaymentsController.create);

routes.get('/payments/credit-brands', CreditBrandsController.index);
routes.get('/payments/credit-brands/:id', CreditBrandsController.show);
routes.post('/payments/credit-brands', CreditBrandsController.create);
routes.put('/payments/credit-brands/:id', CreditBrandsController.update);
routes.delete('/payments/credit-brands/:id', CreditBrandsController.delete);

routes.get('/payments/debit-brands', DebitBrandsController.index);
routes.get('/payments/debit-brands/:id', DebitBrandsController.show);
routes.post('/payments/debit-brands', DebitBrandsController.create);
routes.put('/payments/debit-brands/:id', DebitBrandsController.update);
routes.delete('/payments/debit-brands/:id', DebitBrandsController.delete);

routes.get('/payments/stripe', PaymentStripeController.index);
routes.post('/payments/stripe', PaymentStripeController.create);
routes.put('/payments/stripe/:id', PaymentStripeController.update);
routes.delete('/payments/stripe/:id', PaymentStripeController.delete);

routes.get('/payments/delivery', PaymentsDeliveryController.index);
routes.get('/payments/delivery/:id', PaymentsDeliveryController.show);
routes.post('/payments/delivery', PaymentsDeliveryController.create);
routes.put('/payments/delivery/:id', PaymentsDeliveryController.update);
routes.delete('/payments/delivery/:id', PaymentsDeliveryController.delete);

export default routes;