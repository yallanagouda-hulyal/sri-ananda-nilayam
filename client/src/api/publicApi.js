import api from './client';

export const publicApi = {
  getSettings: () => api.get('/public/settings'),
  getPageContent: (slug) => api.get(`/public/pages/${slug}`),
  getServices: () => api.get('/public/services'),
  getServiceBySlug: (slug) => api.get(`/public/services/${slug}`),
  getProjects: (params) => api.get('/public/projects', { params }),
  getProjectBySlug: (slug) => api.get(`/public/projects/${slug}`),
  getGallery: (params) => api.get('/public/gallery', { params }),
  getTestimonials: () => api.get('/public/testimonials'),
  submitEnquiry: (data) => api.post('/public/enquiries', data),
  subscribeNewsletter: (data) => api.post('/public/newsletter', data),
};

export default publicApi;
