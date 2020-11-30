require('dotenv/config');
import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";

const publicRoutes = [
    '/users/authenticate',
    '/clients/authenticate',
    '/restaurants',
    '/restaurant',
    '/product',
    '/products',
    '/uploads'
]

export default (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    console.log(request.path.slice(0, request.path.indexOf('/', 1)));

    if (publicRoutes.find(item => { return item === request.path.slice(0, request.path.indexOf('/', 1)) }))
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