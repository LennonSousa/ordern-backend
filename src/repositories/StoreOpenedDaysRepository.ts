import { EntityRepository, Repository } from 'typeorm';

import StoreOpenedDaysModel from '../models/StoreOpenedDaysModel';

@EntityRepository(StoreOpenedDaysModel)
class StoreOpenedDaysRespository extends Repository<StoreOpenedDaysModel> { }

export { StoreOpenedDaysRespository };