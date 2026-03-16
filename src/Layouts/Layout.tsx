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
    active: true,
    description: 'Executive overview & KPIs'
  },

  // ========== MASTER DATA MANAGEMENT ==========
  {
    icon: 'Database',
    label: 'Master Data',
    href: '/super-admin/masters',
    children: [
      // Client Hierarchy
      { icon: 'Building2', label: 'Companies', href: '/super-admin/masters/companies' },
      { icon: 'Building', label: 'Organisations', href: '/super-admin/masters/organisations' },
      { icon: 'Layers', label: 'Departments', href: '/super-admin/masters/departments' },
      { icon: 'Users2', label: 'Contact Persons', href: '/super-admin/masters/contacts' },
      
      // Employee Setup
      { icon: 'User', label: 'Employees', href: '/super-admin/masters/employees' },
      { icon: 'Badge', label: 'Designations', href: '/super-admin/masters/designations' },
      { icon: 'GitBranch', label: 'Reporting Hierarchy', href: '/super-admin/masters/hierarchy' },
      
      // Configuration Masters
      { icon: 'Tag', label: 'Visit Purposes', href: '/super-admin/masters/purposes' },
      { icon: 'GitMerge', label: 'Funnel Stages', href: '/super-admin/masters/stages' },
      { icon: 'Target', label: 'Outcome Types', href: '/super-admin/masters/outcomes' },
      { icon: 'MapPin', label: 'Locations', href: '/super-admin/masters/locations' }
    ]
  },

  // ========== EXPENSE CONFIGURATION ==========
  {
    icon: 'DollarSign',
    label: 'Expense Setup',
    href: '/super-admin/expense-setup',
    children: [
      { icon: 'Settings', label: 'Expense Rates', href: '/super-admin/expense-setup/rates' },
      { icon: 'Car', label: 'Vehicle Types', href: '/super-admin/expense-setup/vehicles' },
      { icon: 'History', label: 'Rate Change History', href: '/super-admin/expense-setup/history' }
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
      { icon: 'UserCheck', label: 'Active Sessions', href: '/super-admin/users/sessions' }
    ]
  },

  // ========== VISIT TRACKING ==========
  {
    icon: 'MapPin',
    label: 'Visit Management',
    href: '/super-admin/visits',
    badge: '156',
    children: [
      { icon: 'PlusCircle', label: 'New Visit Entry', href: '/super-admin/visits/new' },
      { icon: 'List', label: 'All Visits', href: '/super-admin/visits/all' },
      { icon: 'Calendar', label: 'Today\'s Visits', href: '/super-admin/visits/today' },
      { icon: 'Clock', label: 'Pending Follow-ups', href: '/super-admin/visits/followups' },
      { icon: 'CheckCircle', label: 'Approvals Pending', href: '/super-admin/visits/approvals' }
    ]
  },

  // ========== FUNNEL MANAGEMENT ==========
  {
    icon: 'BarChart4',
    label: 'Funnel Management',
    href: '/super-admin/funnel',
    children: [
      { icon: 'Activity', label: 'Pipeline View', href: '/super-admin/funnel/pipeline' },
      { icon: 'GitMerge', label: 'Stage-wise Analysis', href: '/super-admin/funnel/stages' },
      { icon: 'Target', label: 'Conversion Tracking', href: '/super-admin/funnel/conversion' },
      { icon: 'AlertCircle', label: 'Stalled Opportunities', href: '/super-admin/funnel/stalled' },
      { icon: 'CheckSquare', label: 'Won/Lost Analysis', href: '/super-admin/funnel/won-lost' }
    ]
  },

  // ========== BUSINESS OUTCOMES ==========
  {
    icon: 'TrendingUp',
    label: 'Business Outcomes',
    href: '/super-admin/outcomes',
    children: [
      { icon: 'Zap', label: 'Leads Generated', href: '/super-admin/outcomes/leads' },
      { icon: 'FileText', label: 'Proposals', href: '/super-admin/outcomes/proposals' },
      { icon: 'CheckCircle', label: 'Orders Won', href: '/super-admin/outcomes/orders' },
      { icon: 'XCircle', label: 'Orders Lost', href: '/super-admin/outcomes/lost' },
      { icon: 'PieChart', label: 'Visit-to-Order Ratio', href: '/super-admin/outcomes/conversion' }
    ]
  },

  // ========== EXPENSE REPORTS ==========
  {
    icon: 'Receipt',
    label: 'Expense Analysis',
    href: '/super-admin/expenses',
    children: [
      { icon: 'Calculator', label: 'Expense Summary', href: '/super-admin/expenses/summary' },
      { icon: 'Car', label: 'Vehicle-wise Expense', href: '/super-admin/expenses/vehicle-wise' },
      { icon: 'Users', label: 'Employee-wise Expense', href: '/super-admin/expenses/employee-wise' },
      { icon: 'TrendingUp', label: 'Cost per Visit', href: '/super-admin/expenses/cost-per-visit' }
    ]
  },

  // ========== REPORTS ==========
  {
    icon: 'BarChart3',
    label: 'Reports',
    href: '/super-admin/reports',
    children: [
      // Activity Reports
      { icon: 'Calendar', label: 'Daily Visit Report', href: '/super-admin/reports/daily' },
      { icon: 'Users', label: 'Employee Performance', href: '/super-admin/reports/employee' },
      { icon: 'Building2', label: 'Client Coverage', href: '/super-admin/reports/client' },
      
      // Business Reports
      { icon: 'TrendingUp', label: 'Conversion Report', href: '/super-admin/reports/conversion' },
      { icon: 'DollarSign', label: 'ROI Analysis', href: '/super-admin/reports/roi' },
      { icon: 'Target', label: 'Pipeline Value', href: '/super-admin/reports/pipeline' },
      
      // Productivity Reports
      { icon: 'Award', label: 'Top Performers', href: '/super-admin/reports/top-performers' },
      { icon: 'Clock', label: 'Overdue Follow-ups', href: '/super-admin/reports/overdue' },
      { icon: 'Download', label: 'Export Data', href: '/super-admin/reports/export' }
    ]
  },

  // ========== AUDIT & SECURITY ==========
  {
    icon: 'Shield',
    label: 'Audit & Security',
    href: '/super-admin/audit',
    children: [
      { icon: 'History', label: 'Activity Logs', href: '/super-admin/audit/activities' },
      { icon: 'Edit', label: 'Visit Change History', href: '/super-admin/audit/visits' },
      { icon: 'DollarSign', label: 'Rate Change History', href: '/super-admin/audit/rates' },
      { icon: 'Users', label: 'User Login History', href: '/super-admin/audit/logins' }
    ]
  },

  // ========== SYSTEM SETTINGS ==========
  {
    icon: 'Settings',
    label: 'System Settings',
    href: '/super-admin/settings',
    children: [
      { icon: 'Globe', label: 'General Settings', href: '/super-admin/settings/general' },
      { icon: 'Bell', label: 'Notifications', href: '/super-admin/settings/notifications' },
      { icon: 'Mail', label: 'Email Templates', href: '/super-admin/settings/email' },
      { icon: 'Database', label: 'Backup & Restore', href: '/super-admin/settings/backup' }
    ]
  }
];

