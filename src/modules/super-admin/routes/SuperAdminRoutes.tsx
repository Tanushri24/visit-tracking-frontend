// src/modules/super-admin/routes/SuperAdminRoutes.tsx

import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../../../Layouts/Layout';
import SuperAdminDashboard from '../pages/SuperAdminDashboard';
import EmployeeRegistration from '../pages/employee-registration/EmployeeRegistration';

// Import other pages as you create them
 import MasterManagement from '../pages/Master/MasterManagement';
import FunnelManagement from '../pages/Funnel/FunnelManagemet';
import UserManagement from '../pages/User/UserManagement';
// ... other imports

const SuperAdminRoutes = () => {
  return (
    <Routes>
      {/* Dashboard */}
      <Route
        path="dashboard"
        element={
          <Layout role="super_admin">
            <SuperAdminDashboard />
          </Layout>
        }
      />
      
      {/* Employee Registration - matches menu href */}
      <Route
        path="employee-registration"
        element={
          <Layout role="super_admin">
            <EmployeeRegistration />
          </Layout>
        }
      />
      
      {/* Master Management - matches menu href */}
      <Route
        path="master-management"
        element={
          <Layout role="super_admin">
            <MasterManagement/>
          </Layout>
        }
      />
      
      {/* Funnel Management - matches menu href (case sensitive!) */}
      <Route
        path="Funnel-management"  // 👈 Note: Capital 'F' to match menu href
        element={
          <Layout role="super_admin">
            <FunnelManagement/>
          </Layout>
        }
      />
      
      {/* User Management Routes */}
      <Route
        path="users"
        element={
          <Layout role="super_admin">
            <UserManagement/>
          </Layout>
        }
      />
      <Route
        path="users/list"
        element={
          <Layout role="super_admin">
            <div>All Users Page (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="users/roles"
        element={
          <Layout role="super_admin">
            <div>Roles & Permissions Page (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="users/sessions"
        element={
          <Layout role="super_admin">
            <div>Active Sessions Page (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="users/managers"
        element={
          <Layout role="super_admin">
            <div>Reporting Managers Page (Coming Soon)</div>
          </Layout>
        }
      />
      
      {/* Expense Configuration Routes */}
      <Route
        path="expense-config"
        element={
          <Layout role="super_admin">
            <div>Expense Configuration Overview (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="expense-config/rates"
        element={
          <Layout role="super_admin">
            <div>Rate Management Page (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="expense-config/history"
        element={
          <Layout role="super_admin">
            <div>Rate Change History Page (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="expense-config/vehicles"
        element={
          <Layout role="super_admin">
            <div>Vehicle Types Page (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="expense-config/effective-dates"
        element={
          <Layout role="super_admin">
            <div>Effective Dates Page (Coming Soon)</div>
          </Layout>
        }
      />
      
      {/* Visit Management Routes */}
      <Route
        path="visits"
        element={
          <Layout role="super_admin">
            <div>Visit Management Overview (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="visits/all"
        element={
          <Layout role="super_admin">
            <div>All Visits Page (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="visits/today"
        element={
          <Layout role="super_admin">
            <div>Today's Visits Page (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="visits/monthly"
        element={
          <Layout role="super_admin">
            <div>Monthly Visits Page (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="visits/followups"
        element={
          <Layout role="super_admin">
            <div>Pending Follow-ups Page (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="visits/approvals"
        element={
          <Layout role="super_admin">
            <div>Expense Approvals Page (Coming Soon)</div>
          </Layout>
        }
      />
      
      {/* Funnel Management Routes */}
      <Route
        path="funnel"
        element={
          <Layout role="super_admin">
            <div>Funnel Management Overview (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="funnel/stage-wise"
        element={
          <Layout role="super_admin">
            <div>Stage-wise Funnel Page (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="funnel/employee-wise"
        element={
          <Layout role="super_admin">
            <div>Employee-wise Funnel Page (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="funnel/client-wise"
        element={
          <Layout role="super_admin">
            <div>Client-wise Funnel Page (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="funnel/dept-wise"
        element={
          <Layout role="super_admin">
            <div>Department-wise Funnel Page (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="funnel/conversion"
        element={
          <Layout role="super_admin">
            <div>Conversion Tracking Page (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="funnel/stalled"
        element={
          <Layout role="super_admin">
            <div>Stalled Opportunities Page (Coming Soon)</div>
          </Layout>
        }
      />
      
      {/* Business Outcomes Routes */}
      <Route
        path="outcomes"
        element={
          <Layout role="super_admin">
            <div>Business Outcomes Overview (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="outcomes/leads"
        element={
          <Layout role="super_admin">
            <div>Leads Generated Page (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="outcomes/proposals"
        element={
          <Layout role="super_admin">
            <div>Proposals Created Page (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="outcomes/orders"
        element={
          <Layout role="super_admin">
            <div>Orders Received Page (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="outcomes/lost"
        element={
          <Layout role="super_admin">
            <div>Lost Deals Page (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="outcomes/pipeline"
        element={
          <Layout role="super_admin">
            <div>Pipeline Value Page (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="outcomes/confirmed"
        element={
          <Layout role="super_admin">
            <div>Confirmed Business Page (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="outcomes/cost-per-lead"
        element={
          <Layout role="super_admin">
            <div>Cost per Lead Page (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="outcomes/productivity"
        element={
          <Layout role="super_admin">
            <div>Productivity Score Page (Coming Soon)</div>
          </Layout>
        }
      />
      
      {/* Reports Routes */}
      <Route
        path="reports"
        element={
          <Layout role="super_admin">
            <div>Reports Overview (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="reports/daily-visit"
        element={
          <Layout role="super_admin">
            <div>Daily Visit Report (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="reports/date-range"
        element={
          <Layout role="super_admin">
            <div>Date Range Visit Report (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="reports/employee-summary"
        element={
          <Layout role="super_admin">
            <div>Employee Visit Summary (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="reports/organisation"
        element={
          <Layout role="super_admin">
            <div>Organisation Visit Report (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="reports/department"
        element={
          <Layout role="super_admin">
            <div>Department Visit Report (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="reports/expense"
        element={
          <Layout role="super_admin">
            <div>Expense Report (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="reports/vehicle-expense"
        element={
          <Layout role="super_admin">
            <div>Vehicle-wise Expense Report (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="reports/funnel-stage"
        element={
          <Layout role="super_admin">
            <div>Funnel Stage Report (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="reports/followup-pending"
        element={
          <Layout role="super_admin">
            <div>Follow-up Pending Report (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="reports/business-outcome"
        element={
          <Layout role="super_admin">
            <div>Business Outcome Report (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="reports/conversion"
        element={
          <Layout role="super_admin">
            <div>Conversion Analysis Report (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="reports/productivity"
        element={
          <Layout role="super_admin">
            <div>Monthly Productivity Report (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="reports/cost-revenue"
        element={
          <Layout role="super_admin">
            <div>Cost vs Revenue Report (Coming Soon)</div>
          </Layout>
        }
      />
      
      {/* Audit Logs Routes */}
      <Route
        path="audit"
        element={
          <Layout role="super_admin">
            <div>Audit Logs Overview (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="audit/visits"
        element={
          <Layout role="super_admin">
            <div>Visit Change History (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="audit/rates"
        element={
          <Layout role="super_admin">
            <div>Rate Change History (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="audit/users"
        element={
          <Layout role="super_admin">
            <div>User Activity Logs (Coming Soon)</div>
          </Layout>
        }
      />
      <Route
        path="audit/masters"
        element={
          <Layout role="super_admin">
            <div>Master Data Changes (Coming Soon)</div>
          </Layout>
        }
      />
      
      {/* Default route - redirect to dashboard */}
      <Route
        path="*"
        element={<Navigate to="/super-admin/dashboard" replace />}
      />
    </Routes>
  );
};

export default SuperAdminRoutes;