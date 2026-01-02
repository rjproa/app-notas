import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../services/authService'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await authService.verifyAuth()
        setUser(userData)

      } catch (error) {
        // console.log(error);
        setUser(null)
        navigate('/login', { replace: true })
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [navigate])

  return { user, loading }
}