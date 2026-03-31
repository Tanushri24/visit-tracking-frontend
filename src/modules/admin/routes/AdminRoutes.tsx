// src/modules/admin/routes/AdminRoutes.tsx

import { Route, Routes } from 'react-router-dom';
import Layout from '../../../Layouts/Layout';
import AdminDashboard from '../pages/AdminDashboard';
import AdminEmployeeRegistration from '../pages/EmployeeRegistration/AdminEmployeeRegistration';

// Wrapper component to avoid repeating Layout
const AdminLayout = ({ children }: { children: React.ReactNode }) => (
  <Layout role="admin">
    {children}
  </Layout>
);

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
      
      {/* ✅ Employee Registration - CORRECT PATH */}
      <Route 
        path="employee-registration"  // ✅ Must match menu href
        element={
          <AdminLayout>
            <AdminEmployeeRegistration />
          </AdminLayout>
        } 
      />
      
      {/* Master Management */}
      {/* <Route path="masters" element={<AdminLayout><ManageMasters /></AdminLayout>} /> */}
      
      {/* Default route - dashboard */}
      <Route path="*" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
    </Routes>
  );
};

export default AdminRoutes;