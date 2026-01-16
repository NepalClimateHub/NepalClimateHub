import { API_BASE_URL, ApiError, handleResponse } from "./index";
import type { Blog, BlogResponse } from "../types/blog";

export const fetchFeaturedBlogs = async (): Promise<BlogResponse> => {
  if (!API_BASE_URL) {
    throw new ApiError(
      500,
      "API_BASE_URL is not configured. Please set API_BASE_URL in your environment variables."
    );
  }

  try {
    const url = `${API_BASE_URL}/api/v1/blogs/featured`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
      cache: "no-store",
    });
    return handleResponse<BlogResponse>(response);
  } catch (error) {
    console.error("Error fetching featured blogs:", error);
    if (error instanceof ApiError) {
      throw error;
    }
    // Check if it's a fetch error (usually means URL is invalid or network issue)
    if (error instanceof Error && error.message.includes("fetch failed")) {
      throw new ApiError(
        500,
        `Failed to fetch featured blogs data: Invalid API URL or network error. API_BASE_URL: ${API_BASE_URL}`
      );
    }
    throw new ApiError(
      500,
      `Failed to fetch featured blogs data: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

export const fetchAllBlogs = async (): Promise<BlogResponse> => {
  if (!API_BASE_URL) {
    throw new ApiError(
      500,
      "API_BASE_URL is not configured. Please set API_BASE_URL in your environment variables."
    );
  }

  try {
    const url = `${API_BASE_URL}/api/v1/blogs`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
      cache: "no-store",
    });
    return handleResponse<BlogResponse>(response);
  } catch (error) {
    console.error("Error fetching all blogs:", error);
    if (error instanceof ApiError) {
      throw error;
    }
    // Check if it's a fetch error (usually means URL is invalid or network issue)
    if (error instanceof Error && error.message.includes("fetch failed")) {
      throw new ApiError(
        500,
        `Failed to fetch all blogs data: Invalid API URL or network error. API_BASE_URL: ${API_BASE_URL}`
      );
    }
    throw new ApiError(
      500,
      `Failed to fetch all blogs data: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};
