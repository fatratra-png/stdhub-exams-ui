const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const login = async (email, password) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Identifiants invalides");
  }

  return res.json();
}

export default { login };