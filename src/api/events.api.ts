import type {
  Event,
  EventResponse,
  EventSummary,
  EventSummaryResponse,
} from '../types/event';
import { API_BASE_URL, ApiError, handleResponse } from './index';

export const fetchEvents = async (): Promise<EventResponse> => {
  if (!API_BASE_URL) {
    throw new ApiError(
      500,
      'API_BASE_URL is not configured. Please set API_BASE_URL in your environment variables.'
    );
  }

  try {
    const url = `${API_BASE_URL}/api/v1/events`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return handleResponse<EventResponse>(response);
  } catch (error) {
    console.error('Error fetching events:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    // Check if it's a fetch error (usually means URL is invalid or network issue)
    if (error instanceof Error && error.message.includes('fetch failed')) {
      throw new ApiError(
        500,
        `Failed to fetch events data: Invalid API URL or network error. API_BASE_URL: ${API_BASE_URL}`
      );
    }
    throw new ApiError(
      500,
      `Failed to fetch events data: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
};

export interface EventSummaryOptions {
  limit?: number;
  offset?: number;
}

export const fetchEventSummaries = async (
  options: EventSummaryOptions = {}
): Promise<EventSummaryResponse> => {
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

  const response = await fetch(`${API_BASE_URL}/api/v1/events?${params}`, {
    method: 'GET',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  });
  return handleResponse<EventSummaryResponse>(response);
};

const FETCH_ALL_BATCH_SIZE = 100;

export const fetchAllEventSummaries = async (): Promise<EventSummary[]> => {
  const all: EventSummary[] = [];
  let offset = 0;
  let total = Number.POSITIVE_INFINITY;

  while (all.length < total) {
    const { data, meta } = await fetchEventSummaries({
      limit: FETCH_ALL_BATCH_SIZE,
      offset,
    });
    total = meta?.count ?? all.length + data.length;
    if (data.length === 0) break;
    all.push(...data);
    offset += FETCH_ALL_BATCH_SIZE;
  }

  return all;
};

export const fetchEventById = async (
  id: string
): Promise<{
  data: Event;
}> => {
  if (!API_BASE_URL) {
    throw new ApiError(
      500,
      'API_BASE_URL is not configured. Please set API_BASE_URL in your environment variables.'
    );
  }

  try {
    const url = `${API_BASE_URL}/api/v1/events/${id}`;
    const response = await fetch(url);
    return handleResponse<{ data: Event }>(response);
  } catch (error) {
    console.error(`Error fetching event ${id}:`, error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      500,
      `Failed to fetch event with ID ${id}: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
};
