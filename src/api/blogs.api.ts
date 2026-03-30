import { createSlug } from "src/utils/slug";
import type { Blog, BlogResponse } from "../types/blog";
import { API_BASE_URL, ApiError, handleResponse } from "./index";

export const fetchAllBlogs = async (): Promise<BlogResponse> => {
  if (!API_BASE_URL) {
    throw new ApiError(
      500,
      "API_BASE_URL is not configured. Please set API_BASE_URL in your environment variables.",
    );
  }
  try {
    const url = `${API_BASE_URL}/api/v1/blogs`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await handleResponse<BlogResponse>(response);
  } catch (error) {
    console.error("Error fetching all blogs:", error);
    if (error instanceof ApiError) {
      throw error;
    }
    if (error instanceof Error && error.message.includes("fetch failed")) {
      throw new ApiError(
        500,
        `Failed to fetch all blogs data: Invalid API URL or network error. API_BASE_URL: ${API_BASE_URL}`,
      );
    }
    throw new ApiError(
      500,
      `Failed to fetch all blogs data: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};

export const getBlogById = async (id: string): Promise<Blog | undefined> => {
  if (!id) return;
  if (!API_BASE_URL) {
    throw new ApiError(
      500,
      "API_BASE_URL is not configured. Please set API_BASE_URL in your environment variables.",
    );
  }
  try {
    const url = `${API_BASE_URL}/api/v1/blogs/${id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await handleResponse<Blog>(response);
  } catch (error) {
    console.error(`Error fetching blog with ID ${id}:`, error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      500,
      `Failed to fetch blog: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};

export const getBlogBySlug = async (
  slug: string,
): Promise<Blog | undefined> => {
  if (!slug) return;
  try {
    const response = await fetchAllBlogs();
    const blog = response.data.find((blog) => createSlug(blog.title) === slug);
    return blog;
  } catch (error) {
    console.error(`Error fetching blog with slug ${slug}:`, error);
    return undefined;
  }
};

export const fetchFeaturedBlogs = async (): Promise<BlogResponse> => {
  if (!API_BASE_URL) {
    throw new ApiError(
      500,
      "API_BASE_URL is not configured. Please set API_BASE_URL in your environment variables.",
    );
  }
  try {
    const url = `${API_BASE_URL}/api/v1/blogs/featured`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await handleResponse<BlogResponse>(response);
  } catch (error) {
    console.error("Error fetching featured blogs:", error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      500,
      `Failed to fetch featured blogs: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};

export const getFeaturedPost = async (): Promise<Blog | null> => {
  try {
    const response = await fetchFeaturedBlogs();
    return response.data[0] || null;
  } catch (error) {
    console.error("Error fetching featured post:", error);
    return null;
  }
};

export const getTopReadPosts = async (): Promise<Blog[]> => {
  if (!API_BASE_URL) {
    throw new ApiError(
      500,
      "API_BASE_URL is not configured. Please set API_BASE_URL in your environment variables.",
    );
  }
  try {
    const url = `${API_BASE_URL}/api/v1/blogs`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await handleResponse<BlogResponse>(response);
    const filteredBlogs = data.data.filter((blog) => blog.isTopRead);
    return filteredBlogs.slice(0, 3);
  } catch (error) {
    console.error("Error fetching top read posts:", error);
    return [];
  }
};
