import { API_BASE_URL, ApiError, handleResponse } from './index';

export const fetchFeaturedBlogs = async (): Promise<{
  data: any[];
}> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/blogs/featured`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return handleResponse<{ data: any[] }>(response);
  } catch (error) {
    console.error('Error fetching featured blogs:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      500,
      `Failed to fetch featured blogs data: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

export const fetchAllBlogs = async (): Promise<{
  data: any[];
}> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/blogs`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return handleResponse<{ data: any[] }>(response);
  } catch (error) {
    console.error('Error fetching all blogs:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      500,
      `Failed to fetch all blogs data: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};
