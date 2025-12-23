import express from 'express';
import Router from 'express-promise-router';
import { HttpAuthService } from '@backstage/backend-plugin-api';
import { ActivityFeedService } from '../../activity-feed-node/src';

type CreateRouterOptions = {
  httpAuth: HttpAuthService;
  activityFeedService: ActivityFeedService;
};

export async function createRouter({
  httpAuth,
  activityFeedService,
}: CreateRouterOptions): Promise<express.Router> {
  const router = Router();
  router.use(express.json());

  router.get('/', async (req, res) => {
    const credentials = await httpAuth.credentials(req, { allow: ['user'] });
    const userEntityRef = credentials.principal.userEntityRef;

    if (!userEntityRef) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { items } = await activityFeedService.activityFeed();

    res.status(200).json({
      activityFeed: items,
    });
  });

  router.get('/data-providers', async (_req, res) => {
    const dataProviders = await activityFeedService.listDataProviders();
    res.status(200).json({
      dataProviders,
    });
  });

  return router;
}
