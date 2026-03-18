import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  role: 'super_admin' | 'admin' | 'manager' | 'employee' | 'management';
}

// ==================== SUPER ADMIN MENU ====================
const superAdminMenu = [
  // ========== DASHBOARD ==========
  { 
    icon: 'LayoutDashboard', 
    label: 'Main Dashboard', 
    href: '/super-admin/dashboard',
    active: true
  },

  // ========== MASTER MANAGEMENT (All 12 Masters from SRS) ==========
  {
    icon: 'Database',
    label: 'Master Management',
    href: '',
    children: [
      { icon: 'Building2', label: 'Company Master', href: '/super-admin/masters/companies' },
      { icon: 'Building', label: 'Organisation Master', href: '/super-admin/masters/organisations' },
      { icon: 'Layers', label: 'Department Master', href: '/super-admin/masters/departments' },
      { icon: 'Users2', label: 'Contact Person Master', href: '/super-admin/masters/contacts' },
      { icon: 'User', label: 'Employee Master', href: '/super-admin/masters/employees' },
      { icon: 'Badge', label: 'Designation Master', href: '/super-admin/masters/designations' },
      { icon: 'Tag', label: 'Visit Purpose Master', href: '/super-admin/masters/purposes' },
      { icon: 'GitMerge', label: 'Funnel Stage Master', href: '/super-admin/masters/funnel-stages' },
      { icon: 'Target', label: 'Outcome Type Master', href: '/super-admin/masters/outcomes' },
      { icon: 'DollarSign', label: 'Expense Rate Master', href: '/super-admin/masters/expense-rates' },
      { icon: 'MapPin', label: 'Location Master', href: '/super-admin/masters/locations' },
      { icon: 'Car', label: 'Vehicle Type Master', href: '/super-admin/masters/vehicles' }
    ]
  },

  // ========== USER MANAGEMENT ==========
  { 
    icon: 'Users', 
    label: 'User Management',
    href: '/super-admin/users',
    children: [
      { icon: 'UserPlus', label: 'All Users', href: '/super-admin/users/list' },
      { icon: 'Shield', label: 'Roles & Permissions', href: '/super-admin/users/roles' },
      { icon: 'UserCheck', label: 'Active Sessions', href: '/super-admin/users/sessions' },
      { icon: 'UserCog', label: 'Reporting Managers', href: '/super-admin/users/managers' }
    ]
  },

  // ========== EXPENSE RATE CONFIGURATION ==========
  {
    icon: 'Settings',
    label: 'Expense Configuration',
    href: '/super-admin/expense-config',
    children: [
      { icon: 'DollarSign', label: 'Rate Management', href: '/super-admin/expense-config/rates' },
      { icon: 'History', label: 'Rate Change History', href: '/super-admin/expense-config/history' },
      { icon: 'Car', label: 'Vehicle Types', href: '/super-admin/expense-config/vehicles' },
      { icon: 'Calendar', label: 'Effective Dates', href: '/super-admin/expense-config/effective-dates' }
    ]
  },

  // ========== VISIT MANAGEMENT ==========
  {
    icon: 'MapPin',
    label: 'Visit Management',
    href: '/super-admin/visits',
    children: [
      { icon: 'List', label: 'All Visits', href: '/super-admin/visits/all' },
      { icon: 'Calendar', label: 'Today\'s Visits', href: '/super-admin/visits/today' },
      { icon: 'CalendarRange', label: 'Monthly Visits', href: '/super-admin/visits/monthly' },
      { icon: 'Clock', label: 'Pending Follow-ups', href: '/super-admin/visits/followups' },
      { icon: 'CheckCircle', label: 'Expense Approvals', href: '/super-admin/visits/approvals' }
    ]
  },

  // ========== FUNNEL MANAGEMENT ==========
  {
    icon: 'BarChart4',
    label: 'Funnel Management',
    href: '/super-admin/funnel',
    children: [
      { icon: 'Activity', label: 'Stage-wise Funnel', href: '/super-admin/funnel/stage-wise' },
      { icon: 'Users', label: 'Employee-wise Funnel', href: '/super-admin/funnel/employee-wise' },
      { icon: 'Building2', label: 'Client-wise Funnel', href: '/super-admin/funnel/client-wise' },
      { icon: 'Layers', label: 'Department-wise Funnel', href: '/super-admin/funnel/dept-wise' },
      { icon: 'TrendingUp', label: 'Conversion Tracking', href: '/super-admin/funnel/conversion' },
      { icon: 'AlertCircle', label: 'Stalled Opportunities', href: '/super-admin/funnel/stalled' }
    ]
  },

  // ========== BUSINESS OUTCOME TRACKING ==========
  {
    icon: 'TrendingUp',
    label: 'Business Outcomes',
    href: '/super-admin/outcomes',
    children: [
      { icon: 'Zap', label: 'Leads Generated', href: '/super-admin/outcomes/leads' },
      { icon: 'FileText', label: 'Proposals Created', href: '/super-admin/outcomes/proposals' },
      { icon: 'CheckCircle', label: 'Orders Received', href: '/super-admin/outcomes/orders' },
      { icon: 'XCircle', label: 'Lost Deals', href: '/super-admin/outcomes/lost' },
      { icon: 'PieChart', label: 'Pipeline Value', href: '/super-admin/outcomes/pipeline' },
      { icon: 'Target', label: 'Confirmed Business', href: '/super-admin/outcomes/confirmed' },
      { icon: 'Calculator', label: 'Cost per Lead', href: '/super-admin/outcomes/cost-per-lead' },
      { icon: 'Award', label: 'Productivity Score', href: '/super-admin/outcomes/productivity' }
    ]
  },

  // ========== REPORTS (All 13 Reports from SRS) ==========
  {
    icon: 'BarChart3',
    label: 'Reports',
    href: '/super-admin/reports',
    children: [
      { icon: 'Calendar', label: 'Daily Visit Report', href: '/super-admin/reports/daily-visit' },
      { icon: 'CalendarRange', label: 'Date Range Visit', href: '/super-admin/reports/date-range' },
      { icon: 'Users', label: 'Employee Visit Summary', href: '/super-admin/reports/employee-summary' },
      { icon: 'Building2', label: 'Organisation Visit', href: '/super-admin/reports/organisation' },
      { icon: 'Layers', label: 'Department Visit', href: '/super-admin/reports/department' },
      { icon: 'DollarSign', label: 'Expense Report', href: '/super-admin/reports/expense' },
      { icon: 'Car', label: 'Vehicle-wise Expense', href: '/super-admin/reports/vehicle-expense' },
      { icon: 'GitMerge', label: 'Funnel Stage Report', href: '/super-admin/reports/funnel-stage' },
      { icon: 'Clock', label: 'Follow-up Pending', href: '/super-admin/reports/followup-pending' },
      { icon: 'Target', label: 'Business Outcome', href: '/super-admin/reports/business-outcome' },
      { icon: 'TrendingUp', label: 'Conversion Analysis', href: '/super-admin/reports/conversion' },
      { icon: 'Award', label: 'Monthly Productivity', href: '/super-admin/reports/productivity' },
      { icon: 'PieChart', label: 'Cost vs Revenue', href: '/super-admin/reports/cost-revenue' }
    ]
  },

  // ========== AUDIT LOGS ==========
  {
    icon: 'History',
    label: 'Audit Logs',
    href: '/super-admin/audit',
    children: [
      { icon: 'Edit', label: 'Visit Change History', href: '/super-admin/audit/visits' },
      { icon: 'DollarSign', label: 'Rate Change History', href: '/super-admin/audit/rates' },
      { icon: 'Users', label: 'User Activity Logs', href: '/super-admin/audit/users' },
      { icon: 'Database', label: 'Master Data Changes', href: '/super-admin/audit/masters' }
    ]
  }
];

