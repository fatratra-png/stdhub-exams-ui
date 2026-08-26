import React, {useState, useEffect} from "react";

export const QuestionForm = ({initialData, onSubmit, onCancel}) => {
    const [text, setText] = useState('');
    const [score, setScore] = useState(1);
    const [choices, setChoices] = useState([
        {label: '', isCorrect: true},
        {label: '', isCorrect: false},
    ]);

    useEffect(() => {
        if (initialData) {
            setText(initialData.text || '');
            setScore(initialData.score || 1);
            setChoices(initialData.choices || [
                {label: '', isCorrect: true},
                {label: '', isCorrect: false},
            ]);
        }
    }, [initialData]);

    const handleChoiceTextChange = (index, value) => {
        const updated = [...choices];
        updated[index].label = value;
        setChoices(updated);
    };

    const handleSelectCorrect = (selectedIndex) => {
        const updated = choices.map((c, i) => ({
            ...c,
            isCorrect: i === selectedIndex,
        }));
        setChoices(updated);
    };

    const handleAddChoice = () => {
        if (choices.length >= 6) {
            alert('Un qcm autorise au maximum 6 options par question');
            return;
        }
        setChoices([...choices, {label: '', isCorrect: false}]);
    };

    const handleRemoveChoice = (indexToRemove) => {
        if (choices.length <= 2) {
            alert('Une question doit comporter au moins 2 options.');
            return;
        }
        const wasCorrect = choices[indexToRemove].isCorrect;
        const updated = choices.filter((_, i) => i !== indexToRemove);
        if (wasCorrect && updated.length > 0) {
            updated[0].isCorrect = true;
        }
        setChoices(updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) {
            alert("L'énoncé de la question est requis.");
            return;
        }
        if (choices.some((c) => !c.label.trim())) {
            alert('Toutes les options de réponse doivent être renseignées.');
            return;
        }
        if (!choices.some((c) => c.isCorrect)) {
            alert('Veuillez désigner au moins une bonne réponse.');
            return;
        }
        onSubmit({
            text: text.trim(),
            score: Number(score),
            choices,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-surface p-5 rounded-2xl border border-contact space-y-4 animate-fade-in">
            <h3 className="font-bold text-navy-dark text-sm">
                {initialData ? 'Modifier la question' : 'Nouvelle question QCM'}
            </h3>
            <div className="flex gap-3">
                <div className="flex-1">
                    <label className="block text-xs font-bold text-navy-dark mb-1">Énoncé *</label>
                    <input
                        type="text"
                        required
                        placeholder="ex: Que signifie HTML ?"
                        className="input-field"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className="w-24">
                    <label className="block text-xs font-bold text-navy-dark mb-1">Points *</label>
                    <input
                        type="number"
                        min="1"
                        required
                        className="input-field text-center"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                    />
                </div>
            </div>
            <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-navy-dark">Options de réponse (Cochez la bonne réponse) *</label>
                {choices.map((choice, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="correctChoiceRadio"
                            checked={choice.isCorrect}
                            onChange={() => handleSelectCorrect(index)}
                            className="w-4 h-4 text-navy accent-navy cursor-pointer"
                            title="Marquer comme bonne réponse"
                        />
                        <input
                            type="text"
                            required
                            placeholder={`Option ${index + 1}`}
                            className={`input-field flex-1 ${choice.isCorrect ? 'border-green-500 bg-green-50/30' : ''}`}
                            value={choice.label}
                            onChange={(e) => handleChoiceTextChange(index, e.target.value)}
                        />
                        {choices.length > 2 && (
                        <button
                            type="button"
                            onClick={() => handleRemoveChoice(index)}
                            className="text-red-500 hover:text-red-700 px-2 py-1 text-sm font-bold cursor-pointer"
                            title="Supprimer cette option"
                        >
                            ✕
                        </button>
                        )}
                    </div>
                ))}
            </div>
            {choices.length < 6 && (
                <button
                    type="button"
                    onClick={handleAddChoice}
                    className="text-xs font-bold text-navy hover:underline pt-1 inline-block cursor-pointer"
                >
                    + Ajouter une option
                </button>
            )}
            <div className="flex justify-end gap-2 pt-4 border-t border-contact">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-contact rounded-lg transition-colors cursor-pointer"
                >
                    Annuler
                </button>
                <button type="submit" className="btn-primary text-xs py-1.5 px-4">
                    {initialData ? 'Mettre à jour' : 'Ajouter à l’examen'}
                </button>
            </div>
        </form>
    );
};