import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Welcome from '../../modules/auth/pages/welcome'; // Import Welcome page
import Login from '../../modules/auth/pages/Login'; // Import Login page
import AuthRoutes from '../../modules/auth/routes/AuthRoutes';

// Import all role-based routes
import SuperAdminRoutes from '../../modules/super-admin/routes/SuperAdminRoutes';
import AdminRoutes from '../../modules/admin/routes/AdminRoutes';
import ManagerRoutes from '../../modules/manager/routes/ManagerRoutes';
import EmployeeRoutes from '../../modules/employee/routes/EmployeeRoutes';

const AppRoutes = () => {
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem('auth') ? true : false;
  
  // Mock user role - replace with actual auth
  const userRole = 'employee'; // This would come from auth context

  return (
    <Routes>
      {/* Public Routes - No auth required */}
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      
      {/* Auth Routes (if you have multiple auth pages) */}
      <Route path="/auth/*" element={<AuthRoutes />} />

      {/* Private Routes - Require authentication */}
      <Route element={<PrivateRoute />}>
        {/* All role-based routes */}
        <Route path="/super-admin/*" element={<SuperAdminRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/manager/*" element={<ManagerRoutes />} />
        <Route path="/employee/*" element={<EmployeeRoutes />} />
        <Route path="/management/*" element={<div>Management Dashboard</div>} />
      </Route>

      {/* Redirect based on auth status */}
      <Route path="*" element={
        isAuthenticated 
          ? <Navigate to={`/${userRole}/dashboard`} replace />
          : <Navigate to="/" replace />
      } />
    </Routes>
  );
};

export default AppRoutes;