import React from 'react'
import { useAppContext } from '../../context/AppContext'

function App() {
  const { isAuthenticated, login, logout } = useAppContext()
  return <button onClick={() => logout()}>Logout</button>
}

export default App