// ==================== ADMIN MENU ====================
const adminMenu = [
  { 
    icon: 'LayoutDashboard', 
    label: 'Dashboard', 
    href: '/admin/dashboard',
    active: true 
  },

  // ========== MASTER MANAGEMENT (Limited) ==========
  {
    icon: 'Database',
    label: 'Master Data',
    href: '/admin/masters',
    children: [
      { icon: 'Building2', label: 'Companies', href: '/admin/masters/companies' },
      { icon: 'Building', label: 'Organisations', href: '/admin/masters/organisations' },
      { icon: 'Layers', label: 'Departments', href: '/admin/masters/departments' },
      { icon: 'Users2', label: 'Contact Persons', href: '/admin/masters/contacts' },
      { icon: 'User', label: 'Employees', href: '/admin/masters/employees' },
      { icon: 'MapPin', label: 'Locations', href: '/admin/masters/locations' },
      { icon: 'Tag', label: 'Visit Purposes', href: '/admin/masters/purposes' }
    ]
  },

  // ========== VISIT MANAGEMENT ==========
  {
    icon: 'MapPin',
    label: 'Visit Management',
    href: '/admin/visits',
    children: [
      { icon: 'PlusCircle', label: 'New Visit Entry', href: '/admin/visits/new' },
      { icon: 'List', label: 'All Visits', href: '/admin/visits/all' },
      { icon: 'Calendar', label: 'Today\'s Visits', href: '/admin/visits/today' },
      { icon: 'Edit', label: 'Visit Corrections', href: '/admin/visits/corrections' },
      { icon: 'Clock', label: 'Follow-ups', href: '/admin/visits/followups' }
    ]
  },

  // ========== EXPENSE APPROVALS ==========
  {
    icon: 'CheckCircle',
    label: 'Expense Approvals',
    href: '/admin/expenses',
    badge: '12',
    children: [
      { icon: 'Clock', label: 'Pending Approvals', href: '/admin/expenses/pending' },
      { icon: 'CheckCircle', label: 'Approved', href: '/admin/expenses/approved' },
      { icon: 'XCircle', label: 'Rejected', href: '/admin/expenses/rejected' },
      { icon: 'History', label: 'Approval History', href: '/admin/expenses/history' }
    ]
  },

  // ========== FUNNEL TRACKING ==========
  {
    icon: 'BarChart4',
    label: 'Funnel Tracking',
    href: '/admin/funnel',
    children: [
      { icon: 'Activity', label: 'Pipeline View', href: '/admin/funnel/pipeline' },
      { icon: 'Users', label: 'Employee-wise', href: '/admin/funnel/employee-wise' },
      { icon: 'Building2', label: 'Client-wise', href: '/admin/funnel/client-wise' },
      { icon: 'AlertCircle', label: 'Stalled Opportunities', href: '/admin/funnel/stalled' }
    ]
  },

  // ========== OUTCOME TRACKING ==========
  {
    icon: 'Target',
    label: 'Outcome Tracking',
    href: '/admin/outcomes',
    children: [
      { icon: 'Zap', label: 'Leads Generated', href: '/admin/outcomes/leads' },
      { icon: 'FileText', label: 'Proposals', href: '/admin/outcomes/proposals' },
      { icon: 'CheckCircle', label: 'Orders Won', href: '/admin/outcomes/won' },
      { icon: 'XCircle', label: 'Orders Lost', href: '/admin/outcomes/lost' },
      { icon: 'PieChart', label: 'Pipeline Value', href: '/admin/outcomes/pipeline' }
    ]
  },

  // ========== REPORTS ==========
  {
    icon: 'BarChart3',
    label: 'Reports',
    href: '/admin/reports',
    children: [
      { icon: 'Calendar', label: 'Daily Visit', href: '/admin/reports/daily' },
      { icon: 'Users', label: 'Employee Report', href: '/admin/reports/employee' },
      { icon: 'DollarSign', label: 'Expense Report', href: '/admin/reports/expense' },
      { icon: 'GitMerge', label: 'Funnel Report', href: '/admin/reports/funnel' },
      { icon: 'TrendingUp', label: 'Conversion Report', href: '/admin/reports/conversion' }
    ]
  }
];

