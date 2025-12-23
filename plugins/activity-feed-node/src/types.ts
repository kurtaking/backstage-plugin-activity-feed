export interface ActivityFeedQuery {
  entityRef?: string;
  userRef?: string;
  sources?: string[];
  types?: string[];
  since?: Date;
  limit?: number;
}

export interface ActivityFeedDataProvider {
  readonly id: string;
  readonly displayName: string;

  getItems(query: ActivityFeedQuery): Promise<ActivityFeedItem[]>;
}

export interface ActivityFeedItem {
  id: string;
  source: string;
  type: string;
  timestamp: Date;
  title: string;
  description: string;
  severity: string;
  link?: string;
  entityRef?: string;
}

export interface ActivityFeedService {
  activityFeed(): Promise<{ items: ActivityFeedItem[] }>;
  listDataProviders(): Promise<ActivityFeedDataProvider[]>;
}
