import { useState, useEffect } from 'react'

function ContactFormModal({ isOpen, onClose, onSave, contact }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [title, setTitle] = useState('')
  const [emails, setEmails] = useState([])
  const [phones, setPhones] = useState([])
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (contact) {
      setFirstName(contact.firstName || '')
      setLastName(contact.lastName || '')
      setTitle(contact.title || '')
      setEmails(contact.emails || [])
      setPhones(contact.phones || [])
    } else {
      setFirstName('')
      setLastName('')
      setTitle('')
      setEmails([{ email: '', label: 'Personal' }])
      setPhones([{ number: '', label: 'Home' }])
    }
    setErrorMsg('')
  }, [contact, isOpen])

  const handleAddEmail = () => {
    setEmails([...emails, { email: '', label: 'Personal' }])
  }

  const handleRemoveEmail = (index) => {
    setEmails(emails.filter((_, i) => i !== index))
  }

  const handleEmailChange = (index, field, value) => {
    const updated = [...emails]
    updated[index][field] = value
    setEmails(updated)
  }

  const handleAddPhone = () => {
    setPhones([...phones, { number: '', label: 'Home' }])
  }

  const handleRemovePhone = (index) => {
    setPhones(phones.filter((_, i) => i !== index))
  }

  const handlePhoneChange = (index, field, value) => {
    const updated = [...phones]
    updated[index][field] = value
    setPhones(updated)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMsg('')
    if (!firstName.trim() || !lastName.trim() || !title.trim()) {
      setErrorMsg('First Name, Last Name, and Title are required')
      return
    }
    const filteredEmails = emails.filter(e => e.email.trim() !== '')
    const filteredPhones = phones.filter(p => p.number.trim() !== '')
    onSave({
      firstName,
      lastName,
      title,
      emails: filteredEmails,
      phones: filteredPhones
    })
  }

  if (!isOpen) return null

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, overflowY: 'auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '450px', maxHeight: '90vh', overflowY: 'auto' }}>
        <h3>{contact ? 'Update Contact' : 'Create Contact'}</h3>
        {errorMsg && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMsg}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '3px' }}>First Name</label>
            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '3px' }}>Last Name</label>
            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '3px' }}>Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <h4 style={{ margin: '10px 0 5px 0' }}>Email Addresses</h4>
            {emails.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
                <input type="email" placeholder="Email" value={item.email} onChange={e => handleEmailChange(idx, 'email', e.target.value)} style={{ flex: 2, padding: '5px' }} />
                <select value={item.label} onChange={e => handleEmailChange(idx, 'label', e.target.value)} style={{ flex: 1, padding: '5px' }}>
                  <option value="Personal">Personal</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>
                <button type="button" onClick={() => handleRemoveEmail(idx)} style={{ padding: '5px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>X</button>
              </div>
            ))}
            <button type="button" onClick={handleAddEmail} style={{ padding: '5px 10px', marginTop: '5px', cursor: 'pointer' }}>Add Email</button>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <h4 style={{ margin: '10px 0 5px 0' }}>Phone Numbers</h4>
            {phones.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
                <input type="text" placeholder="Phone Number" value={item.number} onChange={e => handlePhoneChange(idx, 'number', e.target.value)} style={{ flex: 2, padding: '5px' }} />
                <select value={item.label} onChange={e => handlePhoneChange(idx, 'label', e.target.value)} style={{ flex: 1, padding: '5px' }}>
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Other">Other</option>
                </select>
                <button type="button" onClick={() => handleRemovePhone(idx)} style={{ padding: '5px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>X</button>
              </div>
            ))}
            <button type="button" onClick={handleAddPhone} style={{ padding: '5px 10px', marginTop: '5px', cursor: 'pointer' }}>Add Phone</button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
            <button type="button" onClick={onClose} style={{ padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactFormModal
