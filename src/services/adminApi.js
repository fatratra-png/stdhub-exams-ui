import api from "../api/apiClient";

const adminApi = {
  // Tableau de bord
  getStats: () => api.get("/api/admin/stats"),

  // Étudiants
  getStudents: () => api.get("/api/admin/students"),
  getStudent: (id) => api.get(`/api/admin/students/${id}`),
  createStudent: (data) => api.post("/api/admin/students", data),
  updateStudent: (id, data) => api.put(`/api/admin/students/${id}`, data),
  resetPassword: (id, data) => api.put(`/api/admin/students/${id}/password`, data),
  toggleStudent: (id, data) => api.patch(`/api/admin/students/${id}/status`, data),

  // Cours
  getCourses: () => api.get("/api/admin/courses"),
  getCourse: (id) => api.get(`/api/admin/courses/${id}`),
  createCourse: (data) => api.post("/api/admin/courses", data),
  updateCourse: (id, data) => api.put(`/api/admin/courses/${id}`, data),
  deleteCourse: (id) => api.delete(`/api/admin/courses/${id}`),

  // Examens
  getExams: () => api.get("/api/admin/exams"),
  getExam: (id) => api.get(`/api/admin/exams/${id}`),
  createExam: (data) => api.post("/api/admin/exams", data),
  updateExam: (id, data) => api.put(`/api/admin/exams/${id}`, data),
  deleteExam: (id) => api.delete(`/api/admin/exams/${id}`),

  // Questions
  getQuestions: (examId) => api.get(`/api/admin/exams/${examId}/questions`),
  createQuestion: (examId, data) => api.post(`/api/admin/exams/${examId}/questions`, data),
  updateQuestion: (examId, questionId, data) => api.put(`/api/admin/exams/${examId}/questions/${questionId}`, data),
  deleteQuestion: (examId, questionId) => api.delete(`/api/admin/exams/${examId}/questions/${questionId}`),

  // Résultats
  getResults: (examId) => api.get(`/api/admin/exams/${examId}/results`),
};

export default adminApi;
