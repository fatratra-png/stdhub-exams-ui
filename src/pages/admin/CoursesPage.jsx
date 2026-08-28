import { useState } from "react";
import useCourses from "../../services/useCourse";
import CourseList from "../../components/courses/CourseList";
import CourseForm from "../../components/courses/CourseForm";
import { ValidationModal } from "../../components/ui/ValidationModal";
const CoursesPage = () => {
  const {
    courses,
    loading,
    error,
    createCourse,
    updateCourse,
    deleteCourse,
  } = useCourses();
  const [editingCourse, setEditingCourse] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  const handleSubmit = async (data) => {
    if (editingCourse) {
      await updateCourse(editingCourse.id, data);
    } else {
      await createCourse(data);
    }
    setShowForm(false);
    setEditingCourse(null);
  };
  const handleRequestDelete = (id) => {
    setPendingDelete(id);
  }
  const handleDelete = async () => {
    const IdDelete = pendingDelete;
    setPendingDelete(null);
    setDeleteError(null);
    try {
      await deleteCourse(IdDelete);
    } catch (err) {
      setDeleteError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Cours</h1>
        <button
          onClick={() => {
            setEditingCourse(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-bold"
        >
          + Nouveau cours
        </button>
      </div>

      {(error || deleteError) && (
        <p className="text-red-600 text-sm mb-3">{error || deleteError}</p>
      )}

      {showForm && (
        <CourseForm
          initial={editingCourse}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingCourse(null);
          }}
        />
      )}

      {loading ? (
        <p className="text-gray-500 text-sm">Chargement...</p>
      ) : (
        <CourseList
          courses={courses}
          onEdit={(c) => {
            setEditingCourse(c);
            setShowForm(true);
          }}
          onDelete={handleRequestDelete}
        />
      )}
      <ValidationModal
        isOpen={!!pendingDelete}
        title="Supprimer le cours"
        message={`Êtes-vous sûr de vouloir supprimer le cours "${pendingDelete}" ? Cette action est irréversible.`}
        confirmLabel="Supprimer"
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
        />
    </div>
  );
}

export default CoursesPage;