import api from "../api/apiClient";

const adminApi = {
  getStats: () =>
    Promise.all([
      api.get("/api/students"),
      api.get("/api/courses"),
      api.get("/api/exams"),
    ]).then(([students, courses, exams]) => ({
      students: Array.isArray(students) ? students.length : 0,
      courses: Array.isArray(courses) ? courses.length : 0,
      exams: Array.isArray(exams) ? exams.length : 0,
    })),
};

export default adminApi;
