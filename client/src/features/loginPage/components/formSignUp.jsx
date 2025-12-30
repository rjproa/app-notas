import { useState } from 'react';
import axios from 'axios'

export default function SignUp({ onRegister }) {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false)

  const base_url = import.meta.env.VITE_BASE_URL

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validar correo en tiempo real
    if (name === 'email') {
      if (value && !validateEmail(value)) {
        setErrors(prev => ({
          ...prev,
          email: 'Por favor ingresa un correo válido'
        }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.email;
          return newErrors;
        });
      }
    }

    if (name === 'username') {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.username
        return newErrors
      })
    }
  };

  const handleSubmit = () => {
    axios.post(`${base_url}/api/users`, formData)
      .then((res) => {
        if (res.status === 201) {
          setShowSuccess(!showSuccess)
        }
      })
      .catch(error => {
        console.log('Error: ', error.response.data.error);
        if (error.response.data.error) {
          setErrors(prev => ({
            ...prev,
            username: error.response.data.error,
          }))
        }
      })
  };

  const handleLogin = () => {
    onRegister()
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EBF9F1] to-white">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl border-2 border-[#3CC370]/20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#3CC370] to-[#2BA862] rounded-2xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-[#1C5A33]">
            Crear Cuenta
          </h2>
          <p className="text-gray-600 mt-2">Únete y comienza a organizar tus tareas</p>
        </div>

        <div className="space-y-5">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#1C5A33] mb-2">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-[#EBF9F1]/30 border-2 rounded-xl text-[#1C5A33] placeholder-gray-400 focus:outline-none focus:ring-2 transition 
                ${errors.username
                  ? 'border-red-400 focus:ring-red-400 focus:border-red-400'
                  : 'border-[#3CC370]/30 focus:ring-[#3CC370] focus:border-[#3CC370]'
                }`}
              placeholder="Ingresa tu usuario"
              required
            />
            {errors.username && (
              <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.username}
              </p>
            )}
          </div>

          {/* Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#1C5A33] mb-2">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#EBF9F1]/30 border-2 border-[#3CC370]/30 rounded-xl text-[#1C5A33] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3CC370] focus:border-[#3CC370] transition"
              placeholder="Ingresa tu nombre"
              required
            />
          </div>

          {/* Correo */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#1C5A33] mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-[#EBF9F1]/30 border-2 rounded-xl text-[#1C5A33] placeholder-gray-400 focus:outline-none focus:ring-2 transition ${errors.email
                ? 'border-red-400 focus:ring-red-400 focus:border-red-400'
                : 'border-[#3CC370]/30 focus:ring-[#3CC370] focus:border-[#3CC370]'
                }`}
              placeholder="correo@ejemplo.com"
              required
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#1C5A33] mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#EBF9F1]/30 border-2 border-[#3CC370]/30 rounded-xl text-[#1C5A33] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3CC370] focus:border-[#3CC370] transition"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Botón de Registro */}
          <button
            onClick={handleSubmit}
            disabled={Object.keys(errors).length > 0}
            className="w-full py-3 bg-gradient-to-r from-[#3CC370] to-[#2BA862] text-white font-semibold rounded-xl hover:from-[#2BA862] hover:to-[#267D48] focus:outline-none focus:ring-2 focus:ring-[#3CC370] focus:ring-offset-2 transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
          >
            Registrarse
          </button>
        </div>

        {/* Opción de Login */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            ¿Ya tienes cuenta?{' '}
            <button
              onClick={handleLogin}
              className="text-[#3CC370] hover:text-[#2BA862] font-semibold transition underline cursor-pointer"
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </div>

      {/* Modal de éxito */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end z-50">
          <div className="max-w-sm w-full bg-gradient-to-r from-[#3CC370] to-[#2BA862] shadow-2xl rounded-2xl pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden animate-slide-up">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-semibold text-white">
                    ¡Cuenta creada exitosamente!
                  </p>
                  <p className="mt-1 text-sm text-white/90">
                    Tu cuenta ha sido registrada correctamente
                  </p>
                </div>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="ml-4 flex-shrink-0 text-white/70 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="mt-4">
                <button
                  onClick={handleLogin}
                  className="w-full px-4 py-2 bg-white text-[#3CC370] rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-md"
                >
                  Iniciar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}