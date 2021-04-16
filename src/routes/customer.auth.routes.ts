import express from 'express';

import customersAuthMiddleware from '../middlewares/customersAuth';

import CustomerPasswordController from '../controllers/CustomerPasswordController';
import CustomersController from '../controllers/CustomersController';
import CustomerAddressController from '../controllers/CustomerAddressController';
import CustomerPaymentsController from '../controllers/CustomerPaymentsController';
import PaymentsController from '../controllers/PaymentsController';
import CustomerOrdersController from '../controllers/CustomerOrdersController';
import PaymentStripeController from '../controllers/PaymentStripeController';
import OrdersController from '../controllers/OrdersController';

const customerAuthRoutes = express.Router();

customerAuthRoutes.put('/customer/password/:id', customersAuthMiddleware, CustomerPasswordController.update);

customerAuthRoutes.get('/customer/:id', customersAuthMiddleware, CustomersController.show);
customerAuthRoutes.post('/customer', customersAuthMiddleware, CustomersController.create);
customerAuthRoutes.put('/customer/:id', customersAuthMiddleware, CustomersController.update);

customerAuthRoutes.post('/customer/address', customersAuthMiddleware, CustomerAddressController.create);
customerAuthRoutes.put('/customer/address/:id', customersAuthMiddleware, CustomerAddressController.update);
customerAuthRoutes.delete('/customer/address/:id', customersAuthMiddleware, CustomerAddressController.delete);

customerAuthRoutes.get('/customer/payments/:id', customersAuthMiddleware, CustomerPaymentsController.index);
customerAuthRoutes.get('/customer/payment/:id', customersAuthMiddleware, CustomerPaymentsController.show);
customerAuthRoutes.post('/customer/payments', customersAuthMiddleware, CustomerPaymentsController.create);
customerAuthRoutes.put('/customer/payments/:id', customersAuthMiddleware, CustomerPaymentsController.update);
customerAuthRoutes.delete('/customer/payments/:id', customersAuthMiddleware, CustomerPaymentsController.delete);

customerAuthRoutes.get('/stripe/customers', customersAuthMiddleware, PaymentStripeController.index);
customerAuthRoutes.post('/customer/payments/dopayments', customersAuthMiddleware, PaymentsController.create);

customerAuthRoutes.post('/customer/orders', customersAuthMiddleware, OrdersController.create);
customerAuthRoutes.put('/customer/orders/:id', customersAuthMiddleware, OrdersController.update);

export default customerAuthRoutes;