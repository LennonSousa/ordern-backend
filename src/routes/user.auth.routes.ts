import express from 'express';
import multer from 'multer';

import authMiddleware from '../middlewares/usersAuth';
import uploadConfig from '../config/upload';

import RestaurantsController from '../controllers/RestaurantsController';
import RestaurantsCoverController from '../controllers/RestaurantsCoverController';
import RestaurantsAvatarController from '../controllers/RestaurantsAvatarController';
import StoreShipmentController from '../controllers/StoreShipmentController';
import RestaurantDeliveryGroupsController from '../controllers/RestaurantDeliveryGroupsController';
import UserTypesController from '../controllers/UserTypesController';
import UsersController from '../controllers/UsersController';
import OpenedDaysController from '../controllers/OpenedDaysController';
import DaySchedulesController from '../controllers/DaySchedulesController';
import CategoriesController from '../controllers/CategoriesController';
import AdditionalsController from '../controllers/AdditionalsController';
import ProductsController from '../controllers/ProductsController';
import ProductValuesController from '../controllers/ProductValuesController';
import ProductCategoriesAdditionalController from '../controllers/ProductCategoriesAdditionalController';
import ProductAdditionalsController from '../controllers/ProductAdditionalsController';
import ProductAvailablesController from '../controllers/ProductAvailablesController';
import OrderStatusController from '../controllers/OrderStatusController';
import OrdersController from '../controllers/OrdersController';
import CustomerOrdersController from '../controllers/CustomerOrdersController';
import CustomersController from '../controllers/CustomersController';
import CreditBrandsController from '../controllers/CreditBrandsController';
import DebitBrandsController from '../controllers/DebitBrandsController';
import PaymentStripeController from '../controllers/PaymentStripeController';
import PaymentsDeliveryController from '../controllers/PaymentsDeliveryController';
import ProductsHighlightsController from '../controllers/ProductsHighlightsController';

const userAuthRoutes = express.Router();
const upload = multer(uploadConfig);

userAuthRoutes.get('/', function (request, response) {
    return response.status(202).json();
});

userAuthRoutes.post('/restaurants', authMiddleware, upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'avatar', maxCount: 1 }]), RestaurantsController.create);
userAuthRoutes.put('/restaurants/:id', authMiddleware, RestaurantsController.update);
userAuthRoutes.delete('/restaurants/:id', authMiddleware, RestaurantsController.delete);

userAuthRoutes.put('/restaurant/cover/:id', authMiddleware, upload.single('cover'), RestaurantsCoverController.update);
userAuthRoutes.put('/restaurant/avatar/:id', authMiddleware, upload.single('avatar'), RestaurantsAvatarController.update);

userAuthRoutes.get('/user/types', authMiddleware, UserTypesController.index);
userAuthRoutes.get('/user/types/:id', authMiddleware, UserTypesController.show);
userAuthRoutes.post('/user/types', authMiddleware, UserTypesController.create);

userAuthRoutes.get('/users', authMiddleware, UsersController.index);
userAuthRoutes.get('/users/:id', authMiddleware, UsersController.show);
userAuthRoutes.post('/users', authMiddleware, UsersController.create);
userAuthRoutes.put('/users/:id', authMiddleware, UsersController.update);
userAuthRoutes.delete('/users/:id', authMiddleware, UsersController.delete);

userAuthRoutes.post('/restaurant/opened-days', authMiddleware, OpenedDaysController.create);
userAuthRoutes.put('/restaurant/opened-days/:id', authMiddleware, OpenedDaysController.update);
userAuthRoutes.delete('/restaurant/opened-days/:id', authMiddleware, OpenedDaysController.delete);

userAuthRoutes.post('/restaurant/opened-day/schedules', authMiddleware, DaySchedulesController.create);
userAuthRoutes.put('/restaurant/opened-day/schedules/:id', authMiddleware, DaySchedulesController.update);
userAuthRoutes.delete('/restaurant/opened-day/schedules/:id', authMiddleware, DaySchedulesController.delete);

userAuthRoutes.post('/store/shipments', authMiddleware, StoreShipmentController.create);
userAuthRoutes.put('/store/shipments/:id', authMiddleware, StoreShipmentController.update);
userAuthRoutes.delete('/store/shipments/:id', authMiddleware, StoreShipmentController.delete);

userAuthRoutes.post('/store/delivery-groups', authMiddleware, RestaurantDeliveryGroupsController.create);
userAuthRoutes.put('/store/delivery-groups/:id', authMiddleware, RestaurantDeliveryGroupsController.update);
userAuthRoutes.delete('/store/delivery-groups/:id', authMiddleware, RestaurantDeliveryGroupsController.delete);

