import { useState, useEffect } from 'react'
import Profile from './Profile'
import ContactFormModal from './ContactFormModal'
import DeleteConfirmModal from './DeleteConfirmModal'
import ContactDetailModal from './ContactDetailModal'

function Dashboard({ token, username, setToken, setUsername }) {
  const [contacts, setContacts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState(null)

  const fetchContacts = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/contacts?page=${page}&size=10&search=${searchQuery}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setContacts(data.content || [])
        setTotalPages(data.totalPages || 1)
      }
    } catch (e) {
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [page, searchQuery])

  const handleSaveContact = async (formData) => {
    try {
      const url = selectedContact
        ? `http://localhost:8080/api/contacts/${selectedContact.id}`
        : 'http://localhost:8080/api/contacts'
      const method = selectedContact ? 'PUT' : 'POST'
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        setIsFormOpen(false)
        setSelectedContact(null)
        fetchContacts()
      }
    } catch (e) {
    }
  }

  const handleDeleteContact = async () => {
    if (!selectedContact) return
    try {
      const response = await fetch(`http://localhost:8080/api/contacts/${selectedContact.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        setIsDeleteOpen(false)
        setSelectedContact(null)
        fetchContacts()
      }
    } catch (e) {
    }
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '20px auto', padding: '10px', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1>Contact Management System</h1>
        <div>Logged in as: <strong>{username}</strong></div>
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="Search by first/last name..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setPage(0)
              }}
              style={{ padding: '8px', width: '250px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <button
              onClick={() => {
                setSelectedContact(null)
                setIsFormOpen(true)
              }}
              style={{ padding: '8px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Create Contact
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ backgroundColor: '#eee', textAlign: 'left' }}>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Name</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Title</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length > 0 ? (
                contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                      {contact.firstName} {contact.lastName}
                    </td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                      {contact.title}
                    </td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textAlign: 'right' }}>
                      <button
                        onClick={() => {
                          setSelectedContact(contact)
                          setIsDetailOpen(true)
                        }}
                        style={{ marginRight: '5px', padding: '5px 10px', cursor: 'pointer' }}
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          setSelectedContact(contact)
                          setIsFormOpen(true)
                        }}
                        style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#ffc107', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                      >
                        Update
                      </button>
                      <button
                        onClick={() => {
                          setSelectedContact(contact)
                          setIsDeleteOpen(true)
                        }}
                        style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                    No contacts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div style={{ marginTop: '15px', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              style={{ padding: '5px 10px', cursor: page === 0 ? 'default' : 'pointer' }}
            >
              Previous
            </button>
            <span>Page {page + 1} of {totalPages}</span>
            <button
              disabled={page >= totalPages - 1}
              onClick={() => setPage(page + 1)}
              style={{ padding: '5px 10px', cursor: page >= totalPages - 1 ? 'default' : 'pointer' }}
            >
              Next
            </button>
          </div>
        </div>
        <div>
          <Profile username={username} token={token} setToken={setToken} setUsername={setUsername} />
        </div>
      </div>

      <ContactFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setSelectedContact(null)
        }}
        onSave={handleSaveContact}
        contact={selectedContact}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false)
          setSelectedContact(null)
        }}
        onConfirm={handleDeleteContact}
        contactName={selectedContact ? `${selectedContact.firstName} ${selectedContact.lastName}` : ''}
      />

      <ContactDetailModal
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false)
          setSelectedContact(null)
        }}
        contact={selectedContact}
      />
    </div>
  )
}

export default Dashboard
