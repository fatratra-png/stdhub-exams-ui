import api from '../api/apiClient';

export const fetchExam = (courseId = '') => {
    const path = courseId ? `/api/exams?courseId=${courseId}` : '/api/exams';
    return api.get(path);
};

export const fetchCourses = () => api.get('/api/courses');
export const createExam = (payload) => api.post('/api/exams', payload);
export const updateExam = (id, payload) => api.put(`/api/exams/${id}`, payload);
export const deleteExam = (id) => api.delete(`/api/exams/${id}`); 