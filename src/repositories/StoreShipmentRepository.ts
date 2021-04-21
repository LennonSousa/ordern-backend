import { EntityRepository, Repository } from 'typeorm';

import StoreShipmentModel from '../models/StoreShipmentsModel';

@EntityRepository(StoreShipmentModel)
class StoreShipmentRepository extends Repository<StoreShipmentModel> { }

export { StoreShipmentRepository };