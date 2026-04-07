// src/modules/admin/routes/AdminRoutes.tsx

import { Route, Routes } from 'react-router-dom';
import Layout from '../../../Layouts/Layout';
import AdminDashboard from '../pages/AdminDashboard';
import EmployeeRegistration from '../../super-admin/pages/employee-registration/EmployeeRegistration';

// Master Management Pages
import CompanyMaster from '../../super-admin/pages/Master/Components/CompanyMaster';
import OrganizationMaster from '../../super-admin/pages/Master/Components/OrganizationMaster';
import DepartmentMaster from '../../super-admin/pages/Master/Components/DepartmentMaster';
import ContactPersonMaster from '../../super-admin/pages/Master/Components/ContactPersonMaster';
import VisitPurposeMaster from '../../super-admin/pages/Master/Components/VisitPurposeMaster';
import VehicleTypeMaster from '../../super-admin/pages/Master/Components/VehicleTypeMaster';
import ExpenseRateMaster from '../../super-admin/pages/Master/Components/ExpenseRateMaster';
import FunnelStageMaster from '../../super-admin/pages/Master/Components/FunnelStageMaster';
import OutcomeMaster from '../../super-admin/pages/Master/Components/OutcomeMaster';

// Expense Configuration Pages
// import RateManagement from '../pages/Expense/RateManagement';
// import RateChangeHistory from '../pages/Expense/RateChangeHistory';
// import VehicleTypes from '../pages/Expense/VehicleTypes';
// import EffectiveDates from '../pages/Expense/EffectiveDates';

// // Visit Management Pages
// import AllVisits from '../pages/VisitManagement/AllVisits';
// import TodaysVisits from '../pages/VisitManagement/TodaysVisits';
// import MonthlyVisits from '../pages/VisitManagement/MonthlyVisits';
// import PendingFollowups from '../pages/VisitManagement/PendingFollowups';
// import ExpenseApprovals from '../pages/VisitManagement/ExpenseApprovals';

// // Funnel Management Pages
// import StageWiseFunnel from '../pages/FunnelManagement/StageWiseFunnel';
// import EmployeeWiseFunnel from '../pages/FunnelManagement/EmployeeWiseFunnel';
// import ClientWiseFunnel from '../pages/FunnelManagement/ClientWiseFunnel';
// import DeptWiseFunnel from '../pages/FunnelManagement/DeptWiseFunnel';
// import ConversionTracking from '../pages/FunnelManagement/ConversionTracking';
// import StalledOpportunities from '../pages/FunnelManagement/StalledOpportunities';

// // Business Outcomes Pages
// import LeadsGenerated from '../pages/BusinessOutcomes/LeadsGenerated';
// import ProposalsCreated from '../pages/BusinessOutcomes/ProposalsCreated';
// import PipelineValue from '../pages/BusinessOutcomes/PipelineValue';
// import ConfirmedBusiness from '../pages/BusinessOutcomes/ConfirmedBusiness';
// import CostPerLead from '../pages/BusinessOutcomes/CostPerLead';
// import ProductivityScore from '../pages/BusinessOutcomes/ProductivityScore';

// // Reports Pages
// import EmployeeVisitReport from '../pages/Reports/EmployeeVisitReport';
// import ExpenseReport from '../pages/Reports/ExpenseReport';
// import FunnelStageReport from '../pages/Reports/FunnelStageReport';

// User Management
import UserManagement from '../../super-admin/pages/User/UserManagement';

// Wrapper component to avoid repeating Layout
const AdminLayout = ({ children }: { children: React.ReactNode }) => (
  <Layout role="admin">
    {children}
  </Layout>
);

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
      
      {/* Employee Registration */}
      <Route 
        path="employee-registration"
        element={
          <AdminLayout>
            <EmployeeRegistration/>
          </AdminLayout>
        } 
      />
      
      {/* ========== MASTER MANAGEMENT ========== */}
      <Route 
        path="master-management/company" 
        element={<AdminLayout><CompanyMaster /></AdminLayout>} 
      />
      <Route 
        path="master-management/organization" 
        element={<AdminLayout><OrganizationMaster /></AdminLayout>} 
      />
      <Route 
        path="master-management/department" 
        element={<AdminLayout><DepartmentMaster /></AdminLayout>} 
      />
      <Route 
        path="master-management/contact-person" 
        element={<AdminLayout><ContactPersonMaster /></AdminLayout>} 
      />
      <Route 
        path="master-management/visit-purpose" 
        element={<AdminLayout><VisitPurposeMaster /></AdminLayout>} 
      />
      <Route 
        path="master-management/vehicle-type" 
        element={<AdminLayout><VehicleTypeMaster /></AdminLayout>} 
      />
      <Route 
        path="master-management/expense-rate" 
        element={<AdminLayout><ExpenseRateMaster /></AdminLayout>} 
      />
      <Route 
        path="master-management/funnel-stage" 
        element={<AdminLayout><FunnelStageMaster /></AdminLayout>} 
      />
      <Route 
        path="master-management/outcome-master" 
        element={<AdminLayout><OutcomeMaster /></AdminLayout>} 
      />

      {/* ========== EXPENSE CONFIGURATION ========== */}
    
      {/* ========== USER MANAGEMENT ========== */}
      <Route 
        path="users" 
        element={<AdminLayout><UserManagement /></AdminLayout>} 
      />
      
      {/* Default route - dashboard */}
      <Route path="*" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
    </Routes>
  );
};

export default AdminRoutes;