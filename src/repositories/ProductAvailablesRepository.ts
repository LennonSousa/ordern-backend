import { EntityRepository, Repository } from 'typeorm';

import ProductAvailablesModel from '../models/ProductAvailablesModel';

@EntityRepository(ProductAvailablesModel)
class ProductAvailablesRepository extends Repository<ProductAvailablesModel> { }

export { ProductAvailablesRepository };