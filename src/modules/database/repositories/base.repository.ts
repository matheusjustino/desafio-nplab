import { Inject, Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';

// INTERFACES
import { IBaseRepository } from '../interfaces/base-repository.interface';

@Injectable()
export class BaseRepository implements IBaseRepository {
	@Inject()
	private entityManager: EntityManager;

	public get em(): EntityManager {
		return this.entityManager;
	}
}
