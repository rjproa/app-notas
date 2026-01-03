export default function BtnAddGroup({ setShowCreateGroup, position }) {
  return (
    <button
      onClick={() => setShowCreateGroup(true)}
      className={`fixed w-16 h-16 bg-gradient-to-r from-[#3CC370] to-[#5FCE8A] text-white rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center cursor-pointer mb-16 ${position}`}
    >
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </button>
  )
}