import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { TimelineDataProvider, timelineExtensionPoint } from '@kurtaking/backstage-plugin-timeline-node';
import { createRouter } from './router';
import { DefaultTimelineService } from './services/DefaultTimelineService';

/**
 * timelinePlugin backend plugin
 *
 * @public
 */
export const timelinePlugin = createBackendPlugin({
  pluginId: 'timeline',
  register(env) {
    const dataProviders = new Array<TimelineDataProvider>();

    env.registerExtensionPoint(timelineExtensionPoint, {
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
        const timelineService = DefaultTimelineService.create({
          logger,
          dataProviders,
        });

        httpRouter.use(
          await createRouter({
            httpAuth,
            timelineService,
          }),
        );
      },
    });
  },
});
