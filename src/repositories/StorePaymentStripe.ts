import { EntityRepository, Repository } from 'typeorm';

import StorePaymentStripeModel from '../models/StorePaymentStripeModel';

@EntityRepository(StorePaymentStripeModel)
class StorePaymentStripeRepository extends Repository<StorePaymentStripeModel> { }

export { StorePaymentStripeRepository };