import { useState } from "react";
import useCourses from "../../services/useCourse";
import CourseList from "../../components/courses/CourseList";
import CourseForm from "../../components/courses/CourseForm";

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

  const handleSubmit = async (data) => {
    if (editingCourse) {
      await updateCourse(editingCourse.id, data);
    } else {
      await createCourse(data);
    }
    setShowForm(false);
    setEditingCourse(null);
  };

  const handleDelete = async (id) => {
    if (confirm("Supprimer ce cours ?")) {
      setDeleteError(null);
      try {
        await deleteCourse(id);
      } catch (err) {
        setDeleteError(err.message);
      }
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
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default CoursesPage;