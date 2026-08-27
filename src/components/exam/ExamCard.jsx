import React from "react";
import { getExamStatus } from "../../utils/dateUtils";

export const ExamCard = ({exam, course, onEdit, onDelete, onDetails}) => {
    const status = getExamStatus(exam.startDate, exam.endDate);
    const isLocked = (exam.attemptCount ?? 0) > 0;
    
    return (
        <div className="card flex flex-col justify-between hover:shadow-lg transition-all">
            <div>
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-navy bg-navy/10 px-2.5 py-1 rounded-lg">
                        {course ? course.code : `Cours #${exam.courseId}`}
                    </span>
                    <span className={status.badgeClass}>{status.label}</span>
                </div>

                <h2 className="text-lg font-bold text-navy-dark mb-2">{exam.title}</h2>
                {exam.desciption && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{exam.description}</p>
                )}
                <div className="space-y-1.5 text-xs text-gray-500 border-t border-contact/50 pt-3">
                    <div className="flex justify-between">
                        <span>Début :</span>
                        <span className="front-medium text-navy-dark">
                            {new Date(exam.startDate).toLocaleString('fr-FR')}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Fin :</span>
                        <span className="font-medium text-navy-dark">
                            {new Date(exam.endDate).toLocaleString('fr-FR')}
                        </span>
                    </div>
                    <div className="flex justify-between pt-1">
                        <span>Questions :</span>
                        <span className="font-bold text-navy">{exam.questionCount ?? 0}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tentatives passées :</span>
                        <span className={`font-bold ${isLocked ? 'text-amber-600' : 'text-gray-400'}`}>
                            {exam.attemptCount ?? 0} {isLocked && '(Verrouillé)'}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between gap-2 mt-6 pt-4 border-t border-contact">
                <button
                    onClick={() => onDetails(exam)}
                    className="px-3 py-1.5 text-xs font-semibold text-navy bg-surface hover:bg-contact rounded-lg transition-colors cursor-pointer"
                >
                    Détails
                </button>
                <div className="flex items-center justify-end gap-4">
                    <button
                        onClick={() => onEdit(exam)}
                        className="px-3 py-1.5 text-xs font-semibold text-navy bg-surface hover:bg-contact rounded-lg transition-colors cursor-pointer"
                    >
                        Modifier
                    </button>
                    <button
                        onClick={() => onDelete(exam)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                            isLocked
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer'
                        }`}
                        title={isLocked ? 'Suppression refusée : des étudiants ont déjà passé cet examen.' : ''}
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
};