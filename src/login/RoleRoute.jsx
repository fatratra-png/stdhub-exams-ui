import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function RoleRoute({ children, rolesAutorises }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Chargement...</p>;
  if (!user) return <Navigate to="/login" replace />;
  if (!rolesAutorises.includes(user.role)) return <Navigate to="/login" replace />;

  return children;
}

export default RoleRoute;