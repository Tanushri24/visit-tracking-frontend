import { Route, Routes } from 'react-router-dom';
import Layout from '../../../Layouts/Layout';
import AdminDashboard from '../pages/AdminDashboard';

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
      
      {/* User Management - Uncomment when ready */}
      {/* <Route path="users" element={<AdminLayout><ManageUsers /></AdminLayout>} />
      <Route path="users/:id" element={<AdminLayout><UserDetails /></AdminLayout>} /> */}
      
      {/* Master Management */}
      {/* <Route path="masters" element={<AdminLayout><ManageMasters /></AdminLayout>} />
      <Route path="masters/:id" element={<AdminLayout><MasterDetails /></AdminLayout>} /> */}
      
      {/* Reports */}
      {/* <Route path="reports" element={<AdminLayout><ViewReports /></AdminLayout>} />
      <Route path="reports/:id" element={<AdminLayout><ReportDetails /></AdminLayout>} /> */}
      
      {/* Settings */}
      {/* <Route path="settings" element={<AdminLayout><div>Admin Settings</div></AdminLayout>} /> */}
      
      {/* Default route - dashboard */}
      <Route path="*" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
    </Routes>
  );
};

export default AdminRoutes;