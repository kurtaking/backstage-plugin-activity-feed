import {
  coreServices,
  createBackendModule,
} from '@backstage/backend-plugin-api';
import { announcementsServiceRef } from '@backstage-community/plugin-announcements-node';
import { activityFeedExtensionPoint } from '@kurtaking/backstage-plugin-activity-feed-node';

import { createAnnouncementsActivityFeedDataProvider } from './AnnouncementsActivityFeedDataProvider';

export const activityFeedModuleAnnouncements = createBackendModule({
  pluginId: 'activity-feed',
  moduleId: 'announcements',
  register(reg) {
    reg.registerInit({
      deps: {
        activityFeed: activityFeedExtensionPoint,
        announcements: announcementsServiceRef,
        logger: coreServices.logger,
      },
      async init({ logger, announcements, activityFeed }) {
        activityFeed.addDataProvider(
          createAnnouncementsActivityFeedDataProvider({
            announcements,
            logger,
          }),
        );
      },
    });
  },
});