// ==================== ADMIN MENU ====================
const adminMenu = [
  // ========== DASHBOARD ==========
  { 
    icon: 'LayoutDashboard', 
    label: 'Dashboard', 
    href: '/admin/dashboard',
    active: true 
  },

  // ========== MASTER DATA (Limited) ==========
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
    badge: '89',
    children: [
      { icon: 'PlusCircle', label: 'New Visit', href: '/admin/visits/new' },
      { icon: 'List', label: 'All Visits', href: '/admin/visits/all' },
      { icon: 'Calendar', label: 'Today\'s Visits', href: '/admin/visits/today' },
      { icon: 'Clock', label: 'Follow-ups', href: '/admin/visits/followups' },
      { icon: 'CheckCircle', label: 'Expense Approvals', href: '/admin/visits/approvals' }
    ]
  },

  // ========== FUNNEL MANAGEMENT ==========
  {
    icon: 'BarChart4',
    label: 'Funnel',
    href: '/admin/funnel',
    children: [
      { icon: 'Activity', label: 'Pipeline View', href: '/admin/funnel/pipeline' },
      { icon: 'GitMerge', label: 'Stage-wise', href: '/admin/funnel/stages' },
      { icon: 'Target', label: 'Conversion', href: '/admin/funnel/conversion' },
      { icon: 'AlertCircle', label: 'Stalled', href: '/admin/funnel/stalled' }
    ]
  },

  // ========== TEAM MANAGEMENT ==========
  { 
    icon: 'Users', 
    label: 'Team',
    href: '/admin/team',
    badge: '12',
    children: [
      { icon: 'List', label: 'Team Members', href: '/admin/team/list' },
      { icon: 'BarChart3', label: 'Team Performance', href: '/admin/team/performance' },
      { icon: 'Calendar', label: 'Team Schedule', href: '/admin/team/schedule' },
      { icon: 'Target', label: 'Team Targets', href: '/admin/team/targets' }
    ]
  },

  // ========== EXPENSES ==========
  {
    icon: 'DollarSign',
    label: 'Expenses',
    href: '/admin/expenses',
    children: [
      { icon: 'Calculator', label: 'Expense Summary', href: '/admin/expenses/summary' },
      { icon: 'Receipt', label: 'Pending Approvals', href: '/admin/expenses/approvals' },
      { icon: 'History', label: 'Approval History', href: '/admin/expenses/history' },
      { icon: 'Car', label: 'Vehicle-wise', href: '/admin/expenses/vehicle-wise' }
    ]
  },

  // ========== BUSINESS OUTCOMES ==========
  {
    icon: 'TrendingUp',
    label: 'Outcomes',
    href: '/admin/outcomes',
    children: [
      { icon: 'Zap', label: 'Leads', href: '/admin/outcomes/leads' },
      { icon: 'FileText', label: 'Proposals', href: '/admin/outcomes/proposals' },
      { icon: 'CheckCircle', label: 'Orders Won', href: '/admin/outcomes/orders' },
      { icon: 'XCircle', label: 'Orders Lost', href: '/admin/outcomes/lost' }
    ]
  },

  // ========== REPORTS ==========
  {
    icon: 'BarChart3',
    label: 'Reports',
    href: '/admin/reports',
    children: [
      { icon: 'Calendar', label: 'Daily Report', href: '/admin/reports/daily' },
      { icon: 'Users', label: 'Employee Report', href: '/admin/reports/employee' },
      { icon: 'Building2', label: 'Client Report', href: '/admin/reports/client' },
      { icon: 'DollarSign', label: 'Expense Report', href: '/admin/reports/expense' },
      { icon: 'TrendingUp', label: 'Conversion Report', href: '/admin/reports/conversion' },
      { icon: 'Download', label: 'Export', href: '/admin/reports/export' }
    ]
  },

  // ========== SETTINGS ==========
  {
    icon: 'Settings',
    label: 'Settings',
    href: '/admin/settings',
    children: [
      { icon: 'User', label: 'My Profile', href: '/admin/settings/profile' },
      { icon: 'Bell', label: 'Notifications', href: '/admin/settings/notifications' }
    ]
  }
];

