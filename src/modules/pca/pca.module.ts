import { Module } from '@nestjs/common';

// CONTROLLERS
import { PcaController } from './pca.controller';

// PROVIDERS
import { PcaProvider } from './pca.provider';

@Module({
	controllers: [PcaController],
	providers: PcaProvider,
})
export class PcaModule {}
