import { useState } from "react";
import useStudents from "../hooks/useStudent";
import StudentList from "../components/dashboard/StudentList";
import StudentForm from "../components/dashboard/StudentForm";

const StudentsPage = () => {
  const {
    students,
    loading,
    error,
    createStudent,
    updateStudent,
    deactivateStudent,
  } = useStudents();
  const [editingStudent, setEditingStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (data) => {
    if (editingStudent) {
      await updateStudent(editingStudent.id, data);
    } else {
      await createStudent(data);
    }
    setShowForm(false);
    setEditingStudent(null);
  };

  const handleDeactivate = async (id) => {
    if (confirm("Désactiver cet étudiant ?")) {
      await deactivateStudent(id);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Étudiants</h1>
        <button
          onClick={() => {
            setEditingStudent(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-bold"
        >
          + Nouvel étudiant
        </button>
      </div>

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      {showForm && (
        <StudentForm
          initial={editingStudent}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingStudent(null);
          }}
        />
      )}

      {loading ? (
        <p className="text-gray-500 text-sm">Chargement...</p>
      ) : (
        <StudentList
          students={students}
          onEdit={(s) => {
            setEditingStudent(s);
            setShowForm(true);
          }}
          onDeactivate={handleDeactivate}
        />
      )}
    </div>
  );
}

export default StudentsPage;