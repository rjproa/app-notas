import { useState } from "react";

export default function ItemModal({ isOpen, onClose, onCreateItem }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (name.trim()) {
      onCreateItem({ name: name.trim(), description: description.trim() });
      setName('');
      setDescription('');
      onClose();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-96 shadow-2xl" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-[#1C5A33] mb-4">Nueva Tarea</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Nombre de la tarea"
          className="w-full px-4 py-3 border-2 border-[#3CC370] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3CC370] mb-3"
          autoFocus
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción (opcional)"
          className="w-full px-4 py-3 border-2 border-[#3CC370] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3CC370] mb-4 resize-none"
          rows={3}
        />
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2 bg-[#3CC370] text-white rounded-xl hover:bg-[#2BA862]"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
};