// Shared utilities
const API_BASE_URL = import.meta.env.API_BASE_URL;

if (!API_BASE_URL) {
  console.error('API_BASE_URL is not defined in environment variables');
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function handleResponse<T>(response: Response): Promise<T> {
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

export { API_BASE_URL };

// Export all API functions
export * from './opportunities.api';
export * from './news.api';
export * from './events.api';
export * from './blogs.api';
