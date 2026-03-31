// src/modules/management/routes/ManagementRoutes.tsx

import { Route, Routes } from 'react-router-dom';
import Layout from '../../../Layouts/Layout';
import ManagementDashboard from '../pages/ManagementDashboard';

// Wrapper component to avoid repeating Layout
const ManagementLayout = ({ children }: { children: React.ReactNode }) => (
  <Layout role="management">
    {children}
  </Layout>
);

const ManagementRoutes = () => {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="dashboard" element={<ManagementLayout><ManagementDashboard /></ManagementLayout>} />
      
      {/* Business Overview */}
      {/* <Route path="overview" element={<ManagementLayout><div>Business Overview</div></ManagementLayout>} />
      <Route path="overview/visits" element={<ManagementLayout><div>Total Visits</div></ManagementLayout>} />
      <Route path="overview/expenses" element={<ManagementLayout><div>Total Expenses</div></ManagementLayout>} />
      <Route path="overview/pipeline" element={<ManagementLayout><div>Pipeline Value</div></ManagementLayout>} /> */}
      
      {/* Team Productivity */}
      {/* <Route path="productivity" element={<ManagementLayout><div>Team Productivity</div></ManagementLayout>} />
      <Route path="productivity/top" element={<ManagementLayout><div>Top Employees</div></ManagementLayout>} />
      <Route path="productivity/metrics" element={<ManagementLayout><div>Performance Metrics</div></ManagementLayout>} />
      <Route path="productivity/targets" element={<ManagementLayout><div>Target vs Actual</div></ManagementLayout>} /> */}
      
      {/* Funnel Analysis */}
      {/* <Route path="funnel" element={<ManagementLayout><div>Funnel Analysis</div></ManagementLayout>} />
      <Route path="funnel/stage-wise" element={<ManagementLayout><div>Stage-wise Funnel</div></ManagementLayout>} />
      <Route path="funnel/conversion" element={<ManagementLayout><div>Conversion</div></ManagementLayout>} />
      <Route path="funnel/win-loss" element={<ManagementLayout><div>Win/Loss</div></ManagementLayout>} /> */}
      
      {/* Financial Metrics */}
      {/* <Route path="financials" element={<ManagementLayout><div>Financial Metrics</div></ManagementLayout>} />
      <Route path="financials/cost-revenue" element={<ManagementLayout><div>Cost vs Revenue</div></ManagementLayout>} />
      <Route path="financials/cost-per-lead" element={<ManagementLayout><div>Cost per Lead</div></ManagementLayout>} />
      <Route path="financials/cost-per-order" element={<ManagementLayout><div>Cost per Order</div></ManagementLayout>} />
      <Route path="financials/revenue-per-employee" element={<ManagementLayout><div>Revenue per Employee</div></ManagementLayout>} /> */}
      
      {/* Client Coverage */}
      {/* <Route path="clients" element={<ManagementLayout><div>Client Coverage</div></ManagementLayout>} />
      <Route path="clients/coverage" element={<ManagementLayout><div>Coverage Analysis</div></ManagementLayout>} />
      <Route path="clients/frequency" element={<ManagementLayout><div>Visit Frequency</div></ManagementLayout>} /> */}
      
      {/* Reports */}
      {/* <Route path="reports" element={<ManagementLayout><div>Reports</div></ManagementLayout>} />
      <Route path="reports/monthly" element={<ManagementLayout><div>Monthly Report</div></ManagementLayout>} />
      <Route path="reports/quarterly" element={<ManagementLayout><div>Quarterly Analysis</div></ManagementLayout>} />
      <Route path="reports/summary" element={<ManagementLayout><div>Business Summary</div></ManagementLayout>} />
      <Route path="reports/export" element={<ManagementLayout><div>Export</div></ManagementLayout>} /> */}
      
      {/* Default route - dashboard */}
      <Route path="*" element={<ManagementLayout><ManagementDashboard /></ManagementLayout>} />
    </Routes>
  );
};

export default ManagementRoutes;