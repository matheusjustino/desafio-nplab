import { EntityManager } from '@mikro-orm/postgresql';

export interface IBaseRepository {
	em: EntityManager;
}
