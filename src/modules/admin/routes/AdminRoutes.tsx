import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="*" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AdminRoutes;