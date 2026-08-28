import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchExamById } from '../../api/examApi';
import { fetchQuestions, createQuestion, updateQuestion, deleteQuestion } from '../../api/questionApi';
import { QuestionForm } from '../../components/questions/QuestionForm';
import { ChoiceOption } from '../../components/questions/ChoiceOption';
import { useToast } from '../../contexts/ToastContext';
import { ValidationModal } from '../../components/ui/ValidationModal';

export const ExamDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {showError} = useToast();
    const [exam, setExam] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [pendingDelete, setPendingDelete] = useState(null);

    const isLocked = (exam?.attemptCount ?? 0) > 0;
    const totalPoints = questions.reduce((sum, q) => sum + (q.score || 0), 0);

    const loadData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [examData, questionsData] = await Promise.all([
                fetchExamById(id),
                fetchQuestions(id),
            ]);
            setExam(examData);
            setQuestions(questionsData);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
        setIsAdding(false);
        setEditingQuestion(null);
    }, [id]);

    const handleCreateSubmit = async (payload) => {
        try {
            await createQuestion(id, payload);
            setIsAdding(false);
            loadData();
        } catch (err) {
            showError(err.status === 409 ? `Conflit (409) : ${err.message}` : `Erreur : ${err.message}`);
        }
    };

    const handleUpdateSubmit = async (payload) => {
        try {
            await updateQuestion(editingQuestion.id, payload);
            setEditingQuestion(null);
            loadData();
        } catch (err) {
            showError(err.status === 409 ? `Conflit (409) : ${err.message}` : `Erreur : ${err.message}`);
        }
    };

    const handleRequestDelete = async (questionId) => {
        setPendingDelete(questionId);
        return;
    };

    const handleConfirmDelete = async () => {
        const questionId = pendingDelete;
        setPendingDelete(null);
        try {
            await deleteQuestion(questionId);
            loadData();
        } catch (err) {
            if (err.status === 409) {
                showError(`Conflit (409) : ${err.message}`);
            } else {
                showError(`Erreur (${err.status || 'API'}) : ${err.message}`);
            }
        }
    };

    if (isLoading && !exam) {
        return (
            <div className="p-8 max-w-4xl mx-auto">
                <div className="text-center py-16 text-gray-400 text-sm">Chargement de l'examen...</div>
            </div>
        );
    }

    if (error && !exam) {
        return (
            <div className="p-8 max-w-4xl mx-auto">
                <button
                    onClick={() => navigate('/admin/exams')}
                    className="text-xs font-semibold text-navy hover:underline mb-4 inline-flex items-center gap-1 cursor-pointer"
                >
                    ← Retour aux examens
                </button>
                <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl">{error}</div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-4xl mx-auto animate-fade-in">
            <button
                onClick={() => navigate('/admin/exams')}
                className="text-xs font-semibold text-navy hover:underline mb-4 inline-flex items-center gap-1 cursor-pointer"
            >
                ← Retour aux examens
            </button>
            <div className='flex items-center justify-between mb-6 pb-6 border-b border-contact'>
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-navy-dark">{exam.title}</h1>
                        <div className="flex items-center gap-3 mt-2 text-xs font-semibold text-gray-500">
                            <span>{questions.length} question(s)</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                            <span>{totalPoints} point(s) au total</span>
                            {isLocked && (
                                <>
                                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                                    <span className="text-amber-600">
                                        Verrouillé — {exam.attemptCount} tentative(s) enregistrée(s)
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                {!isAdding && !editingQuestion && !isLocked && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="py-3 border-2 border-dashed border-contact hover:border-navy text-navy font-bold rounded-2xl text-xs transition-colors cursor-pointer"
                    >
                        + Ajouter une question
                    </button>
                )}
            </div>

            {isLocked && !isAdding && !editingQuestion && (
                <div className="p-3 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold rounded-xl mb-4">
                    Cet examen a déjà été passé par au moins un étudiant : les questions ne peuvent plus être modifiées.
                </div>
            )}

            {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl mb-4">{error}</div>
            )}

            <div className="space-y-4">
                {isAdding && (
                    <QuestionForm
                        onSubmit={handleCreateSubmit}
                        onCancel={() => setIsAdding(false)}
                    />
                )}
                {editingQuestion && (
                    <QuestionForm
                        initialData={editingQuestion}
                        onSubmit={handleUpdateSubmit}
                        onCancel={() => setEditingQuestion(null)}
                    />
                )}

                {questions.length === 0 && !isAdding ? (
                    <div className="text-center py-12 text-gray-400 text-sm">
                        Aucune question n'a encore été ajoutée à cet examen.
                    </div>
                ) : (
                    questions.map((q, index) => (
                        <div
                            key={q.id}
                            className={`p-4 rounded-xl border transition-all ${
                                editingQuestion?.id === q.id ? 'border-navy bg-navy/5' : 'border-contact bg-white'
                            }`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-xs text-navy bg-navy/10 px-2 py-0.5 rounded-md">
                                            Q{index + 1}
                                        </span>
                                        <span className="text-xs font-semibold text-gray-500">
                                            ({q.score} {q.score > 1 ? 'pts' : 'pt'})
                                        </span>
                                    </div>
                                    <p className="font-bold text-sm text-navy-dark">{q.text}</p>
                                </div>
                                {!isLocked && (
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button
                                            onClick={() => {
                                                setIsAdding(false);
                                                setEditingQuestion(q);
                                            }}
                                            className="text-xs font-semibold text-navy hover:underline cursor-pointer"
                                        >
                                            Éditer
                                        </button>
                                        <button
                                            onClick={() => handleRequestDelete(q.id)}
                                            className="text-xs font-semibold text-red-600 hover:underline cursor-pointer"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="mt-3">{q.choices?.map(c => <ChoiceOption key={c.id} label={c.label} isCorrect={c.isCorrect} />)}</div>
                        </div>
                    ))
                )}
            </div>
            <ValidationModal
                isOpen={!!pendingDelete}
                title="Supprimer la question"
                message={`Êtes-vous sûr de vouloir supprimer la question" ? Cette action est irréversible.`}
                confirmLabel="Supprimer"
                onConfirm={handleConfirmDelete}
                onCancel={() => setPendingDelete(null)}
            />
        </div>
    );
};