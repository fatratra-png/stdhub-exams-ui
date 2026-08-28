import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";

const CourseForm = ({ initial, onSubmit, onCancel }) => {
    const [code, setCode] = useState(initial?.code || "");
    const [name, setName] = useState(initial?.name || "");
    const [description, setDescription] = useState(initial?.description || "");

    const isEditing = Boolean(initial);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { code, name, description: description || null };
        onSubmit(data);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-card p-6 mb-6 space-y-4 animate-slide-up"
        >
        <div className="flex items-center justify-between border-b border-contact/30 pb-3">
            <div className="flex items-center gap-2 text-navy">
                <FontAwesomeIcon icon={faBook} className="text-gold" />
                <h2 className="font-bold text-sm uppercase tracking-wide">
                    {isEditing ? "Modifier le cours" : "Nouveau cours"}
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
                Code
            </label>
            <input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="WEB1"
                className="w-full bg-white border border-contact rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy"
                required
            />
        </div>

        <div>
            <label className="block text-[10px] font-bold uppercase text-navy/60 mb-1">
                Nom
            </label>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-contact rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy"
                required
            />
            </div>
        </div>

        <div>
            <label className="block text-[10px] font-bold uppercase text-navy/60 mb-1">
            Description
            </label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full bg-white border border-contact rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy resize-none"
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

export default CourseForm;