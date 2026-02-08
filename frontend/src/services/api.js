import axios from 'axios';
import { getApiUrl } from '../lib/config';

/**
 * Global Axios instance for API communication.
 * Configures the base URL for the backend and provides 
 * standardized response/error handling via interceptors.
 */
export const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || ''; // Legacy fallback

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(async (config) => {
    try {
        const apiUrl = await getApiUrl();
        const base = apiUrl ? apiUrl.replace(/\/$/, '') : '';
        config.baseURL = base ? `${base}/api` : '/api';
    } catch {
        config.baseURL = '/api';
    }

    const provider = localStorage.getItem('llm_provider');
    const apiKey = localStorage.getItem('llm_api_key');
    const baseUrl = localStorage.getItem('ollama_base_url');
    const model = localStorage.getItem('llm_model');

    if (provider) config.headers['X-LLM-Provider'] = provider;
    if (apiKey) config.headers['X-LLM-Key'] = apiKey;
    if (baseUrl) config.headers['X-LLM-Base-Url'] = baseUrl;
    if (model) config.headers['X-LLM-Model'] = model;

    return config;
});

/**
 * Response Interceptor:
 * Extracts data payload directly on success.
 * Formats backend error messages (FastAPI 'detail') for easier consumption by UI.
 */
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        // Extract Detail from FastAPI Exception or fallback to message
        const message = error.response?.data?.detail || error.message || 'An unexpected error occurred';
        console.error('API Error:', message);
        return Promise.reject(message);
    }
);

export default api;
