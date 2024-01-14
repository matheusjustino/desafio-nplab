import { randomUUID } from 'crypto';
import { PrimaryKey, Property } from '@mikro-orm/core';

export class BaseEntity {
	@PrimaryKey({ type: 'uuid', onCreate: () => randomUUID() })
	public id: string;

	@Property({ onCreate: () => new Date() })
	public createdAt?: Date;

	@Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
	public updatedAt?: Date;
}
