const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${baseURL}${path}`, {
    credentials: 'include',
    ...init,
    headers: {
      'Accept': 'application/json',
      ...(init?.headers || {})
    }
  });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}


