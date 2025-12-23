import { LoggerService } from '@backstage/backend-plugin-api';
import {
  ActivityFeedDataProvider,
  ActivityFeedItem,
  ActivityFeedService,
} from '../../../activity-feed-node/src';

export class DefaultActivityFeedService implements ActivityFeedService {
  readonly #logger: LoggerService;
  readonly #dataProviders: ActivityFeedDataProvider[];

  static create(opts: {
    logger: LoggerService;
    dataProviders: ActivityFeedDataProvider[];
  }) {
    return new DefaultActivityFeedService(opts.logger, opts.dataProviders);
  }

  private constructor(
    logger: LoggerService,
    dataProviders: ActivityFeedDataProvider[],
  ) {
    this.#logger = logger;
    this.#dataProviders = dataProviders;
  }

  async listDataProviders(): Promise<ActivityFeedDataProvider[]> {
    return this.#dataProviders;
  }

  async activityFeed(): Promise<{ items: ActivityFeedItem[] }> {
    const results = await Promise.allSettled(
      this.#dataProviders.map(provider => provider.getItems({})),
    );

    const items: ActivityFeedItem[] = [];
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
