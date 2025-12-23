import {
  coreServices,
  createBackendModule,
} from '@backstage/backend-plugin-api';
import { announcementsServiceRef } from '@backstage-community/plugin-announcements-node';
import { timelineExtensionPoint } from '@kurtaking/backstage-plugin-timeline-node';
import { createAnnouncementsTimelineDataProvider } from './AnnouncementsTimelineDataProvider';

export const timelineModuleAnnouncements = createBackendModule({
  pluginId: 'timeline',
  moduleId: 'announcements',
  register(reg) {
    reg.registerInit({
      deps: { logger: coreServices.logger, announcements: announcementsServiceRef, timeline: timelineExtensionPoint },
      async init({ logger, announcements, timeline }) {
        timeline.addDataProvider(createAnnouncementsTimelineDataProvider({
          announcements,
          logger,
        }));
      },
    });
  },
});
