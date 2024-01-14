import { Provider } from '@nestjs/common';

// ENUMS
import { DatabaseProviderEnum } from './enums/database-provider.enum';

// REPOSITORIES
import { PCARepository } from './repositories/pca.repository';
import { ScheduleRepository } from './repositories/schedule.repository';

export const DatabaseProvider: Provider[] = [
	{
		provide: DatabaseProviderEnum.PCA_REPOSITORY,
		useClass: PCARepository,
	},
	{
		provide: DatabaseProviderEnum.SCHEDULE_REPOSITORY,
		useClass: ScheduleRepository,
	},
];
