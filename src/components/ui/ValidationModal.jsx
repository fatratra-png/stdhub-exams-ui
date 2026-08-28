import React from 'react';

export const ValidationModal = ({
    isOpen,
    title = 'Confirmer l\'action',
    message,
    confirmLabel = 'Confirmer',
    cancelLabel = 'Annuler',
    variant = 'danger',
    onConfirm,
    onCancel,
}) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-90 flex items-center justify-center bg-navy-dark/40 backdrop-blur-sm animate-fade-in">
            <div className="card w-full max-w-sm shadow-modal animate-slide-up p-6">
                <h2 className="text-lg font-bold text-navy-dark">{title}</h2>
                <p className="text-sm text-gray-600 mt-2">{message}</p>
                <div className="flex justify-end gap-2 mt-6">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-contact rounded-lg transition-colors cursor-pointer"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                            variant === 'danger'
                                ? 'bg-red-600 text-white hover:bg-red-700'
                                : 'btn-primary'
                        }`}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};