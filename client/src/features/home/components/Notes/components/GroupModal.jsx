import { useState } from "react";

export default function GroupModal({ isOpen, onClose, onCreateGroup }) {
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (name.trim()) {
      onCreateGroup(name.trim());
      setName('');
      onClose();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-96 shadow-2xl" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-[#1C5A33] mb-4">Nuevo Grupo</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Nombre del grupo"
          className="w-full px-4 py-3 border-2 border-[#3CC370] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3CC370] mb-4"
          autoFocus
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