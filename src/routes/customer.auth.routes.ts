import express from 'express';

import customersAuthMiddleware from '../middlewares/customersAuth';

import CustomerPasswordController from '../controllers/CustomerPasswordController';
import CustomersController from '../controllers/CustomersController';
import CustomerAddressController from '../controllers/CustomerAddressController';
import CustomerPaymentsController from '../controllers/CustomerPaymentsController';
import PaymentsController from '../controllers/PaymentsController';
import PaymentStripeController from '../controllers/PaymentStripeController';
import OrdersController from '../controllers/OrdersController';

const customerAuthRoutes = express.Router();

customerAuthRoutes.put('/customer/:customerId/password/:id', customersAuthMiddleware, CustomerPasswordController.update);

customerAuthRoutes.get('/customer/:customerId', customersAuthMiddleware, CustomersController.show);
customerAuthRoutes.post('/customer/:customerId', customersAuthMiddleware, CustomersController.create);
customerAuthRoutes.put('/customer/:customerId', customersAuthMiddleware, CustomersController.update);

customerAuthRoutes.post('/customer/:customerId/address', customersAuthMiddleware, CustomerAddressController.create);
customerAuthRoutes.put('/customer/:customerId/address/:id', customersAuthMiddleware, CustomerAddressController.update);
customerAuthRoutes.delete('/customer/:customerId/address/:id', customersAuthMiddleware, CustomerAddressController.delete);

customerAuthRoutes.get('/customer/:customerId/payment/:id', customersAuthMiddleware, CustomerPaymentsController.show);
customerAuthRoutes.post('/customer/:customerId/payments', customersAuthMiddleware, CustomerPaymentsController.create);
customerAuthRoutes.put('/customer/:customerId/payments/:id', customersAuthMiddleware, CustomerPaymentsController.update);
customerAuthRoutes.delete('/customer/:customerId/payments/:id', customersAuthMiddleware, CustomerPaymentsController.delete);

customerAuthRoutes.get('/stripe/customers/:customerId', customersAuthMiddleware, PaymentStripeController.index);
customerAuthRoutes.post('/customer/:customerId/payments/dopayments', customersAuthMiddleware, PaymentsController.create);

customerAuthRoutes.post('/customer/:customerId/orders', customersAuthMiddleware, OrdersController.create);
customerAuthRoutes.put('/customer/:customerId/orders/:id', customersAuthMiddleware, OrdersController.update);

export default customerAuthRoutes;