import { EntityRepository, Repository } from 'typeorm';

import OrderStatusModel from '../models/OrderStatusModel';

@EntityRepository(OrderStatusModel)
class OrderStatusRepository extends Repository<OrderStatusModel> { }

export { OrderStatusRepository };