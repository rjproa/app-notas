import { useState } from 'react';
import axios from 'axios'

export default function SignUp({ onRegister }) {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: ''
  });

  const base_url = import.meta.env.VITE_BASE_URL

  const [errors, setErrors] = useState({});

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
        console.log('Usuario creado: ', res);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Crear Cuenta
        </h2>

        <div className="space-y-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-200 mb-2">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition 
                ${errors.username
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-white/10 focus:ring-purple-500'
                }`}
              placeholder="Ingresa tu usuario"
              required
            />
            {errors.username && (
              <p className="mt-2 text-sm text-red-400">{errors.username}</p>
            )}

          </div>

          {/* Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder="Ingresa tu nombre"
              required
            />
          </div>

          {/* Correo */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition ${errors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-white/10 focus:ring-purple-500'
                }`}
              placeholder="correo@ejemplo.com"
              required
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Botón de Registro */}
          <button
            onClick={handleSubmit}
            disabled={Object.keys(errors).length > 0}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Registrarse
          </button>
        </div>

        {/* Opción de Login */}
        <div className="mt-6 text-center">
          <p className="text-gray-300 text-sm">
            ¿Ya tienes cuenta?{' '}
            <button
              onClick={handleLogin}
              className="text-purple-400 hover:text-purple-300 font-semibold transition underline cursor-pointer"
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}