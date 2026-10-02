import type { NewsItem, NewsResponse } from '../types/news';
import { API_BASE_URL, ApiError, fetchAllPages, handleResponse } from './index';

export interface NewsOptions {
  limit?: number;
  offset?: number;
}

export const fetchNews = async (
  options: NewsOptions = {}
): Promise<NewsResponse> => {
  if (!API_BASE_URL) {
    throw new ApiError(
      500,
      'API_BASE_URL is not configured. Please set API_BASE_URL in your environment variables.'
    );
  }

  try {
    const params = new URLSearchParams();
    if (options.limit !== undefined) params.set('limit', String(options.limit));
    if (options.offset !== undefined) {
      params.set('offset', String(options.offset));
    }
    const query = params.toString();
    const url = `${API_BASE_URL}/api/v1/news${query ? `?${query}` : ''}`;
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
      `Failed to fetch news data: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
};

export const fetchAllNews = async (): Promise<NewsItem[]> =>
  fetchAllPages<NewsItem>((opts) => fetchNews(opts));
