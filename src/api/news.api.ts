import type { NewsResponse } from '../types/news';
import { API_BASE_URL, ApiError, handleResponse } from './index';

export const fetchNews = async (): Promise<NewsResponse> => {
  if (!API_BASE_URL) {
    throw new ApiError(
      500,
      'API_BASE_URL is not configured. Please set API_BASE_URL in your environment variables.'
    );
  }

  try {
    const url = `${API_BASE_URL}/api/v1/news`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return handleResponse<NewsResponse>(response);
  } catch (error) {
    console.error('Error fetching news:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    // Check if it's a fetch error (usually means URL is invalid or network issue)
    if (error instanceof Error && error.message.includes('fetch failed')) {
      throw new ApiError(
        500,
        `Failed to fetch news data: Invalid API URL or network error. API_BASE_URL: ${API_BASE_URL}`
      );
    }
    throw new ApiError(
      500,
      `Failed to fetch news data: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};
