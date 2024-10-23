import React from 'react'
import { useAppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()
  const { isAuthenticated, login, logout } = useAppContext()
  return (
    <button
      onClick={() => {
        login()
        navigate('/')
      }}
    >
      Login
    </button>
  )
}

export default App
