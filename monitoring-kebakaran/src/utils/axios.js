import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Making request to:', config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Received response:', response.config.url);
    return response;
  },
  (error) => {
    if (error.response?.status === 404) {
      console.error('API endpoint tidak ditemukan:', error.config.url);
    } else if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    console.error('Response error:', error.response || error);
    return Promise.reject(error);
  }
);

export default api;
