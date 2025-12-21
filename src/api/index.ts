// Shared utilities
// Use API_BASE_URL from environment variables
const rawApiBaseUrl = import.meta.env.API_BASE_URL;

// Normalize the URL to fix common issues (missing slashes, trailing slashes, etc.)
function normalizeApiUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;

  // Use a local variable instead of reassigning the parameter
  let normalizedUrl = url.trim();

  // Fix missing slash after https: or http:
  normalizedUrl = normalizedUrl.replace(/^https:\/(?!\/)/, 'https://');
  normalizedUrl = normalizedUrl.replace(/^http:\/(?!\/)/, 'http://');

  // Remove trailing slash
  normalizedUrl = normalizedUrl.replace(/\/$/, '');

  return normalizedUrl;
}

const API_BASE_URL = normalizeApiUrl(rawApiBaseUrl);

if (!API_BASE_URL) {
  console.error(
    'API_BASE_URL is not defined in environment variables. ' +
      'Please set API_BASE_URL in your .env file.'
  );
} else if (rawApiBaseUrl !== API_BASE_URL) {
  console.warn(
    `API_BASE_URL was normalized from "${rawApiBaseUrl}" to "${API_BASE_URL}". Please fix your environment variable.`
  );
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
