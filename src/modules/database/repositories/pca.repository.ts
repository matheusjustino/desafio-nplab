import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

// ENTITIES
import { PCAEntity } from '../entities/pca.entity';

// REPOSITORIES
import { BaseRepository } from './base.repository';

// INTERFACES
import { IPCARepository } from '../interfaces/pca-repository.interface';

export class PCARepository extends BaseRepository implements IPCARepository {
	constructor(
		@InjectRepository(PCAEntity)
		private readonly repository: EntityRepository<PCAEntity>,
	) {
		super();
	}

	public get entity(): EntityRepository<PCAEntity> {
		return this.repository;
	}
}
