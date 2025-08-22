import type { NewsResponse } from '../types/news';
import { API_BASE_URL, ApiError, handleResponse } from './index';

export const fetchNews = async (): Promise<NewsResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/news`, {
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
    throw new ApiError(
      500,
      `Failed to fetch news data: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};
