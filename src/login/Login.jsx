import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import authService from "./authService";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await authService.login(email, password);
            login(data.user, data.token);

            if (data.user.role === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/student");
            }
        } catch {
            setError("Email ou mot de passe incorrect");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-[#0A1A33] via-[#001948] to-[#0A1A33] flex items-center justify-center px-4 py-8">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute top-1/4 -right-24 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-white/3 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-4xl">
                <div className="bg-white rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.35)] overflow-hidden flex min-h-135">

                    <div
                        className="hidden lg:flex lg:w-2/5 relative flex-col justify-between p-10 overflow-hidden"
                        style={{ background: "linear-gradient(160deg, #0A1A33 0%, #001948 50%, #0A1A33 100%)" }}
                    >
                        <div className="absolute -top-16 -left-16 w-56 h-56 bg-white/10 rounded-full" />
                        <div className="absolute top-1/3 -right-20 w-72 h-72 bg-white/5 rounded-full" />
                        <div className="absolute -bottom-10 left-10 size-40 rounded-full bg-white/8" />
                        <div className="relative z-10 flex items-center gap-3">
                            <div className="flex size-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                                <img className="size-8 object-contain" src="/logo.png" alt="Logo HEI STDhub" />
                            </div>
                            <div>
                                <span className="text-white font-bold text-lg leading-none block">HEI STDhub</span>
                                <span className="text-white/60 text-xs">Plateforme d'examens</span>
                            </div>
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-white text-3xl font-bold leading-snug mb-3">
                                Bon retour<br />parmi nous !
                            </h2>
                            <p className="text-white/60 text-sm leading-relaxed">
                                Connectez-vous pour accéder à vos examens et suivre vos résultats.
                            </p>
                        </div>

                        <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20">
                            <p className="text-white/80 text-xs font-medium">Communauté HEI Madagascar</p>
                            <p className="text-white/50 text-xs mt-0.5">Étudiants · Admin</p>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 py-10">
                        <div className="mb-8">
                            <h1 className="text-2xl sm:text-3xl font-bold text-[#0A1A33]">Connexion</h1>
                            <p className="text-gray-400 text-sm mt-1">
                                Entrez vos identifiants pour continuer
                            </p>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-2xl mb-5">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div>
                                <label htmlFor="email" className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wide">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="nom@mail.hei.school"
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-[#0A1A33] focus:outline-none focus:ring-2 focus:ring-[#0A1A33]"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wide">
                                    Mot de passe
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 pr-10 text-[#0A1A33] focus:outline-none focus:ring-2 focus:ring-[#0A1A33]"
                                    />
                                    <button
                                        type="button"
                                        tabIndex={-1}
                                        aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                                        onClick={() => setShowPassword((s) => !s)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0A1A33] transition"
                                    >
                                        {showPassword ? (
                                            <img src="/oeil-barré.png" alt="" width="20" height="20" />
                                        ) : (
                                            <img src="/oeil.png" alt="" width="20" height="20" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                                style={{ background: "linear-gradient(135deg, #0A1A33, #001948)" }}
                            >
                                {loading ? "Connexion en cours..." : (
                                    <>
                                        <span>Se connecter</span>
                                        <span>→</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;