// ==================== MANAGER MENU ====================
const managerMenu = [
  { 
    icon: 'LayoutDashboard', 
    label: 'Dashboard', 
    href: '/manager/dashboard',
    active: true 
  },
  { 
    icon: 'Users', 
    label: 'My Team', 
    href: '/manager/team',
    badge: '8',
    children: [
      { icon: 'List', label: 'Team Members', href: '/manager/team/list' },
      { icon: 'BarChart3', label: 'Team Performance', href: '/manager/team/performance' },
      { icon: 'Calendar', label: 'Team Schedule', href: '/manager/team/schedule' }
    ]
  },
  {
    icon: 'MapPin',
    label: 'Team Visits',
    href: '/manager/visits',
    children: [
      { icon: 'List', label: 'All Team Visits', href: '/manager/visits/all' },
      { icon: 'Calendar', label: 'Today\'s Visits', href: '/manager/visits/today' },
      { icon: 'Clock', label: 'Team Follow-ups', href: '/manager/visits/followups' },
      { icon: 'CheckCircle', label: 'Pending Approvals', href: '/manager/visits/approvals' }
    ]
  },
  {
    icon: 'BarChart4',
    label: 'Team Funnel',
    href: '/manager/funnel',
    children: [
      { icon: 'Activity', label: 'Team Pipeline', href: '/manager/funnel/pipeline' },
      { icon: 'Target', label: 'Team Targets', href: '/manager/funnel/targets' },
      { icon: 'GitMerge', label: 'Stage Analysis', href: '/manager/funnel/analysis' }
    ]
  },
  {
    icon: 'DollarSign',
    label: 'Team Expenses',
    href: '/manager/expenses',
    children: [
      { icon: 'Calculator', label: 'Expense Summary', href: '/manager/expenses/summary' },
      { icon: 'Receipt', label: 'Approve Expenses', href: '/manager/expenses/approve' }
    ]
  },
  {
    icon: 'TrendingUp',
    label: 'Performance',
    href: '/manager/performance',
    children: [
      { icon: 'BarChart3', label: 'Conversion Rate', href: '/manager/performance/conversion' },
      { icon: 'Target', label: 'Target vs Achievement', href: '/manager/performance/targets' },
      { icon: 'Award', label: 'Top Performers', href: '/manager/performance/top' }
    ]
  },
  {
    icon: 'FileText',
    label: 'Reports',
    href: '/manager/reports',
    children: [
      { icon: 'Users', label: 'Team Report', href: '/manager/reports/team' },
      { icon: 'DollarSign', label: 'Expense Report', href: '/manager/reports/expense' },
      { icon: 'Download', label: 'Export', href: '/manager/reports/export' }
    ]
  },
  {
    icon: 'Settings',
    label: 'Settings',
    href: '/manager/settings',
    children: [
      { icon: 'User', label: 'My Profile', href: '/manager/settings/profile' }
    ]
  }
];

