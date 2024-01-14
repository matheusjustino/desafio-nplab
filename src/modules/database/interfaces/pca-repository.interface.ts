import { EntityRepository } from '@mikro-orm/core';

// INTERFACES
import { IBaseRepository } from './base-repository.interface';

// ENTITIES
import { PCAEntity } from '../entities/pca.entity';

export interface IPCARepository extends IBaseRepository {
	entity: EntityRepository<PCAEntity>;
}
