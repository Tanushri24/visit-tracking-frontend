import { Route, Routes } from 'react-router-dom';
import ManagerDashboard from '../pages/ManagerDashboard';

const ManagerRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<ManagerDashboard />} />
      <Route path="*" element={<ManagerDashboard />} />
    </Routes>
  );
};

export default ManagerRoutes;