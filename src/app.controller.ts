import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

// SERVICES
import { AppService } from './app.service';

@ApiTags(`[APP]`)
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@ApiOkResponse({
		type: String,
		status: `2XX`,
	})
	@Get()
	public checkServer(): string {
		return this.appService.checkServer();
	}
}
