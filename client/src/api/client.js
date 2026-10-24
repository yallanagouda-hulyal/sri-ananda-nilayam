import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token from localStorage if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('san_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const isAuthRoute = window.location.pathname.startsWith('/admin/login');
      if (!isAuthRoute && window.location.pathname.startsWith('/admin')) {
        localStorage.removeItem('san_admin_token');
        localStorage.removeItem('san_admin_user');
        window.location.href = '/admin/login?sessionExpired=true';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
