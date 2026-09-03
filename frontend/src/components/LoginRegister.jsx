import { useState } from 'react'

function LoginRegister({ setToken, setUsername }) {
  const [isLogin, setIsLogin] = useState(true)
  const [userVal, setUserVal] = useState('')
  const [passwordVal, setPasswordVal] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    setSuccessMsg('')
    if (!userVal.trim() || !passwordVal.trim()) {
      setErrorMsg('All fields are required')
      return
    }
    const url = isLogin ? 'http://localhost:8080/api/auth/login' : 'http://localhost:8080/api/auth/register'
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: userVal, password: passwordVal })
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Request failed')
      }
      if (isLogin) {
        const data = await response.json()
        setToken(data.token)
        setUsername(data.username)
      } else {
        setSuccessMsg('Registration successful! Please log in.')
        setIsLogin(true)
        setPasswordVal('')
      }
    } catch (err) {
      setErrorMsg(err.message)
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '80px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'sans-serif' }}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      {errorMsg && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMsg}</div>}
      {successMsg && <div style={{ color: 'green', marginBottom: '10px' }}>{successMsg}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email or Phone Number</label>
          <input
            type="text"
            value={userVal}
            onChange={(e) => setUserVal(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
          <input
            type="password"
            value={passwordVal}
            onChange={(e) => setPasswordVal(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {isLogin ? 'Log In' : 'Register'}
        </button>
      </form>
      <div style={{ marginTop: '15px', textAlign: 'center' }}>
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin)
            setErrorMsg('')
            setSuccessMsg('')
          }}
          style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
        </button>
      </div>
    </div>
  )
}

export default LoginRegister
