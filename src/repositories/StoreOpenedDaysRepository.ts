import { EntityRepository, Repository } from 'typeorm';

import StoreOpenedDaysModel from '../models/StoreOpenedDaysModel';

@EntityRepository(StoreOpenedDaysModel)
class StoreOpenedDaysRepository extends Repository<StoreOpenedDaysModel> { }

export { StoreOpenedDaysRepository };