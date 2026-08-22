import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import STDHUB_LOGO from "../assets/stdhub-logo-pwa.png";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Veuillez renseigner votre email et votre mot de passe.");
      return;
    }
    setError("");
    // TODO: remplacer par POST /api/auth/login
    login(email);
    navigate(email === "admin@stdhub.mg" ? "/admin" : "/student");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <form
        onSubmit={handleSubmit}
        className="card w-full max-w-sm flex flex-col gap-4"
      >
        <div className="flex items-center gap-3 mb-2">
          <img
            src={STDHUB_LOGO}
            alt="STDExams"
            className="h-10 w-10 object-contain rounded-full"
          />
          <h1 className="text-xl text-navy">HEI STDExams</h1>
        </div>

        {error && (
          <p className="badge-danger w-full text-center normal-case">
            {error}
          </p>
        )}

        <label className="flex flex-col gap-1 text-sm text-navy-dark">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            placeholder="hei.prenom@gmail.com"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-navy-dark">
          Mot de passe
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            placeholder="••••••••"
          />
        </label>

        <button type="submit" className="btn-primary mt-2">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;
