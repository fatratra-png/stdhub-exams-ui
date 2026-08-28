import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { fetchMyResults } from '../../api/myExamApi';
import { ChoiceOption } from '../../components/questions/ChoiceOption';
import { useToast } from '../../contexts/ToastContext';

export const ExamResultPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { showError } = useToast();

    const [result, setResult] = useState(location.state?.result ?? null);
    const [summaryOnly, setSummaryOnly] = useState(null);
    const [isLoading, setIsLoading] = useState(!location.state?.result);

    useEffect(() => {
        if (result) return;
        fetchMyResults()
            .then((history) => {
                const match = history.find((h) => String(h.examId) === id);
                setSummaryOnly(match ?? null);
            })
            .catch((err) => showError(`Erreur : ${err.message}`))
            .finally(() => setIsLoading(false));
    }, [id, result]);

    if (isLoading) {
        return (
            <div className="p-8 max-w-3xl mx-auto">
                <div className="text-center py-16 text-gray-400 text-sm">Chargement du résultat...</div>
            </div>
        );
    }
    if (!result && !summaryOnly) return null;
    const displayScore = result ?? summaryOnly;
    const percentage = displayScore.maxScore ? Math.round((displayScore.score / displayScore.maxScore) * 100) : 0;

    return (
        <div className="p-8 max-w-3xl mx-auto animate-fade-in">
            <button
                onClick={() => navigate('/student')}
                className="text-xs font-semibold text-navy hover:underline mb-4 inline-flex items-center gap-1 cursor-pointer"
            >
                ← Retour à mes examens
            </button>

            <div className="card p-6 mb-6 text-center">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Votre note</p>
                <p className="text-4xl font-bold text-navy-dark">
                    {displayScore.score} <span className="text-lg text-gray-400 font-semibold">/ {displayScore.maxScore}</span>
                </p>
                <p className="text-sm font-semibold text-gray-500 mt-1">{percentage}%</p>
            </div>

            {result ? (
                <div className="space-y-4">
                    {result.corrections.map((c, index) => (
                        <div key={c.questionId} className="card p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="font-bold text-xs text-navy bg-navy/10 px-2 py-0.5 rounded-md">
                                    Q{index + 1}
                                </span>
                                <span className="text-xs font-semibold text-gray-500">
                                    ({c.score} {c.score > 1 ? 'pts' : 'pt'})
                                </span>
                            </div>
                            <p className="font-bold text-sm text-navy-dark mb-2">{c.text}</p>
                            <div>
                                {c.choices.map((choice) => (
                                    <ChoiceOption
                                        key={choice.id}
                                        variant="result"
                                        label={choice.label}
                                        choiceId={choice.id}
                                        correctChoiceId={c.correctChoiceId}
                                        selectedChoiceId={c.selectedChoiceId}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-sm text-gray-500 py-8">
                    Détail des réponses disponible uniquement juste après la soumission.
                </p>
            )}
        </div>
    );
};