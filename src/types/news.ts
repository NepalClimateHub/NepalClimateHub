export interface NewsTag {
  id: string;
  tag: string;
  isUserTag: boolean;
  isOrganizationTag: boolean;
  isEventTag: boolean;
  isNewsTag: boolean;
  isOpportunityTag: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  mode: string;
  publishedDate: string;
  publishedYear: string;
  newsLink: string;
  bannerImageUrl: string;
  bannerImageId: string;
  tags: NewsTag[];
  contributedBy: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isDraft: boolean;
}

export interface NewsResponse {
  data: NewsItem[];
  meta: {
    count: number;
  };
}
