import { Provider } from '@nestjs/common';

// ENUMS
import { PCAProviderEnum } from './enums/pca-provider.enum';

// SERVICES
import { PcaService } from './pca.service';

export const PcaProvider: Provider[] = [
	{
		provide: PCAProviderEnum.PCA_SERVICE,
		useClass: PcaService,
	},
];
