import { Request, Response } from 'express';

export default {
    async create(request: Request, response: Response) {
        return response.status(204).json('');
    }
}