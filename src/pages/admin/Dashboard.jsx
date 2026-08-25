import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faUserGraduate, faBookOpen, faFileAlt, faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import adminApi from "../../services/adminApi";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ErrorAlert from "../../components/ui/ErrorAlert";

const CARDS = [
  { key: "students", label: "Étudiants", icon: faUserGraduate, color: "bg-cyan-50 text-cyan-600", to: "/admin/students" },
  { key: "courses", label: "Cours", icon: faBookOpen, color: "bg-amber-50 text-amber-600", to: "/admin/courses" },
  { key: "exams", label: "Examens", icon: faFileAlt, color: "bg-violet-50 text-violet-600", to: "/admin/exams" },
  { key: "attempts", label: "Tentatives", icon: faClipboardCheck, color: "bg-emerald-50 text-emerald-600", to: "/admin/exams" },
];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    adminApi.getStats()
      .then((data) => { if (!cancelled) setStats(data); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <section className="animate-fade-in">
      <h1 className="text-2xl font-bold text-navy mb-1">Tableau de bord</h1>
      <p className="text-sm text-navy-dark/50 mb-8">Vue d'ensemble</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {CARDS.map((c) => (
          <button
            key={c.key}
            onClick={() => navigate(c.to)}
            className="card flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer text-left"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.color}`}>
              <FontAwesomeIcon icon={c.icon} className="text-lg" />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy">{stats?.[c.key] ?? 0}</p>
              <p className="text-xs text-navy-dark/50 font-medium">{c.label}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
