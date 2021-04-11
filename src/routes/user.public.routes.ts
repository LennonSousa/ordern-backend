import express from 'express';

import UsersAuthenticationsController from '../controllers/UsersAuthenticationController';
import UserNewAuthenticationController from '../controllers/UserNewAuthenticationController';

const userPublicRoutes = express.Router();

userPublicRoutes.post('/users/authenticate', UsersAuthenticationsController.create);

userPublicRoutes.get('/users/authenticate/new', UserNewAuthenticationController.show);
userPublicRoutes.post('/users/new', UserNewAuthenticationController.create);
userPublicRoutes.put('/users/new/:id', UserNewAuthenticationController.update);

export default userPublicRoutes;