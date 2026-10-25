import type {
  ResourceResponse,
  ResourceSummary,
  ResourceSummaryResponse,
} from '../types/resource';
import { API_BASE_URL, ApiError, fetchAllPages, handleResponse } from './index';

export const fetchAllResources = async (): Promise<ResourceResponse> => {
  if (!API_BASE_URL) {
    throw new ApiError(
      500,
      'API_BASE_URL is not configured. Please set API_BASE_URL in your environment variables.'
    );
  }

  try {
    const url = `${API_BASE_URL}/api/v1/resources`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return handleResponse<ResourceResponse>(response);
  } catch (error) {
    console.error('Error fetching all resources:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    // Check if it's a fetch error (usually means URL is invalid or network issue)
    if (error instanceof Error && error.message.includes('fetch failed')) {
      throw new ApiError(
        500,
        `Failed to fetch all resources data: Invalid API URL or network error. API_BASE_URL: ${API_BASE_URL}`
      );
    }
    throw new ApiError(
      500,
      `Failed to fetch all resources data: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

export interface ResourceSummaryOptions {
  limit?: number;
  offset?: number;
}

export const fetchResourceSummaries = async (
  options: ResourceSummaryOptions = {}
): Promise<ResourceSummaryResponse> => {
  if (!API_BASE_URL) {
    throw new ApiError(
      500,
      'API_BASE_URL is not configured. Please set API_BASE_URL in your environment variables.'
    );
  }

  const params = new URLSearchParams({ view: 'summary' });
  if (options.limit !== undefined) params.set('limit', String(options.limit));
  if (options.offset !== undefined) {
    params.set('offset', String(options.offset));
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/resources?${params}`, {
    method: 'GET',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  });
  return handleResponse<ResourceSummaryResponse>(response);
};

export const fetchAllResourceSummaries = async (): Promise<ResourceSummary[]> =>
  fetchAllPages<ResourceSummary>((opts) => fetchResourceSummaries(opts));
