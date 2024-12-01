import { DEFAULT_HEADERS, API_URL } from '../config/constants';

type HeadersInit = Record<string, string>;

export const api = {
  async get(endpoint: string) {
    const token = localStorage.getItem('token');
    const headers: HeadersInit = { ...DEFAULT_HEADERS };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, { headers });
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
  },

  async post(endpoint: string, data?: any) {
    const token = localStorage.getItem('token');
    const headers: HeadersInit = { ...DEFAULT_HEADERS };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: data ? JSON.stringify(data) : undefined
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
  }
};