import api from "../api/apiClient";

export const fetchExamResults = (id) => api.get(`/api/exams/${id}/results`);