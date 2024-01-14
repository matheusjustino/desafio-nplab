import { Global, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

// PROVIDERS
import { DatabaseProvider } from './database.provider';

// ENTITIES
import { PCAEntity } from './entities/pca.entity';
import { ScheduleEntity } from './entities/schedule.entity';

@Global()
@Module({
	imports: [
		MikroOrmModule.forRoot(),
		MikroOrmModule.forFeature({
			entities: [PCAEntity, ScheduleEntity],
		}),
	],
	providers: DatabaseProvider,
	exports: DatabaseProvider,
})
export class DatabaseModule {}
