import express from 'express';

import CustomerNewAuthenticationController from '../controllers/CustomerNewAuthentication';
import CustomerResetAuthenticationController from '../controllers/CustomerResetAuthentication';
import ClientsAuthenticationsController from '../controllers/CustomersAuthenticationController';

const customerPublicRoutes = express.Router();

customerPublicRoutes.post('/customers/new', CustomerNewAuthenticationController.create);
customerPublicRoutes.put('/customers/new', CustomerNewAuthenticationController.update);

customerPublicRoutes.post('/customers/reset', CustomerResetAuthenticationController.create);
customerPublicRoutes.put('/customers/reset', CustomerResetAuthenticationController.update);

customerPublicRoutes.post('/customers/authenticate', ClientsAuthenticationsController.create);

export default customerPublicRoutes;