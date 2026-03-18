// src/modules/super-admin/routes/SuperAdminRoutes.tsx

import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../../../Layouts/Layout';
import SuperAdminDashboard from '../pages/SuperAdminDashboard';
import EmployeeRegistration from '../pages/employee-registration/EmployeeRegistration';
// import UsersPage from '../pages/Users';
// import CompaniesPage from '../pages/Companies';
// ... other imports

const SuperAdminRoutes = () => {
  return (
    <Routes>
      {/* Dashboard */}
      <Route
        path="dashboard"
        element={
          <Layout role="super_admin">
            <SuperAdminDashboard />
          </Layout>
        }
      />
      
      {/* ✅ FIX 1: ADD THIS ROUTE - Matches menu href */}
      <Route
        path="employee-registration"  // 👈 This matches menu
        element={
          <Layout role="super_admin">
            <EmployeeRegistration />
          </Layout>
        }
      />
      
      {/* ✅ FIX 2: Keep users route if needed (optional) */}
      <Route
        path="users"
        element={
          <Layout role="super_admin">
            <div>User Management Page (Coming Soon)</div>
          </Layout>
        }
      />
      
      {/* Default route - redirect to dashboard */}
      <Route
        path="*"
        element={<Navigate to="/super-admin/dashboard" replace />}
      />
    </Routes>
  );
};

export default SuperAdminRoutes;