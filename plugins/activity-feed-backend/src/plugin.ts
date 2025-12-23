import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import {
  ActivityFeedDataProvider,
  activityFeedExtensionPoint,
} from '../../activity-feed-node/src';
import { createRouter } from './router';
import { DefaultActivityFeedService } from './services/DefaultActivityFeedService';

/**
 * activityFeedPlugin backend plugin
 *
 * @public
 */
export const activityFeedPlugin = createBackendPlugin({
  pluginId: 'activity-feed',
  register(env) {
    const dataProviders = new Array<ActivityFeedDataProvider>();

    env.registerExtensionPoint(activityFeedExtensionPoint, {
      addDataProvider(provider) {
        dataProviders.push(provider);
      },
    });

    env.registerInit({
      deps: {
        httpAuth: coreServices.httpAuth,
        httpRouter: coreServices.httpRouter,
        logger: coreServices.logger,
      },
      async init({ httpAuth, httpRouter, logger }) {
        const activityFeedService = DefaultActivityFeedService.create({
          logger,
          dataProviders,
        });

        httpRouter.use(
          await createRouter({
            httpAuth,
            activityFeedService,
          }),
        );
      },
    });
  },
});
