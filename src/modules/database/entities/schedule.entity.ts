import { Entity, Property } from '@mikro-orm/core';

// DTOS
import { ScheduleJobPcaDTO } from '@/modules/pca/dtos/schedule-job-pca.dto';

// ENTITIES
import { BaseEntity } from './base.entity';

@Entity({ tableName: 'schedules' })
export class ScheduleEntity extends BaseEntity {
	@Property({ type: String, unique: true, nullable: false })
	public jobName: string;

	@Property({ type: 'jsonb', nullable: false })
	public jobPayload: ScheduleJobPcaDTO;
}
