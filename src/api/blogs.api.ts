import type { Blog, BlogResponse } from '../types/blog';
import {
  API_BASE_URL,
  ApiError,
  fetchAllPages,
  findBySlug,
  handleResponse,
} from './index';

const blogsRequest = (path = '') =>
  fetch(`${API_BASE_URL}/api/v1/blogs${path}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

export interface BlogListOptions {
  category?: string;
  isFeatured?: boolean;
  limit?: number;
  offset?: number;
}

const assertApiBaseUrl = () => {
  if (!API_BASE_URL) {
    throw new ApiError(
      500,
      'API_BASE_URL is not configured. Please set API_BASE_URL in your environment variables.'
    );
  }
};

/**
 * Fetches the compact card projection. Callers that render a page should provide
 * a bounded `limit` and `offset`; full bodies remain detail-only.
 */
export const fetchAllBlogs = async (
  options: BlogListOptions = {}
): Promise<BlogResponse> => {
  assertApiBaseUrl();
  try {
    const params = new URLSearchParams({ view: 'summary' });

    if (options.category) params.set('category', options.category);
    if (options.isFeatured !== undefined) {
      params.set('isFeatured', String(options.isFeatured));
    }
    if (options.limit !== undefined) params.set('limit', String(options.limit));
    if (options.offset !== undefined) {
      params.set('offset', String(options.offset));
    }

    const response = await blogsRequest(`?${params.toString()}`);
    return await handleResponse<BlogResponse>(response);
  } catch (error) {
    console.error('Error fetching all blogs:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    if (error instanceof Error && error.message.includes('fetch failed')) {
      throw new ApiError(
        500,
        `Failed to fetch all blogs data: Invalid API URL or network error. API_BASE_URL: ${API_BASE_URL}`
      );
    }
    throw new ApiError(
      500,
      `Failed to fetch all blogs data: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

export const getBlogById = async (id: string): Promise<Blog | undefined> => {
  if (!id) return;
  assertApiBaseUrl();
  try {
    const response = await blogsRequest(`/${id}`);
    const { data } = await handleResponse<{ data: Blog }>(response);
    return data;
  } catch (error) {
    console.error(`Error fetching blog with ID ${id}:`, error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      500,
      `Failed to fetch blog: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

export const fetchAllBlogSummaries = async (): Promise<Blog[]> =>
  fetchAllPages<Blog>((opts) => fetchAllBlogs(opts));

export const getBlogBySlug = async (
  slug: string,
  firstPage?: BlogResponse
): Promise<Blog | undefined> => {
  if (!slug) return;
  const summary = await findBySlug(
    slug,
    (opts) => fetchAllBlogs(opts),
    firstPage
  );
  return summary ? await getBlogById(summary.id) : undefined;
};

export const fetchFeaturedBlogs = async (): Promise<BlogResponse> => {
  assertApiBaseUrl();
  try {
    const response = await blogsRequest('/featured');
    return await handleResponse<BlogResponse>(response);
  } catch (error) {
    console.error('Error fetching featured blogs:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      500,
      `Failed to fetch featured blogs: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

export const getFeaturedPost = (blogs: Blog[]): Blog | null =>
  blogs.find((blog) => blog.isFeatured) || null;

export const getTopReadPosts = async (): Promise<Blog[]> => {
  try {
    const { data } = await fetchAllBlogs();
    return data.filter((blog) => blog.isTopRead).slice(0, 3);
  } catch (error) {
    console.error('Error fetching top read posts:', error);
    return [];
  }
};
