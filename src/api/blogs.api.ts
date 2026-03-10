import { createSlug } from 'src/utils/slug';
import type { Blog, BlogResponse } from '../types/blog';
import { API_BASE_URL, ApiError, handleResponse } from './index';

export const fetchFeaturedBlogs = async (): Promise<BlogResponse> => {
  if (!API_BASE_URL) {
    throw new ApiError(
      500,
      'API_BASE_URL is not configured. Please set API_BASE_URL in your environment variables.'
    );
  }

  try {
    const url = `${API_BASE_URL}/api/v1/blogs/featured`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return handleResponse<BlogResponse>(response);
  } catch (error) {
    console.error('Error fetching featured blogs:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    if (error instanceof Error && error.message.includes('fetch failed')) {
      throw new ApiError(
        500,
        `Failed to fetch featured blogs data: Invalid API URL or network error. API_BASE_URL: ${API_BASE_URL}`
      );
    }
    throw new ApiError(
      500,
      `Failed to fetch featured blogs data: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

export const fetchAllBlogs = async (): Promise<BlogResponse> => {
  if (!API_BASE_URL) {
    throw new ApiError(
      500,
      'API_BASE_URL is not configured. Please set API_BASE_URL in your environment variables.'
    );
  }

  try {
    const url = `${API_BASE_URL}/api/v1/blogs`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return handleResponse<BlogResponse>(response);
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

export const getBlog = async (slug: string): Promise<Blog | null> => {
  if (!slug) return null;
  const response = await fetchAllBlogs();
  const blog = response.data.find((blog) => createSlug(blog.title) === slug);
  return blog || null;
};

export const getFeaturedPost = async (): Promise<Blog | null> => {
  try {
    const response = await fetchAllBlogs();
    const filteredBlogs = response.data.filter((blog) => blog.isFeatured);
    return filteredBlogs[0] || null;
  } catch (error) {
    console.error('Error fetching featured post:', error);
    return null;
  }
};

export const getTopReadPosts = async (): Promise<Blog[]> => {
  try {
    const response = await fetchAllBlogs();
    const filteredBlogs = response.data.filter((blog) => blog.isTopRead);
    return filteredBlogs.slice(0, 3);
  } catch (error) {
    console.error('Error fetching top read posts:', error);
    return [];
  }
};
