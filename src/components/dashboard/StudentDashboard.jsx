import { faBookOpen } from "@fortawesome/free-solid-svg-icons/faBookOpen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StudentDashboard = () => {
  return (
      <div className="bg-navy-dark text-white p-5 rounded-2xl shadow-card flex items-center gap-4 select-none animate-slide-up">
          <FontAwesomeIcon icon={faBookOpen} className="text-gold text-2xl"></FontAwesomeIcon>
        <div>
          <h1 className="text-xl font-bold tracking-wide">Hello, {/* name */}</h1>
        <p className="text-sm text-white/60 mt-0.5">{/* available content */}</p>
        </div>
      </div>
    );
}

export default StudentDashboard;
