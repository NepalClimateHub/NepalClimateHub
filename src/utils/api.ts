import type { Event, EventResponse } from '../types/event';
import type { NewsResponse } from '../types/news';
import type { Opportunity, OpportunityResponse } from '../types/opportunity';

const API_BASE_URL = 'http://api.cms.nepalclimatehub.org';

if (!API_BASE_URL) {
  console.error('API_BASE_URL is not defined in environment variables');
}

class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error Response:', {
      status: response.status,
      statusText: response.statusText,
      body: errorText,
    });
    throw new ApiError(
      response.status,
      `API request failed with status ${response.status}: ${errorText}`
    );
  }
  return response.json();
}

export const fetchNews = async (): Promise<NewsResponse> => {
  try {
    console.log('Fetching news from:', `${API_BASE_URL}/api/v1/news`);
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

export const fetchEvents = async (): Promise<EventResponse> => {
  try {
    console.log('Fetching events from:', `${API_BASE_URL}/api/v1/events`);
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
  console.log(`Fetching event with ID: ${id}`);
  const response = await fetch(`${API_BASE_URL}/api/v1/events/${id}`);
  if (!response.ok) {
    console.error(`Error fetching event ${id}: ${response.statusText}`);
    throw new Error(`Failed to fetch event with ID ${id}`);
  }
  const data = await response.json();
  console.log(`Successfully fetched event with ID: ${id}`, data);
  return data;
};

export const fetchOpportunities = async (): Promise<OpportunityResponse> => {
  try {
    console.log(
      'Fetching opportunities from:',
      `${API_BASE_URL}/api/v1/opportunities`
    );
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
  console.log(`Fetching opportunity with ID: ${id}`);
  const response = await fetch(`${API_BASE_URL}/api/v1/opportunities/${id}`);
  if (!response.ok) {
    console.error(`Error fetching opportunity ${id}: ${response.statusText}`);
    throw new Error(`Failed to fetch opportunity with ID ${id}`);
  }
  const data = await response.json();
  console.log(`Successfully fetched opportunity with ID: ${id}`, data);
  return data;
};
