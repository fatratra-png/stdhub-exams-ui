import { MyExamCard } from "./MyExamCard";

export const MyExamsGrid = ({ exams, onPass, passedExamIds, isLoading, error }) => {
    if (isLoading) {
        return <div className="card text-center py-12 text-gray-400">Chargement des examens...</div>;
    }
    if (error) {
        return <div className="card bg-red-50 text-red-600 py-4 px-6 mb-6">{error}</div>;
    }
    if (exams.length === 0) {
        return (
            <div className="card text-center py-12 text-gray-400">
                Aucun examen disponible.
            </div>
        );
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam) => (
                <MyExamCard
                    key={exam.id}
                    exam={exam}
                    onPass={onPass}
                    isPassed={passedExamIds.has(exam.id)}
                />
            ))}
        </div>
    );
};