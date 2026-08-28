export const ResultsList = ({results}) => {
    if (results.length == 0) {
        return (
            <div className="bg-white rounded-2xl shadow-card p-8 text-center text-navy/40 text-sm">
                Aucun résultat pour le moment.
            </div>
        );
    }
    return (
        <div className="bg-white rounded-2xl shadow-card overflow-hidden animate-slide-up">
        <table className="w-full text-left text-sm">
            <thead>
            <tr className="border-b border-contact/30 text-navy/50">
                <th className="py-3 px-4 text-[10px] font-bold uppercase">
                    Étudiant
                </th>
                <th className="py-3 px-4 text-[10px] font-bold uppercase">Ref</th>
                <th className="py-3 px-4 text-[10px] font-bold uppercase">
                    Score
                </th>
                <th className="py-3 px-4 text-[10px] font-bold uppercase text-right">
                    Soumis le
                </th>
            </tr>
            </thead>
            <tbody>
            {results.map((r) => (
                <tr
                key={r.studentId}
                className="border-b border-contact/20 last:border-0 hover:bg-navy-dark/2 transition-colors"
                >
                <td className="py-3 px-4">
                    <div className="flex items-center gap-2 text-navy">
                    <FontAwesomeIcon
                        icon={faUserGraduate}
                        className="text-gold text-xs"
                    />
                    <span className="text-[13px] font-medium">
                        {r.studentName}
                    </span>
                    </div>
                </td>
                <td className="py-3 px-4 text-navy/60">{r.studentId}</td>
                <td className="py-3 px-4">
                    <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        r.score >= 10
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                    >
                    {r.score}
                    </span>
                </td>
                <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-3">
                        {r.submittedAt}
                    </div>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}