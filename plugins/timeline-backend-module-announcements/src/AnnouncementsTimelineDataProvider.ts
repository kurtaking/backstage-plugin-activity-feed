import { AnnouncementsService } from "@backstage-community/plugin-announcements-node";
import { LoggerService } from "@backstage/backend-plugin-api";
import { TimelineDataProvider, TimelineQuery } from "@kurtaking/backstage-plugin-timeline-node";

export const createAnnouncementsTimelineDataProvider = (opts: { announcements: AnnouncementsService, logger: LoggerService }): TimelineDataProvider => {
  return {
    id: 'announcements',
    displayName: 'Announcements',
    getItems: async (query: TimelineQuery) => {
      const announcements = await opts.announcements.announcements();
      opts.logger.info('Getting announcements', { query: JSON.stringify(query) });

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
}
