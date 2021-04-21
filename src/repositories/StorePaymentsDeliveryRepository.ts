import { EntityRepository, Repository } from 'typeorm';

import StorePaymentsDeliveryModel from '../models/StorePaymentsDeliveryModel';

@EntityRepository(StorePaymentsDeliveryModel)
class StorePaymentsDeliveryRepository extends Repository<StorePaymentsDeliveryModel> { }

export { StorePaymentsDeliveryRepository };