import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);
let nextId = 0;

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const pushToast = useCallback((message, type) => {
        const id = nextId++;
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => removeToast(id), 5000);
    }, [removeToast]);

    const showError = useCallback((message) => pushToast(message, 'error'), [pushToast]);
    const showSuccess = useCallback((message) => pushToast(message, 'success'), [pushToast]);

    return (
        <ToastContext.Provider value={{ showError, showSuccess }}>
            {children}
            <div className="fixed top-4 right-4 z-100 flex flex-col gap-2 w-80">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className={`p-3 rounded-xl shadow-lg text-sm font-semibold flex items-start justify-between gap-3 animate-fade-in ${
                            t.type === 'error'
                                ? 'bg-red-50 border border-red-200 text-red-700'
                                : 'bg-green-50 border border-green-200 text-green-700'
                        }`}
                    >
                        <span>{t.message}</span>
                        <button
                            onClick={() => removeToast(t.id)}
                            className="text-current opacity-60 hover:opacity-100 shrink-0 cursor-pointer"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast doit être utilisé à l\'intérieur d\'un <ToastProvider>');
    return ctx;
};