import { useState } from "react";
import useStudents from "../../services/useStudent";
import StudentList from "../../components/dashboard/StudentList";
import StudentForm from "../../components/dashboard/StudentForm";
import { ValidationModal } from "../../components/ui/ValidationModal";
import { useToast } from "../../contexts/ToastContext";

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
  const {showError} = useToast();
  const [pendingDeactive, setPendingDeactive] = useState(null);

  const handleSubmit = async (data) => {
    if (editingStudent) {
      await updateStudent(editingStudent.id, data);
    } else {
      await createStudent(data);
    }
    setShowForm(false);
    setEditingStudent(null);
  };

  const handleRequestDeactive = (id) => {
    setPendingDeactive(id);
  }

  const handleDeactivate = async () => {
    const studentId = pendingDeactive;
    setPendingDeactive(null);
    try {
      await deactivateStudent(pendingDeactive);
    } catch (err) { 
      showError(`Erreur : ${err.message}`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Étudiants</h1>
        <button
          onClick={() => {
            setEditingStudent(null);
            setShowForm(true);
          }}
          className="btn-gold flex items-center gap-2 whitespace-nowrap"
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
          onDeactivate={handleRequestDeactive}
        />
      )}
      <ValidationModal
        isOpen={!!pendingDeactive}
        title="Désactiver l'étudiant"
        message={`Êtes-vous sûr de vouloir désactivé cet étudiant ? Cette action est irréversible.`}
        confirmLabel="Désactiver"
        onConfirm={handleDeactivate}
        onCancel={() => setPendingDeactive(null)}
      />
    </div>
  );
}

export default StudentsPage;