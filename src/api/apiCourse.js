import api from "./apiClient";

export const apiCourse = {
    list: () => api.get("/api/courses"),
    create: (data) => api.post("/api/courses", data),
    update: (id, data) => api.put(`/api/courses/${id}`, data),
    delete: (id) => api.delete(`/api/courses/${id}`)
}