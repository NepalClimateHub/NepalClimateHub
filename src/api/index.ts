// Declared in the `env.schema` block of astro.config.mjs, which validates it at build
// time and supplies the default. This module is isomorphic (it reaches the browser via
// VolunteerOpenRoles.tsx), so the import has to come from `astro:env/client`.
import { API_BASE_URL as rawApiBaseUrl } from 'astro:env/client';
import { createSlug } from '../utils/slug';

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
    'API_BASE_URL resolved to an empty value. ' +
      'Set API_BASE_URL in your .env file (see .env.sample).'
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

export interface PagedResult<T> {
  data: T[];
  meta?: { count?: number };
}

const FETCH_ALL_BATCH_SIZE = 100;

/** Pages through a list endpoint (batches of 100) until it runs out of data or hits `meta.count`. */
export async function fetchAllPages<T>(
  fetchPage: (opts: { limit: number; offset: number }) => Promise<
    PagedResult<T>
  >
): Promise<T[]> {
  const all: T[] = [];
  let offset = 0;
  let total = Number.POSITIVE_INFINITY;

  while (all.length < total) {
    const { data, meta } = await fetchPage({
      limit: FETCH_ALL_BATCH_SIZE,
      offset,
    });
    total = meta?.count ?? all.length + data.length;
    if (data.length === 0) break;
    all.push(...data);
    offset += FETCH_ALL_BATCH_SIZE;
  }

  return all;
}

/**
 * Resolves a title-derived slug against a paged list endpoint. Checks the first page
 * (the common case) before paging through the rest, then returns the matching summary
 * so callers can fetch the full item by id.
 */
export async function findBySlug<T extends { title: string }>(
  slug: string,
  fetchPage: (opts: { limit: number; offset: number }) => Promise<
    PagedResult<T>
  >,
  prefetchedFirstPage?: PagedResult<T>
): Promise<T | undefined> {
  const firstPage =
    prefetchedFirstPage ??
    (await fetchPage({ limit: FETCH_ALL_BATCH_SIZE, offset: 0 }));
  const firstMatch = firstPage.data.find(
    (item) => createSlug(item.title) === slug
  );
  if (firstMatch) return firstMatch;

  const total = firstPage.meta?.count ?? firstPage.data.length;
  let offset = firstPage.data.length;

  while (offset < total) {
    const page = await fetchPage({ limit: FETCH_ALL_BATCH_SIZE, offset });
    if (page.data.length === 0) break;
    const match = page.data.find((item) => createSlug(item.title) === slug);
    if (match) return match;
    offset += page.data.length;
  }

  return undefined;
}

export { API_BASE_URL };

// Export all API functions
export * from './opportunities.api';
export * from './news.api';
export * from './events.api';
export * from './blogs.api';
export * from './resources.api';
export * from './projects.api';
export * from './vacancies.api';
