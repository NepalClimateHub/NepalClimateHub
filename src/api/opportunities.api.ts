import type {
  Opportunity,
  OpportunityResponse,
  OpportunitySummaryResponse,
} from '../types/opportunity';
import { API_BASE_URL, ApiError, handleResponse } from './index';

export const fetchOpportunities = async (): Promise<OpportunityResponse> => {
  if (!API_BASE_URL) {
    throw new ApiError(
      500,
      'API_BASE_URL is not configured. Please set API_BASE_URL in your environment variables.'
    );
  }

  try {
    const url = `${API_BASE_URL}/api/v1/opportunities`;
    const response = await fetch(url, {
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
    // Check if it's a fetch error (usually means URL is invalid or network issue)
    if (error instanceof Error && error.message.includes('fetch failed')) {
      throw new ApiError(
        500,
        `Failed to fetch opportunities data: Invalid API URL or network error. API_BASE_URL: ${API_BASE_URL}`
      );
    }
    throw new ApiError(
      500,
      `Failed to fetch opportunities data: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
};

export const fetchOpportunitySummaries =
  async (): Promise<OpportunitySummaryResponse> => {
    if (!API_BASE_URL) {
      throw new ApiError(
        500,
        'API_BASE_URL is not configured. Please set API_BASE_URL in your environment variables.'
      );
    }

    const response = await fetch(
      `${API_BASE_URL}/api/v1/opportunities?view=summary`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    return handleResponse<OpportunitySummaryResponse>(response);
  };

export const fetchOpportunityById = async (
  id: string
): Promise<{
  data: Opportunity;
}> => {
  if (!API_BASE_URL) {
    throw new ApiError(
      500,
      'API_BASE_URL is not configured. Please set API_BASE_URL in your environment variables.'
    );
  }

  try {
    const url = `${API_BASE_URL}/api/v1/opportunities/${id}`;
    const response = await fetch(url);
    return handleResponse<{ data: Opportunity }>(response);
  } catch (error) {
    console.error(`Error fetching opportunity ${id}:`, error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      500,
      `Failed to fetch opportunity with ID ${id}: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
};
