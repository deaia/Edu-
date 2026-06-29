import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add token to every request
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Students API
export const studentsAPI = {
  getAll: () => api.get('/students'),
  getById: (id: string) => api.get(`/students/${id}`),
  create: (data: any) => api.post('/students', data),
  update: (id: string, data: any) => api.put(`/students/${id}`, data),
  delete: (id: string) => api.delete(`/students/${id}`),
};

// Attendance API
export const attendanceAPI = {
  getAll: () => api.get('/attendance'),
  getByStudent: (studentId: string) => api.get(`/attendance/student/${studentId}`),
  getByDate: (date: string) => api.get(`/attendance/date/${date}`),
  getStats: (studentId: string) => api.get(`/attendance/stats/student/${studentId}`),
  record: (data: any) => api.post('/attendance', data),
};

// Payments API
export const paymentsAPI = {
  getAll: () => api.get('/payments'),
  getByStudent: (studentId: string) => api.get(`/payments/student/${studentId}`),
  getStats: (studentId: string) => api.get(`/payments/stats/student/${studentId}`),
  record: (data: any) => api.post('/payments', data),
  getByDateRange: (startDate: string, endDate: string) =>
    api.get(`/payments/date/${startDate}/${endDate}`),
};

// Exams API
export const examsAPI = {
  getAll: () => api.get('/exams'),
  getByStudent: (studentId: string) => api.get(`/exams/student/${studentId}`),
  getBySubject: (subject: string) => api.get(`/exams/subject/${subject}`),
  getStats: (studentId: string) => api.get(`/exams/stats/student/${studentId}`),
  create: (data: any) => api.post('/exams', data),
  update: (id: string, data: any) => api.put(`/exams/${id}`, data),
  delete: (id: string) => api.delete(`/exams/${id}`),
};

// Behavior API
export const behaviorAPI = {
  getAll: () => api.get('/behavior'),
  getByStudent: (studentId: string) => api.get(`/behavior/student/${studentId}`),
  getStats: (studentId: string) => api.get(`/behavior/stats/student/${studentId}`),
  record: (data: any) => api.post('/behavior', data),
};

// Sections API
export const sectionsAPI = {
  getAll: () => api.get('/sections'),
  getById: (id: string) => api.get(`/sections/${id}`),
  create: (data: any) => api.post('/sections', data),
  addStudent: (sectionId: string, studentId: string) =>
    api.post(`/sections/${sectionId}/students/${studentId}`),
  removeStudent: (sectionId: string, studentId: string) =>
    api.delete(`/sections/${sectionId}/students/${studentId}`),
};

export default api;
