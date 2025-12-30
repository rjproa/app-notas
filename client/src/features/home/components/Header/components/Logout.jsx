import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Logout({ userName }) {
  const base_url = import.meta.env.VITE_BASE_URL
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate()

  const handleLogout = () => {
    axios.post(`${base_url}/login/logout`)
    navigate('/', { replace: true });
    setShowDropdown(false);
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity"
      >
        <div className="w-10 h-10 md:w-10 md:h-10 bg-gradient-to-br from-[#3CC370] to-[#5FCE8A] rounded-full flex items-center justify-center shadow-md">
          <span className="text-lg md:text-xl font-bold text-white">
            {getInitial(userName)}
          </span>
        </div>
        <svg
          className={`w-4 h-4 md:w-5 md:h-5 text-[#267D48] transition-transform ${showDropdown ? 'rotate-180' : ''
            }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowDropdown(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-[#C5EDD4] z-20 overflow-hidden">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 text-left text-[#1C5A33] hover:bg-[#EBF9F1] transition-colors font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Cerrar sesión
            </button>
          </div>
        </>
      )}
    </div>

  )
}