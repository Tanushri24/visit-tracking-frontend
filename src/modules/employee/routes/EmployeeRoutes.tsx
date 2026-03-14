import { Route, Routes } from 'react-router-dom';
import EmployeeDashboard from '../pages/EmployeeDashboard';

const EmployeeRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<EmployeeDashboard />} />
      <Route path="*" element={<EmployeeDashboard />} />
    </Routes>
  );
};

export default EmployeeRoutes;