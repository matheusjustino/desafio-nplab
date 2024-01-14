import { Migration } from '@mikro-orm/migrations';

export class Migration20240110230547 extends Migration {
	async up(): Promise<void> {
		this.addSql(
			'create table "pca" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "year" varchar(255) not null, "status" text check ("status" in (\'A iniciar\', \'Vigente\', \'Concluído\')) not null default \'A iniciar\', "identification" varchar(255) not null, "amount" int not null default 0, "items_qty" int not null default 0, constraint "pca_pkey" primary key ("id"));',
		);
	}
}
