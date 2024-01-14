import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

// ENUMS
import { PCAProviderEnum } from './enums/pca-provider.enum';

// INTERFACES
import { IPCAService } from './interfaces/pca-service.interface';

// DTOS
import { PcaDTO } from './dtos/pca.dto';
import { ScheduleJobPcaDTO } from './dtos/schedule-job-pca.dto';

@ApiTags('[PCA]')
@Controller('pca')
export class PcaController {
	constructor(
		@Inject(PCAProviderEnum.PCA_SERVICE)
		private readonly pcaService: IPCAService,
	) {}

	@ApiOkResponse({
		type: [PcaDTO],
		status: '2XX',
	})
	@Get('crawl')
	public async crawlWebsite() {
		return this.pcaService.crawl();
	}

	@ApiOkResponse({
		type: String,
		status: '2XX',
	})
	@Post('schedule/crawl')
	public scheduleCrawlJob(@Body() body: ScheduleJobPcaDTO) {
		return this.pcaService.scheduleCrawl(body);
	}

	@ApiOkResponse({
		status: '2XX',
	})
	@Delete('schedule/crawl/:jobName')
	public removeScheduleCrawl(@Param('jobName') jobName: string) {
		return this.pcaService.removeScheduleCrawl(jobName);
	}
}
