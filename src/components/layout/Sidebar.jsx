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
      faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import STDHUB_LOGO from "../../assets/stdhub-logo-pwa.png";

const NAV_ITEMS = {
      ADMIN: [
            { to: "/admin", label: "Tableau de bord", icon: faChartPie, end: true },
            { to: "/admin/students", label: "Étudiants", icon: faUserGraduate, end: false },
            { to: "/admin/courses", label: "Cours", icon: faBookOpen, end: false },
            { to: "/admin/exams", label: "Examens", icon: faFileAlt, end: false },
      ],
      STUDENT: [
            { to: "/student", label: "Examens disponibles", icon: faFileAlt, end: true },
            { to: "/student/results", label: "Mes résultats", icon: faClipboardCheck, end: false },
      ],
};

const ROLE_LABELS = {
      ADMIN: "Administrateur",
      STUDENT: "Étudiant",
};


const Sidebar = ({ role = "STUDENT", userName = "Jules Titran", onLogout }) => {
      const [open, setOpen] = useState(false);

      const navItems = NAV_ITEMS[role] || [];
      const handleNavClick = () => setOpen(false);

      return (
            <>
                  <button
                        onClick={() => setOpen(true)}
                        className="lg:hidden fixed top-3 left-3 z-40 touch-target rounded-xl bg-navy text-white shadow-lg"
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
        w-64 h-screen bg-navy-dark text-white flex flex-col p-4 shrink-0 shadow-xl border-r border-white/5 select-none
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
                  >
                        <div className="flex items-center justify-between px-2 mb-6 shrink-0 border-b border-white/10 pb-4">
                              <div className="flex items-center gap-3">
                                    <img
                                          src={STDHUB_LOGO}
                                          alt="Logo"
                                          className="h-8 w-8 object-contain"
                                    />
                                    <span className="text-gold font-bold text-xl tracking-tight">
                                          HEI STDHub
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

                        <nav className="flex flex-col gap-1 flex-1 overflow-y-auto custom-scrollbar">
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

                        <div className="border-t border-white/10 pt-4 mt-4 shrink-0 flex flex-col gap-4">
                              <NavLink
                                    to={role === "ADMIN" ? "/admin/profile" : "/student/profile"}
                                    className="px-2 block hover:opacity-80 transition"
                              >
                                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest truncate">
                                          {ROLE_LABELS[role] || "—"}
                                    </p>
                                    <div className="flex items-center gap-3 mt-1.5">
                                          <div className="w-8 h-8 rounded-full bg-gold text-navy-dark font-bold flex items-center justify-center text-xs shrink-0">
                                                {userName.charAt(0).toUpperCase()}
                                          </div>
                                          <span className="text-sm font-semibold text-white/90 truncate">
                                                {userName}
                                          </span>
                                    </div>
                              </NavLink>

                              <button
                                    onClick={onLogout}
                                    className="w-full px-4 py-2.5 text-xs font-semibold text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200 text-left flex items-center gap-3 cursor-pointer"
                              >
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                    <span>Déconnexion</span>
                              </button>
                        </div>
                  </aside>
            </>
      );
};

export default Sidebar;
