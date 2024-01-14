import { ApiProperty } from '@nestjs/swagger';

// ENUMS
import { PCAStatusEnum } from '../enums/pca-status.enum';

export class PcaDTO {
	@ApiProperty({ type: String })
	public id: string;

	@ApiProperty({ type: String })
	public year: string;

	@ApiProperty({
		enum: PCAStatusEnum,
		example: PCAStatusEnum.INIT,
	})
	public status: PCAStatusEnum;

	@ApiProperty({ type: String })
	public identification: string;

	@ApiProperty({ type: Number })
	public amount: number;

	@ApiProperty({ type: Number })
	public itemsQty: number;

	@ApiProperty({ type: Date })
	public createdAt: Date;

	@ApiProperty({ type: Date })
	public updatedAt: Date;
}
