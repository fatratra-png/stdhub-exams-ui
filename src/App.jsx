import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Placeholder from "./pages/Placeholder";
import Login from "./Login";

const SpaceLayout = ({ role }) => (
  <div className="flex min-h-screen bg-surface">
    <Sidebar role={role} />
    <main className="flex-1 p-6 pt-16 lg:p-8 lg:pt-8">
      <Outlet />
    </main>
  </div>
);

const App = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="/login" element={<Login />} />

      <Route path="/admin" element={<SpaceLayout role="admin" />}>
        <Route index element={<Placeholder title="Tableau de bord" description="Compteurs et liens rapides." />} />
        <Route path="students" element={<Placeholder title="Gestion des étudiants" />} />
        <Route path="courses" element={<Placeholder title="Gestion des cours" />} />
        <Route path="exams" element={<Placeholder title="Gestion des examens" />} />
        <Route path="exams/:id/questions" element={<Placeholder title="Éditeur de questions" />} />
        <Route path="exams/:id/results" element={<Placeholder title="Résultats de l'examen" />} />
      </Route>

      <Route path="/student" element={<SpaceLayout role="student" />}>
        <Route index element={<Placeholder title="Examens disponibles" />} />
        <Route path="exams/:id" element={<Placeholder title="Passage de l'examen" />} />
        <Route path="exams/:id/result" element={<Placeholder title="Note et correction" />} />
        <Route path="results" element={<Placeholder title="Mes résultats" />} />
      </Route>

    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

export default App;
