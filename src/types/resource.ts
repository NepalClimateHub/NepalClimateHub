export interface Resource {
  id: string;
  title: string;
  overview: string;
  type: string;
  level: string;
  link: string;
  courseProvider: string | null;
  platform: string | null;
  duration: string | null;
  author: string | null;
  publicationYear: string | null;
  bannerImageUrl: string;
  bannerImageId: string;
  isDraft: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ResourceResponse {
  data: Resource[];
  meta: {
    count: number;
  };
}