// ==================== EMPLOYEE MENU ====================
const employeeMenu = [
  // ========== DASHBOARD ==========
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
    badge: '5',
    children: [
      { icon: 'PlusCircle', label: 'New Visit', href: '/employee/visits/new' },
      { icon: 'List', label: 'Visit History', href: '/employee/visits/history' },
      { icon: 'Calendar', label: 'Today\'s Visits', href: '/employee/visits/today' },
      { icon: 'Clock', label: 'My Follow-ups', href: '/employee/visits/followups' }
    ]
  },

  // ========== SCHEDULE ==========
  {
    icon: 'Calendar',
    label: 'My Schedule',
    href: '/employee/schedule',
    children: [
      { icon: 'Calendar', label: 'Daily Schedule', href: '/employee/schedule/daily' },
      { icon: 'Clock', label: 'Upcoming Visits', href: '/employee/schedule/upcoming' },
      { icon: 'Bell', label: 'Reminders', href: '/employee/schedule/reminders' }
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
      { icon: 'Clock', label: 'Approval Status', href: '/employee/expenses/status' },
      { icon: 'Car', label: 'Vehicle-wise', href: '/employee/expenses/vehicle-wise' }
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
      { icon: 'XCircle', label: 'Lost Deals', href: '/employee/opportunities/lost' },
      { icon: 'TrendingUp', label: 'Conversion Rate', href: '/employee/opportunities/conversion' }
    ]
  },

  // ========== MY PERFORMANCE ==========
  {
    icon: 'BarChart3',
    label: 'My Performance',
    href: '/employee/performance',
    children: [
      { icon: 'TrendingUp', label: 'My Metrics', href: '/employee/performance/metrics' },
      { icon: 'Target', label: 'My Targets', href: '/employee/performance/targets' },
      { icon: 'Award', label: 'My Achievements', href: '/employee/performance/achievements' }
    ]
  },

  // ========== MY REPORTS ==========
  {
    icon: 'FileText',
    label: 'My Reports',
    href: '/employee/reports',
    children: [
      { icon: 'Calendar', label: 'Monthly Summary', href: '/employee/reports/monthly' },
      { icon: 'DollarSign', label: 'Expense Report', href: '/employee/reports/expense' },
      { icon: 'Download', label: 'Download', href: '/employee/reports/download' }
    ]
  },

  // ========== SETTINGS ==========
  {
    icon: 'Settings',
    label: 'Settings',
    href: '/employee/settings',
    children: [
      { icon: 'User', label: 'My Profile', href: '/employee/settings/profile' },
      { icon: 'Bell', label: 'Notifications', href: '/employee/settings/notifications' }
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
  {
    icon: 'BarChart3',
    label: 'Business Overview',
    href: '/management/overview',
    children: [
      { icon: 'TrendingUp', label: 'Revenue Analysis', href: '/management/overview/revenue' },
      { icon: 'Target', label: 'Pipeline Value', href: '/management/overview/pipeline' },
      { icon: 'PieChart', label: 'Conversion Metrics', href: '/management/overview/conversion' },
      { icon: 'DollarSign', label: 'Cost Analysis', href: '/management/overview/costs' }
    ]
  },
  {
    icon: 'Users',
    label: 'Team Performance',
    href: '/management/team',
    children: [
      { icon: 'Award', label: 'Top Performers', href: '/management/team/top' },
      { icon: 'BarChart3', label: 'Productivity', href: '/management/team/productivity' },
      { icon: 'Target', label: 'Target vs Actual', href: '/management/team/targets' }
    ]
  },
  {
    icon: 'Building2',
    label: 'Client Coverage',
    href: '/management/clients',
    children: [
      { icon: 'Map', label: 'Coverage Map', href: '/management/clients/coverage' },
      { icon: 'Users', label: 'Key Accounts', href: '/management/clients/key-accounts' },
      { icon: 'Activity', label: 'Visit Frequency', href: '/management/clients/frequency' }
    ]
  },
  {
    icon: 'DollarSign',
    label: 'Financials',
    href: '/management/financials',
    children: [
      { icon: 'TrendingUp', label: 'Revenue vs Expense', href: '/management/financials/revenue' },
      { icon: 'PieChart', label: 'Cost Breakdown', href: '/management/financials/costs' },
      { icon: 'Calculator', label: 'ROI Analysis', href: '/management/financials/roi' }
    ]
  },
  {
    icon: 'FileText',
    label: 'Reports',
    href: '/management/reports',
    children: [
      { icon: 'Calendar', label: 'Monthly Report', href: '/management/reports/monthly' },
      { icon: 'BarChart3', label: 'Quarterly Analysis', href: '/management/reports/quarterly' },
      { icon: 'Download', label: 'Export Reports', href: '/management/reports/export' }
    ]
  },
  {
    icon: 'Settings',
    label: 'Settings',
    href: '/management/settings',
    children: [
      { icon: 'User', label: 'Profile', href: '/management/settings/profile' }
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