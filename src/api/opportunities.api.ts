import type { Opportunity, OpportunityResponse } from '../types/opportunity';
import { API_BASE_URL, ApiError, handleResponse } from './index';

export const fetchOpportunities = async (): Promise<OpportunityResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/opportunities`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return handleResponse<OpportunityResponse>(response);
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      500,
      `Failed to fetch opportunities data: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

export const fetchOpportunityById = async (
  id: string
): Promise<{
  data: Opportunity;
}> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/opportunities/${id}`);
  if (!response.ok) {
    console.error(`Error fetching opportunity ${id}: ${response.statusText}`);
    throw new Error(`Failed to fetch opportunity with ID ${id}`);
  }
  const data = await response.json();
  return data;
};
