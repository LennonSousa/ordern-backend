import express from 'express';

import StoresController from '../controllers/StoresController';
import StoreShipmentController from '../controllers/StoreShipmentsController';
import RestaurantDeliveryGroupsController from '../controllers/RestaurantDeliveryGroupsController';
import OpenedDaysController from '../controllers/OpenedDaysController';
import DaySchedulesController from '../controllers/DaySchedulesController';
import CategoriesController from '../controllers/CategoriesController';
import AdditionalsController from '../controllers/AdditionalsController';
import ProductsController from '../controllers/ProductsController';
import ProductValuesController from '../controllers/ProductValuesController';
import ProductCategoriesAdditionalController from '../controllers/ProductCategoriesAdditionalController';
import ProductAdditionalsController from '../controllers/ProductAdditionalsController';
import CreditBrandsController from '../controllers/CreditBrandsController';
import DebitBrandsController from '../controllers/DebitBrandsController';
import PaymentsDeliveryController from '../controllers/StorePaymentsDeliveryController';
import ProductsHighlightsController from '../controllers/ProductsHighlightsController';
import OrderStatusController from '../controllers/OrderStatusController';

const publicRoutes = express.Router();

publicRoutes.get('/store', StoresController.show);

publicRoutes.get('/restaurant/opened-days', OpenedDaysController.index);
publicRoutes.get('/restaurant/opened-days/:id', OpenedDaysController.show);

publicRoutes.get('/restaurant/opened-day/schedules', DaySchedulesController.index);
publicRoutes.get('/restaurant/opened-day/schedules/:id', DaySchedulesController.show);

publicRoutes.get('/store/shipments', StoreShipmentController.index);

publicRoutes.get('/store/delivery-groups', RestaurantDeliveryGroupsController.index);
publicRoutes.get('/store/delivery-groups/:id', RestaurantDeliveryGroupsController.show);

publicRoutes.get('/categories', CategoriesController.index);
publicRoutes.get('/categories/:id', CategoriesController.show);

publicRoutes.get('/additionals', AdditionalsController.index);
publicRoutes.get('/additionals/:id', AdditionalsController.show);

publicRoutes.get('/products', ProductsController.index);
publicRoutes.get('/products/:id', ProductsController.show);

publicRoutes.get('/product/values', ProductValuesController.index);
publicRoutes.get('/product/values/:id', ProductValuesController.show);

publicRoutes.get('/product/categories', ProductCategoriesAdditionalController.index);
publicRoutes.get('/product/categories/:id', ProductCategoriesAdditionalController.show);

publicRoutes.get('/product/additionals', ProductAdditionalsController.index);
publicRoutes.get('/product/additionals/:id', ProductAdditionalsController.show);

publicRoutes.get('/highlights/landing', ProductsHighlightsController.index);
publicRoutes.get('/highlights/landing/:id', ProductsHighlightsController.show);

publicRoutes.get('/payments/credit-brands', CreditBrandsController.index);
publicRoutes.get('/payments/credit-brands/:id', CreditBrandsController.show);

publicRoutes.get('/payments/debit-brands', DebitBrandsController.index);
publicRoutes.get('/payments/debit-brands/:id', DebitBrandsController.show);

publicRoutes.get('/payments/delivery', PaymentsDeliveryController.index);

publicRoutes.get('/order-status', OrderStatusController.index);


export default publicRoutes;