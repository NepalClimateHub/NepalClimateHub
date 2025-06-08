export interface EventAddress {
  id: string;
  street: string | null;
  country: string;
  city: string;
  state: string;
  postcode: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EventSocial {
  link: string;
  name: string;
}

export interface EventSocials {
  id: string;
  data: EventSocial[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EventTag {
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

export interface Event {
  id: string;
  title: string;
  organizer: string;
  description: string;
  location: string;
  locationType: string;
  type: string;
  format: string;
  contributedBy: string;
  startDate: string;
  registrationDeadline: string | null;
  registrationLink: string | null;
  contactEmail: string;
  status: string;
  cost: string | null;
  bannerImageUrl: string;
  bannerImageId: string;
  address: EventAddress;
  socials: EventSocials;
  tags: EventTag[];
  isDraft: boolean;
}

export interface EventResponse {
  data: Event[];
  meta: {
    count: number;
  };
}
