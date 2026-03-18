// src/routes/AppRoutes.tsx

import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Welcome from '../../auth/pages/welcome';
import Login from '../../auth/pages/Login';
import AuthRoutes from '../../auth/routes/AuthRoutes';
import EmployeeRegistration from '../../auth/registration/EmployeeRegistration';

// Import all role-based routes
import SuperAdminRoutes from '../../modules/super-admin/routes/SuperAdminRoutes';
import AdminRoutes from '../../modules/admin/routes/AdminRoutes';
import ManagerRoutes from '../../modules/manager/routes/ManagerRoutes';
import EmployeeRoutes from '../../modules/employee/routes/EmployeeRoutes';
import ManagementRoutes from "../../modules/management/routes/ManagementRoutes";

const AppRoutes = () => {
  const isAuthenticated = localStorage.getItem('auth') ? true : false;
  const userRole = 'employee'; // This would come from auth context

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/registration" element={<EmployeeRegistration />} />

      {/* Private Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/super-admin/*" element={<SuperAdminRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />           {/* ✅ All admin routes handled here */}
        <Route path="/manager/*" element={<ManagerRoutes />} />
        <Route path="/employee/*" element={<EmployeeRoutes />} />
        <Route path="/management/*" element={<ManagementRoutes />} />
      </Route>

      {/* Redirect */}
      <Route path="*" element={
        isAuthenticated 
          ? <Navigate to={`/${userRole}/dashboard`} replace />
          : <Navigate to="/" replace />
      } />
    </Routes>
  );
};

export default AppRoutes;