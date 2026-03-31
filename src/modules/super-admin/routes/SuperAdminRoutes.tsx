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
<<<<<<< HEAD
import UserManagement from "../pages/User/UserManagement";

// Visit Management
import VisitManagement from "../pages/Visits/VisitManagement";
import AllVisits from "../pages/Visits/Components/AllVisits";
import TodaysVisits from "../pages/Visits/Components/TodaysVisits";
import MonthlyVisits from "../pages/Visits/Components/MonthlyVisits";
=======


// Import User Management (Top level only for now)
import UserManagement from '../pages/User/UserManagement';



// Import other modules (commented out for now)


import VisitManagement from '../pages/Visits/VisitManagement';
import AllVisits from '../pages/Visits/Components/AllVisits';
import TodaysVisits from '../pages/Visits/Components/TodaysVisits';
import MonthlyVisits from '../pages/Visits/Components/MonthlyVisits';
import PendingFollowUps from '../pages/Visits/Components/PendingFollowups';
import ExpenseApprovals from '../pages/Visits/Components/ExpenseApprovals';


//Funnel Management

import FunnelManagement from '../pages/Funnel/FunnelManagemet';
import StageWiseFunnel from '../pages/Funnel/Components/StageWiseFunnel';
import EmployeeWiseFunnel from '../pages/Funnel/Components/EmployeeWiseFunnel';
import ClientWiseFunnel from '../pages/Funnel/Components/ClientWiseFunnel';
import DepartmentWiseFunnel from '../pages/Funnel/Components/DepartmentWiseFunnel';
import ConversionTracking from '../pages/Funnel/Components/ConversionTracking';
import StalledOpportunities from '../pages/Funnel/Components/StalledOpportunities';





import BusinessOutcomes from '../pages/Outcomes/BusinessOutcomes';
import LeadsGenerated from '../pages/Outcomes/Components/LeadsGenerated';
import ProposalsCreated from '../pages/Outcomes/Components/ProposalsCreated';
import PipelineValue from '../pages/Outcomes/Components/PipelineValue';
import ConfirmedBusiness from '../pages/Outcomes/Components/ConfirmedBusiness';
import CostperLead from '../pages/Outcomes/Components/CostperLead';
import ProductivityScore from '../pages/Outcomes/Components/ProductivityScore';





// import Reports from '../pages/Reports/Reports';
// import AuditLogs from '../pages/Audit/AuditLogs';
>>>>>>> acb0ce5fde67d4993ba4d9be0e64b291d4054935

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
<<<<<<< HEAD
=======

    
>>>>>>> acb0ce5fde67d4993ba4d9be0e64b291d4054935
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

<<<<<<< HEAD
      {/* Expense Config */}
      <Route
=======
      {/* ========== EXPENSE CONFIGURATION (WITH DROPDOWN) ========== */}
      
      {/* <Route
>>>>>>> acb0ce5fde67d4993ba4d9be0e64b291d4054935
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
<<<<<<< HEAD

      {/* User Management */}
=======
       */}
      {/* ========== FUNNEL MANAGEMENT ========== */}
     
       <Route
        path="funnel-management"
        element={
          <Layout role="super_admin">
            <FunnelManagement/>
          </Layout>
        }
      />
      
      <Route
        path="funnel-management/stage-wise"
        element={
          <Layout role="super_admin">
            <StageWiseFunnel />
          </Layout>
        }
      />
      <Route
        path="funnel-management/Employee-wise"
        element={
          <Layout role="super_admin">
            <EmployeeWiseFunnel />
          </Layout>
        }
      />

       <Route
        path="funnel-management/Client-wise"
        element={
          <Layout role="super_admin">
            <ClientWiseFunnel />
          </Layout>
        }
      />

      <Route
        path="funnel-management/dept-wise"
        element={
          <Layout role="super_admin">
            <DepartmentWiseFunnel />
          </Layout>
        }
      />

      <Route
        path="funnel-management/conversion"
        element={
          <Layout role="super_admin">
            <ConversionTracking />
          </Layout>
        }
      />

      <Route
        path="funnel-management/stalled"
        element={
          <Layout role="super_admin">
            <StalledOpportunities />
          </Layout>
        }
      />





      {/* ========== USER MANAGEMENT ========== */}
>>>>>>> acb0ce5fde67d4993ba4d9be0e64b291d4054935
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
<<<<<<< HEAD
=======

     
>>>>>>> acb0ce5fde67d4993ba4d9be0e64b291d4054935
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
<<<<<<< HEAD
=======
      <Route
        path="Visit-Management/pending-follow-ups"
        element={
          <Layout role="super_admin">
            <PendingFollowUps />
          </Layout>
        }
      />
      <Route
        path="Visit-Management/expense-approvals"
        element={
          <Layout role="super_admin">
            <ExpenseApprovals />
          </Layout>
        }
      />

      {/* ========== BUSINESS OUTCOMES ========== */}
       <Route
        path="business-outcomes"
        element={
          <Layout role="super_admin">
            <BusinessOutcomes />
          </Layout>
        }
      />

       <Route
        path="business-outcomes/lead"
        element={
          <Layout role="super_admin">
            <LeadsGenerated/>
          </Layout>
        }
      />
      
      <Route
        path="business-outcomes/proposals"
        element={
          <Layout role="super_admin">
            <ProposalsCreated/>
          </Layout>
        }
      />
         
       <Route
        path="business-outcomes/pipeline"
        element={
          <Layout role="super_admin">
            <PipelineValue/>
          </Layout>
        }
      />
      <Route
        path="business-outcomes/confirmed"
        element={
          <Layout role="super_admin">
            <ConfirmedBusiness/>
          </Layout>
        }
      />
  
       <Route
        path="business-outcomes/cost-per-lead"
        element={
          <Layout role="super_admin">
            <CostperLead/>
          </Layout>
        }
      />
      <Route
        path="business-outcomes/productivity"
        element={
          <Layout role="super_admin">
            <ProductivityScore/>
          </Layout>
        }
      />




      {/* ========== REPORTS ========== */}
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
>>>>>>> acb0ce5fde67d4993ba4d9be0e64b291d4054935

      {/* Default Route */}
      <Route path="*" element={<Navigate to="/super-admin/dashboard" replace />} />
    </Routes>
  );
};

export default SuperAdminRoutes;