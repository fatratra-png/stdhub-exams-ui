import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  faUserGraduate,
  faBookOpen,
  faFileAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../contexts/AuthContext";
import adminApi from "../../services/adminApi";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const CARDS = [
  {
    key: "students",
    label: "Étudiants",
    icon: faUserGraduate,
    color: "bg-cyan-50 text-cyan-600",
    to: "/admin/students",
  },
  {
    key: "courses",
    label: "Cours",
    icon: faBookOpen,
    color: "bg-amber-50 text-amber-600",
    to: "/admin/courses",
  },
  {
    key: "exams",
    label: "Examens",
    icon: faFileAlt,
    color: "bg-violet-50 text-violet-600",
    to: "/admin/exams",
  },
];

const SHORTCUTS = [
  { label: "Créer un étudiant", icon: faPlus, to: "/admin/students" },
  { label: "Créer un cours", icon: faPlus, to: "/admin/courses" },
  { label: "Créer un examen", icon: faPlus, to: "/admin/exams" },
];

const Dashboard = () => {
  const [stats, setStats] = useState({ students: 0, courses: 0, exams: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    let cancelled = false;
    adminApi
      .getStats()
      .then((data) => {
        if (!cancelled && data) setStats((prev) => ({ ...prev, ...data }));
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <section className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy mb-1">
          Bonjour, {user?.name || "Admin"}
        </h1>
        <p className="text-sm text-navy-dark/50">
          Voici un aperçu des actuels chiffres de la plateforme
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {CARDS.map((c) => (
          <button
            key={c.key}
            onClick={() => navigate(c.to)}
            className="card flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer text-left"
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.color}`}
            >
              <FontAwesomeIcon icon={c.icon} className="text-lg" />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy">
                {stats[c.key] ?? 0}
              </p>
              <p className="text-xs text-navy-dark/50 font-medium">{c.label}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="card">
        <h2 className="text-sm font-bold text-navy mb-4">Accès rapides</h2>
        <div className="flex flex-wrap gap-3">
          {SHORTCUTS.map((s) => (
            <button
              key={s.label}
              onClick={() => navigate(s.to)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface text-navy text-sm font-semibold hover:bg-contact/50 transition-colors cursor-pointer"
            >
              <FontAwesomeIcon icon={s.icon} className="text-xs" />
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
