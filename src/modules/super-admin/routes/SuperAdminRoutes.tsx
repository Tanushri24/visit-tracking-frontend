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

// Import Funnel Management (Top level only)
// import FunnelManagement from '../pages/Funnel/FunnelManagement';

// Import User Management (Top level only for now)
import UserManagement from '../pages/User/UserManagement';

// Import Expense Configuration (Top level only for now)
// import ExpenseConfig from '../pages/Expense/ExpenseConfig';

// Import Visit Management (Top level only for now)
// import VisitManagement from '../pages/Visit/VisitManagement';

// Import Business Outcomes (Top level only for now)
// import BusinessOutcomes from '../pages/Outcomes/BusinessOutcomes';

// Import Reports (Top level only for now)
// import Reports from '../pages/Reports/Reports';

// Import Audit Logs (Top level only for now)
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
      
      {/* Master Management Sub-routes - These will work when clicked from dropdown */}
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
      
      {/* ========== FUNNEL MANAGEMENT (NO DROPDOWN - TOP LEVEL ONLY) ========== */}
      <Route
        path="Funnel-management"
        element={
          <Layout role="super_admin">
            <div>Coming Soon</div>
          </Layout>
        }
      />
      
      {/* ========== USER MANAGEMENT (NO DROPDOWN - TOP LEVEL ONLY) ========== */}
      <Route
        path="users"
        element={
          <Layout role="super_admin">
            <UserManagement />
          </Layout>
        }
      />
      
      {/* ========== EXPENSE CONFIGURATION (NO DROPDOWN - TOP LEVEL ONLY) ========== */}
      <Route
        path="expense-config"
        element={
          <Layout role="super_admin">
            <div>Coming Soon</div>
          </Layout>
        }
      />
      
      {/* ========== VISIT MANAGEMENT (NO DROPDOWN - TOP LEVEL ONLY) ========== */}
      <Route
        path="visits"
        element={
          <Layout role="super_admin">
            <div>Coming Soon</div>
          </Layout>
        }
      />
      
      {/* ========== BUSINESS OUTCOMES (NO DROPDOWN - TOP LEVEL ONLY) ========== */}
      <Route
        path="outcomes"
        element={
          <Layout role="super_admin">
            <div>Coming Soon</div>
          </Layout>
        }
      />
      
      {/* ========== REPORTS (NO DROPDOWN - TOP LEVEL ONLY) ========== */}
      <Route
        path="reports"
        element={
          <Layout role="super_admin">
            <div>Coming Soon</div>
          </Layout>
        }
      />
      
      {/* ========== AUDIT LOGS (NO DROPDOWN - TOP LEVEL ONLY) ========== */}
      <Route
        path="audit"
        element={
          <Layout role="super_admin">
            <div>Coming Soon</div>
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