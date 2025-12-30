import { Navigate } from 'react-router-dom'
import { useAuth } from '../utils/useAuth'

export const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EBF9F1] to-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#3CC370]/30 border-t-[#3CC370] rounded-full animate-spin"></div>
          <div className="text-[#1C5A33] text-xl font-semibold">Cargando...</div>
        </div>
      </div>
    )
  }

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}