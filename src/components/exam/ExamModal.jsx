import React, { useEffect, useState } from "react";
import { formatToDateTimeLocal, formatToISO } from "../../utils/dateUtils";
import { useToast } from "../../contexts/ToastContext";

export const ExamModal = ({ onClose, onSubmit, courses, initialData }) => {
    const {showError} = useToast();
    const [formData, setFormData] = useState({
        courseId: '',
        title: '',
        description: '',
        startDate: '',
        endDate: '',
    });
    const [dateError, setDateError] = useState('');

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
        setDateError('');
    }, [initialData, courses]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setDateError('');

        if (!formData.courseId || !formData.title || !formData.startDate || !formData.endDate) {
            showError("Veuillez remplir tous les champs obligatoires");
            return;
        }

        if (new Date(formData.endDate) <= new Date(formData.startDate)) {
            setDateError("La date de fin doit être postérieure à la date de début.");
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
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <div className="flex items-center gap-2 text-navy-dark font-bold tracking-wider text-sm">
                    <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>{initialData ? "MODIFIER L'EXAMEN" : "NOUVEL EXAMEN"}</span>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                    aria-label="Fermer"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                            COURS RATTACHÉ *
                        </label>
                        <select
                            required
                            className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-navy-dark focus:outline-none focus:border-amber-500 transition-colors"
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
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                            TITRE DE L'EXAMEN *
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="ex: Examen final PROG2"
                            className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-navy-dark focus:outline-none focus:border-amber-500 transition-colors"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                        DESCRIPTION
                    </label>
                    <textarea
                        rows={2}
                        placeholder="Consignes ou périmètre du QCM..."
                        className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-navy-dark focus:outline-none focus:border-amber-500 transition-colors resize-none"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                            DATE DE DÉBUT *
                        </label>
                        <input
                            type="datetime-local"
                            required
                            className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-navy-dark focus:outline-none focus:border-amber-500 transition-colors"
                            value={formData.startDate}
                            onChange={(e) => {
                                setFormData({ ...formData, startDate: e.target.value });
                                setDateError('');
                            }}
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                            DATE DE FIN *
                        </label>
                        <input
                            type="datetime-local"
                            required
                            className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-navy-dark focus:outline-none focus:border-amber-500 transition-colors"
                            value={formData.endDate}
                            onChange={(e) => {
                                setFormData({ ...formData, endDate: e.target.value });
                                setDateError('');
                            }}
                        />
                    </div>
                </div>
                {dateError && (
                    <p className="text-xs text-red-500 font-medium">{dateError}</p>
                )}
                <div className="flex items-center gap-4 pt-2">
                    <button
                        type="submit"
                        className="px-6 py-2.5 bg-navy-dark text-amber-400 font-bold text-xs tracking-wider uppercase rounded-xl hover:bg-navy-dark/90 transition-colors shadow-sm"
                    >
                        {initialData ? 'METTRE À JOUR' : 'CRÉER'}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2.5 text-xs font-bold text-gray-400 hover:text-gray-600 uppercase tracking-wider transition-colors"
                    >
                        ANNULER
                    </button>
                </div>
            </form>
        </div>
    );
};