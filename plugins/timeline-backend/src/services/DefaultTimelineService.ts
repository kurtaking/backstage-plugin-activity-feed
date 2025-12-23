import { LoggerService } from '@backstage/backend-plugin-api';
import { TimelineDataProvider, TimelineItem, TimelineService } from '@kurtaking/backstage-plugin-timeline-node';

export class DefaultTimelineService implements TimelineService {
  readonly #logger: LoggerService;
  readonly #dataProviders: TimelineDataProvider[];

  static create(opts: { logger: LoggerService, dataProviders: TimelineDataProvider[] }) {
    return new DefaultTimelineService(opts.logger, opts.dataProviders);
  }

  private constructor (logger: LoggerService, dataProviders: TimelineDataProvider[]) {
    this.#logger = logger;
    this.#dataProviders = dataProviders;
  }

  async listDataProviders(): Promise<TimelineDataProvider[]> {
    return this.#dataProviders;
  }

  async timeline(): Promise<{ items: TimelineItem[] }> {
    const results = await Promise.allSettled(
      this.#dataProviders.map(provider => provider.getItems({}))
    );

    const items: TimelineItem[] = [];
    for (const result of results) {
      if (result.status === 'fulfilled') {
        items.push(...result.value);
      } else {
        this.#logger.error('Provider failed', { error: result.reason });
      }
    }

    return { items };
  }
}
