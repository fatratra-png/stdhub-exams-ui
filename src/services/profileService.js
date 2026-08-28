const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

async function resetPassword(newPassword) {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/users/reset-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword }),
    });

    if (!res.ok) {
        throw new Error("Erreur lors de la modification du mot de passe");
    }

    return res.json();
}

export default { resetPassword };