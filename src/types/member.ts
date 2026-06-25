export interface Member {
  id: string;
  name: string;
  email: string;
  currentAddress: string;
  permanentAddress: string;
  phoneNumber: string;
  linkedinProfile: string;
  photoUrl: string;
  photoId: string;
  bio: string;
  role: string;
  startDate: string;
  endDate: string | null;
  isActive: boolean;
  team: string;
  status: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface MembersResponse {
  data: Member[];
  meta: {
    count: number;
  };
}
