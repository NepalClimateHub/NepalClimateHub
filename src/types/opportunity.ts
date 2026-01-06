export interface OpportunityTag {
  id: string;
  tag: string;
  isUserTag?: boolean;
  isOrganizationTag?: boolean;
  isEventTag?: boolean;
  isNewsTag?: boolean;
  isOpportunityTag?: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface Opportunity {
  id: string | number;
  title: string;
  type: string;
  locationType: string;
  province: string;
  status: string;
  format: string;
  cost: string;
  organizer: string;
  description: string;
  category: string[];
  bannerImage: string;
  applicationDeadline: string;
  duration: string;
  applicationDetail: string;
  contactEmail: string;
  website: string;
  socials: {
    facebook: string;
    linkedin: string;
    instagram: string;
  };
  contributedBy: string;
  websiteUrl?: string;
  applicationLink?: string;
  bannerImageUrl?: string;
  publishedDate?: string;
  address?: {
    state: string;
    // Add other address properties if known
  };
  tags?: OpportunityTag[];
}

export interface OpportunityResponse {
  data: Opportunity[];
  meta: {
    count: number;
    // Add other meta properties if known
  };
}

export interface SingleOpportunityResponse {
  data: Opportunity;
  meta: any; // Adjust meta type if known
}
