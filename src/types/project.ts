export interface ProjectTag {
  id: string;
  tag: string;
}

export interface Project {
  id: string;
  title: string;
  duration: string;
  overview: string;
  description: string; // raw HTML
  status: string; // "UPCOMING" | "ONGOING" | "COMPLETED" etc.
  bannerImageUrl: string;
  bannerImageId?: string;
  isDraft?: boolean;
  tags: ProjectTag[];
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface ProjectResponse {
  data: Project[];
  meta?: { count: number };
}
