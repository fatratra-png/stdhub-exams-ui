import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";

const getPrefixColor = (code) => {
    const prefix = code.replace(/\d+$/, "");
    const colors = {
    WEB: "bg-blue-100 text-blue-700",
    PROG: "bg-violet-100 text-violet-700",
    SYS: "bg-green-100 text-green-700",
    THEORIE: "bg-amber-100 text-amber-700",
    DONNEES: "bg-pink-100 text-pink-700",
    MGT: "bg-teal-100 text-teal-700",
    LV: "bg-orange-100 text-orange-700",
};
    return colors[prefix] || "bg-navy/10 text-navy/70";
};

const courseList = ({courses, onDelete, onEdit}) => {
    if (courses.length == 0) {
        return(
            <div className="bg-white p-8, text-xs text-navy/40 text-center shadow-card">
                Aucun cours pour le moment
            </div>
        );
    }

    return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden animate-slide-up divide-y divide-contact/20">
    {courses.map((c) => (
        <div
        key={c.id}
        className="flex items-center justify-between px-4 py-3 hover:bg-navy-dark/2 transition-colors"
        >
        <div className="flex items-center gap-3 min-w-0">
            <span
            className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${getPrefixColor(
                c.code
            )}`}
            >
            {c.code}
            </span>
            <div className="min-w-0">
            <div className="flex items-center gap-2 text-navy font-medium text-sm">
                <FontAwesomeIcon icon={faBook} className="text-gold text-xs" />
                <span className="truncate">{c.name}</span>
            </div>
            {c.description && (
                <p className="text-navy/50 text-xs truncate mt-0.5">
                {c.description}
                </p>
            )}
            </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 ml-4">
            <button
                onClick={() => onEdit(c)}
                className="text-navy/50 hover:text-navy transition-colors"
                title="Modifier"
            >
                <FontAwesomeIcon icon={faPen} className="text-xs" />
            </button>
            <button
                onClick={() => onDelete(c.id)}
                className="text-navy/50 hover:text-red-600 transition-colors"
                title="Supprimer"
            >
                <FontAwesomeIcon icon={faTrash} className="text-xs" />
            </button>
        </div>
        </div>
    ))}
    </div>
);
}

export default courseList;