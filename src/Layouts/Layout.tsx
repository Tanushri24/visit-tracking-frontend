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
      { icon: 'Building2', label: 'Companies', href: '/super-admin/master-management/company' },
      { icon: 'Building', label: 'Organisations', href: '/super-admin/master-management/organization' },
      { icon: 'Layers', label: 'Departments', href: '/super-admin/master-management/department' },
      { icon: 'Users2', label: 'Contact Persons', href: '/super-admin/master-management/contact-person' },
      { icon: 'Tag', label: 'Visit Purposes', href: '/super-admin/master-management/visit-purpose' },
      { icon: 'GitMerge', label: 'Funnel Stages', href: '/super-admin/master-management/funnel-stage' },
      { icon: 'Target', label: 'Outcomes', href: '/super-admin/master-management/outcome-master' },
      { icon: 'Car', label: 'Vehicle Types', href: '/super-admin/master-management/vehicle-type' },
      { icon: 'DollarSign', label: 'Expense Rates', href: '/super-admin/master-management/expense-rate' }
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
    href: '/super-admin/visit-management',
    children: [
      { icon: 'List', label: 'All Visits', href: '/super-admin/visit-management/all-visits' },
      { icon: 'Calendar', label: 'Todays Visits', href: '/super-admin/visit-management/todays-visits' },
      { icon: 'CalendarRange', label: 'Monthly Visits', href: '/super-admin/visit-management/monthly-visits' }
    ]
  },
  {
    icon: 'BarChart4',
    label: 'Funnel Management',
    href: '/super-admin/funnel'
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
