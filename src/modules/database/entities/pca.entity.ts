import { Entity, Enum, Property } from '@mikro-orm/core';

// ENUMS
import { PCAStatusEnum } from '@/modules/pca/enums/pca-status.enum';

// ENTITIES
import { BaseEntity } from './base.entity';

@Entity({ tableName: 'pca' })
export class PCAEntity extends BaseEntity {
	@Property({ type: String, nullable: false })
	public year: string;

	@Enum({
		items: () => PCAStatusEnum,
		default: PCAStatusEnum.INIT,
		nullable: false,
	})
	public status!: PCAStatusEnum;

	@Property({ type: String, nullable: false })
	public identification: string;

	@Property({ type: Number, default: 0.0 })
	public amount: number;

	@Property({ type: Number, default: 0 })
	public itemsQty: number;
}
