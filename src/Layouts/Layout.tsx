import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  role: string;
  children: React.ReactNode;
}

type NavItem = {
  icon: string;
  label: string;
  href: string;
  active?: boolean;
  badge?: string;
  children?: NavItem[];
};

const superAdminMenu: NavItem[] = [
  { icon: 'LayoutDashboard', label: 'Dashboard', href: '/super-admin/dashboard', active: true },
  {
    icon: 'Database',
    label: 'Master Management',
    href: '/super-admin/master-management',
    children: [
      { icon: 'Building2', label: 'Company Master', href: '/super-admin/master-management/company' },
      { icon: 'Building', label: 'Organization Master', href: '/super-admin/master-management/organization' },
      { icon: 'Layers', label: 'Department Master', href: '/super-admin/master-management/department' },
      { icon: 'Users', label: 'Contact Person Master', href: '/super-admin/master-management/contact-person' },
      { icon: 'Target', label: 'Visit Purpose Master', href: '/super-admin/master-management/visit-purpose' },
      { icon: 'Truck', label: 'Vehicle Type Master', href: '/super-admin/master-management/vehicle-type' }, 
      { icon: 'DollarSign', label: 'Expense Rate Master', href: '/super-admin/master-management/expense-rate' }, 
      { icon: 'Funnel', label: 'Funnel Stage Master', href: '/super-admin/master-management/funnel-stage' }, 
      { icon: 'CheckCircle', label: 'Outcome Master', href: '/super-admin/master-management/outcome-master' }, 
    ]
    
  },
  {
    icon: 'UserPlus',
    label: 'Employee Registration',
    href: '/super-admin/employee-registration'
  },
  {
    icon: 'Receipt',
    label: 'Expense Configuration',
    href: '/super-admin/expense-config',
    children: [
      { icon: 'DollarSign', label: 'Rate Management', href: '/super-admin/expense-config/rates' },
      { icon: 'History', label: 'Rate Change History', href: '/super-admin/expense-config/history' },
      { icon: 'Car', label: 'Vehicle Types', href: '/super-admin/expense-config/vehicles' },
      { icon: 'Calendar', label: 'Effective Dates', href: '/super-admin/expense-config/effective-dates' }
    ]
  },
  {
    icon: 'MapPin',
    label: 'Visit Management',
    href: '/super-admin/Visit-Management',
    children: [
      {icon: 'List', label: 'All Visits', href: '/super-admin/Visit-Management/all-visits'},
      { icon: 'Calendar', label: 'Todays Visits', href: '/super-admin/Visit-Management/Todays-visits'},
      { icon: 'CalendarRange', label: 'Monthly Visits', href: '/super-admin/Visit-Management/monthly-visits'},
      { icon: 'Clock', label: 'Pending Follow-ups', href: '/super-admin/Visit-Management/pending-follow-ups'},
      { icon: 'CheckCircle', label: 'Expense Approvals', href: '/super-admin/Visit-Management/expense-approvals' }
    ]
  },

  // ========== FUNNEL MANAGEMENT ==========
  {
    icon: 'BarChart4',
    label: 'Funnel Management',
    href: '/super-admin/funnel-management',
    children: [
     { icon: 'Activity', label: 'Stage Wise Funnel', href: '/super-admin/funnel-management/stage-wise'},
     { icon: 'Users', label: 'Employee-wise Funnel', href: '/super-admin/funnel-management/employee-wise'},
     { icon: 'Building2', label: 'Client-wise Funnel', href: '/super-admin/funnel-management/client-wise'},
     { icon: 'Layers', label: 'Department-wise Funnel', href: '/super-admin/funnel-management/dept-wise'},
     { icon: 'TrendingUp', label: 'Conversion Tracking', href: '/super-admin/funnel-management/conversion'},
     { icon: 'AlertCircle', label: 'Stalled Opportunities', href: '/super-admin/funnel-management/stalled'}
    ]
   },

  // ========== BUSINESS OUTCOME TRACKING ==========
  {
    icon: 'TrendingUp',
    label: 'Business Outcomes',
    href: '/super-admin/outcomes',
    children: [
      { icon: 'Zap', label: 'Leads Generated', href: '/super-admin/business-outcomes/lead'},
      { icon: 'FileText', label: 'Proposals Created', href: '/super-admin/business-outcomes/proposals' },
      { icon: 'PieChart', label: 'Pipeline Value', href: '/super-admin/business-outcomes/pipeline' },
      { icon: 'Target', label: 'Confirmed Business', href: '/super-admin/business-outcomes/confirmed' },
      { icon: 'Calculator', label: 'Cost per Lead', href: '/super-admin/business-outcomes/cost-per-lead' },
      { icon: 'Award', label: 'Productivity Score', href: '/super-admin/business-outcomes/productivity' }
    ]
  },

  // ========== REPORTS (All 13 Reports from SRS) ==========
  {
    icon: 'BarChart3',
    label: 'Report',
    href: '/super-admin/Report',
    children: [
      // { icon: 'Calendar', label: 'Daily Visit Report', href: '/super-admin/reports/daily-visit' },
      // { icon: 'CalendarRange', label: 'Date Range Visit', href: '/super-admin/reports/date-range' },
      { icon: 'Users', label: 'Employee Visit Summary', href: '/super-admin/Report/employee-reports' },
      // { icon: 'Building2', label: 'Organisation Visit', href: '/super-admin/reports/organisation' },
      // { icon: 'Layers', label: 'Department Visit', href: '/super-admin/reports/department' },
      { icon: 'DollarSign', label: 'Expense Report', href: '/super-admin/Reports/expense' },
      // { icon: 'Car', label: 'Vehicle-wise Expense', href: '/super-admin/reports/vehicle-expense' },
      { icon: 'GitMerge', label: 'Funnel Stage Report', href: '/super-admin/Reports/funnel-stage' },
      // { icon: 'Clock', label: 'Follow-up Pending', href: '/super-admin/reports/followup-pending' },
    //   { icon: 'Target', label: 'Business Outcome', href: '/super-admin/reports/business-outcome' },
    //   { icon: 'TrendingUp', label: 'Conversion Analysis', href: '/super-admin/reports/conversion' },
    //   { icon: 'Award', label: 'Monthly Productivity', href: '/super-admin/reports/productivity' },
    //   { icon: 'PieChart', label: 'Cost vs Revenue', href: '/super-admin/reports/cost-revenue' }
    ]
  },
  {
    icon: 'Users',
    label: 'User Management',
    href: '/super-admin/users'
  }
];

