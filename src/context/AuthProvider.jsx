import { useState } from "react";
import AuthContext from "./AuthContext";
import api from "../api/apiClient";

const ROLE_MAP = {
  ADMIN: "admin",
  STUDENT: "student",
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email, password) => {
    const data = await api.post("/api/auth/login", { email, password });
    const user = { ...data.user, role: ROLE_MAP[data.user.role] || "student" };
    setUser(user);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
