import express from 'express';
import http from 'http';
import cors from 'cors';
import path from 'path';
import 'express-async-errors';

import './database/connection';

import publicRoutes from './routes/public.routes';
import userPublicRoutes from './routes/user.public.routes';
import userAuthRoutes from './routes/user.auth.routes';
import customerPublicRoutes from './routes/customer.public.routes';
import customerAuthRoutes from './routes/customer.auth.routes';
import errorHandler from './errors/handler';
import WsItem from './controllers/WebSocket';

require('dotenv/config');

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

app.use(publicRoutes);
app.use(userPublicRoutes);
app.use(customerPublicRoutes);
app.use(customerAuthRoutes);
app.use(userAuthRoutes);

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

// httpServer.addListener("connection", () => { httpServer.getConnections((err, count) => { console.log(count); }); });
// httpServer.addListener("error", () => { httpServer.getConnections((err, count) => { console.log(err); }); });

httpServer.listen(process.env.PORT || 3333, () => {
    console.info(`> Server listening on port: ${process.env.PORT || 3333}`);
});