const adminMenu: NavItem[] = [
  { icon: 'LayoutDashboard', label: 'Dashboard', href: '/admin/dashboard', active: true },
  { icon: 'UserPlus', label: 'Employee Registration', href: '/admin/employee-registration' },
  {
    icon: 'Database',
    label: 'Master Data',
    href: '/admin/masters',
    children: [
      { icon: 'Building2', label: 'Companies', href: '/admin/masters/companies' },
      { icon: 'Building', label: 'Organisations', href: '/admin/masters/organisations' },
      { icon: 'Layers', label: 'Departments', href: '/admin/masters/departments' },
      { icon: 'Users2', label: 'Contact Persons', href: '/admin/masters/contacts' }
    ]
  },
  {
    icon: 'MapPin',
    label: 'Visit Management',
    href: '/admin/visits',
    children: [
      { icon: 'PlusCircle', label: 'New Visit Entry', href: '/admin/visits/new' },
      { icon: 'List', label: 'All Visits', href: '/admin/visits/all' },
      { icon: 'Calendar', label: "Today's Visits", href: '/admin/visits/today' }
    ]
  }
];

const managerMenu: NavItem[] = [
  { icon: 'LayoutDashboard', label: 'Manager Dashboard', href: '/manager/dashboard', active: true },
  { icon: 'Users', label: 'My Team', href: '/manager/team' },
  { icon: 'MapPin', label: 'Team Visits', href: '/manager/visits', badge: '8' },
  { icon: 'DollarSign', label: 'Expense Approvals', href: '/manager/expenses', badge: '5' }
];

const employeeMenu: NavItem[] = [
  { icon: 'LayoutDashboard', label: 'My Dashboard', href: '/employee/dashboard', active: true },
  { icon: 'MapPin', label: 'My Visits', href: '/employee/visits' },
  { icon: 'Clock', label: 'My Follow-ups', href: '/employee/followups', badge: '3' },
  { icon: 'DollarSign', label: 'My Expenses', href: '/employee/expenses' }
];

const managementMenu: NavItem[] = [
  { icon: 'LayoutDashboard', label: 'Executive Dashboard', href: '/management/dashboard', active: true },
  { icon: 'BarChart3', label: 'Business Overview', href: '/management/overview' },
  { icon: 'Users', label: 'Team Productivity', href: '/management/productivity' },
  { icon: 'FileText', label: 'Reports', href: '/management/reports' }
];

const getNavItems = (role: string): NavItem[] => {
  switch (role) {
    case 'super_admin':
      return superAdminMenu;
    case 'admin':
      return adminMenu;
    case 'manager':
      return managerMenu;
    case 'employee':
      return employeeMenu;
    case 'management':
      return managementMenu;
    default:
      return [];
  }
};

const getTheme = (role: string) => {
  switch (role) {
    case 'super_admin':
      return 'purple';
    case 'admin':
      return 'blue';
    case 'manager':
      return 'orange';
    case 'employee':
      return 'green';
    case 'management':
      return 'purple';
    default:
      return 'purple';
  }
};

const getUserInfo = (role: string) => {
  switch (role) {
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

  const navItems = getNavItems(role);
  const theme = getTheme(role);
  const userInfo = getUserInfo(role);

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
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
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

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          toggleMobileMenu={toggleMobileMenu}
          sidebarCollapsed={sidebarCollapsed}
          isMobile={isMobile}
          userInfo={userInfo}
          theme={theme}
          role={role}
        />

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
