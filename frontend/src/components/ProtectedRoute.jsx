import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useSelector((state) => state.auth)

  if (!user) return <Navigate to="/" />

  // If this route is admin-only and user isn't admin
  if (adminOnly && !user.is_staff) return <Navigate to="/" />

  return children
}

export default ProtectedRoute
