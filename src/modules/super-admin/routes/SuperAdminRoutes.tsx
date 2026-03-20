// src/modules/super-admin/routes/SuperAdminRoutes.tsx

import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../../../Layouts/Layout';
import SuperAdminDashboard from '../pages/SuperAdminDashboard';
import EmployeeRegistration from '../pages/employee-registration/EmployeeRegistration';

// Master Management Pages
import MasterManagement from '../pages/Master/MasterManagement';
import CompanyMaster from '../pages/Master/Components/CompanyMaster';
import OrganizationMaster from '../pages/Master/Components/OrganizationMaster';
import DepartmentMaster from '../pages/Master/Components/DepartmentMaster';
import ContactPersonMaster from '../pages/Master/Components/ContactPersonMaster';

// Expense Configuration Pages
import ExpenseConfig from '../pages/expense-configrution/ExpenseConfig';
import RateManagement from '../pages/expense-configrution/RateManagement';
import RateChangeHistory from '../pages/expense-configrution/RateChangeHistory';
import VehicleTypes from '../pages/expense-configrution/VehicleTypes';
import EffectiveDates from '../pages/expense-configrution/EffectiveDates';

// Import User Management (Top level only for now)
import UserManagement from '../pages/User/UserManagement';

// Import other modules (commented out for now)
// import FunnelManagement from '../pages/Funnel/FunnelManagement';
// import VisitManagement from '../pages/Visit/VisitManagement';
// import BusinessOutcomes from '../pages/Outcomes/BusinessOutcomes';
// import Reports from '../pages/Reports/Reports';
// import AuditLogs from '../pages/Audit/AuditLogs';

const SuperAdminRoutes = () => {
  return (
    <Routes>
      {/* ========== DASHBOARD ========== */}
      <Route
        path="dashboard"
        element={
          <Layout role="super_admin">
            <SuperAdminDashboard />
          </Layout>
        }
      />
      
      {/* ========== EMPLOYEE REGISTRATION ========== */}
      <Route
        path="employee-registration"
        element={
          <Layout role="super_admin">
            <EmployeeRegistration />
          </Layout>
        }
      />
      
      {/* ========== MASTER MANAGEMENT (WITH DROPDOWN) ========== */}
      {/* Master Management Overview */}
      <Route
        path="master-management"
        element={
          <Layout role="super_admin">
            <MasterManagement />
          </Layout>
        }
      />
      
      {/* Master Management Sub-routes */}
      <Route
        path="master-management/company"
        element={
          <Layout role="super_admin">
            <CompanyMaster />
          </Layout>
        }
      />
      
      <Route
        path="master-management/organization"
        element={
          <Layout role="super_admin">
            <OrganizationMaster />
          </Layout>
        }
      />
      
      <Route
        path="master-management/department"
        element={
          <Layout role="super_admin">
            <DepartmentMaster />
          </Layout>
        }
      />
      
      <Route
        path="master-management/contact-person"
        element={
          <Layout role="super_admin">
            <ContactPersonMaster />
          </Layout>
        }
      />
      
      {/* ========== EXPENSE CONFIGURATION (WITH DROPDOWN) ========== */}
      {/* Expense Configuration Overview */}
      <Route
        path="expense-config"
        element={
          <Layout role="super_admin">
            <ExpenseConfig />
          </Layout>
        }
      />
      
      {/* Expense Configuration Sub-routes */}
      <Route
        path="expense-config/rates"
        element={
          <Layout role="super_admin">
            <RateManagement />
          </Layout>
        }
      />
      
      <Route
        path="expense-config/history"
        element={
          <Layout role="super_admin">
            <RateChangeHistory />
          </Layout>
        }
      />
      
      <Route
        path="expense-config/vehicles"
        element={
          <Layout role="super_admin">
            <VehicleTypes />
          </Layout>
        }
      />
      
      <Route
        path="expense-config/effective-dates"
        element={
          <Layout role="super_admin">
            <EffectiveDates />
          </Layout>
        }
      />
      
      {/* ========== FUNNEL MANAGEMENT ========== */}
      <Route
        path="Funnel-management"
        element={
          <Layout role="super_admin">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-800">Funnel Management</h1>
              <p className="text-gray-600 mt-2">Coming Soon</p>
            </div>
          </Layout>
        }
      />
      
      {/* ========== USER MANAGEMENT ========== */}
      <Route
        path="users"
        element={
          <Layout role="super_admin">
            <UserManagement />
          </Layout>
        }
      />
      
      {/* ========== VISIT MANAGEMENT ========== */}
      <Route
        path="visits"
        element={
          <Layout role="super_admin">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-800">Visit Management</h1>
              <p className="text-gray-600 mt-2">Coming Soon</p>
            </div>
          </Layout>
        }
      />
      
      {/* ========== BUSINESS OUTCOMES ========== */}
      <Route
        path="outcomes"
        element={
          <Layout role="super_admin">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-800">Business Outcomes</h1>
              <p className="text-gray-600 mt-2">Coming Soon</p>
            </div>
          </Layout>
        }
      />
      
      {/* ========== REPORTS ========== */}
      <Route
        path="reports"
        element={
          <Layout role="super_admin">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
              <p className="text-gray-600 mt-2">Coming Soon</p>
            </div>
          </Layout>
        }
      />
      
      {/* ========== AUDIT LOGS ========== */}
      <Route
        path="audit"
        element={
          <Layout role="super_admin">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-800">Audit Logs</h1>
              <p className="text-gray-600 mt-2">Coming Soon</p>
            </div>
          </Layout>
        }
      />
      
      {/* ========== DEFAULT ROUTE ========== */}
      <Route
        path="*"
        element={<Navigate to="/super-admin/dashboard" replace />}
      />
    </Routes>
  );
};

export default SuperAdminRoutes;