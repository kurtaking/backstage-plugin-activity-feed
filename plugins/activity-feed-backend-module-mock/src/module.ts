import { createBackendModule } from '@backstage/backend-plugin-api';
import {
  ActivityFeedDataProvider,
  ActivityFeedItem,
  ActivityFeedQuery,
  activityFeedExtensionPoint,
} from '@kurtaking/backstage-plugin-activity-feed-node';

const mockItems: ActivityFeedItem[] = [
  {
    id: 'mock:1',
    source: 'mock',
    type: 'announcement',
    timestamp: new Date('2025-01-15T10:00:00Z'),
    title: 'Welcome to the Activity Feed',
    description:
      'This is a mock announcement to test the activity-feed plugin.',
    severity: 'info',
  },
  {
    id: 'mock:2',
    source: 'mock',
    type: 'notification',
    timestamp: new Date('2025-01-15T09:30:00Z'),
    title: 'Build succeeded',
    description: 'Your service "backend-api" built successfully.',
    severity: 'success',
    link: '/catalog/default/component/backend-api',
    entityRef: 'component:default/backend-api',
  },
  {
    id: 'mock:3',
    source: 'mock',
    type: 'notification',
    timestamp: new Date('2025-01-15T09:00:00Z'),
    title: 'Security vulnerability detected',
    description: 'CVE-2025-1234 affects lodash@4.17.20 in frontend-app.',
    severity: 'error',
    link: '/catalog/default/component/frontend-app',
    entityRef: 'component:default/frontend-app',
  },
  {
    id: 'mock:4',
    source: 'mock',
    type: 'todo',
    timestamp: new Date('2025-01-14T16:00:00Z'),
    title: 'TODO: Refactor authentication module',
    description: 'packages/backend/src/auth.ts:42',
    severity: 'warning',
  },
  {
    id: 'mock:5',
    source: 'mock',
    type: 'announcement',
    timestamp: new Date('2025-01-14T12:00:00Z'),
    title: 'Scheduled maintenance this weekend',
    description: 'Backstage will be unavailable Saturday 2am-4am UTC.',
    severity: 'warning',
  },
];

class MockActivityFeedDataProvider implements ActivityFeedDataProvider {
  readonly id = 'mock';
  readonly displayName = 'Mock Data';

  async getItems(query: ActivityFeedQuery): Promise<ActivityFeedItem[]> {
    let items = [...mockItems];

    if (query.since) {
      items = items.filter(item => item.timestamp > query.since!);
    }

    if (query.types?.length) {
      items = items.filter(item => query.types!.includes(item.type));
    }

    if (query.limit) {
      items = items.slice(0, query.limit);
    }

    return items;
  }
}

/**
 * Activity feed module that provides mock data for testing.
 *
 * @public
 */
export const activityFeedModuleMock = createBackendModule({
  pluginId: 'activity-feed',
  moduleId: 'mock',
  register(env) {
    env.registerInit({
      deps: {
        activityFeed: activityFeedExtensionPoint,
      },
      async init({ activityFeed }) {
        activityFeed.addDataProvider(new MockActivityFeedDataProvider());
      },
    });
  },
});
