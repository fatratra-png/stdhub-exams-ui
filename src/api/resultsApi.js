import api from "./apiClient";

export const fetchExamResults = (id) => api.get(`/api/exams/${id}/results`);