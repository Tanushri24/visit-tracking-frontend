import { Route, Routes } from 'react-router-dom';
import ManagementDashboard from '../pages/ManagementDashboard';

const ManagementRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<ManagementDashboard />} />
      <Route path="*" element={<ManagementDashboard />} />
    </Routes>
  );
};

export default ManagementRoutes;