export interface BlogTag {
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

export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  readingTime: string;
  publishedDate: string;
  isDraft?: boolean;
  isFeatured?: boolean;
  bannerImageUrl: string;
  bannerImageId?: string;
  contentImageUrl?: string;
  contentImageId?: string;
  authorImageUrl?: string;
  tags: BlogTag[] | string[];
  contributedBy?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface BlogResponse {
  data: Blog[];
  meta?: {
    count: number;
  };
}