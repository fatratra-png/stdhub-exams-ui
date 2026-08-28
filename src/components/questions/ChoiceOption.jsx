import React from 'react';

export const ChoiceOption = ({ label, isCorrect, variant = 'reveal', isSelected = false, onSelect }) => {
    if (variant === 'select') {
        return (
            <label className={`flex items-center gap-3 py-3 px-1 border-b border-contact last:border-b-0 cursor-pointer transition-colors 
                ${isSelected ? 'text-navy font-semibold' : 'text-gray-700 hover:text-navy-dark'}`}
            >
                <input
                    type="radio"
                    checked={isSelected}
                    onChange={onSelect}
                    className="w-4 h-4 accent-navy cursor-pointer"
                />
                <span className="text-sm">{label}</span>
            </label>
        );
    }
    if (variant === 'result') {
        const isWrongSelection = isSelected && !isCorrect;
        const highlight = isCorrect || isWrongSelection;
        return (
            <div className={`flex items-center gap-3 py-3 px-1 border-b border-contact last:border-b-0 ${
                isCorrect ? 'text-green-700' : isWrongSelection ? 'text-red-600' : 'text-gray-500'
            }`}>
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    isCorrect ? 'border-green-500 bg-green-500' : isWrongSelection ? 'border-red-500 bg-red-500' : 'border-gray-300'
                }`}>
                    {highlight && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </span>
                <span className={`text-sm flex-1 ${highlight ? 'font-semibold' : ''}`}>{label}</span>
                {isCorrect && <span className="text-xs font-bold shrink-0">✓ Correcte</span>}
                {isWrongSelection && <span className="text-xs font-bold shrink-0">✕ Votre réponse</span>}
            </div>
        );
    }
    return (
        <div className="flex items-center gap-3 py-3 px-1 border-b border-contact last:border-b-0">
            <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                isCorrect ? 'border-green-500 bg-green-500' : 'border-gray-300'
            }`}>
                {isCorrect && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
            </span>
            <span className={`text-sm ${isCorrect ? 'text-green-700 font-semibold' : 'text-gray-700'}`}>
                {label}
            </span>
        </div>
    );
};