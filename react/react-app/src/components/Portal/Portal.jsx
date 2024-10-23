import React, { useState } from 'react'
import ModalWithoutPortal from './ModalWithoutPortal'
import ModalWithPortal from './ModalWithPortal'

const Portal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenWithPortal, setIsOpenWithPortal] = useState(false)
  return (
    <div>
      <div
        style={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        <button onClick={() => setIsOpen((prev) => !prev)}>Toggle Modal Without Portal</button>
        <ModalWithoutPortal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <h1>ModalWithoutPortal Title</h1>
          <p>ModalWithoutPortal Description</p>
        </ModalWithoutPortal>
      </div>
      <div
        style={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        <button onClick={() => setIsOpenWithPortal((prev) => !prev)}>Toggle Modal With Portal</button>
        <ModalWithPortal isOpen={isOpenWithPortal} onClose={() => setIsOpenWithPortal(false)}>
          <h1>ModalWithPortal Title</h1>
          <p>ModalWithPortal Description</p>
        </ModalWithPortal>
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          background: 'red',
        }}
      >
        Element with high z-index
      </div>
    </div>
  )
}

export default Portal
