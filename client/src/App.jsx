import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import PageLogin from './features/loginPage/pageLogin'
import Dashboard from './features/home/dashboard'
import { PublicRoute } from './components/PublicRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/login" element={
            <PublicRoute>
              <PageLogin></PageLogin>
            </PublicRoute>
          } />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App