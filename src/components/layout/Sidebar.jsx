// import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import STDHUB_LOGO from "../../assets/stdhub-logo-pwa.png";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons/faFileAlt";
import { faHistory } from "@fortawesome/free-solid-svg-icons/faHistory";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons/faBookOpen";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons/faBullhorn";
import { faUserGear } from "@fortawesome/free-solid-svg-icons/faUserGear";
import { faChartPie } from "@fortawesome/free-solid-svg-icons/faChartPie";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons/faSignOutAlt";

const navigation = [
  { label: "Dashboard", icon: faChartPie },
  { label: "Exams", icon: faFileAlt },
  { label: "Grades & History", icon: faHistory },
  { label: "Courses", icon: faBookOpen },
  { label: "STDNews", icon: faBullhorn },
  { label: "Students Admin", icon: faUserGear }
];

const Sidebar = () => {
  return (
    <>
      <aside className="w-64 h-screen bg-navy-dark text-white flex flex-col justify-between p-4 shrink-0 shadow-xl border-r border-white/5 select-none">
            <div className="flex flex-col gap-6">
              <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3">
                <img src={STDHUB_LOGO} alt="Logo" className="w-8 h-8 object-contain" />
                <h1 className="text-xl font-bold tracking-tight text-gold">HEI STDHub</h1>
              </div>

              <nav className="flex flex-col gap-1">
                {navigation.map((item) => {
                  const isActive = item.id === "dashboard";
                  return (
                    <button
                      key={item.id}
                      className={isActive ? 'sidebar-link-active' : 'sidebar-link'}
                    >
                      <span className="text-base">
                        <FontAwesomeIcon icon={item.icon} />
                      </span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="flex flex-col gap-4 border-t border-white/10 pt-4">
              <div className="px-4">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">
                  STUDENT
                </span>
                {/* student */}
              </div>

              <button
                className="w-full px-4 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200 text-left flex items-center gap-3 cursor-pointer"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Logout</span>
              </button>
            </div>
          </aside>
    </>
  )
}

export default Sidebar;
