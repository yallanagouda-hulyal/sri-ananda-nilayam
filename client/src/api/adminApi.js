import api from './client';

export const adminApi = {
  // Auth
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  changePassword: (data) => api.put('/auth/change-password', data),
  forgotPassword: (data) => api.post('/auth/forgot-password', data),
  resetPassword: (token, data) => api.post(`/auth/reset-password/${token}`, data),

  // Dashboard
  getDashboardStats: () => api.get('/admin/dashboard'),

  // Enquiries
  getEnquiries: (params) => api.get('/admin/enquiries', { params }),
  getEnquiryById: (id) => api.get(`/admin/enquiries/${id}`),
  updateEnquiryStatus: (id, data) => api.patch(`/admin/enquiries/${id}/status`, data),
  addNote: (id, data) => api.post(`/admin/enquiries/${id}/notes`, data),
  deleteEnquiry: (id) => api.delete(`/admin/enquiries/${id}`),
  exportEnquiries: (params) => api.get('/admin/enquiries/export', { params, responseType: 'blob' }),

  // Services
  getServices: () => api.get('/admin/services'),
  getServiceById: (id) => api.get(`/admin/services/${id}`),
  createService: (formData) => api.post('/admin/services', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  updateService: (id, formData) => api.put(`/admin/services/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  deleteService: (id) => api.delete(`/admin/services/${id}`),

  // Projects
  getProjects: (params) => api.get('/admin/projects', { params }),
  getProjectById: (id) => api.get(`/admin/projects/${id}`),
  createProject: (formData) => api.post('/admin/projects', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  updateProject: (id, formData) => api.put(`/admin/projects/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  deleteProject: (id) => api.delete(`/admin/projects/${id}`),

  // Gallery
  getGallery: (params) => api.get('/admin/gallery', { params }),
  uploadImage: (formData) => api.post('/admin/gallery', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  updateImage: (id, data) => api.put(`/admin/gallery/${id}`, data),
  deleteImage: (id) => api.delete(`/admin/gallery/${id}`),
  bulkDelete: (data) => api.delete('/admin/gallery/bulk', { data }),
  reorderImages: (data) => api.put('/admin/gallery/reorder', data),

  // Testimonials
  getTestimonials: () => api.get('/admin/testimonials'),
  createTestimonial: (formData) => api.post('/admin/testimonials', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  updateTestimonial: (id, formData) => api.put(`/admin/testimonials/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  deleteTestimonial: (id) => api.delete(`/admin/testimonials/${id}`),

  // Settings & Pages
  getAllSettings: () => api.get('/admin/settings'),
  updateSetting: (data) => api.put('/admin/settings', data),
  bulkUpdateSettings: (data) => api.put('/admin/settings/bulk', data),
  getPageContent: () => api.get('/admin/pages'),
  updatePageContent: (slug, data) => api.put(`/admin/pages/${slug}`, data),

  // Users
  getUsers: () => api.get('/admin/users'),
  createUser: (data) => api.post('/admin/users', data),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  updateProfile: (data) => api.put('/admin/profile', data),

  // Newsletter
  getNewsletterSubscribers: (params) => api.get('/admin/newsletter', { params }),
  exportNewsletterSubscribers: () => api.get('/admin/newsletter/export', { responseType: 'blob' }),
  deleteNewsletterSubscriber: (id) => api.delete(`/admin/newsletter/${id}`),

  // Appointments
  getAppointments: (params) => api.get('/admin/appointments', { params }),
  createAppointment: (data) => api.post('/admin/appointments', data),
  updateAppointment: (id, data) => api.put(`/admin/appointments/${id}`, data),
  deleteAppointment: (id) => api.delete(`/admin/appointments/${id}`),
};

export default adminApi;
