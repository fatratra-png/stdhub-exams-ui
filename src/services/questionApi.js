import api from "../api/apiClient";

export const fetchQuestions = (id) => api.get(`/api/exams/${id}/questions`);
export const createQuestion = (id, payload) => api.post(`/api/exams/${id}/questions`, payload);
export const updateQuestion = (id, payload) => api.put(`/api/questions/${id}`, payload);
export const deleteQuestion = (id) => api.delete(`/api/questions/${id}`);