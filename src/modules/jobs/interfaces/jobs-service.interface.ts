import { ScheduleJobPcaCronTimeDTO } from '@/modules/pca/dtos/schedule-job-pca.dto';

export interface ScheduleJobDTO {
	jobName: string;
	cronTime: string;
}

export interface IJobsService {
	scheduleJob(
		{ jobName, cronTime }: ScheduleJobDTO,
		jobFunc: () => any,
	): void;
	turnOffJob(jobName: string): void;
	buildCronTime(data: ScheduleJobPcaCronTimeDTO): string;
}
