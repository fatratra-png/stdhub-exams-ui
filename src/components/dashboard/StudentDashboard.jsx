import { useState } from "react";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons/faBookOpen";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter";

const StudentDashboard = ({ items = [] }) => {
  const [search, setSearch] = useState("");

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="w-full bg-navy-dark text-white p-8 rounded-2xl shadow-card flex items-center gap-4 select-none animate-slide-up">
        <FontAwesomeIcon icon={faBookOpen} className="bg-amber-50/20 rounded-xl px-1.5 py-2.5 text-gold text-xl items-center" />
        <div>
          <h1 className="text-2xl font-bold tracking-wide">Bienvenue, {/* name */}</h1>
          <p className="text-sm text-white/60 mt-0.5">{/* available content */}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-6 mt-6">
        <div className="relative w-full max-w-xs ml-auto">
          <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un UE, un cours ..."
            className="w-full bg-white rounded-full pl-10 pr-4 py-2.5 text-sm shadow-card outline-none focus:ring-2 focus:ring-gold"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 py-3 mb-6 border-y border-contact/30">
          <div className="flex items-center gap-2 text-navy/60">
          <FontAwesomeIcon icon={faFilter} className="text-[13px]" />
          <span className="text-[10px] font-bold uppercase">Filtre</span>
        </div>

        <select className="bg-white border border-contact rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-navy cursor-pointer">
          <option>Tout</option>
          <option>Examen</option>
          <option>TD</option>
          <option>Cours</option>
        </select>

        <div className="relative flex items-center">
          <input
            className="bg-white border border-contact rounded-lg pl-2 pr-7 py-1 text-sm focus:outline-none focus:border-navy w-32 outline-none"
            placeholder="UE..."
          />
        </div>
      </div>
      </div>
    </>
  );
};

export default StudentDashboard;