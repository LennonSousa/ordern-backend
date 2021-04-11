import express from 'express';

import customerAuthMiddleware from '../middlewares/customersAuth';

import CustomerPasswordController from '../controllers/CustomerPasswordController';
import CustomersController from '../controllers/CustomersController';
import CustomerAddressController from '../controllers/CustomerAddressController';
import CustomerPaymentsController from '../controllers/CustomerPaymentsController';
import PaymentsController from '../controllers/PaymentsController';
import CustomerOrdersController from '../controllers/CustomerOrdersController';

const customerAuthRoutes = express.Router();

customerAuthRoutes.put('/customer/password/:id',customerAuthMiddleware, CustomerPasswordController.update);

customerAuthRoutes.get('/customer/:id',customerAuthMiddleware, CustomersController.show);
customerAuthRoutes.put('/customer/:id',customerAuthMiddleware, CustomersController.update);

customerAuthRoutes.post('/customer/address',customerAuthMiddleware, CustomerAddressController.create);
customerAuthRoutes.put('/customer/address/:id',customerAuthMiddleware, CustomerAddressController.update);
customerAuthRoutes.delete('/customer/address/:id',customerAuthMiddleware, CustomerAddressController.delete);

customerAuthRoutes.get('/customer/payments/:id',customerAuthMiddleware, CustomerPaymentsController.index);
customerAuthRoutes.get('/customer/payment/:id',customerAuthMiddleware, CustomerPaymentsController.show);
customerAuthRoutes.post('/customer/payments',customerAuthMiddleware, CustomerPaymentsController.create);
customerAuthRoutes.put('/customer/payments/:id',customerAuthMiddleware, CustomerPaymentsController.update);
customerAuthRoutes.delete('/customer/payments/:id',customerAuthMiddleware, CustomerPaymentsController.delete);

customerAuthRoutes.get('/customer/orders/:id',customerAuthMiddleware, CustomerOrdersController.index);

customerAuthRoutes.post('/payments/dopayments',customerAuthMiddleware, PaymentsController.create);

export default customerAuthRoutes;