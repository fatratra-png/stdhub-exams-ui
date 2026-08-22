import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
      faBars,
      faBookOpen,
      faChartPie,
      faFileAlt,
      faHistory,
      faSignOutAlt,
      faTimes,
      faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import STDHUB_LOGO from "../../assets/stdhub-logo-pwa.png";

const NAV_ITEMS = [
      { id: "dashboard", label: "Dashboard", icon: faChartPie },
      { id: "exams", label: "Exams", icon: faFileAlt },
      { id: "grades-history", label: "Grades & History", icon: faHistory },
      { id: "courses", label: "Courses", icon: faBookOpen },
      { id: "students-admin", label: "Students Admin", icon: faUserGear },
];

const Sidebar = () => {
      const [open, setOpen] = useState(false);
      const [activeId, setActiveId] = useState(NAV_ITEMS[0].id);

      const handleNavClick = (id) => {
            setActiveId(id);
            setOpen(false);
      };

      return (
            <>
                  <button
                        onClick={() => setOpen(true)}
                        className="lg:hidden fixed top-3 left-3 z-40 touch-target rounded-xl
                   bg-navy text-white shadow-lg"
                  >
                        <FontAwesomeIcon icon={faBars} className="text-base" />
                  </button>

                  {open && (
                        <div
                              className="lg:hidden fixed inset-0 bg-black/50 z-40"
                              onClick={() => setOpen(false)}
                        />
                  )}

                  <aside
                        className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-60 h-screen bg-navy flex flex-col py-6 px-4 shrink-0
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
                  >
                        <div className="flex items-center justify-between px-2 mb-10 shrink-0">
                              <div className="flex items-center gap-3">
                                    <img
                                          src={STDHUB_LOGO}
                                          alt="STDExams"
                                          className="h-8 w-8 object-contain rounded-full"
                                    />
                                    <span className="text-white font-bold text-base">
                                          HEI STDExams
                                    </span>
                              </div>
                              <button
                                    onClick={() => setOpen(false)}
                                    className="lg:hidden touch-target text-white/50 hover:text-white transition"
                              >
                                    <FontAwesomeIcon
                                          icon={faTimes}
                                          className="text-base"
                                    />
                              </button>
                        </div>

                        <nav className="flex flex-col gap-1 flex-1 overflow-y-auto">
                              {NAV_ITEMS.map(({ id, label, icon }) => (
                                    <button
                                          key={id}
                                          onClick={() => handleNavClick(id)}
                                          className={
                                                activeId === id
                                                      ? "sidebar-link-active"
                                                      : "sidebar-link"
                                          }
                                    >
                                          <FontAwesomeIcon
                                                icon={icon}
                                                className="w-4 h-4 shrink-0"
                                          />
                                          <span className="truncate">
                                                {label}
                                          </span>
                                    </button>
                              ))}
                        </nav>

                        <div className="border-t border-white/10 pt-4 mt-4 shrink-0">
                              <p className="text-white/40 text-xs px-2 mb-3 uppercase tracking-widest truncate">
                                    Student
                              </p>
                              <button className="sidebar-link w-full text-red-300 hover:text-red-200 hover:bg-red-500/10">
                                    <FontAwesomeIcon
                                          icon={faSignOutAlt}
                                          className="w-4 h-4 shrink-0"
                                    />
                                    <span>Logout</span>
                              </button>
                        </div>
                  </aside>
            </>
      );
};

export default Sidebar;
