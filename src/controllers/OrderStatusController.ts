import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import orderStatusView from '../views/orderStatusView';
import { OrderStatusRepository } from '../repositories/OrderStatusRepository';

export default {
    async index(request: Request, response: Response) {
        const orderStatusRepository = getCustomRepository(OrderStatusRepository);

        const orderStatus = await orderStatusRepository.find({
            order: {
                order: "ASC"
            }
        });

        return response.json(orderStatusView.renderMany(orderStatus));
    },

    generate() {
        const orderStatus = [
            {
                title: 'Aprovação',
                description: 'Aguardando aprovação do estabelecimento.',
                order: 0
            },
            {
                title: 'Em preparação',
                description: 'O seu pedido está sendo preparado.',
                order: 1
            },
            {
                title: 'Entrega',
                description: 'Pedido saiu para entrega.',
                order: 2
            },
            {
                title: 'Retirada',
                description: 'Pedido disponível para retirada.',
                order: 3
            },
            {
                title: 'Concluído',
                description: 'Pedido entregue.',
                order: 4
            },
            {
                title: 'Cancelado',
                description: 'Pedido cancelado.',
                order: 5
            }
        ];

        return orderStatus;
    },
}