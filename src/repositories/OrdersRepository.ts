import { EntityRepository, Repository } from 'typeorm';

import OrdersModel from '../models/OrdersModel';

@EntityRepository(OrdersModel)
class OrdersRepository extends Repository<OrdersModel> { }

export { OrdersRepository };