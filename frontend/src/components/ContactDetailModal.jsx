function ContactDetailModal({ isOpen, onClose, contact }) {
  if (!isOpen || !contact) return null

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '400px' }}>
        <h3>Contact Details</h3>
        <div style={{ marginBottom: '10px' }}><strong>First Name:</strong> {contact.firstName}</div>
        <div style={{ marginBottom: '10px' }}><strong>Last Name:</strong> {contact.lastName}</div>
        <div style={{ marginBottom: '10px' }}><strong>Title:</strong> {contact.title}</div>

        <div style={{ marginBottom: '10px' }}>
          <strong>Emails:</strong>
          {contact.emails && contact.emails.length > 0 ? (
            <ul style={{ margin: '5px 0 0 0', paddingLeft: '20px' }}>
              {contact.emails.map((e, idx) => (
                <li key={idx}>{e.email} ({e.label})</li>
              ))}
            </ul>
          ) : (
            <span> None</span>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <strong>Phones:</strong>
          {contact.phones && contact.phones.length > 0 ? (
            <ul style={{ margin: '5px 0 0 0', paddingLeft: '20px' }}>
              {contact.phones.map((p, idx) => (
                <li key={idx}>{p.number} ({p.label})</li>
              ))}
            </ul>
          ) : (
            <span> None</span>
          )}
        </div>

        <div style={{ textAlign: 'right' }}>
          <button type="button" onClick={onClose} style={{ padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default ContactDetailModal
