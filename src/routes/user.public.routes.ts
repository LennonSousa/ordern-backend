import express from 'express';

import UsersAuthenticationsController from '../controllers/UsersAuthenticationController';
import UserNewAuthenticationController from '../controllers/UserNewAuthenticationController';
import StoreNewAuthentication from '../controllers/StoreNewAuthentication';

const userPublicRoutes = express.Router();

userPublicRoutes.post('/store/new', StoreNewAuthentication.create);

userPublicRoutes.post('/users/authenticate', UsersAuthenticationsController.create);

userPublicRoutes.get('/users/authenticate/new', UserNewAuthenticationController.show);

export default userPublicRoutes;