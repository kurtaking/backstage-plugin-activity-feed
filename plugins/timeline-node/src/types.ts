export interface TimelineQuery {
  entityRef?: string;
  userRef?: string;
  sources?: string[];
  types?: string[];
  since?: Date;
  limit?: number;
}

export interface TimelineDataProvider {
  readonly id: string;
  readonly displayName: string;

  getItems(query: TimelineQuery): Promise<TimelineItem[]>;
}

export interface TimelineItem {
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

export interface TimelineService {
  timeline(): Promise<{ items: TimelineItem[] }>;
  listDataProviders(): Promise<TimelineDataProvider[]>;
}
