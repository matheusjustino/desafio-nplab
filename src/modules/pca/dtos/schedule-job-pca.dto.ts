import { BadRequestException } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class ScheduleJobPcaCronTimeDTO {
	@ApiPropertyOptional({
		type: String,
		default: '*',
		example: '*/5 means every 5 seconds',
	})
	@IsOptional()
	@IsString()
	@Transform(({ value }) => {
		if (!/^\*\/\d+$/.test(value)) {
			throw new BadRequestException('Invalid format');
		}
		return value;
	})
	public second?: string;

	@ApiPropertyOptional({
		type: String,
		default: '*',
		example: '*/5 means every 5 minutes',
	})
	@IsOptional()
	@IsString()
	@Transform(({ value }) => {
		if (!/^\*\/\d+$/.test(value)) {
			throw new BadRequestException('Invalid format');
		}
		return value;
	})
	public minute?: string;

	@ApiPropertyOptional({
		type: String,
		default: '*',
		example: '*/5 means every 5 hours',
	})
	@IsOptional()
	@IsString()
	@Transform(({ value }) => {
		if (!/^\*\/\d+$/.test(value)) {
			throw new BadRequestException('Invalid format');
		}
		return value;
	})
	public hour?: string;

	@ApiPropertyOptional({
		type: String,
		default: '*',
		example: '*/5 means every 5th day-of-month',
	})
	@IsOptional()
	@IsString()
	@Transform(({ value }) => {
		if (!/^\*\/\d+$/.test(value)) {
			throw new BadRequestException('Invalid format');
		}
		return value;
	})
	public dayMonth?: string;

	@ApiPropertyOptional({
		type: String,
		default: '*',
		example: '*/5 means every 5th month',
	})
	@IsOptional()
	@IsString()
	@Transform(({ value }) => {
		if (!/^\*\/\d+$/.test(value)) {
			throw new BadRequestException('Invalid format');
		}
		return value;
	})
	public month?: string;

	@ApiPropertyOptional({
		type: String,
		default: '*',
		example: '*/5 means every 5th day-of-week',
	})
	@IsOptional()
	@IsString()
	@Transform(({ value }) => {
		if (!/^\*\/\d+$/.test(value)) {
			throw new BadRequestException('Invalid format');
		}
		return value;
	})
	public dayWeek?: string;
}

export class ScheduleJobPcaDTO {
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	public jobName?: string;

	@ApiPropertyOptional({ type: ScheduleJobPcaCronTimeDTO })
	@IsOptional()
	@Type(() => ScheduleJobPcaCronTimeDTO)
	@ValidateNested()
	public cronTime?: ScheduleJobPcaCronTimeDTO;
}
