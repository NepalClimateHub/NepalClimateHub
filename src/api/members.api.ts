import type { Member, MembersResponse } from "../types/member";
import { API_BASE_URL, ApiError, handleResponse } from "./index";

export const fetchAllMembers = async (): Promise<MembersResponse> => {
  if (!API_BASE_URL) {
    throw new ApiError(
      500,
      "API_BASE_URL is not configured. Please set API_BASE_URL in your environment variables.",
    );
  }

  try {
    const url = `${API_BASE_URL}/api/v1/members`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return handleResponse<MembersResponse>(response);
  } catch (error) {
    console.error("Error fetching all members:", error);

    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error && error.message.includes("fetch failed")) {
      throw new ApiError(
        500,
        `Failed to fetch members data: Invalid API URL or network error. API_BASE_URL: ${API_BASE_URL}`,
      );
    }

    throw new ApiError(
      500,
      `Failed to fetch members data: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    );
  }
};

export const getMember = async (id: string): Promise<Member | undefined> => {
  if (!id) return;

  const response = await fetchAllMembers();

  return response.data.find((member) => member.id === id);
};
