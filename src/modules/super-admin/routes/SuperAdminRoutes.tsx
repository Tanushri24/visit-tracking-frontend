// src/modules/super-admin/routes/SuperAdminRoutes.tsx

import React from 'react';
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
import VisitPurposeMaster from  '../pages/Master/Components/VisitPurposeMaster';
import VehicleTypesMater from '../pages/Master/Components/VehicleTypeMaster';
import ExpenseRateMaster from '../pages/Master/Components/ExpenseRateMaster';
import FunnelStageMaster from '../pages/Master/Components/FunnelStageMaster';
import OutcomeMaster from '../pages/Master/Components/OutcomeMaster';

// Expense Configuration Pages
import ExpenseConfig from '../pages/expense-configrution/ExpenseConfig';
import RateManagement from '../pages/expense-configrution/RateManagement';
import RateChangeHistory from '../pages/expense-configrution/RateChangeHistory';
import VehicleTypes from '../pages/expense-configrution/VehicleTypes';
import EffectiveDates from '../pages/expense-configrution/EffectiveDates';

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

    
      <Route
        path="master-management/Visit-Purpose"
        element={
          <Layout role="super_admin">
            <VisitPurposeMaster />
          </Layout>
        }
      />

      <Route
        path="master-management/Vehicle-Type"
        element={
          <Layout role="super_admin">
            <VehicleTypesMater />
          </Layout>
        }
      />
      <Route
        path="master-management/Expense-Rate"
        element={
          <Layout role="super_admin">
            <ExpenseRateMaster />
          </Layout>
        }
      />

      <Route
        path="master-management/Funnel-Stage"
        element={
          <Layout role="super_admin">
            <FunnelStageMaster />
          </Layout>
        }
      />

      <Route
        path="master-management/Outcome-Master"
        element={
          <Layout role="super_admin">
            <OutcomeMaster />
          </Layout>
        }
      />

      {/* ========== EXPENSE CONFIGURATION (WITH DROPDOWN) ========== */}
      
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
        path="Visit-Management"
        element={
          <Layout role="super_admin">
            <VisitManagement />
          </Layout>
        }
      />

     
      <Route
        path="Visit-Management/all-visits"
        element={
          <Layout role="super_admin">
            <AllVisits />
          </Layout>
        }
      />


      <Route
        path="Visit-Management/todays-visits"
        element={
          <Layout role="super_admin">
            <TodaysVisits />
          </Layout>
        }
      />
      <Route
        path="Visit-Management/todays-visits"
        element={
          <Layout role="super_admin">
            <TodaysVisits />
          </Layout>
        }
      />
      <Route
        path="Visit-Management/monthly-visits"
        element={
          <Layout role="super_admin">
            <MonthlyVisits />
          </Layout>
        }
      />
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