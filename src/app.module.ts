import { Module } from '@nestjs/common';

// CONTROLLERS
import { AppController } from './app.controller';

// SERVICES
import { AppService } from './app.service';

// MODULES
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
