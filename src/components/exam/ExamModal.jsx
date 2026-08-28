import React, {useEffect, useState} from "react";
import { formatToDateTimeLocal, formatToISO } from "../../utils/dateUtils";

export const ExamModal = ({isOpen, onClose, onSubmit, courses, initialData}) => {
    const [formData, setFormData] = useState({
        courseId: '',
        title: '',
        description: '',
        startDate: '',
        endDate: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                courseId: initialData.courseId,
                title: initialData.title,
                description: initialData.description || '',
                startDate: formatToDateTimeLocal(initialData.startDate),
                endDate: formatToDateTimeLocal(initialData.endDate),
            });
        } else {
            setFormData({
                courseId: courses.length > 0 ? courses[0].id : '',
                title: '',
                description: '',
                startDate: '',
                endDate: '',
            });
        }
    }, [initialData, courses, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.courseId || !formData.title || !formData.startDate || !formData.endDate) {
            alert("Veuillez remplir tous les champs obligatoires");
            return;
        }
        const payload = {
            courseId: Number(formData.courseId),
            title: formData.title,
            description: formData.description,
            startDate: formatToISO(formData.startDate),
            endDate: formatToISO(formData.endDate),
        };
        onSubmit(payload);
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-dark/40 backdrop-blur-sm animate-fade-in">
            <div className="card w-full max-w-lg shadow-modal animate-slide-up">
                <h2 className="text-xl font-bold text-navy-dark mb-4">
                    {initialData ? "Modifier l'examen" : 'Créer un nouvel examen'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-navy-dark mb-1">Cours rattaché *</label>
                        <select
                            required
                            className="input-field"
                            value={formData.courseId}
                            onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                        >
                            <option value="" disabled>Sélectionnez un cours</option>
                            {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                    {course.code}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-navy-dark mb-1">Titre de l'examen *</label>
                        <input
                            type="text"
                            required
                            placeholder="ex: Examen final PROG2"
                            className="input-field"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-navy-dark mb-1">Description</label>
                        <textarea
                            rows={3}
                            placeholder="Consignes ou périmètre du QCM..."
                            className="input-field resize-none"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-navy-dark mb-1">Date de début *</label>
                            <input
                                type="datetime-local"
                                required
                                className="input-field"
                                value={formData.startDate}
                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                            />
                            </div>
                            <div>
                            <label className="block text-xs font-bold text-navy-dark mb-1">Date de fin *</label>
                            <input
                                type="datetime-local"
                                required
                                className="input-field"
                                value={formData.endDate}
                                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-contact mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-surface rounded-full transition-colors cursor-pointer"
                        >
                            Annuler
                        </button>
                        <button type="submit" className="btn-primary">
                            {initialData ? 'Mettre à jour' : 'Enregistrer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}