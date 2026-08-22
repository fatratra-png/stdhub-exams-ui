import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import StudentDashboard from "./components/dashboard/StudentDashboard";
import Placeholder from "./pages/Placeholder";

const SpaceLayout = ({ role }) => (
  <div className="flex min-h-screen bg-surface w-full overflow-hidden">
    <Sidebar role={role} />
    <div className="flex-1 flex flex-col min-w-0 w-full h-screen overflow-y-auto">
      <Navbar />
      <main className="p-6 lg:p-8 flex-1 w-full max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  </div>
);

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/student" replace />} />

      <Route path="/admin" element={<SpaceLayout role="admin" />}>
        <Route index element={<Placeholder title="Admin Dashboard" description="Counters and quick links." />} />
        <Route path="students" element={<Placeholder title="Students Management" />} />
        <Route path="courses" element={<Placeholder title="Courses Management" />} />
        <Route path="exams" element={<Placeholder title="Exams Management" />} />
        <Route path="exams/:id/questions" element={<Placeholder title="Question Editor" />} />
        <Route path="exams/:id/results" element={<Placeholder title="Exam Results" />} />
      </Route>

      <Route path="/student" element={<SpaceLayout role="student" />}>
        <Route index element={<StudentDashboard />} />
        <Route path="exams/:id" element={<Placeholder title="Take Exam" />} />
        <Route path="exams/:id/result" element={<Placeholder title="Grades & Feedback" />} />
        <Route path="results" element={<Placeholder title="My Results" />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
