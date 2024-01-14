import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';

// ENTITIES
import { ScheduleEntity } from '../entities/schedule.entity';

// REPOSITORIES
import { BaseRepository } from './base.repository';

// INTERFACES
import { IScheduleRepository } from '../interfaces/schedule-repository.interface';

export class ScheduleRepository
	extends BaseRepository
	implements IScheduleRepository
{
	constructor(
		@InjectRepository(ScheduleEntity)
		private readonly repository: EntityRepository<ScheduleEntity>,
	) {
		super();
	}

	public get entity(): EntityRepository<ScheduleEntity> {
		return this.repository;
	}
}
