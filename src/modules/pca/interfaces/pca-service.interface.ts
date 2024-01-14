// DTOS
import { PcaDTO } from '../dtos/pca.dto';
import { ScheduleJobPcaDTO } from '../dtos/schedule-job-pca.dto';

export interface IPCAService {
	crawl(): Promise<PcaDTO[]>;
	scheduleCrawl(data: ScheduleJobPcaDTO): void;
	removeScheduleCrawl(jobName: string): void;
}
