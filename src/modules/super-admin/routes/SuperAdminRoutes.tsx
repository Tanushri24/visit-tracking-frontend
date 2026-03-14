import { Route, Routes } from 'react-router-dom';
import SuperAdminDashboard from '../pages/SuperAdminDashboard';

const SuperAdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<SuperAdminDashboard />} />
      <Route path="*" element={<SuperAdminDashboard />} />
    </Routes>
  );
};

export default SuperAdminRoutes;