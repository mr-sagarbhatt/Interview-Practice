import React from 'react'
import { createPortal } from 'react-dom'

const ModalWithPortal = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null
  return createPortal(
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
    </div>,
    document.getElementById('portal'),
  )
}

export default ModalWithPortal
