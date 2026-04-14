import { Route, Routes } from 'react-router-dom';
import Layout from '../../../Layouts/Layout';
import EmployeeDashboard from '../pages/EmployeeDashboard';
import VisitEntryForm from '../pages/components/VisitsEntryForm';
import MyVisit from '../pages/components/MyVisit';
import VisitFollowUps from '../pages/components/VisitFollowUps';
import VisitAttachments from '../pages/components/VisitAttachments';

// Import other pages when ready
// import MyVisits from '../pages/MyVisits';
// import MySchedule from '../pages/MySchedule';
// import TimeTracking from '../pages/TimeTracking';
// import Expenses from '../pages/Expenses';
// import VisitDetails from '../pages/VisitDetails';

// Wrapper component
const EmployeeLayout = ({ children }: { children: React.ReactNode }) => (
  <Layout role="employee">
    {children}
  </Layout>
);

const EmployeeRoutes = () => {
  return (
    <Routes>
      {/* Dashboard */}
      <Route 
        path="dashboard" 
        element={<EmployeeLayout><EmployeeDashboard /></EmployeeLayout>} 
      />
      


      {/* Visits Entry Form */}
        <Route 
         path="visit-entry" 
        element={<EmployeeLayout><VisitEntryForm /></EmployeeLayout>} 
      />
      
       {/* My Visits */}
       <Route
        path="my-visits"
        element={<EmployeeLayout><MyVisit /></EmployeeLayout>}
      />

      {/* Visit Follow-Ups */}
      <Route
      path="visit-followups"
      element={<EmployeeLayout><VisitFollowUps /></EmployeeLayout>}
      />

        
      <Route 
         path="visit-attachments" 
        element={<EmployeeLayout><VisitAttachments /></EmployeeLayout>} 
      />


      {/* <Route 
        path="visits/:id" 
        element={<EmployeeLayout><VisitDetails /></EmployeeLayout>} 
      /> */} 
      
      {/* My Schedule */}
      {/* <Route 
        path="schedule" 
        element={<EmployeeLayout><MySchedule /></EmployeeLayout>} 
      /> */}
      
      {/* Time Tracking */}
      {/* <Route 
        path="time" 
        element={<EmployeeLayout><TimeTracking /></EmployeeLayout>} 
      /> */}
      
      {/* Expenses */}
      {/* <Route 
        path="expenses" 
        element={<EmployeeLayout><Expenses /></EmployeeLayout>} 
      /> */}
      
      {/* Settings */}
      {/* <Route 
        path="settings" 
        element={<EmployeeLayout><div>Employee Settings</div></EmployeeLayout>} 
      /> */}
      
      {/* Default route - Dashboard */}
      <Route 
        path="*" 
        element={<EmployeeLayout><EmployeeDashboard /></EmployeeLayout>} 
      />
    </Routes>
  );
};

export default EmployeeRoutes;