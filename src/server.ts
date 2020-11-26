require('dotenv').config();
import express from 'express';
import cors from 'cors';
import path from 'path';
import 'express-async-errors';

import './database/connection'
import routes from './routes';
import errorHandler from './errors/handler';

const app = express();

app.use(cors({
    //'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}));

app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);

app.listen(process.env.PORT || 3333);