import React from "react";

export const ExamHeader = ({courses, selectedCourseId, onFilterChange, onOpenCreateModal}) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-2xl font-bold text-navy-dark">Gestion des examens</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Créez, modifiez et gérez les sessions d'examens.
                </p>
            </div>
            <div className="flex items-center gap-3">
                <select
                    className="input-field w-56"
                    value={selectedCourseId}
                    onChange={(e) => onFilterChange(e.target.value)}
                >
                    <option value="">Tous les cours</option>
                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.code}
                        </option>
                    ))}
                </select>

                <button
                    onClick={onOpenCreateModal}
                    className="btn-gold flex items-center gap-2 whitespace-nowrap"
                >
                    <span>+ Créer un examen</span>
                </button>
            </div>
        </div>
    );
};