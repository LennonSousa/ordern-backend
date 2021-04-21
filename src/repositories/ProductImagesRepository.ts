import { EntityRepository, Repository } from 'typeorm';

import ProductImagesModel from '../models/ProductImagesModel';

@EntityRepository(ProductImagesModel)
class ProductImagesRepository extends Repository<ProductImagesModel> { }

export { ProductImagesRepository };