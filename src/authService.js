const API_URL = "http://localhost:3000/api";

async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
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
