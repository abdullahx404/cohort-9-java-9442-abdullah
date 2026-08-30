import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LoginRegister from './components/LoginRegister'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [username, setUsername] = useState(localStorage.getItem('username') || '')

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
      localStorage.setItem('username', username)
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    }
  }, [token, username])

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!token ? <LoginRegister setToken={setToken} setUsername={setUsername} /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard/*"
          element={token ? <Dashboard token={token} username={username} setToken={setToken} setUsername={setUsername} /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  )
}

export default App
