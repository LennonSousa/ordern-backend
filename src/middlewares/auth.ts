require('dotenv/config');
import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";

const publicRoutes = [
    '/users/authenticate',
    '/customer/new',
    '/customer/reset',
    '/customer/authenticate',
    '/restaurants',
    '/restaurant',
    '/categories',
    '/products',
    '/uploads',
    '/users',
]

export default (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if (publicRoutes.find(item => {
        return item === request.originalUrl.slice(0, request.originalUrl.lastIndexOf('/') === 0 ? undefined : request.originalUrl.lastIndexOf('/'))
    }))
        return next();
    else if (publicRoutes.find(item => {
        return item === request.originalUrl
    }))
        return next();

    if (!authHeader)
        return response.status(401).send({ error: 'No token provided' });

    const parts = authHeader.split(' ');

    if (parts.length !== 2)
        return response.status(401).send({ error: 'Token error' });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return response.status(401).send({ error: 'Token malformated' });

    if (process.env.JWT_SECRET) {
        jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
            if (err) return response.status(401).send({ error: 'Token invalid' });

            request = decoded.id;

            return next();
        });
    }
};