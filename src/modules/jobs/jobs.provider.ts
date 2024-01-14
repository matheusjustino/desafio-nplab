import { Provider } from '@nestjs/common';

// ENUMS
import { JobsProviderEnum } from './enums/jobs-provider.enum';

// SERVICES
import { JobsService } from './jobs.service';

export const JobsProvider: Provider[] = [
	{
		provide: JobsProviderEnum.JOBS_SERVICE,
		useClass: JobsService,
	},
];
