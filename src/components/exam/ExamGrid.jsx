import React from "react";
import { ExamCard } from "./ExamCard";

export const ExamGrid = ({exams, coursesMap, isLoading, error, onEdit, onDelete, onDetails, onResults}) => {
    if (isLoading) {
        return <div className="card text-center py-12 text-gray-400">Chargement des examens...</div>;
    }
    if (error) {
        return <div className="card bg-red-50 text-red-600 py-4 px-6 mb-6">{error}</div>;
    } 
    if (exams.length === 0) {
        return (
            <div className="card text-center py-12 text-gray-400">
                Aucun examen disponible pour le filtre sélectionné.
            </div>
        );
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam) => (
                <ExamCard
                    key={exam.id}
                    exam={exam}
                    course={coursesMap.get(exam.courseId)}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onDetails={onDetails}
                    onResults={onResults}
                />
            ))}
        </div>
    );
};