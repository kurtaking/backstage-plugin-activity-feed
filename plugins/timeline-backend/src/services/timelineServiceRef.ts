import {
  createServiceRef,
  createServiceFactory,
  coreServices,
} from '@backstage/backend-plugin-api';
import { Expand } from '@backstage/types';
import { TimelineService } from './TimelineService';
import { DefaultTimelineService } from './DefaultTimelineService';

export const timelineServiceRef = createServiceRef<Expand<TimelineService>>({
  id: 'timeline',
  defaultFactory: async service =>
    createServiceFactory({
      service,
      deps: {
        logger: coreServices.logger,
      },
      async factory(deps) {
        return DefaultTimelineService.create(deps);
      },
    }),
});
