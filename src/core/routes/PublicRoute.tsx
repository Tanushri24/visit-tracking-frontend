import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {
  // Set to false to see login page, true to redirect
  const isAuthenticated = false
  
  if (isAuthenticated) {
    // You can change this based on role
    return <Navigate to="/employee/dashboard" replace />
  }

  return <Outlet />
}

export default PublicRoute