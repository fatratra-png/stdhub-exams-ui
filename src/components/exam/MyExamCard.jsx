export const MyExamCard = ({ exam, onPass, isPassed }) => {
    return (
        <div className="card flex flex-col justify-between hover:shadow-lg transition-all">
            <div>
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-navy bg-navy/10 px-2.5 py-1 rounded-lg">
                        {exam.courseName}
                    </span>
                </div>

                <h2 className="text-lg font-bold text-navy-dark mb-2">{exam.title}</h2>
                {exam.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{exam.description}</p>
                )}
                <div className="space-y-1.5 text-xs text-gray-500 border-t border-contact/50 pt-3">
                    <div className="flex justify-between">
                        <span>Début :</span>
                        <span className="font-medium text-navy-dark">
                            {new Date(exam.startDate).toLocaleString('fr-FR')}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Fin :</span>
                        <span className="font-medium text-navy-dark">
                            {new Date(exam.endDate).toLocaleString('fr-FR')}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between gap-2 mt-6 pt-4 border-t border-contact">
                <div className="flex items-center justify-end gap-4 w-full">
                    <button
                        onClick={() => !isPassed && onPass(exam)}
                        disabled={isPassed}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                            isPassed
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-navy text-white hover:bg-navy-dark cursor-pointer'
                        }`}
                        title={isPassed ? 'Vous avez déjà passé cet examen.' : ''}
                    >
                        {isPassed ? 'Déjà passé' : "Passer l'examen"}
                    </button>
                </div>
            </div>
        </div>
    );
};