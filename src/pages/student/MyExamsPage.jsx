import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMyExams, fetchMyResults } from '../../services/myExamApi';
import { MyExamsGrid } from '../../components/exam/MyExamsGrid';
import { useToast } from '../../contexts/ToastContext';

export const MyExamsPage = () => {
    const navigate = useNavigate();
    const { showError } = useToast();
    const [exams, setExams] = useState([]);
    const [passedExamIds, setPassedExamIds] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [examsData, resultsData] = await Promise.all([
                fetchMyExams(),
                fetchMyResults(),
            ]);
            setExams(examsData);
            setPassedExamIds(new Set(resultsData.map((r) => r.examId)));
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handlePass = (exam) => {
        navigate(`/student/exams/${exam.id}`);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto animate-fade-in">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-navy-dark">Mes examens</h1>
                <p className="text-sm text-gray-500 mt-1">Retrouvez ici les examens disponibles pour vos cours.</p>
            </div>
            {error && !isLoading && (
                <div className="card bg-red-50 text-red-600 py-4 px-6 mb-6">{error}</div>
            )}
            <MyExamsGrid
                exams={exams}
                onPass={handlePass}
                passedExamIds={passedExamIds}
                isLoading={isLoading}
                error={null}
            />
        </div>
    );
};