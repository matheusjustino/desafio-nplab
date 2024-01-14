import { Migration } from '@mikro-orm/migrations';

export class Migration20240111221514_addScheduleEntity extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "schedules" ("id" uuid not null, "created_at" timestamptz null, "updated_at" timestamptz null, "job_name" varchar(255) not null, "job_payload" jsonb not null, constraint "schedules_pkey" primary key ("id"));');

    this.addSql('alter table "pca" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "pca" alter column "created_at" drop not null;');
    this.addSql('alter table "pca" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "pca" alter column "updated_at" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "schedules" cascade;');

    this.addSql('alter table "pca" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "pca" alter column "created_at" set not null;');
    this.addSql('alter table "pca" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
    this.addSql('alter table "pca" alter column "updated_at" set not null;');
  }

}