// ==================== MANAGER MENU ====================
const managerMenu = [
  { 
    icon: 'LayoutDashboard', 
    label: 'Manager Dashboard', 
    href: '/manager/dashboard',
    active: true 
  },

  // ========== TEAM MANAGEMENT ==========
  { 
    icon: 'Users', 
    label: 'My Team',
    href: '/manager/team',
    children: [
      { icon: 'List', label: 'Team Members', href: '/manager/team/list' },
      { icon: 'BarChart3', label: 'Team Performance', href: '/manager/team/performance' },
      { icon: 'Calendar', label: 'Team Schedule', href: '/manager/team/schedule' },
      { icon: 'Target', label: 'Team Targets', href: '/manager/team/targets' }
    ]
  },

  // ========== TEAM VISITS ==========
  {
    icon: 'MapPin',
    label: 'Team Visits',
    href: '/manager/visits',
    badge: '8',
    children: [
      { icon: 'List', label: 'All Team Visits', href: '/manager/visits/all' },
      { icon: 'Calendar', label: 'Today\'s Visits', href: '/manager/visits/today' },
      { icon: 'Clock', label: 'Overdue Follow-ups', href: '/manager/visits/overdue' },
      { icon: 'AlertCircle', label: 'Stagnant Deals', href: '/manager/visits/stagnant' }
    ]
  },

  // ========== EXPENSE APPROVALS ==========
  {
    icon: 'DollarSign',
    label: 'Expense Approvals',
    href: '/manager/expenses',
    badge: '5',
    children: [
      { icon: 'Clock', label: 'Pending Approvals', href: '/manager/expenses/pending' },
      { icon: 'CheckCircle', label: 'Approved', href: '/manager/expenses/approved' },
      { icon: 'History', label: 'Approval History', href: '/manager/expenses/history' }
    ]
  },

  // ========== TEAM FUNNEL ==========
  {
    icon: 'BarChart4',
    label: 'Team Funnel',
    href: '/manager/funnel',
    children: [
      { icon: 'Activity', label: 'Team Pipeline', href: '/manager/funnel/pipeline' },
      { icon: 'TrendingUp', label: 'Conversion Performance', href: '/manager/funnel/conversion' },
      { icon: 'AlertCircle', label: 'Stalled Opportunities', href: '/manager/funnel/stalled' }
    ]
  },

  // ========== FOLLOW-UPS ==========
  {
    icon: 'Clock',
    label: 'Follow-ups',
    href: '/manager/followups',
    badge: '8',
    children: [
      { icon: 'AlertCircle', label: 'Overdue Follow-ups', href: '/manager/followups/overdue' },
      { icon: 'Clock', label: 'Pending Follow-ups', href: '/manager/followups/pending' },
      { icon: 'CheckCircle', label: 'Completed', href: '/manager/followups/completed' }
    ]
  },

  // ========== REPORTS ==========
  {
    icon: 'BarChart3',
    label: 'Reports',
    href: '/manager/reports',
    children: [
      { icon: 'Users', label: 'Team Performance', href: '/manager/reports/team-performance' },
      { icon: 'DollarSign', label: 'Expense Summary', href: '/manager/reports/expense' },
      { icon: 'GitMerge', label: 'Funnel Analysis', href: '/manager/reports/funnel' },
      { icon: 'TrendingUp', label: 'Conversion Report', href: '/manager/reports/conversion' },
      { icon: 'Download', label: 'Export', href: '/manager/reports/export' }
    ]
  }
];

