import Profile from './Profile'

function Dashboard({ token, username, setToken, setUsername }) {
  return (
    <div style={{ maxWidth: '1000px', margin: '20px auto', padding: '10px', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1>Contact Management System</h1>
        <div>Logged in as: <strong>{username}</strong></div>
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div>
          <div style={{ padding: '20px', border: '1px dashed #ccc', borderRadius: '8px', textAlign: 'center' }}>
            <h3>Contacts Management</h3>
            <p>Loading contacts...</p>
          </div>
        </div>
        <div>
          <Profile username={username} token={token} setToken={setToken} setUsername={setUsername} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
