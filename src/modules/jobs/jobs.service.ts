/* eslint-disable @typescript-eslint/ban-types */
import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

// INTERFACES
import { IJobsService } from './interfaces/jobs-service.interface';

// DTOS
import { ScheduleJobDTO } from './dtos/schedule-job.dto';

@Injectable()
export class JobsService implements IJobsService {
	private readonly logger: Logger = new Logger(JobsService.name);

	constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

	public scheduleJob(
		{ jobName, cronTime }: ScheduleJobDTO,
		jobFunc: () => any,
	): void {
		const job = new CronJob(cronTime, () => {
			this.logger.warn(`Running job ${jobName}!`);
			jobFunc();
		});

		this.schedulerRegistry.addCronJob(jobName, job as any);
		job.start();
	}

	public turnOffJob(jobName: string): void {
		this.schedulerRegistry.deleteCronJob(jobName);
		this.logger.warn(`Job ${jobName} deleted!`);
	}

	public buildCronTime({
		second = '*',
		minute = '*',
		hour = '*',
		dayMonth = '*',
		month = '*',
		dayWeek = '*',
	}): string {
		return `${second} ${minute} ${hour} ${dayMonth} ${month} ${dayWeek}`;
	}
}
