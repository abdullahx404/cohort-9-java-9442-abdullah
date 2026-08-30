function DeleteConfirmModal({ isOpen, onClose, onConfirm, contactName }) {
  if (!isOpen) return null

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '300px', textAlign: 'center' }}>
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete contact <strong>{contactName}</strong>?</p>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
          <button type="button" onClick={onClose} style={{ padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
          <button type="button" onClick={onConfirm} style={{ padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal
