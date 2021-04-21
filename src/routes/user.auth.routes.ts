import express from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import AdditionalsController from '../controllers/AdditionalsController';
import CategoriesController from '../controllers/CategoriesController';
import CreditBrandsController from '../controllers/CreditBrandsController';
import CustomerOrdersController from '../controllers/CustomerOrdersController';
import CustomersController from '../controllers/CustomersController';
import DaySchedulesController from '../controllers/DaySchedulesController';
import DebitBrandsController from '../controllers/DebitBrandsController';
import OpenedDaysController from '../controllers/OpenedDaysController';
import OrdersController from '../controllers/OrdersController';
import PaymentsDeliveryController from '../controllers/StorePaymentsDeliveryController';
import PaymentStripeController from '../controllers/StorePaymentStripeController';
import ProductAdditionalsController from '../controllers/ProductAdditionalsController';
import ProductAvailablesController from '../controllers/ProductAvailablesController';
import ProductCategoriesAdditionalController from '../controllers/ProductCategoriesAdditionalController';
import ProductsController from '../controllers/ProductsController';
import ProductsHighlightsController from '../controllers/ProductsHighlightsController';
import ProductValuesController from '../controllers/ProductValuesController';
import RestaurantDeliveryGroupsController from '../controllers/RestaurantDeliveryGroupsController';
import RestaurantsAvatarController from '../controllers/RestaurantsAvatarController';
import StoresController from '../controllers/StoresController';
import RestaurantsCoverController from '../controllers/RestaurantsCoverController';
import StoreShipmentController from '../controllers/StoreShipmentsController';
import UsersController from '../controllers/UsersController';
import UserTypesController from '../controllers/UserTypesController';
import usersAuthMiddleware from '../middlewares/usersAuth';

const userAuthRoutes = express.Router();
const upload = multer(uploadConfig);

userAuthRoutes.get('/', function (request, response) {
    return response.status(202).json();
});

userAuthRoutes.post('/stores', upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'avatar', maxCount: 1 }]), StoresController.create);
userAuthRoutes.put('/stores/:id', usersAuthMiddleware, StoresController.update);

userAuthRoutes.put('/store/cover/:id', usersAuthMiddleware, upload.single('cover'), RestaurantsCoverController.update);
userAuthRoutes.put('/store/avatar/:id', usersAuthMiddleware, upload.single('avatar'), RestaurantsAvatarController.update);

userAuthRoutes.get('/user/types', usersAuthMiddleware, UserTypesController.index);
userAuthRoutes.get('/user/types/:id', usersAuthMiddleware, UserTypesController.show);

userAuthRoutes.get('/users', usersAuthMiddleware, UsersController.index);
userAuthRoutes.get('/users/:id', usersAuthMiddleware, UsersController.show);
userAuthRoutes.post('/users', usersAuthMiddleware, UsersController.create);
userAuthRoutes.put('/users/:id', usersAuthMiddleware, UsersController.update);
userAuthRoutes.delete('/users/:id', usersAuthMiddleware, UsersController.delete);

userAuthRoutes.put('/store/opened-days/:id', usersAuthMiddleware, OpenedDaysController.update);
userAuthRoutes.delete('/store/opened-days/:id', usersAuthMiddleware, OpenedDaysController.delete);

userAuthRoutes.post('/store/opened-day/schedules', usersAuthMiddleware, DaySchedulesController.create);
userAuthRoutes.put('/store/opened-day/schedules/:id', usersAuthMiddleware, DaySchedulesController.update);
userAuthRoutes.delete('/store/opened-day/schedules/:id', usersAuthMiddleware, DaySchedulesController.delete);

userAuthRoutes.put('/store/shipments/:id', usersAuthMiddleware, StoreShipmentController.update);

userAuthRoutes.post('/store/delivery-groups', usersAuthMiddleware, RestaurantDeliveryGroupsController.create);
userAuthRoutes.put('/store/delivery-groups/:id', usersAuthMiddleware, RestaurantDeliveryGroupsController.update);
userAuthRoutes.delete('/store/delivery-groups/:id', usersAuthMiddleware, RestaurantDeliveryGroupsController.delete);

userAuthRoutes.post('/categories', usersAuthMiddleware, CategoriesController.create);
userAuthRoutes.put('/categories/:id', usersAuthMiddleware, CategoriesController.update);
userAuthRoutes.delete('/categories/:id', usersAuthMiddleware, CategoriesController.delete);

userAuthRoutes.post('/additionals', usersAuthMiddleware, AdditionalsController.create);
userAuthRoutes.put('/additionals/:id', usersAuthMiddleware, AdditionalsController.update);
userAuthRoutes.delete('/additionals/:id', usersAuthMiddleware, AdditionalsController.delete);

userAuthRoutes.post('/products', usersAuthMiddleware, upload.array('images'), ProductsController.create);
userAuthRoutes.put('/products/:id', usersAuthMiddleware, upload.array('images'), ProductsController.update);
userAuthRoutes.delete('/products/:id', usersAuthMiddleware, ProductsController.delete);

userAuthRoutes.post('/product/values', usersAuthMiddleware, ProductValuesController.create);
userAuthRoutes.put('/product/values/:id', usersAuthMiddleware, ProductValuesController.update);
userAuthRoutes.delete('/product/values/:id', usersAuthMiddleware, ProductValuesController.delete);

userAuthRoutes.post('/product/categories', usersAuthMiddleware, ProductCategoriesAdditionalController.create);
userAuthRoutes.put('/product/categories/:id', usersAuthMiddleware, ProductCategoriesAdditionalController.update);
userAuthRoutes.delete('/product/categories/:id', usersAuthMiddleware, ProductCategoriesAdditionalController.delete);

userAuthRoutes.post('/product/additionals', usersAuthMiddleware, ProductAdditionalsController.create);
userAuthRoutes.put('/product/additionals/:id', usersAuthMiddleware, ProductAdditionalsController.update);
userAuthRoutes.delete('/product/additionals/:id', usersAuthMiddleware, ProductAdditionalsController.delete);

userAuthRoutes.put('/product/availables/:id', usersAuthMiddleware, ProductAvailablesController.update);

userAuthRoutes.post('/highlights/landing', usersAuthMiddleware, ProductsHighlightsController.create);
userAuthRoutes.put('/highlights/landing/:id', usersAuthMiddleware, ProductsHighlightsController.update);
userAuthRoutes.delete('/highlights/landing/:id', usersAuthMiddleware, ProductsHighlightsController.delete);

userAuthRoutes.get('/orders', usersAuthMiddleware, OrdersController.index);
userAuthRoutes.get('/orders/:id', usersAuthMiddleware, OrdersController.show);
userAuthRoutes.put('/orders/:id', usersAuthMiddleware, OrdersController.update);
//userAuthRoutes.delete('/orders/:id', usersAuthMiddleware, OrdersController.delete);

userAuthRoutes.get('/customers', usersAuthMiddleware, CustomersController.index);
// userAuthRoutes.put('/customers/:id', usersAuthMiddleware, CustomersController.update); moved to customer auth routes.
userAuthRoutes.delete('/customers/:id', usersAuthMiddleware, CustomersController.delete);

userAuthRoutes.get('/customers/orders/:id', usersAuthMiddleware, CustomerOrdersController.index);
userAuthRoutes.get('/customers/orders/tracker/:tracker', usersAuthMiddleware, CustomerOrdersController.tracker);
userAuthRoutes.get('/customers/orders/customer/:customer', usersAuthMiddleware, CustomerOrdersController.customer);

userAuthRoutes.post('/payments/credit-brands', usersAuthMiddleware, CreditBrandsController.create);
userAuthRoutes.put('/payments/credit-brands/:id', usersAuthMiddleware, CreditBrandsController.update);
userAuthRoutes.delete('/payments/credit-brands/:id', usersAuthMiddleware, CreditBrandsController.delete);

userAuthRoutes.post('/payments/debit-brands', usersAuthMiddleware, DebitBrandsController.create);
userAuthRoutes.put('/payments/debit-brands/:id', usersAuthMiddleware, DebitBrandsController.update);
userAuthRoutes.delete('/payments/debit-brands/:id', usersAuthMiddleware, DebitBrandsController.delete);

userAuthRoutes.get('/payments/stripe', usersAuthMiddleware, PaymentStripeController.index);
userAuthRoutes.get('/payments/stripe/secret', usersAuthMiddleware, PaymentStripeController.indexSecret);
userAuthRoutes.post('/payments/stripe', usersAuthMiddleware, PaymentStripeController.create);
userAuthRoutes.put('/payments/stripe/:id', usersAuthMiddleware, PaymentStripeController.update);
userAuthRoutes.delete('/payments/stripe/:id', usersAuthMiddleware, PaymentStripeController.delete);

userAuthRoutes.put('/payments/delivery/:id', usersAuthMiddleware, PaymentsDeliveryController.update);

export default userAuthRoutes;