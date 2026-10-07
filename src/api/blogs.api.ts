import { createSlug } from 'src/utils/slug';
import type { Blog, BlogResponse } from '../types/blog';
import { API_BASE_URL, ApiError, handleResponse } from './index';

const blogsRequest = (path = '') =>
  fetch(`${API_BASE_URL}/api/v1/blogs${path}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

const assertApiBaseUrl = () => {
  if (!API_BASE_URL) {
    throw new ApiError(
      500,
      'API_BASE_URL is not configured. Please set API_BASE_URL in your environment variables.'
    );
  }
};

/**
 * Fetches every blog without `content`. Use this for listings, cards and sitemaps;
 * fetch a single blog with `getBlogById` when its body is needed.
 */
export const fetchAllBlogs = async (): Promise<BlogResponse> => {
  assertApiBaseUrl();
  try {
    const response = await blogsRequest('?excludeContent=true');
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

export const getBlogBySlug = async (
  slug: string
): Promise<Blog | undefined> => {
  if (!slug) return;
  try {
    const response = await fetchAllBlogs();
    const summary = response.data.find(
      (blog) => createSlug(blog.title) === slug
    );
    return summary ? await getBlogById(summary.id) : undefined;
  } catch (error) {
    console.error(`Error fetching blog with slug ${slug}:`, error);
    return undefined;
  }
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
