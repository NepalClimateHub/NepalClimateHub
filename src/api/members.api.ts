import type { Member, MembersResponse } from '../types/member';
import { API_BASE_URL, ApiError, handleResponse } from './index';

interface StaffCategory {
  name: string;
  members: Member[];
}

interface Members {
  staff: {
    categories: StaffCategory[];
  };
  volunteers: Member[];
}

const CATEGORY_ORDER = [
  'Leadership',
  'Climate Communication',
  'Tech',
  'Board',
  'Advisors',
];

export const fetchMembers = async (): Promise<Members> => {
  if (!API_BASE_URL) {
    throw new ApiError(
      500,
      'API_BASE_URL is not configured. Please set API_BASE_URL in your environment variables.'
    );
  }

  try {
    const url = `${API_BASE_URL}/api/v1/members`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const membersResponse = await handleResponse<MembersResponse>(response);

    const staffMembers = membersResponse.data.filter(
      (member) => member.status.toLowerCase() !== 'volunteer'
    );

    const volunteers = membersResponse.data.filter(
      (member) => member.status.toLowerCase() === 'volunteer'
    );

    const categories = Object.values(
      staffMembers.reduce<Record<string, StaffCategory>>((acc, member) => {
        const categoryName = member.team;

        if (!acc[categoryName]) {
          acc[categoryName] = {
            name: categoryName,
            members: [],
          };
        }

        acc[categoryName].members.push(member);

        return acc;
      }, {})
    ).sort((a, b) => {
      const aIndex = CATEGORY_ORDER.indexOf(a.name);
      const bIndex = CATEGORY_ORDER.indexOf(b.name);

      return (
        (aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex) -
        (bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex)
      );
    });

    return {
      staff: {
        categories,
      },
      volunteers,
    };
  } catch (error) {
    console.error('Error fetching members:', error);

    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error && error.message.includes('fetch failed')) {
      throw new ApiError(
        500,
        'Failed to load members. Please try again later.'
      );
    }

    throw new ApiError(
      500,
      `Failed to fetch members data: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
};