userAuthRoutes.post('/categories', authMiddleware, CategoriesController.create);
userAuthRoutes.put('/categories/:id', authMiddleware, CategoriesController.update);
userAuthRoutes.delete('/categories/:id', authMiddleware, CategoriesController.delete);

userAuthRoutes.post('/additionals', authMiddleware, AdditionalsController.create);
userAuthRoutes.put('/additionals/:id', authMiddleware, AdditionalsController.update);
userAuthRoutes.delete('/additionals/:id', authMiddleware, AdditionalsController.delete);

userAuthRoutes.post('/products', authMiddleware, upload.single('image'), ProductsController.create);
userAuthRoutes.put('/products/:id', authMiddleware, upload.single('image'), ProductsController.update);
userAuthRoutes.delete('/products/:id', authMiddleware, ProductsController.delete);

userAuthRoutes.post('/product/values', authMiddleware, ProductValuesController.create);
userAuthRoutes.put('/product/values/:id', authMiddleware, ProductValuesController.update);
userAuthRoutes.delete('/product/values/:id', authMiddleware, ProductValuesController.delete);

userAuthRoutes.post('/product/categories', authMiddleware, ProductCategoriesAdditionalController.create);
userAuthRoutes.put('/product/categories/:id', authMiddleware, ProductCategoriesAdditionalController.update);
userAuthRoutes.delete('/product/categories/:id', authMiddleware, ProductCategoriesAdditionalController.delete);

userAuthRoutes.post('/product/additionals', authMiddleware, ProductAdditionalsController.create);
userAuthRoutes.put('/product/additionals/:id', authMiddleware, ProductAdditionalsController.update);
userAuthRoutes.delete('/product/additionals/:id', authMiddleware, ProductAdditionalsController.delete);

userAuthRoutes.put('/product/availables/:id', authMiddleware, ProductAvailablesController.update);

userAuthRoutes.post('/highlights/landing', authMiddleware, ProductsHighlightsController.create);
userAuthRoutes.put('/highlights/landing/:id', authMiddleware, ProductsHighlightsController.update);
userAuthRoutes.delete('/highlights/landing/:id', authMiddleware, ProductsHighlightsController.delete);

userAuthRoutes.get('/order-status', authMiddleware, OrderStatusController.index);

userAuthRoutes.get('/orders', authMiddleware, OrdersController.index);
userAuthRoutes.get('/orders/:id', authMiddleware, OrdersController.show);
userAuthRoutes.post('/orders', authMiddleware, OrdersController.create);
userAuthRoutes.put('/orders/:id', authMiddleware, OrdersController.update);
userAuthRoutes.delete('/orders/:id', authMiddleware, OrdersController.delete);

userAuthRoutes.get('/customers', authMiddleware, CustomersController.index);
userAuthRoutes.post('/customers', authMiddleware, CustomersController.create);
userAuthRoutes.delete('/customers/:id', authMiddleware, CustomersController.delete);

userAuthRoutes.get('/customers/orders/:id',authMiddleware, CustomerOrdersController.index);
userAuthRoutes.get('/customers/orders/tracker/:tracker', authMiddleware, CustomerOrdersController.tracker);
userAuthRoutes.get('/customers/orders/customer/:customer', authMiddleware, CustomerOrdersController.customer);

userAuthRoutes.post('/payments/credit-brands', authMiddleware, CreditBrandsController.create);
userAuthRoutes.put('/payments/credit-brands/:id', authMiddleware, CreditBrandsController.update);
userAuthRoutes.delete('/payments/credit-brands/:id', authMiddleware, CreditBrandsController.delete);

userAuthRoutes.post('/payments/debit-brands', authMiddleware, DebitBrandsController.create);
userAuthRoutes.put('/payments/debit-brands/:id', authMiddleware, DebitBrandsController.update);
userAuthRoutes.delete('/payments/debit-brands/:id', authMiddleware, DebitBrandsController.delete);

userAuthRoutes.get('/payments/stripe', authMiddleware, PaymentStripeController.index);
userAuthRoutes.get('/payments/stripe/secret', authMiddleware, PaymentStripeController.indexSecret);
userAuthRoutes.post('/payments/stripe', authMiddleware, PaymentStripeController.create);
userAuthRoutes.put('/payments/stripe/:id', authMiddleware, PaymentStripeController.update);
userAuthRoutes.delete('/payments/stripe/:id', authMiddleware, PaymentStripeController.delete);

userAuthRoutes.post('/payments/delivery', authMiddleware, PaymentsDeliveryController.create);
userAuthRoutes.put('/payments/delivery/:id', authMiddleware, PaymentsDeliveryController.update);
userAuthRoutes.delete('/payments/delivery/:id', authMiddleware, PaymentsDeliveryController.delete);

export default userAuthRoutes;