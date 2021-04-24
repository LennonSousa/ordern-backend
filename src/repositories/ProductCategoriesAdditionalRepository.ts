import { EntityRepository, Repository } from 'typeorm';

import ProductCategoriesAdditionalModel from '../models/ProductCategoriesAdditionalModel';

@EntityRepository(ProductCategoriesAdditionalModel)
class ProductCategoriesAdditionalRepository extends Repository<ProductCategoriesAdditionalModel> { }

export { ProductCategoriesAdditionalRepository };