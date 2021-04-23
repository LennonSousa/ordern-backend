import { EntityRepository, Repository } from 'typeorm';

import StoreNewModel from '../models/StoreNewModel';

@EntityRepository(StoreNewModel)
class StoreNewRepository extends Repository<StoreNewModel> { }

export { StoreNewRepository };