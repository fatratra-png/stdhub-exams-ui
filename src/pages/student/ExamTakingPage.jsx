import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMyExam, submitMyExam } from '../../services/myExamApi';
import { ChoiceOption } from '../../components/questions/ChoiceOption';
import { ValidationModal } from '../../components/ui/ValidationModal';
import { useToast } from '../../contexts/ToastContext';

export const ExamTakingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showError } = useToast();
    const [exam, setExam] = useState(null);
    const [answers, setAnswers] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        fetchMyExam(id)
            .then(setExam)
            .catch((err) => showError(`Erreur : ${err.message}`))
            .finally(() => setIsLoading(false));
    }, [id]);

    const answeredCount = Object.keys(answers).length;
    const totalQuestions = exam?.questions.length ?? 0;
    const allAnswered = totalQuestions > 0 && answeredCount === totalQuestions;

    const handleSelect = (questionId, choiceId) => {
        setAnswers((prev) => ({ ...prev, [questionId]: choiceId }));
    };
    const handleConfirmSubmit = async () => {
        setShowConfirm(false);
        setIsSubmitting(true);
        try {
            const payload = {
                answers: Object.entries(answers).map(([questionId, choiceId]) => ({ questionId, choiceId })),
            };
            const result = await submitMyExam(id, payload);
            navigate(`/student/exams/${id}/result`, { state: { result } });
        } catch (err) {
            showError(`Erreur lors de la soumission : ${err.message}`);
            setIsSubmitting(false);
        }
    };
    if (isLoading) {
        return (
            <div className="p-8 max-w-3xl mx-auto">
                <div className="text-center py-16 text-gray-400 text-sm">Chargement de l'examen...</div>
            </div>
        );
    }
    if (!exam) return null;
    return (
        <div className="p-8 max-w-3xl mx-auto animate-fade-in pb-28">
            <div className="mb-6 pb-6 border-b border-contact">
                <h1 className="text-2xl font-bold text-navy-dark">{exam.title}</h1>
                <p className="text-xs font-semibold text-gray-500 mt-2">
                    {answeredCount} / {totalQuestions} question(s) répondue(s)
                </p>
                <div className="w-full h-1.5 bg-contact rounded-full mt-2 overflow-hidden">
                    <div
                        className="h-full bg-navy transition-all"
                        style={{ width: `${totalQuestions ? (answeredCount / totalQuestions) * 100 : 0}%` }}
                    />
                </div>
            </div>
            <div className="space-y-4">
                {exam.questions.map((q, index) => (
                    <div key={q.id} className="card p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="font-bold text-xs text-navy bg-navy/10 px-2 py-0.5 rounded-md">
                                Q{index + 1}
                            </span>
                            <span className="text-xs font-semibold text-gray-500">
                                ({q.score} {q.score > 1 ? 'pts' : 'pt'})
                            </span>
                        </div>
                        <p className="font-bold text-sm text-navy-dark mb-2">{q.text}</p>
                        <div>
                            {q.choices.map((c) => (
                                <ChoiceOption
                                    key={c.id}
                                    variant="select"
                                    label={c.label}
                                    isSelected={answers[q.id] === c.id}
                                    onSelect={() => handleSelect(q.id, c.id)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-contact p-4 flex justify-center">
                <button
                    onClick={() => setShowConfirm(true)}
                    disabled={!allAnswered || isSubmitting}
                    className={`px-6 py-2.5 text-sm font-bold rounded-xl transition-colors ${
                        allAnswered && !isSubmitting
                            ? 'btn-primary cursor-pointer'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                >
                    {isSubmitting ? 'Envoi en cours...' : 'Soumettre l\'examen'}
                </button>
            </div>
            <ValidationModal
                isOpen={showConfirm}
                title="Soumettre l'examen"
                message="Une fois soumis, vous ne pourrez plus modifier vos réponses. Confirmer ?"
                confirmLabel="Soumettre"
                variant="primary"
                onConfirm={handleConfirmSubmit}
                onCancel={() => setShowConfirm(false)}
            />
        </div>
    );
};