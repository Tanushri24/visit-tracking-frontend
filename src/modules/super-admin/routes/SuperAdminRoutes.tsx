import { Route, Routes } from 'react-router-dom';
import Layout from '../../../Layouts/Layout';
import SuperAdminDashboard from '../pages/SuperAdminDashboard';

const SuperAdminRoutes = () => {
  return (
    <Routes>
      {/* Sirf ek hi route - sab kuch dashboard pe jayega */}
      <Route
        path="*"
        element={
          <Layout>
            <SuperAdminDashboard />
          </Layout>
        }
      />
    </Routes>
  );
};

export default SuperAdminRoutes;