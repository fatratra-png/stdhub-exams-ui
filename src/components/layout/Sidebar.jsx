import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
      faBars,
      faBookOpen,
      faChartPie,
      faClipboardCheck,
      faFileAlt,
      faTimes,
      faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import STDHUB_LOGO from "../../assets/stdhub-logo-pwa.png";

const NAV_ITEMS = {
      admin: [
            {
                  to: "/admin",
                  label: "Tableau de bord",
                  icon: faChartPie,
                  end: true,
            },
            {
                  to: "/admin/students",
                  label: "Étudiants",
                  icon: faUserGraduate,
                  end: false,
            },
            {
                  to: "/admin/courses",
                  label: "Cours",
                  icon: faBookOpen,
                  end: false,
            },
            {
                  to: "/admin/exams",
                  label: "Examens",
                  icon: faFileAlt,
                  end: false,
            },
      ],
      student: [
            {
                  to: "/student",
                  label: "Examens disponibles",
                  icon: faFileAlt,
                  end: true,
            },
            {
                  to: "/student/results",
                  label: "Mes résultats",
                  icon: faClipboardCheck,
                  end: false,
            },
      ],
};

const ROLE_LABELS = {
      admin: "Administrateur",
      student: "Étudiant",
};

const Sidebar = ({ role = "student" }) => {
      const [open, setOpen] = useState(false);

      const navItems = NAV_ITEMS[role] || [];
      const handleNavClick = () => setOpen(false);

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
                                    <span className="text-white text-base">
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
                              {navItems.map(({ to, label, icon, end }) => (
                                    <NavLink
                                          key={to}
                                          to={to}
                                          end={end}
                                          onClick={handleNavClick}
                                          className={({ isActive }) =>
                                                isActive
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
                                    </NavLink>
                              ))}
                        </nav>

                        <div className="border-t border-white/10 pt-4 mt-4 shrink-0">
                              <p className="text-white/40 text-xs px-2 uppercase tracking-widest truncate">
                                    {ROLE_LABELS[role] || "—"}
                              </p>
                        </div>
                  </aside>
            </>
      );
};

export default Sidebar;
