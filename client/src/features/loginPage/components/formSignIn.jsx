import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import authService from '../../../services/authService'

export default function SignIn({ onRegister }) {

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async () => {

    try {
      await authService.login(formData.username, formData.password)
      navigate('/dashboard', { replace: true })
    } catch (error) {
      alert('Error al iniciar sesión: ' + error.response.data.error)
    }
  };

  const handleRegister = () => {
    onRegister()
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EBF9F1] to-white">
      {/* Efectos de fondo decorativos */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3CC370]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#2BA862]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md mx-4">
        <div className="bg-white backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-[#3CC370]/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#3CC370] to-[#2BA862] rounded-2xl mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-[#1C5A33] mb-2">
              Bienvenido
            </h2>
            <p className="text-gray-600 text-sm">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          <div className="space-y-5">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[#1C5A33] mb-2">
                Usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-[#EBF9F1]/30 border-2 border-[#3CC370]/30 rounded-xl text-[#1C5A33] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3CC370] focus:border-[#3CC370] transition-all"
                  placeholder="Ingresa tu usuario"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#1C5A33] mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-[#EBF9F1]/30 border-2 border-[#3CC370]/30 rounded-xl text-[#1C5A33] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3CC370] focus:border-[#3CC370] transition-all"
                  placeholder="•••••••••••"
                  required
                />
              </div>
            </div>

            {/* Botón de Login */}
            <button
              onClick={handleLogin}
              className="w-full py-3.5 bg-gradient-to-r from-[#3CC370] via-[#2BA862] to-[#3CC370] text-white font-semibold rounded-xl hover:from-[#2BA862] hover:via-[#267D48] hover:to-[#2BA862] focus:outline-none focus:ring-2 focus:ring-[#3CC370] focus:ring-offset-2 focus:ring-offset-transparent transition-all transform hover:scale-[1.02] shadow-lg shadow-[#3CC370]/30"
            >
              Iniciar Sesión
            </button>
          </div>

          {/* Opción de Registro */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              ¿No tienes una cuenta?{' '}
              <button
                onClick={handleRegister}
                className="text-[#3CC370] hover:text-[#2BA862] font-semibold transition underline underline-offset-2 cursor-pointer"
              >
                Regístrate gratis
              </button>
            </p>
          </div>
        </div>

        {/* Footer decorativo */}
        <p className="text-center text-gray-500 text-xs mt-8">
          © 2025 rjproa. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}