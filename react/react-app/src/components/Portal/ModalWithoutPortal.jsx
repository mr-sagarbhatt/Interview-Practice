import React from 'react'

const ModalWithoutPortal = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null
  return (
    <div
      style={{
        position: 'fixed',
        background: 'rgba(0,0,0,0.7)',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999999,
      }}
    >
      <div
        style={{
          background: '#FFFFFF',
        }}
      >
        <button onClick={onClose}>x</button>
        {children}
      </div>
    </div>
  )
}

export default ModalWithoutPortal