// ==================== EMPLOYEE MENU ====================
const employeeMenu = [
  { 
    icon: 'LayoutDashboard', 
    label: 'My Dashboard', 
    href: '/employee/dashboard',
    active: true 
  },

  // ========== VISIT MANAGEMENT ==========
  {
    icon: 'MapPin',
    label: 'My Visits',
    href: '/employee/visits',
    children: [
      { icon: 'PlusCircle', label: 'New Visit Entry', href: '/employee/visits/new' },
      { icon: 'List', label: 'My Visit History', href: '/employee/visits/history' },
      { icon: 'Calendar', label: 'Today\'s Visits', href: '/employee/visits/today' }
    ]
  },

  // ========== FOLLOW-UP MANAGEMENT ==========
  {
    icon: 'Clock',
    label: 'My Follow-ups',
    href: '/employee/followups',
    badge: '3',
    children: [
      { icon: 'Clock', label: 'Pending Follow-ups', href: '/employee/followups/pending' },
      { icon: 'AlertCircle', label: 'Overdue', href: '/employee/followups/overdue' },
      { icon: 'CheckCircle', label: 'Completed', href: '/employee/followups/completed' }
    ]
  },

  // ========== EXPENSE TRACKING ==========
  {
    icon: 'DollarSign',
    label: 'My Expenses',
    href: '/employee/expenses',
    children: [
      { icon: 'Calculator', label: 'Expense Calculator', href: '/employee/expenses/calculator' },
      { icon: 'List', label: 'Expense History', href: '/employee/expenses/history' },
      { icon: 'Clock', label: 'Approval Status', href: '/employee/expenses/status' }
    ]
  },

  // ========== MY OPPORTUNITIES ==========
  {
    icon: 'Target',
    label: 'My Opportunities',
    href: '/employee/opportunities',
    children: [
      { icon: 'Activity', label: 'My Pipeline', href: '/employee/opportunities/pipeline' },
      { icon: 'CheckCircle', label: 'Won Deals', href: '/employee/opportunities/won' },
      { icon: 'XCircle', label: 'Lost Deals', href: '/employee/opportunities/lost' }
    ]
  },

  // ========== FUNNEL STAGE UPDATE ==========
  {
    icon: 'GitMerge',
    label: 'Funnel Update',
    href: '/employee/funnel',
    children: [
      { icon: 'TrendingUp', label: 'Update Stage', href: '/employee/funnel/update' },
      { icon: 'Activity', label: 'Stage History', href: '/employee/funnel/history' }
    ]
  },

  // ========== MY REPORTS ==========
  {
    icon: 'BarChart3',
    label: 'My Reports',
    href: '/employee/reports',
    children: [
      { icon: 'Calendar', label: 'Monthly Summary', href: '/employee/reports/monthly' },
      { icon: 'DollarSign', label: 'Expense Report', href: '/employee/reports/expense' },
      { icon: 'Target', label: 'Performance', href: '/employee/reports/performance' }
    ]
  }
];

