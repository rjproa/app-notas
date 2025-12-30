export default function BtnAddItem({ setShowCreateItem }) {
  return (
    <button
      onClick={() => setShowCreateItem()}
      className="w-full py-3 bg-white/50 hover:bg-white/80 rounded-xl font-semibold text-[#267D48] transition-all flex items-center justify-center gap-2"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
      Agregar Tarea
    </button>
  )
}