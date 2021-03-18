require('dotenv/config');
import express from 'express';
import http from 'http';
import cors from 'cors';
import path from 'path';
import 'express-async-errors';

import './database/connection'
import routes from './routes';
import errorHandler from './errors/handler';
import WsItem from './controllers/WebSocket';

const app = express();
const httpServer = http.createServer(app);

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

export const io = require("socket.io")(httpServer, {
    path: '/socket.io',
    cors: {
        origin: process.env.APP_URL,
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        credentials: true
    }
});

io.on("connection", WsItem.onConnection);

httpServer.listen(process.env.PORT || 3333, () => {
    console.log(`> Server listening on port: ${process.env.PORT || 3333}`)
});