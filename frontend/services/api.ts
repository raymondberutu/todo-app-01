export const BASE_URL = 'https://dummyjson.com';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });

    if (!response.ok) {
      throw new ApiError(response.status, `HTTP Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Client Error:', error);
    throw error;
  }
}