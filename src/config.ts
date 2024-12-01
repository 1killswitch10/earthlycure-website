export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const config = {
  apiUrl: API_URL,
  isProduction: import.meta.env.PROD,
  corsOrigin: import.meta.env.VITE_CORS_ORIGIN || 'https://earthlycure.netlify.app'
};