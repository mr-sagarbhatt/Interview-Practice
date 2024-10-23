import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAppContext()
  return isAuthenticated ? children : <Navigate to="/login" />
}

export default ProtectedRoute
