import { EntityRepository, Repository } from 'typeorm';

import UserTypesModel from '../models/UserTypesModel';

@EntityRepository(UserTypesModel)
class UserTypesRepository extends Repository<UserTypesModel> { }

export { UserTypesRepository };