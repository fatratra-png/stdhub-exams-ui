import api from "../api/apiClient";

export const fetchMyExams = () => api.get("/api/my/exams");
export const fetchMyExam = (id) => api.get(`/api/my/exams/${id}`);
export const submitMyExam = (id, payload) => api.post(`/api/my/exams/${id}/submit`, payload);
export const fetchMyResults = () => api.get("/api/my/results");