import express from 'express';

import StoresController from '../controllers/StoresController';

const publicRoutes = express.Router();

publicRoutes.get('/store', StoresController.show);

export default publicRoutes;