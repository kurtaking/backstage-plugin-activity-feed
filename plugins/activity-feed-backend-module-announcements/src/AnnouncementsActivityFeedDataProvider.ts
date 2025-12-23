import { AnnouncementsService } from '@backstage-community/plugin-announcements-node';
import { LoggerService } from '@backstage/backend-plugin-api';
import {
  ActivityFeedDataProvider,
  ActivityFeedQuery,
} from '@kurtaking/backstage-plugin-activity-feed-node';

export const createAnnouncementsActivityFeedDataProvider = (opts: {
  announcements: AnnouncementsService;
  logger: LoggerService;
}): ActivityFeedDataProvider => {
  return {
    id: 'announcements',
    displayName: 'Announcements',
    getItems: async (query: ActivityFeedQuery) => {
      const announcements = await opts.announcements.announcements();

      // todo: remove at some point
      opts.logger.info('Getting announcements', {
        query: JSON.stringify(query),
      });

      return announcements.map(({ id, created_at, title, body }) => ({
        id,
        source: 'announcements',
        type: 'announcement',
        timestamp: new Date(created_at),
        title,
        description: body,
        severity: 'info',
      }));
    },
  };
};
