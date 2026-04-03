export interface BlogTag {
  id: string;
  tag: string;
  isUserTag: boolean;
  isOrganizationTag: boolean;
  isEventTag: boolean;
  isNewsTag: boolean;
  isOpportunityTag: boolean;
  isBlogTag: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Author {
  id: string;
  linkedin?: string;
  currentRole?: string;
  fullName: string;
  email?: string;
  bio?: string;
  profilePhotoUrl?: string;
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
  isTopRead?: boolean;
  approvedByAdmin?: boolean;
  status: string;
  bannerImageUrl: string;
  bannerImageId?: string;
  tags: BlogTag[];
  authorUser?: Author;
  contributedBy?: string;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string | null;
  categoryId?: string;
  categoryData?: any;
}

export interface BlogResponse {
  data: Blog[];
  meta?: {
    count: number;
  };
}
