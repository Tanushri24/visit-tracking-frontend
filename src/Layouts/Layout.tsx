import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  role: 'super_admin' | 'admin' | 'manager' | 'employee';
}

// Role-based navigation items
const getNavItems = (role: string) => {
  switch(role) {
    case 'super_admin':
      return [
        { icon: 'LayoutDashboard', label: 'Dashboard', href: '/super-admin/dashboard', active: true },
        { icon: 'Users', label: 'All Users', href: '/super-admin/users', badge: 12 },
        { icon: 'Building2', label: 'Companies', href: '/super-admin/companies' },
        { icon: 'MapPin', label: 'All Visits', href: '/super-admin/visits' },
        { icon: 'BarChart3', label: 'Analytics', href: '/super-admin/analytics' },
        { icon: 'Globe', label: 'Sites', href: '/super-admin/sites' },
        { icon: 'Shield', label: 'Security', href: '/super-admin/security' },
        { icon: 'Settings', label: 'Settings', href: '/super-admin/settings' },
      ];
    
    case 'admin':
      return [
        { icon: 'LayoutDashboard', label: 'Dashboard', href: '/admin/dashboard', active: true },
        { icon: 'Users', label: 'Team', href: '/admin/team', badge: 5 },
        { icon: 'MapPin', label: 'Visits', href: '/admin/visits' },
        { icon: 'Calendar', label: 'Schedule', href: '/admin/schedule' },
        { icon: 'BarChart3', label: 'Reports', href: '/admin/reports' },
        { icon: 'Settings', label: 'Settings', href: '/admin/settings' },
      ];
    
    case 'manager':
      return [
        { icon: 'LayoutDashboard', label: 'Dashboard', href: '/manager/dashboard', active: true },
        { icon: 'Users', label: 'My Team', href: '/manager/team', badge: 3 },
        { icon: 'MapPin', label: 'Team Visits', href: '/manager/visits' },
        { icon: 'Calendar', label: 'Team Schedule', href: '/manager/schedule' },
        { icon: 'BarChart3', label: 'Performance', href: '/manager/performance' },
        { icon: 'Settings', label: 'Settings', href: '/manager/settings' },
      ];
    
    case 'employee':
      return [
        { icon: 'LayoutDashboard', label: 'Dashboard', href: '/employee/dashboard', active: true },
        { icon: 'MapPin', label: 'My Visits', href: '/employee/visits', badge: 2 },
        { icon: 'Calendar', label: 'My Schedule', href: '/employee/schedule' },
        { icon: 'Clock', label: 'Time Tracking', href: '/employee/time' },
        { icon: 'Settings', label: 'Settings', href: '/employee/settings' },
      ];
    
    default:
      return [];
  }
};

// Role-based theme
const getTheme = (role: string) => {
  switch(role) {
    case 'super_admin': return 'purple';
    case 'admin': return 'blue';
    case 'manager': return 'orange';
    case 'employee': return 'green';
    default: return 'purple';
  }
};

// Role-based user info
const getUserInfo = (role: string) => {
  switch(role) {
    case 'super_admin':
      return {
        name: 'Super Admin',
        email: 'superadmin@company.com',
        avatar: 'SA'
      };
    case 'admin':
      return {
        name: 'Admin User',
        email: 'admin@company.com',
        avatar: 'AD'
      };
    case 'manager':
      return {
        name: 'Manager User',
        email: 'manager@company.com',
        avatar: 'MN'
      };
    case 'employee':
      return {
        name: 'John Employee',
        email: 'john@company.com',
        avatar: 'JE'
      };
    default:
      return {
        name: 'User',
        email: 'user@company.com',
        avatar: 'US'
      };
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