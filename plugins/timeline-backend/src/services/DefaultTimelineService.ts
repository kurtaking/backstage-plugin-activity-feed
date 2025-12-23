import { LoggerService } from '@backstage/backend-plugin-api';
import { TimelineItem, TimelineService } from './TimelineService';

export class DefaultTimelineService implements TimelineService {
  readonly #logger: LoggerService;

  static create(options: { logger: LoggerService }) {
    return new DefaultTimelineService(options.logger);
  }

  private constructor(logger: LoggerService) {
    this.#logger = logger;
  }

  async listTimelineItems(): Promise<{ items: TimelineItem[] }> {
    this.#logger.info('Placeholder service method called');
    return {
      items: [
        {
          id: '1',
          title: 'Hello, world!',
        },
      ],
    };
  }
}
