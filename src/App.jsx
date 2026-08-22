import { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import AuthProvider from "./context/AuthProvider";
import AuthContext from "./context/AuthContext";
import Login from "./pages/Login";
import Placeholder from "./pages/Placeholder";

const RoleRoute = ({ role }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role)
    return <Navigate to={user.role === "admin" ? "/admin" : "/student"} replace />;
  return <Outlet />;
};

const HomeRedirect = () => {
  const { user } = useContext(AuthContext);
  return (
    <Navigate
      to={!user ? "/login" : user.role === "admin" ? "/admin" : "/student"}
      replace
    />
  );
};

const SpaceLayout = () => (
  <div className="flex min-h-screen bg-surface">
    <Sidebar />
    <main className="flex-1 p-6 pt-16 lg:p-8 lg:pt-8">
      <Outlet />
    </main>
  </div>
);

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<RoleRoute role="admin" />}>
          <Route path="/admin" element={<SpaceLayout />}>
            <Route index element={<Placeholder title="Tableau de bord" description="Compteurs et liens rapides." />} />
            <Route path="students" element={<Placeholder title="Gestion des étudiants" />} />
            <Route path="courses" element={<Placeholder title="Gestion des cours" />} />
            <Route path="exams" element={<Placeholder title="Gestion des examens" />} />
            <Route path="exams/:id/questions" element={<Placeholder title="Éditeur de questions" />} />
            <Route path="exams/:id/results" element={<Placeholder title="Résultats de l'examen" />} />
          </Route>
        </Route>

        <Route element={<RoleRoute role="student" />}>
          <Route path="/student" element={<SpaceLayout />}>
            <Route index element={<Placeholder title="Examens disponibles" />} />
            <Route path="exams/:id" element={<Placeholder title="Passage de l'examen" />} />
            <Route path="exams/:id/result" element={<Placeholder title="Note et correction" />} />
            <Route path="results" element={<Placeholder title="Mes résultats" />} />
          </Route>
        </Route>

        <Route path="*" element={<HomeRedirect />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
