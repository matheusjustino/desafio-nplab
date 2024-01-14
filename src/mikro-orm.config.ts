import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { defineConfig } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Migrator } from '@mikro-orm/migrations';
import { PostgreSqlOptions } from '@mikro-orm/postgresql/PostgreSqlMikroORM';

const logger: Logger = new Logger('DatabaseModule');

const config: PostgreSqlOptions = {
	colors: true,
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	dbName: process.env.DB_NAME,
	highlighter: new SqlHighlighter(),
	debug: process.env.NODE_ENV !== 'production',
	logger: logger.verbose.bind(logger),
	entities: ['dist/modules/database/entities/*.entity.js'],
	entitiesTs: ['src/modules/database/entities/*.entity.ts'],
	metadataProvider: TsMorphMetadataProvider,
	extensions: [Migrator],
	migrations: {
		tableName: 'mikro_orm_migrations',
		path: 'dist/modules/database/migrations',
		pathTs: 'src/modules/database/migrations',
		glob: '!(*.d).{js,ts}',
		transactional: true,
		disableForeignKeys: false,
		allOrNothing: true,
		dropTables: true,
		safe: false,
		snapshot: true,
		emit: 'ts',
	},
	seeder: {
		path: 'dist/modules/database/seeders',
		pathTs: 'src/modules/database/seeders',
		defaultSeeder: 'DatabaseSeeder',
		glob: '!(*.d).{js,ts}',
		emit: 'ts',
	},
	pool: {
		min: 0,
		max: 4,
		acquireTimeoutMillis: 300000,
		idleTimeoutMillis: 30000,
		reapIntervalMillis: 1000,
	},
};

export default defineConfig(config);
