import { createBackend } from '@backstage/backend-defaults';
import { mockServices } from '@backstage/backend-test-utils';
import { catalogServiceMock } from '@backstage/plugin-catalog-node/testUtils';

// This is the development setup for your plugin that wires up a
// minimal backend that can use both real and mocked plugins and services.
const backend = createBackend();

// TEMPLATE NOTE:
// Mocking the auth and httpAuth service allows you to call your plugin API without
// having to authenticate.
//
// If you want to use real auth, you can install the following instead:
//   backend.add(import('@backstage/plugin-auth-backend'));
//   backend.add(import('@backstage/plugin-auth-backend-module-guest-provider'));
backend.add(mockServices.auth.factory());
backend.add(mockServices.httpAuth.factory());

// Mock the catalog with a sample component
backend.add(
  catalogServiceMock.factory({
    entities: [
      {
        apiVersion: 'backstage.io/v1alpha1',
        kind: 'Component',
        metadata: {
          name: 'sample',
          title: 'Sample Component',
        },
        spec: {
          type: 'service',
        },
      },
    ],
  }),
);

backend.add(import('../src'));
// eslint-disable-next-line @backstage/no-relative-monorepo-imports
backend.add(import('../../timeline-backend-module-mock/src'))
// eslint-disable-next-line @backstage/no-relative-monorepo-imports
backend.add(import('../../timeline-backend-module-announcements/src'))

backend.start();
