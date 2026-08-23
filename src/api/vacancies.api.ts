import { API_BASE_URL, ApiError, handleResponse } from './index';

export interface Vacancy {
  id: string;
  title: string;
  openings: number;
  duration?: string;
  hoursPerWeek?: string;
  overview?: string;
  responsibilities: string[];
  requirements: string[];
  location?: string;
  type?: string;
  deadline?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VacanciesResponse {
  data: Vacancy[];
  meta?: { count?: number };
}

export interface VacancyApplicationInput {
  fullName: string;
  email: string;
  contact: string;
  currentAddress?: string;
  message?: string;
  cvUrl: string;
  cvFileId?: string;
}

export const fetchVacancies = async (): Promise<VacanciesResponse> => {
  if (!API_BASE_URL) {
    throw new ApiError(500, 'API_BASE_URL is not configured.');
  }

  try {
    const url = `${API_BASE_URL}/api/v1/vacancies?isActive=true`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return handleResponse<VacanciesResponse>(response);
  } catch (error) {
    console.error('Error fetching vacancies:', error);
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, `Failed to fetch vacancies: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const applyToVacancy = async (
  vacancyId: string,
  input: VacancyApplicationInput
): Promise<{ data: any }> => {
  if (!API_BASE_URL) {
    throw new ApiError(500, 'API_BASE_URL is not configured.');
  }

  try {
    const url = `${API_BASE_URL}/api/v1/vacancies/${vacancyId}/apply`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    return handleResponse<{ data: any }>(response);
  } catch (error) {
    console.error(`Error submitting application to vacancy ${vacancyId}:`, error);
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, `Failed to submit application: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
