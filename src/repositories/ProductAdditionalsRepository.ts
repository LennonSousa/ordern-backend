import { EntityRepository, Repository } from 'typeorm';

import ProductAdditionalsModel from '../models/ProductAdditionalsModel';

@EntityRepository(ProductAdditionalsModel)
class ProductAdditionalsRepository extends Repository<ProductAdditionalsModel> { }

export { ProductAdditionalsRepository };