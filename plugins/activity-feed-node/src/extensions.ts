import { createExtensionPoint } from '@backstage/backend-plugin-api';
import { ActivityFeedDataProvider } from './types';

export interface ActivityFeedExtensionPoint {
  addDataProvider(provider: ActivityFeedDataProvider): void;
}

export const activityFeedExtensionPoint =
  createExtensionPoint<ActivityFeedExtensionPoint>({
    id: 'activity-feed.activity-feed',
  });
