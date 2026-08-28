import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMyResults } from '../../api/myExamApi';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ErrorAlert from '../../components/ui/ErrorAlert';
import { useToast } from '../../contexts/ToastContext';

export const ResultsPage = () => {
    const navigate = useNavigate();
    const { showError } = useToast();
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchMyResults();
            setResults(data);
        } catch (err) {
            setError(err.message);
            showError(`Erreur : ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    }, [showError]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const getScoreColor = (score, maxScore) => {
        if (!maxScore) return 'text-gray-400';
        const pct = (score / maxScore) * 100;
        if (pct >= 75) return 'text-green-600';
        if (pct >= 50) return 'text-gold';
        return 'text-red-500';
    };

    const getScoreBg = (score, maxScore) => {
        if (!maxScore) return 'bg-gray-100';
        const pct = (score / maxScore) * 100;
        if (pct >= 75) return 'bg-green-100';
        if (pct >= 50) return 'bg-amber-100';
        return 'bg-red-100';
    };

    const handleViewDetail = (examId) => {
        navigate(`/student/exams/${examId}/result`);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto animate-fade-in">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-navy-dark">Mes résultats</h1>
                <p className="text-sm text-gray-500 mt-1">Consultez les notes de vos examens passés.</p>
            </div>

            {isLoading && <LoadingSpinner message="Chargement de vos résultats..." />}

            {!isLoading && error && (
                <ErrorAlert message={error} onRetry={loadData} />
            )}

            {!isLoading && !error && results.length === 0 && (
                <div className="card text-center py-12">
                    <p className="text-gray-400 text-sm">Aucun résultat pour le moment.</p>
                    <p className="text-gray-400 text-xs mt-1">Passez un examen pour voir vos notes ici.</p>
                </div>
            )}

            {!isLoading && !error && results.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {results.map((result) => {
                        const percentage = result.maxScore
                            ? Math.round((result.score / result.maxScore) * 100)
                            : 0;

                        return (
                            <div key={result.examId} className="card flex flex-col justify-between hover:shadow-lg transition-all">
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-bold text-navy bg-navy/10 px-2.5 py-1 rounded-lg">
                                            {result.courseName}
                                        </span>
                                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${getScoreBg(result.score, result.maxScore)} ${getScoreColor(result.score, result.maxScore)}`}>
                                            {percentage}%
                                        </span>
                                    </div>

                                    <h2 className="text-lg font-bold text-navy-dark mb-3">{result.examTitle}</h2>

                                    <div className="flex items-baseline gap-2 mb-4">
                                        <span className={`text-3xl font-bold ${getScoreColor(result.score, result.maxScore)}`}>
                                            {result.score}
                                        </span>
                                        <span className="text-sm text-gray-400 font-semibold">/ {result.maxScore}</span>
                                    </div>

                                    <div className="text-xs text-gray-500 border-t border-contact/50 pt-3">
                                        <span>Passé le </span>
                                        <span className="font-medium text-navy-dark">
                                            {new Date(result.submittedAt).toLocaleString('fr-FR')}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-5 pt-4 border-t border-contact">
                                    <button
                                        onClick={() => handleViewDetail(result.examId)}
                                        className="w-full px-3 py-1.5 text-xs font-semibold rounded-lg bg-navy text-white hover:bg-navy-dark transition-colors cursor-pointer"
                                    >
                                        Voir le détail
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