// ==================== MANAGEMENT MENU ====================
const managementMenu = [
  { 
    icon: 'LayoutDashboard', 
    label: 'Executive Dashboard', 
    href: '/management/dashboard',
    active: true 
  },

  // ========== BUSINESS OVERVIEW ==========
  {
    icon: 'BarChart3',
    label: 'Business Overview',
    href: '/management/overview',
    children: [
      { icon: 'TrendingUp', label: 'Total Visits', href: '/management/overview/visits' },
      { icon: 'DollarSign', label: 'Total Expenses', href: '/management/overview/expenses' },
      { icon: 'Target', label: 'Pipeline Value', href: '/management/overview/pipeline' },
      { icon: 'CheckCircle', label: 'Won Value', href: '/management/overview/won' },
      { icon: 'XCircle', label: 'Lost Value', href: '/management/overview/lost' }
    ]
  },

  // ========== TEAM PRODUCTIVITY ==========
  {
    icon: 'Users',
    label: 'Team Productivity',
    href: '/management/productivity',
    children: [
      { icon: 'Award', label: 'Top Employees', href: '/management/productivity/top' },
      { icon: 'BarChart3', label: 'Performance Metrics', href: '/management/productivity/metrics' },
      { icon: 'Target', label: 'Target vs Actual', href: '/management/productivity/targets' }
    ]
  },

  // ========== FUNNEL ANALYSIS ==========
  {
    icon: 'GitMerge',
    label: 'Funnel Analysis',
    href: '/management/funnel',
    children: [
      { icon: 'Activity', label: 'Stage-wise Funnel', href: '/management/funnel/stage-wise' },
      { icon: 'TrendingUp', label: 'Business Conversion', href: '/management/funnel/conversion' },
      { icon: 'PieChart', label: 'Win/Loss Analysis', href: '/management/funnel/win-loss' }
    ]
  },

  // ========== FINANCIAL METRICS ==========
  {
    icon: 'DollarSign',
    label: 'Financial Metrics',
    href: '/management/financials',
    children: [
      { icon: 'TrendingUp', label: 'Cost vs Revenue', href: '/management/financials/cost-revenue' },
      { icon: 'Calculator', label: 'Cost per Lead', href: '/management/financials/cost-per-lead' },
      { icon: 'Target', label: 'Cost per Order', href: '/management/financials/cost-per-order' },
      { icon: 'PieChart', label: 'Revenue per Employee', href: '/management/financials/revenue-per-employee' }
    ]
  },

  // ========== CLIENT COVERAGE ==========
  {
    icon: 'Building2',
    label: 'Client Coverage',
    href: '/management/clients',
    children: [
      { icon: 'Map', label: 'Coverage Analysis', href: '/management/clients/coverage' },
      { icon: 'Users', label: 'Visit Frequency', href: '/management/clients/frequency' }
    ]
  },

  // ========== REPORTS ==========
  {
    icon: 'FileText',
    label: 'Reports',
    href: '/management/reports',
    children: [
      { icon: 'Calendar', label: 'Monthly Report', href: '/management/reports/monthly' },
      { icon: 'TrendingUp', label: 'Quarterly Analysis', href: '/management/reports/quarterly' },
      { icon: 'BarChart3', label: 'Business Summary', href: '/management/reports/summary' },
      { icon: 'Download', label: 'Export', href: '/management/reports/export' }
    ]
  }
];

