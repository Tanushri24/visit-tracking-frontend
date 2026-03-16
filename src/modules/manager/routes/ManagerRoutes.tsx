import { Route, Routes } from 'react-router-dom';
import Layout from '../../../Layouts/Layout';
import ManagerDashboard from '../pages/ManagerDashboard';

// Simple wrapper
const ManagerLayout = ({ children }: { children: React.ReactNode }) => (
  <Layout role="manager">
    {children}
  </Layout>
);

const ManagerRoutes = () => {
  return (
    <Routes>
      {/* Dashboard */}
      <Route 
        path="dashboard" 
        element={<ManagerLayout><ManagerDashboard /></ManagerLayout>} 
      />
      
      {/* Team Routes - Add later */}
      {/* <Route path="team" element={<ManagerLayout><TeamPage /></ManagerLayout>} /> */}
      {/* <Route path="team/:id" element={<ManagerLayout><TeamMemberDetails /></ManagerLayout>} /> */}
      
      {/* Approvals Routes */}
      {/* <Route path="approvals" element={<ManagerLayout><ApprovalsPage /></ManagerLayout>} /> */}
      
      {/* Reports Routes */}
      {/* <Route path="reports" element={<ManagerLayout><ReportsPage /></ManagerLayout>} /> */}
      
      {/* Default - Dashboard */}
      <Route 
        path="*" 
        element={<ManagerLayout><ManagerDashboard /></ManagerLayout>} 
      />
    </Routes>
  );
};

export default ManagerRoutes;