import { Route, Routes } from 'react-router-dom';
import Layout from '../../../Layouts/Layout';
import SuperAdminDashboard from '../pages/SuperAdminDashboard';
// import UsersPage from '../pages/Users';
// import CompaniesPage from '../pages/Companies';
// ... other imports

const SuperAdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="dashboard"
        element={
          <Layout role="super_admin">
            <SuperAdminDashboard />
          </Layout>
        }
      />
      {/* <Route
        path="users"
        element={
          <Layout role="super_admin">
            <UsersPage />
          </Layout>
        }
      /> */}
      {/* <Route
        path="companies"
        element={
          <Layout role="super_admin">
            <CompaniesPage />
          </Layout>
        }
      /> */}
      {/* Default route */}
      <Route
        path="*"
        element={
          <Layout role="super_admin">
            <SuperAdminDashboard />
          </Layout>
        }
      />
    </Routes>
  );
};

export default SuperAdminRoutes;