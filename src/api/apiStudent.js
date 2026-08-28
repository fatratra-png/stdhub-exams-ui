import api from "./apiClient";

export const apiStudent = {
    list: () => api.get("/api/students"),
    create: (data) => api.post("/api/students", data),
    update: (id, data) => api.put(`/api/students/${id}`, data),
    deactivate: (id) => api.delete(`/api/students/${id}`),
}