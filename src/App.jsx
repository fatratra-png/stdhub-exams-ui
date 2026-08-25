import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import StudentDashboard from "./components/dashboard/StudentDashboard";
import StudentsPage from "./pages/StudentPage";
import Placeholder from "./pages/Placeholder";
import Login from "./login/Login";
import RoleRoute from "./login/RoleRoute";
import Dashboard from "./pages/admin/Dashboard";

const SpaceLayout = ({ role }) => (
  <div className="flex min-h-screen bg-surface w-full overflow-hidden">
    <Sidebar role={role} />
    <div className="flex-1 flex flex-col min-w-0 w-full h-screen overflow-y-auto">
      <Navbar />
      <main className="p-6 lg:p-8 flex-1 w-full mx-auto">
        <Outlet />
      </main>
    </div>
  </div>
);

const App = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="/login" element={<Login />} />

      <Route path="/admin" element={<SpaceLayout role="admin" />}>
        <Route index element={<Placeholder title="Admin Dashboard" description="Counters and quick links." />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="courses" element={<Placeholder title="Courses Management" />} />
        <Route path="exams" element={<Placeholder title="Exams Management" />} />
        <Route path="exams/:id/questions" element={<Placeholder title="Question Editor" />} />
        <Route path="exams/:id/results" element={<Placeholder title="Exam Results" />} />
      </Route>
    <Route path="/admin" element={<RoleRoute rolesAutorises={["ADMIN"]}><SpaceLayout role="ADMIN" /></RoleRoute>}>
      <Route index element={<Dashboard />} />
      <Route path="students" element={<Placeholder title="Gestion des étudiants" />} />
      <Route path="courses" element={<Placeholder title="Gestion des cours" />} />
      <Route path="exams" element={<Placeholder title="Gestion des examens" />} />
      <Route path="exams/:id/questions" element={<Placeholder title="Éditeur de questions" />} />
      <Route path="exams/:id/results" element={<Placeholder title="Résultats de l'examen" />} />
    </Route>

    <Route path="/student" element={<RoleRoute rolesAutorises={["STUDENT"]}><SpaceLayout role="STUDENT" /></RoleRoute>}>
      <Route index element={<Placeholder title="Examens disponibles" />} />
      <Route path="exams/:id" element={<Placeholder title="Passage de l'examen" />} />
      <Route path="exams/:id/result" element={<Placeholder title="Note et correction" />} />
      <Route path="results" element={<Placeholder title="Mes résultats" />} />
    </Route>

    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

export default App;
