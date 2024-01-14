import { EntityRepository } from '@mikro-orm/core';

// ENTITIES
import { ScheduleEntity } from '../entities/schedule.entity';

// INTERFACES
import { IBaseRepository } from './base-repository.interface';

export interface IScheduleRepository extends IBaseRepository {
	entity: EntityRepository<ScheduleEntity>;
}