// Get navigation items based on role
const getNavItems = (role: string) => {
  switch(role) {
    case 'super_admin': return superAdminMenu;
    case 'admin': return adminMenu;
    case 'manager': return managerMenu;
    case 'employee': return employeeMenu;
    case 'management': return managementMenu;
    default: return [];
  }
};

// Role-based theme
const getTheme = (role: string) => {
  switch(role) {
    case 'super_admin': return 'purple';
    case 'admin': return 'blue';
    case 'manager': return 'orange';
    case 'employee': return 'green';
    case 'management': return 'purple';
    default: return 'purple';
  }
};

// Role-based user info
const getUserInfo = (role: string) => {
  switch(role) {
    case 'super_admin':
      return { name: 'Super Admin', email: 'superadmin@company.com', avatar: 'SA' };
    case 'admin':
      return { name: 'Admin User', email: 'admin@company.com', avatar: 'AD' };
    case 'manager':
      return { name: 'Rajesh Kumar', email: 'rajesh@company.com', avatar: 'RK' };
    case 'employee':
      return { name: 'Amit Sharma', email: 'amit@company.com', avatar: 'AS' };
    case 'management':
      return { name: 'Director', email: 'director@company.com', avatar: 'DR' };
    default:
      return { name: 'User', email: 'user@company.com', avatar: 'US' };
  }
};

const Layout: React.FC<LayoutProps> = ({ children, role }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Get role-based data
  const navItems = getNavItems(role);
  const theme = getTheme(role);
  const userInfo = getUserInfo(role);

  // Check screen size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
        setMobileMenuOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileMenuOpen}
        setCollapsed={setSidebarCollapsed}
        closeMobileMenu={closeMobileMenu}
        isMobile={isMobile}
        navItems={navItems}
        userInfo={userInfo}
        theme={theme}
        role={role}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          toggleMobileMenu={toggleMobileMenu}
          sidebarCollapsed={sidebarCollapsed}
          isMobile={isMobile}
          userInfo={userInfo}
          theme={theme}
          role={role}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;