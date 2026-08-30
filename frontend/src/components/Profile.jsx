import { useState } from 'react'
import ChangePasswordModal from './ChangePasswordModal'

function Profile({ username, token, setToken, setUsername }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8080/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    } catch (e) {
    }
    setToken('')
    setUsername('')
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9', fontFamily: 'sans-serif' }}>
      <h3>User Profile</h3>
      <div style={{ marginBottom: '15px' }}>
        <strong>Username: </strong> {username}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          style={{ padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Change Password
        </button>
        <button
          type="button"
          onClick={handleLogout}
          style={{ padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Logout
        </button>
      </div>
      <ChangePasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} token={token} />
    </div>
  )
}

export default Profile
