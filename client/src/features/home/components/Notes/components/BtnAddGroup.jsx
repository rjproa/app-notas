export default function BtnAddGroup({ setShowCreateGroup }) {
  return (
    <button
      onClick={() => setShowCreateGroup(true)}
      className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-[#3CC370] to-[#5FCE8A] text-white rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center cursor-pointer mb-16"
    >
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </button>
  )
}