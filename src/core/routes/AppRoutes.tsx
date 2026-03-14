import { Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import AuthRoutes from '../../modules/auth/routes/AuthRoutes'

// Temporary placeholder components for other dashboards
const EmployeeDashboard = () => (
  <div className="min-h-screen bg-gray-100 p-8">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
      <p className="mt-4 text-gray-600">Welcome to Employee Dashboard</p>
    </div>
  </div>
)

const ManagerDashboard = () => (
  <div className="min-h-screen bg-gray-100 p-8">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900">Manager Dashboard</h1>
      <p className="mt-4 text-gray-600">Welcome to Manager Dashboard</p>
    </div>
  </div>
)

const AdminDashboard = () => (
  <div className="min-h-screen bg-gray-100 p-8">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      <p className="mt-4 text-gray-600">Welcome to Admin Dashboard</p>
    </div>
  </div>
)

const ManagementDashboard = () => (
  <div className="min-h-screen bg-gray-100 p-8">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900">Management Dashboard</h1>
      <p className="mt-4 text-gray-600">Welcome to Management Dashboard</p>
    </div>
  </div>
)

const SuperAdminDashboard = () => (
  <div className="min-h-screen bg-gray-100 p-8">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
      <p className="mt-4 text-gray-600">Welcome to Super Admin Dashboard</p>
    </div>
  </div>
)

const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect root to login or dashboard based on auth */}
      <Route path="/" element={<Navigate to="/auth/login" replace />} />
      
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/auth/*" element={<AuthRoutes />} />
      </Route>

      {/* Private Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/manager/dashboard" element={<ManagerDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/management/dashboard" element={<ManagementDashboard />} />
        <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
      </Route>

      {/* Catch all - 404 */}
      <Route path="*" element={<div className="min-h-screen flex items-center justify-center">404 - Page Not Found</div>} />
    </Routes>
  )
}

export default AppRoutes