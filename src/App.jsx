import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import Placeholder from "./pages/Placeholder";
import Login from "./login/Login";
import RoleRoute from "./login/RoleRoute";
import Dashboard from "./pages/admin/Dashboard";
import Profile from "./pages/Profile";
import { useAuth } from "./login/AuthContext";
import { ExamsPage } from "./pages/admin/ExamsPage";
import { ExamDetailsPage } from "./pages/admin/ExamDetailsPage";
import { ToastProvider } from "./contexts/ToastContext";
import CoursesPage from "./pages/CoursesPage";
import useCourse from "./hooks/useCourse";
import StudentForm from "./components/dashboard/StudentForm";
import StudentList from "./components/dashboard/StudentList";
import { MyExamsPage } from "./pages/student/MyExamsPage";
import { ExamTakingPage } from "./pages/student/ExamTakingPage";
import { ExamResultPage } from "./pages/student/ExamResultPage";


const SpaceLayout = ({ role }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-surface w-full overflow-hidden">
      <Sidebar role={role} userName={user?.nom || user?.email} onLogout={handleLogout} />
      <div className="flex-1 flex flex-col min-w-0 w-full h-screen overflow-y-auto">
        <Navbar />
        <main className="p-6 lg:p-8 flex-1 w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <ToastProvider>
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      
      <Route path="/admin" element={<RoleRoute rolesAutorises={["ADMIN"]}><SpaceLayout role="ADMIN" /></RoleRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="courses" element={<Placeholder title="Gestion des cours" />} />
        <Route path="exams" element={<ExamsPage />} />
        <Route path="exams/:id/questions" element={<ExamDetailsPage />} />
        <Route path="exams/:id/results" element={<Placeholder title="Résultats de l'examen" />} />
      </Route>

      <Route path="/student" element={<RoleRoute rolesAutorises={["STUDENT"]}><SpaceLayout role="STUDENT" /></RoleRoute>}>
        <Route index element={<MyExamsPage />} />
        <Route path="exams/:id" element={<ExamTakingPage />} />
        <Route path="exams/:id/result" element={<ExamResultPage />} />
        <Route path="results" element={<Placeholder title="Mes résultats" />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="/admin/profile" element={<RoleRoute rolesAutorises={["ADMIN"]}><Profile /></RoleRoute>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </ToastProvider>
);

export default App;