import React, { useCallback, useEffect, useState } from "react";
import { fetchExamResults } from "../../services/resultsApi";
import { useParams } from "react-router-dom";
import { ResultsList } from "../../components/exam/ResultsList";

export const ResultsPage = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [examResults, setExamsResults] = useState(null);

    const loadData = useCallback(async () => {
        if (!id) return;
        setIsLoading(true);
        setError(null);
        try {
            const resultsData = await fetchExamResults(id);
            setExamsResults(resultsData);
        } catch (err) {
            setError(err.message || "Erreur de chargement");
        } finally {
            setIsLoading(false);
        }
    }, [examResults]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    if (isLoading) {
        return <div className="p-6 max-w-4xl mx-auto text-gray-500 text-sm">Chargement...</div>;
    }

    if (error) {
        return <div className="p-6 max-w-4xl mx-auto text-red-600 text-sm">{error}</div>;
    }

    if (!examResults) return null;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Résultat de : {examResults.examTitle}</h1>
                <div className="flex gap-4">
                    <span>Moyenne: {examResults.average}</span>
                    <span>Tentatives: {examResults.attemptsCount}</span>
                </div>
            </div>

            <ResultsList results={examResults.results} />
        </div>
    );
};