import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchExam, fetchCourses, createExam, updateExam, deleteExam } from '../../services/examApi';
import { ExamHeader } from '../../components/exam/ExamHeader';
import { ExamGrid } from '../../components/exam/ExamGrid';
import { ExamModal } from '../../components/exam/ExamModal';
import { useToast } from '../../contexts/ToastContext';
export const ExamsPage = () => {
    const { showError } = useToast();
    const navigate = useNavigate();
    const [exams, setExams] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingExam, setEditingExam] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loadData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [examsData, coursesData] = await Promise.all([
                fetchExam(selectedCourseId),
                fetchCourses(),
            ]);
            setExams(examsData);
            setCourses(coursesData);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [selectedCourseId]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const coursesMap = useMemo(() => {
        return new Map(courses.map((c) => [c.id, c]));
    }, [courses]);

    const handleOpenCreateModal = () => {
        setEditingExam(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (exam) => {
        setEditingExam(exam);
        setIsModalOpen(true);
    };

    const handleSubmitExam = async (payload) => {
        try {
            if (editingExam) {
                await updateExam(editingExam.id, payload);
            } else {
                await createExam(payload);
            }
            setIsModalOpen(false);
            loadData();
        } catch (err) {
            showError(`Erreur : ${err.message}`);
        }
    };

    const handleDeleteExam = async (exam) => {
        if ((exam.attemptCount ?? 0) > 0) {
            showError(`Impossible de supprimer "${exam.title}" : cet examen enregistre déjà ${exam.attemptCount} tentative(s).`);
            return;
        }
        if (!window.confirm(`Êtes-vous sûr de vouloir supprimer l'examen "${exam.title}" ?`)) {
            return;
        }
        try {
            await deleteExam(exam.id);
            loadData();
        } catch (err) {
            if (err.status === 409) {
                showError(`Conflit (409) : ${err.message}`);
            } else {
                showError(`Erreur (${err.status || 'API'}) : ${err.message}`);
            }
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto animate-fade-in">
            <ExamHeader
                courses={courses}
                selectedCourseId={selectedCourseId}
                onFilterChange={setSelectedCourseId}
                onOpenCreateModal={handleOpenCreateModal}
            />
            <ExamGrid
                exams={exams}
                coursesMap={coursesMap}
                isLoading={isLoading}
                error={error}
                onEdit={handleOpenEditModal}
                onDelete={handleDeleteExam}
                onDetails={(exam) => navigate(`/admin/exams/${exam.id}/questions`)}
            />
            <ExamModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmitExam}
                courses={courses}
                initialData={editingExam}
            />
        </div>
    );
};