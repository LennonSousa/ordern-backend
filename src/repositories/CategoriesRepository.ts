import { EntityRepository, Repository } from 'typeorm';

import CategoriesModel from '../models/CategoriesModel';

@EntityRepository(CategoriesModel)
class CategoriesRepository extends Repository<CategoriesModel> { }

export { CategoriesRepository };