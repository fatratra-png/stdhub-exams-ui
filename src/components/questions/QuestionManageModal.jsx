import React, { useState, useEffect } from 'react';
import { fetchQuestions, createQuestion, updateQuestion, deleteQuestion } from '../../services/questionApi';
import { QuestionForm } from './QuestionForm';

export const QuestionsManagerModal = ({ exam, isOpen, onClose, onQuestionsUpdated }) => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const isLocked = (exam?.attemptCount ?? 0) > 0;

    const loadQuestions = async () => {
        if (!exam) return;
            setIsLoading(true);
            setError(null);
        try {
            const data = await fetchQuestions(exam.id);
            setQuestions(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen && exam) {
            loadQuestions();
            setIsAdding(false);
            setEditingQuestion(null);
        }
    }, [isOpen, exam]);

    if (!isOpen || !exam) return null;

    const handleCreateSubmit = async (payload) => {
        try {
            await createQuestion(exam.id, payload);
            setIsAdding(false);
            loadQuestions();
        if (onQuestionsUpdated) onQuestionsUpdated();
        } catch (err) {
            alert(err.status === 409 ? `Conflit (409) : ${err.message}` : `Erreur : ${err.message}`);
        }
    };

    const handleUpdateSubmit = async (payload) => {
        try {
            await updateQuestion(editingQuestion.id, payload);
            setEditingQuestion(null);
            loadQuestions();
        } catch (err) {
            alert(err.status === 409 ? `Conflit (409) : ${err.message}` : `Erreur : ${err.message}`);
        }
    };

    const handleDelete = async (questionId) => {
        if (!window.confirm('Voulez-vous vraiment supprimer cette question ?')) return;
        try {
            await deleteQuestion(questionId);
            loadQuestions();
            if (onQuestionsUpdated) onQuestionsUpdated();
        } catch (err) {
            alert(err.status === 409 ? `Conflit (409) : ${err.message}` : `Erreur : ${err.message}`);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-dark/40 backdrop-blur-sm animate-fade-in">
            <div className="card w-full max-w-3xl max-h-[90vh] flex flex-col shadow-modal animate-slide-up">
                <div className="flex items-center justify-between border-b border-contact pb-4 mb-4">
                <div>
                    <h2 className="text-xl font-bold text-navy-dark">Questions : {exam.title}</h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                        {questions.length} question(s) configurée(s)
                        {isLocked && <span className="text-amber-600 font-bold ml-2">(Examen verrouillé)</span>}
                    </p>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-navy-dark font-bold text-lg px-2 cursor-pointer"
                >
                    ✕
                </button>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4">
                    {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl">{error}</div>}

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
                    {!isAdding && !editingQuestion && !isLocked && (
                        <button
                            onClick={() => setIsAdding(true)}
                            className="w-full py-3 border-2 border-dashed border-contact hover:border-navy text-navy font-bold rounded-2xl text-xs transition-colors cursor-pointer"
                        >
                            + Ajouter une question
                        </button>
                    )}
                    {isLoading ? (
                        <div className="text-center py-8 text-gray-400 text-sm">Chargement des questions...</div>
                            ) : questions.length === 0 && !isAdding ? (
                                <div className="text-center py-8 text-gray-400 text-sm">
                                    Aucune question n'a encore été ajoutée à cet examen.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {questions.map((q, index) => (
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
                                                    <div className="flex items-center gap-2">
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
                                                            onClick={() => handleDelete(q.id)}
                                                            className="text-xs font-semibold text-red-600 hover:underline cursor-pointer"
                                                        >
                                                            Supprimer
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {q.choices?.map((c) => (
                                                    <div
                                                        key={c.id}
                                                        className={`text-xs p-2 rounded-lg flex items-center justify-between ${
                                                        c.isCorrect
                                                            ? 'bg-green-50 text-green-800 font-bold border border-green-200'
                                                            : 'bg-surface text-gray-600'
                                                        }`}
                                                    >
                                                        <span>{c.label}</span>
                                                        {c.isCorrect && <span className="text-green-600">✓ Correcte</span>}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                        )}
                    </div>
                <div className="pt-4 mt-4 border-t border-contact flex justify-end">
                    <button onClick={onClose} className="btn-primary text-xs px-5 py-2">
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};