import { EntityRepository, Repository } from 'typeorm';

import ProductValuesModel from '../models/ProductValuesModel';

@EntityRepository(ProductValuesModel)
class ProductValuesRepository extends Repository<ProductValuesModel> { }

export { ProductValuesRepository };