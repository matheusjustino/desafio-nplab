// DTOS
import { ScheduleJobPcaCronTimeDTO } from '@/modules/pca/dtos/schedule-job-pca.dto';
import { ScheduleJobDTO } from '../dtos/schedule-job.dto';

export interface IJobsService {
	scheduleJob(
		{ jobName, cronTime }: ScheduleJobDTO,
		jobFunc: () => any,
	): void;
	turnOffJob(jobName: string): void;
	buildCronTime(data: ScheduleJobPcaCronTimeDTO): string;
}
