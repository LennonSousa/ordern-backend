import { EntityRepository, Repository } from 'typeorm';

import StoreOpenedSchedulesModel from '../models/StoreOpenedSchedulesModel';

@EntityRepository(StoreOpenedSchedulesModel)
class StoreOpenedSchedulesRepository extends Repository<StoreOpenedSchedulesModel> { }

export { StoreOpenedSchedulesRepository };