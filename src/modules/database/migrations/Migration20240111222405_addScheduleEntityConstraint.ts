import { Migration } from '@mikro-orm/migrations';

export class Migration20240111222405_addScheduleEntityConstraint extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "schedules" add constraint "schedules_job_name_unique" unique ("job_name");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "schedules" drop constraint "schedules_job_name_unique";');
  }

}
