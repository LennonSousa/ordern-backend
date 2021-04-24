import { EntityRepository, Repository } from 'typeorm';

import AdditionalsModel from '../models/AdditionalsModel';

@EntityRepository(AdditionalsModel)
class AdditionalsRepository extends Repository<AdditionalsModel> { }

export { AdditionalsRepository };