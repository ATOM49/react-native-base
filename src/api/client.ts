/**
 * Minimal typed fetch wrapper. Point `EXPO_PUBLIC_API_URL` at your backend
 * (see `.env.example`). Swap for axios/ky/openapi-fetch as your API grows.
 */
export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://jsonplaceholder.typicode.com';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new ApiError(response.status, `Request to ${path} failed with ${response.status}`);
  }

  return (await response.json()) as T;
}
