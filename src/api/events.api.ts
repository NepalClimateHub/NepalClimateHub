import type { Event, EventResponse } from '../types/event';
import { API_BASE_URL, ApiError, handleResponse } from './index';

export const fetchEvents = async (): Promise<EventResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/events`, {
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
    throw new ApiError(
      500,
      `Failed to fetch events data: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

export const fetchEventById = async (
  id: string
): Promise<{
  data: Event;
}> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/events/${id}`);
  if (!response.ok) {
    console.error(`Error fetching event ${id}: ${response.statusText}`);
    throw new Error(`Failed to fetch event with ID ${id}`);
  }
  const data = await response.json();
  return data;
};
