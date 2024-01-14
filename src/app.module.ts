import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './modules/database/database.module';
import { AppConfigModule } from './modules/app-config/app-config.module';
import { PcaModule } from './modules/pca/pca.module';
import { JobsModule } from './modules/jobs/jobs.module';

@Module({
	imports: [AppConfigModule, DatabaseModule, PcaModule, JobsModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
