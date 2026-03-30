import { createSlug } from "src/utils/slug";
import type { Project, ProjectResponse } from "../types/project";
import { API_BASE_URL, ApiError, handleResponse } from "./index";

export const fetchAllProjects = async (): Promise<ProjectResponse> => {
  if (!API_BASE_URL) {
    throw new ApiError(
      500,
      "API_BASE_URL is not configured. Please set API_BASE_URL in your environment variables.",
    );
  }

  try {
    const url = `${API_BASE_URL}/api/v1/projects`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return handleResponse<ProjectResponse>(response);
  } catch (error) {
    console.error("Error fetching all projects:", error);
    if (error instanceof ApiError) {
      throw error;
    }
    // Check if it's a fetch error (usually means URL is invalid or network issue)
    if (error instanceof Error && error.message.includes("fetch failed")) {
      throw new ApiError(
        500,
        `Failed to fetch all projects data: Invalid API URL or network error. API_BASE_URL: ${API_BASE_URL}`,
      );
    }
    throw new ApiError(
      500,
      `Failed to fetch all projects data: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};

export const getProject = async (
  slug: string,
): Promise<Project | undefined> => {
  if (!slug) return;
  const response = await fetchAllProjects();
  const project = response.data.find(
    (project) => createSlug(project.title) === slug,
  );
  return project;
};
