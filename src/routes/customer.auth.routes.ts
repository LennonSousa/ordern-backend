import express from 'express';

import customersAuthMiddleware from '../middlewares/customersAuth';

import CustomerPasswordController from '../controllers/CustomerPasswordController';
import CustomersController from '../controllers/CustomersController';
import CustomerAddressController from '../controllers/CustomerAddressController';
import CustomerPaymentsController from '../controllers/CustomerPaymentsController';
import PaymentsController from '../controllers/PaymentsController';
import PaymentStripeController from '../controllers/StorePaymentStripeController';
import OrdersController from '../controllers/OrdersController';
import CreditBrandsController from '../controllers/CreditBrandsController';
import DebitBrandsController from '../controllers/DebitBrandsController';
import StoreShipmentsController from '../controllers/StoreShipmentsController';
import StoreDeliveryGroupsController from '../controllers/StoreDeliveryGroupsController';
import StorePaymentsDeliveryController from '../controllers/StorePaymentsDeliveryController';

const customerAuthRoutes = express.Router();

customerAuthRoutes.put('/customer/password/:customerId', customersAuthMiddleware, CustomerPasswordController.update);

customerAuthRoutes.get('/customer/:customerId', customersAuthMiddleware, CustomersController.show);
customerAuthRoutes.post('/customer/:customerId', customersAuthMiddleware, CustomersController.create); // Create a new customer.
customerAuthRoutes.put('/customer/:customerId', customersAuthMiddleware, CustomersController.update);

customerAuthRoutes.post('/customer/:customerId/address', customersAuthMiddleware, CustomerAddressController.create);
customerAuthRoutes.put('/customer/:customerId/address/:id', customersAuthMiddleware, CustomerAddressController.update);
customerAuthRoutes.delete('/customer/:customerId/address/:id', customersAuthMiddleware, CustomerAddressController.delete);

customerAuthRoutes.get('/customer/:customerId/store/shipments', customersAuthMiddleware, StoreShipmentsController.index);

customerAuthRoutes.get('/customer/:customerId/store/delivery-groups', customersAuthMiddleware, StoreDeliveryGroupsController.index);

customerAuthRoutes.get('/customer/:customerId/payments/delivery', customersAuthMiddleware, StorePaymentsDeliveryController.index);

customerAuthRoutes.get('/customer/:customerId/payments/credit-brands', customersAuthMiddleware, CreditBrandsController.index);

customerAuthRoutes.get('/customer/:customerId/payments/debit-brands', customersAuthMiddleware, DebitBrandsController.index);

customerAuthRoutes.get('/customer/:customerId/payments/stripe', customersAuthMiddleware, PaymentStripeController.index);

customerAuthRoutes.get('/customer/:customerId/payment/:id', customersAuthMiddleware, CustomerPaymentsController.show);
customerAuthRoutes.post('/customer/:customerId/payments', customersAuthMiddleware, CustomerPaymentsController.create);
customerAuthRoutes.put('/customer/:customerId/payments/:id', customersAuthMiddleware, CustomerPaymentsController.update);
customerAuthRoutes.delete('/customer/:customerId/payments/:id', customersAuthMiddleware, CustomerPaymentsController.delete);

customerAuthRoutes.post('/customer/:customerId/payments/dopayments', customersAuthMiddleware, PaymentsController.create);

customerAuthRoutes.post('/customer/:customerId/orders', customersAuthMiddleware, OrdersController.create);
customerAuthRoutes.put('/customer/:customerId/orders/:id', customersAuthMiddleware, OrdersController.update);

export default customerAuthRoutes;