// src/modules/super-admin/routes/SuperAdminRoutes.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../../../Layouts/Layout";
import SuperAdminDashboard from "../pages/SuperAdminDashboard";
import EmployeeRegistration from "../pages/employee-registration/EmployeeRegistration";

// Master Management
import MasterManagement from "../pages/Master/MasterManagement";
import CompanyMaster from "../pages/Master/Components/CompanyMaster";
import OrganizationMaster from "../pages/Master/Components/OrganizationMaster";
import DepartmentMaster from "../pages/Master/Components/DepartmentMaster";
import ContactPersonMaster from "../pages/Master/Components/ContactPersonMaster";
import VisitPurposeMaster from "../pages/Master/Components/VisitPurposeMaster";
import VehicleTypesMater from "../pages/Master/Components/VehicleTypeMaster";
import ExpenseRateMaster from "../pages/Master/Components/ExpenseRateMaster";
import FunnelStageMaster from "../pages/Master/Components/FunnelStageMaster";
import OutcomeMaster from "../pages/Master/Components/OutcomeMaster";

// Expense Config
import ExpenseConfig from "../pages/expense-configrution/ExpenseConfig";
import RateManagement from "../pages/expense-configrution/RateManagement";
import RateChangeHistory from "../pages/expense-configrution/RateChangeHistory";
import VehicleTypes from "../pages/expense-configrution/VehicleTypes";
import EffectiveDates from "../pages/expense-configrution/EffectiveDates";

// User Management
import UserManagement from "../pages/User/UserManagement";

// Visit Management
import VisitManagement from "../pages/Visits/VisitManagement";
import AllVisits from "../pages/Visits/Components/AllVisits";
import TodaysVisits from "../pages/Visits/Components/TodaysVisits";
import MonthlyVisits from "../pages/Visits/Components/MonthlyVisits";

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

      {/* Employee Registration */}
      <Route
        path="employee-registration"
        element={
          <Layout role="super_admin">
            <EmployeeRegistration />
          </Layout>
        }
      />

      {/* Master Management */}
      <Route
        path="master-management"
        element={
          <Layout role="super_admin">
            <MasterManagement />
          </Layout>
        }
      />
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
      <Route
        path="master-management/visit-purpose"
        element={
          <Layout role="super_admin">
            <VisitPurposeMaster />
          </Layout>
        }
      />
      <Route
        path="master-management/vehicle-type"
        element={
          <Layout role="super_admin">
            <VehicleTypesMater />
          </Layout>
        }
      />
      <Route
        path="master-management/expense-rate"
        element={
          <Layout role="super_admin">
            <ExpenseRateMaster />
          </Layout>
        }
      />
      <Route
        path="master-management/funnel-stage"
        element={
          <Layout role="super_admin">
            <FunnelStageMaster />
          </Layout>
        }
      />
      <Route
        path="master-management/outcome-master"
        element={
          <Layout role="super_admin">
            <OutcomeMaster />
          </Layout>
        }
      />

      {/* Expense Config */}
      <Route
        path="expense-config"
        element={
          <Layout role="super_admin">
            <ExpenseConfig />
          </Layout>
        }
      />
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

      {/* User Management */}
      <Route
        path="users"
        element={
          <Layout role="super_admin">
            <UserManagement />
          </Layout>
        }
      />

      {/* Visit Management */}
      <Route
        path="visit-management"
        element={
          <Layout role="super_admin">
            <VisitManagement />
          </Layout>
        }
      />
      <Route
        path="visit-management/all-visits"
        element={
          <Layout role="super_admin">
            <AllVisits />
          </Layout>
        }
      />
      <Route
        path="visit-management/todays-visits"
        element={
          <Layout role="super_admin">
            <TodaysVisits />
          </Layout>
        }
      />
      <Route
        path="visit-management/monthly-visits"
        element={
          <Layout role="super_admin">
            <MonthlyVisits />
          </Layout>
        }
      />

      {/* Default Route */}
      <Route path="*" element={<Navigate to="/super-admin/dashboard" replace />} />
    </Routes>
  );
};

export default SuperAdminRoutes;