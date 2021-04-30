import express from 'express';

import StoresController from '../controllers/StoresController';
import CategoriesController from '../controllers/CategoriesController';

const publicRoutes = express.Router();

publicRoutes.get('/store', StoresController.show);
publicRoutes.get('/store/categories', CategoriesController.show);

export default publicRoutes;