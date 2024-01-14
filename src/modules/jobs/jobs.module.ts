import { Global, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

// PROVIDERS
import { JobsProvider } from './jobs.provider';

@Global()
@Module({
	imports: [ScheduleModule.forRoot()],
	providers: JobsProvider,
	exports: JobsProvider,
})
export class JobsModule {}
