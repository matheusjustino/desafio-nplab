import {
	BadRequestException,
	Inject,
	Injectable,
	Logger,
} from '@nestjs/common';
import * as puppeteer from 'puppeteer';

// ENUMS
import { PCAStatusEnum } from './enums/pca-status.enum';
import { JobsProviderEnum } from '../jobs/enums/jobs-provider.enum';
import { DatabaseProviderEnum } from '../database/enums/database-provider.enum';

// ENTITIES
import { ScheduleEntity } from '../database/entities/schedule.entity';

// INTERFACES
import { IPCAService } from './interfaces/pca-service.interface';
import { IJobsService } from '../jobs/interfaces/jobs-service.interface';
import { IPCARepository } from '../database/interfaces/pca-repository.interface';
import { IScheduleRepository } from '../database/interfaces/schedule-repository.interface';

// DTOS
import { PcaDTO } from './dtos/pca.dto';
import { ScheduleJobPcaDTO } from './dtos/schedule-job-pca.dto';

@Injectable()
export class PcaService implements IPCAService {
	private readonly logger: Logger = new Logger(PcaService.name);
	private readonly url = 'https://www.bpsaude.com.br/Transparencia/';
	private readonly searchTerm = 'cliente de testes';

	constructor(
		@Inject(DatabaseProviderEnum.PCA_REPOSITORY)
		private readonly pcaRepository: IPCARepository,
		@Inject(DatabaseProviderEnum.SCHEDULE_REPOSITORY)
		private readonly scheduleRepository: IScheduleRepository,
		@Inject(JobsProviderEnum.JOBS_SERVICE)
		private readonly jobsService: IJobsService,
	) {}

	public async crawl(): Promise<PcaDTO[]> {
		const browser = await puppeteer.launch({
			headless: true,
			executablePath: process.env.CHROME_BIN,
			args: ['--no-sandbox', '--disable-setuid-sandbox'],
		});
		const page = await browser.newPage();

		try {
			await page.goto(this.url, {
				waitUntil: 'networkidle0',
			});
			this.logger.log(`Page content loaded`);

			await page.waitForSelector('#input-pesquisa-orgao');
			await page.type('#input-pesquisa-orgao', this.searchTerm);
			this.logger.log(`Search input filled`);

			await page.keyboard.press('Enter');
			this.logger.log(`Search button pressed`);

			await Promise.all([
				page.waitForNavigation({
					waitUntil: ['load', 'networkidle0'],
				}),
				page.waitForSelector('td > a').then(() => page.click('td > a')),
			]);
			this.logger.log(`PCA list page loaded`);

			const result = await this.getPCAInformation(page);

			this.logger.log(`Saving data...`);
			await Promise.all(
				result.map((pca) => {
					const entity = this.pcaRepository.entity.create(pca);
					return this.pcaRepository.em.persistAndFlush(entity);
				}),
			);

			return result;
		} catch (error) {
			this.logger.error(error);
			throw new BadRequestException(
				'Error while scraping pca information',
			);
		} finally {
			await browser.close();
		}
	}

	public async scheduleCrawl({
		jobName = 'BP Saude Crawler',
		cronTime,
	}: ScheduleJobPcaDTO) {
		this.logger.log(`PcaService:ScheduleCrawl`);

		await this.scheduleRepository.em
			.transactional(async (em) => {
				const data = {
					jobName,
					cronTime: this.jobsService.buildCronTime(
						cronTime ?? { second: '*/15' },
					),
				};

				const scheduleEntity = em.create(ScheduleEntity, {
					jobName: data.jobName,
					jobPayload: data.cronTime,
				});
				await em.persistAndFlush(scheduleEntity);
				await em.commit();

				this.jobsService.scheduleJob(data, () => this.crawl());
			})
			.catch((error) => {
				this.removeScheduleCrawl(jobName);
				throw error;
			});

		return jobName;
	}

	public async removeScheduleCrawl(jobName: string): Promise<void> {
		await this.scheduleRepository.entity.nativeDelete({
			jobName,
		});
		this.jobsService.turnOffJob(jobName);
	}

	private async getPCAInformation(page: puppeteer.Page) {
		this.logger.log(`PCA Service:GetPCAInformation`);

		return await page.evaluate(() => {
			const tableRows = Array.from(
				document.querySelectorAll('.table tbody tr'),
			);

			return tableRows.map((row) => {
				const columns = Array.from(row.querySelectorAll('td'));
				const numericString = columns[3].textContent
					?.trim()
					.replace(/[^\d,]/g, '');
				const numericValue = numericString
					? parseFloat(numericString.replace(',', '.'))
					: 0;

				return {
					year: columns[0].textContent?.trim(),
					status: columns[1].textContent?.trim() as PCAStatusEnum,
					identification: columns[2].textContent?.trim(),
					amount: numericValue,
					itemsQty: Number(columns[4].textContent?.trim()),
				} as PcaDTO;
			});
		});
	}
}
