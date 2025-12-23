import { createExtensionPoint } from "@backstage/backend-plugin-api";
import { TimelineDataProvider } from "./types";

export interface TimelineExtensionPoint {
  addDataProvider(provider: TimelineDataProvider): void;
}

export const timelineExtensionPoint =
  createExtensionPoint<TimelineExtensionPoint>({
    id: 'timeline.timeline',
  });
