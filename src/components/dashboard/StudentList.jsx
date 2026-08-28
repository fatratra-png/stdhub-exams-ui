import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import { faBan } from "@fortawesome/free-solid-svg-icons/faBan";
import { faUserGraduate } from "@fortawesome/free-solid-svg-icons/faUserGraduate";

const StudentList = ({ students, onEdit, onDeactivate }) => {
  if (students.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-card p-8 text-center text-navy/40 text-sm">
        Aucun étudiant pour le moment.
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
            <th className="py-3 px-4 text-[10px] font-bold uppercase">Email</th>
            <th className="py-3 px-4 text-[10px] font-bold uppercase">
              Statut
            </th>
            <th className="py-3 px-4 text-[10px] font-bold uppercase text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr
              key={s.id}
              className="border-b border-contact/20 last:border-0 hover:bg-navy-dark/2 transition-colors"
            >
              <td className="py-3 px-4">
                <div className="flex items-center gap-2 text-navy">
                  <FontAwesomeIcon
                    icon={faUserGraduate}
                    className="text-gold text-xs"
                  />
                  <span className="text-md font-medium">
                    {s.firstName} {s.name}
                  </span>
                </div>
              </td>
              <td className="py-3 px-4 text-navy/60">{s.email}</td>
              <td className="py-3 px-4">
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                    s.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {s.isActive ? "Actif" : "Inactif"}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => onEdit(s)}
                    className="text-navy/50 hover:text-navy transition-colors"
                    title="Modifier"
                  >
                    <FontAwesomeIcon icon={faPen} className="text-xs" />
                  </button>
                  {s.isActive && (
                    <button
                      onClick={() => onDeactivate(s.id)}
                      className="text-navy/50 hover:text-red-600 transition-colors"
                      title="Désactiver"
                    >
                      <FontAwesomeIcon icon={faBan} className="text-xs" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;