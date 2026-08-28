import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons/faUserPlus";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";

const StudentForm = ({ initial, onSubmit, onCancel }) => {
  const [firstName, setFirstName] = useState(initial?.firstName || "");
  const [lastName, setLastName] = useState(initial?.lastName || "");
  const [email, setEmail] = useState(initial?.email || "");
  const [password, setPassword] = useState("");

  const isEditing = Boolean(initial);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { firstName, lastName, email };
    if (!isEditing || password) {
      data.password = password;
    }
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-card p-6 mb-6 space-y-4 animate-slide-up"
    >
      <div className="flex items-center justify-between border-b border-contact/30 pb-3">
        <div className="flex items-center gap-2 text-navy">
          <FontAwesomeIcon icon={faUserPlus} className="text-gold" />
          <h2 className="font-bold text-sm uppercase tracking-wide">
            {isEditing ? "Modifier l'étudiant" : "Nouvel étudiant"}
          </h2>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="text-navy/40 hover:text-navy transition-colors"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-bold uppercase text-navy/60 mb-1">
            Prénom
          </label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full bg-white border border-contact rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy"
            required
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase text-navy/60 mb-1">
            Nom
          </label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full bg-white border border-contact rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy"
          />
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-bold uppercase text-navy/60 mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white border border-contact rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy"
          required
        />
      </div>

      <div>
        <label className="block text-[10px] font-bold uppercase text-navy/60 mb-1">
          Mot de passe{" "}
          {isEditing && (
            <span className="normal-case font-normal">
              (laisser vide pour ne pas changer)
            </span>
          )}
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-white border border-contact rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy"
          required={!isEditing}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="bg-navy-dark text-gold font-bold text-xs uppercase tracking-wide px-5 py-2.5 rounded-full shadow-card hover:opacity-90 transition-opacity"
        >
          {isEditing ? "Modifier" : "Créer"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-navy/60 text-xs font-bold uppercase px-4 py-2.5 hover:text-navy transition-colors"
        >
          Annuler
        </button>
      </div>
    </form>
  );
};

export default StudentForm;