import api from "./apiClient";

export const apiStudent = {
    list: () => api.get("/students"),
    create: (data) => api.post("/students", data),
    update: (id, data) => api.put(`/students/${id}`, data),
    deactivate: (id) => api.delete(`/students/${id}`),
}