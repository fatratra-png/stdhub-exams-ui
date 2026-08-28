import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import profileService from "../services/profileService";

const Profile = () => {
    const { user } = useAuth();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (newPassword !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        if (newPassword.length < 6) {
            setError("Le mot de passe doit contenir au moins 6 caractères");
            return;
        }

        setLoading(true);

        try {
            await profileService.resetPassword(newPassword);
            setSuccess("Mot de passe modifié avec succès");
            setNewPassword("");
            setConfirmPassword("");
        } catch {
            setError("Une erreur est survenue");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-navy-dark mb-6">Mon profil</h1>

            <div className="card mb-6">
                <p className="text-sm text-gray-500">Connecté en tant que</p>
                <p className="font-semibold">{user?.email}</p>
            </div>

            <div className="card">
                <h2 className="text-lg font-bold mb-4">Changer le mot de passe</h2>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-2xl mb-4">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-600 text-sm px-4 py-3 rounded-2xl mb-4">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wide">
                            Nouveau mot de passe
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wide">
                            Confirmer le nouveau mot de passe
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary mt-2">
                        {loading ? "Modification..." : "Modifier le mot de passe"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;