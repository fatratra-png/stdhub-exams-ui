import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";

const App = () => {
  const [role, setRole] = useState("student");

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar role={role} />
      <button
        onClick={() =>
          setRole(role === "student" ? "admin" : "student")
        }
        className="fixed bottom-4 right-4 z-40 touch-target rounded-xl bg-navy px-4
                   text-white text-sm font-medium shadow-lg"
      >
        View as {role === "student" ? "Admin" : "Student"}
      </button>
    </div>
  );
};

export default App;
