// src/routes/AppRoutes.tsx

import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from '../../auth/pages/Login';
// import AuthRoutes from '../../auth/routes/AuthRoutes';
// import EmployeeRegistration from '../../auth/registration/EmployeeRegistration';
// import ForgotPassword from '../../auth/pages/ForgotPassword';

// Import all role-based routes
import SuperAdminRoutes from '../../modules/super-admin/routes/SuperAdminRoutes';
import AdminRoutes from '../../modules/admin/routes/AdminRoutes';
import ManagerRoutes from '../../modules/manager/routes/ManagerRoutes';
import EmployeeRoutes from '../../modules/employee/routes/EmployeeRoutes';
import ManagementRoutes from "../../modules/management/routes/ManagementRoutes";

const AppRoutes = () => {
  const token = localStorage.getItem('authToken') || localStorage.getItem('auth');
  const isAuthenticated = !!token;

  let userRole = 'employee';

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      const role =
        payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
        payload["role"];

      const clean = role?.replace(/[\s_-]/g, "").toLowerCase();

      const map: Record<string, string> = {
        superadmin: "super-admin",
        admin: "admin",
        manager: "manager",
        teamlead: "manager",
        employee: "employee",
        management: "management",
        mastermanagement: "management",
        hr: "admin"
      };

      userRole = map[clean] || "employee";
    } catch (e) {
      console.error("Role decode error:", e);
    }
  }

  return (
    <Routes>
      {/* Public */}
      <Route
        path="/"
        element={
          isAuthenticated
            ? <Navigate to={`/${userRole}/dashboard`} replace />
            : <Navigate to="/login" replace />
        }
      />
      <Route path="/login" element={<Login />} />

      {/* Private */}
      <Route element={<PrivateRoute />}>
        <Route path="/super-admin/*" element={<SuperAdminRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/manager/*" element={<ManagerRoutes />} />
        <Route path="/employee/*" element={<EmployeeRoutes />} />
        <Route path="/management/*" element={<ManagementRoutes />} />
      </Route>

      {/* Redirect */}
      <Route
        path="*"
        element={
          isAuthenticated
            ? <Navigate to={`/${userRole}/dashboard`} replace />
            : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
