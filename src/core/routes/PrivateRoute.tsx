import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  // For UI development - set to true to see dashboards, false to see login
  const isAuthenticated = true
  
  // You can also set based on role for testing
  // const userRole = 'employee' // change this to test different dashboards
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  return <Outlet />
}

export default PrivateRoute