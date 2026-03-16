import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  setCollapsed: (value: boolean) => void;
  closeMobileMenu: () => void;
  isMobile: boolean;
  navItems: any[];
  userInfo: { name: string; email: string; avatar: string };
  theme: string;
  role: string;
}

// Theme colors mapping - All Purple
const themeClasses = {
  purple: {
    primary: 'purple',
    gradient: 'from-purple-600 to-indigo-600',
    light: 'purple-100',
    lightBg: 'purple-50',
    text: 'purple-900',
    textLight: 'purple-500',
    textPrimary: 'purple-600',
    textPrimaryHover: 'purple-800',
    border: 'purple-200',
    shadow: 'purple-200/20',
    shadowDark: 'purple-300',
    ring: 'purple-500',
    bgLight: 'purple-50',
    bgHover: 'purple-100',
    iconColor: 'text-purple-500',
    iconHover: 'group-hover:text-purple-700',
    hoverBg: 'hover:bg-purple-100',
    hoverText: 'hover:text-purple-900'
  },
  blue: {
    primary: 'purple',
    gradient: 'from-purple-600 to-indigo-600',
    light: 'purple-100',
    lightBg: 'purple-50',
    text: 'purple-900',
    textLight: 'purple-500',
    textPrimary: 'purple-600',
    textPrimaryHover: 'purple-800',
    border: 'purple-200',
    shadow: 'purple-200/20',
    shadowDark: 'purple-300',
    ring: 'purple-500',
    bgLight: 'purple-50',
    bgHover: 'purple-100',
    iconColor: 'text-purple-500',
    iconHover: 'group-hover:text-purple-700',
    hoverBg: 'hover:bg-purple-100',
    hoverText: 'hover:text-purple-900'
  },
  orange: {
    primary: 'purple',
    gradient: 'from-purple-600 to-indigo-600',
    light: 'purple-100',
    lightBg: 'purple-50',
    text: 'purple-900',
    textLight: 'purple-500',
    textPrimary: 'purple-600',
    textPrimaryHover: 'purple-800',
    border: 'purple-200',
    shadow: 'purple-200/20',
    shadowDark: 'purple-300',
    ring: 'purple-500',
    bgLight: 'purple-50',
    bgHover: 'purple-100',
    iconColor: 'text-purple-500',
    iconHover: 'group-hover:text-purple-700',
    hoverBg: 'hover:bg-purple-100',
    hoverText: 'hover:text-purple-900'
  },
  green: {
    primary: 'purple',
    gradient: 'from-purple-600 to-indigo-600',
    light: 'purple-100',
    lightBg: 'purple-50',
    text: 'purple-900',
    textLight: 'purple-500',
    textPrimary: 'purple-600',
    textPrimaryHover: 'purple-800',
    border: 'purple-200',
    shadow: 'purple-200/20',
    shadowDark: 'purple-300',
    ring: 'purple-500',
    bgLight: 'purple-50',
    bgHover: 'purple-100',
    iconColor: 'text-purple-500',
    iconHover: 'group-hover:text-purple-700',
    hoverBg: 'hover:bg-purple-100',
    hoverText: 'hover:text-purple-900'
  }
};

// Dynamic icon component
const IconComponent = ({ name, className }: { name: string; className?: string }) => {
  const Icon = (Icons as any)[name];
  return Icon ? <Icon className={className} /> : null;
};

const Sidebar: React.FC<SidebarProps> = ({ 
  collapsed, 
  mobileOpen, 
  setCollapsed, 
  closeMobileMenu,
  isMobile,
  navItems,
  userInfo,
  theme = 'purple',
  role
}) => {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const colors = themeClasses[theme as keyof typeof themeClasses];

  const toggleSidebar = () => {
    if (!isMobile) {
      setCollapsed(!collapsed);
    }
  };

  const getRoleLabel = (r: string) => {
    switch(r) {
      case 'super_admin': return 'Super Admin';
      case 'admin': return 'Admin';
      case 'manager': return 'Manager';
      case 'employee': return 'Employee';
      default: return r;
    }
  };

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem('auth');
    // Redirect to welcome page
    navigate('/');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className={`fixed inset-0 bg-${colors.primary}-900/30 backdrop-blur-sm z-20 lg:hidden`}
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static z-30 h-full bg-white border-r border-${colors.light} 
          shadow-xl shadow-${colors.shadow} transition-all duration-300 ease-in-out
          ${collapsed && !isMobile ? 'w-20' : 'w-72'}
          ${mobileOpen ? 'left-0' : '-left-72 lg:left-0'}
          flex flex-col
        `}
      >
        {/* Header */}
        <div className={`flex items-center justify-between h-16 px-4 border-b border-${colors.light} flex-shrink-0 bg-gradient-to-r from-${colors.lightBg} to-white`}>
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="flex-shrink-0">
              <div className={`w-8 h-8 bg-gradient-to-r ${colors.gradient} rounded-lg flex items-center justify-center shadow-lg shadow-${colors.shadowDark}`}>
                <span className="text-white font-bold text-lg">VT</span>
              </div>
            </div>
            {(!collapsed || isMobile) && (
              <span className={`font-semibold text-lg text-${colors.text} whitespace-nowrap`}>
                VisitTracker
              </span>
            )}
          </div>
          
          {/* Collapse Button */}
          <button
            onClick={toggleSidebar}
            className={`hidden lg:block p-1.5 rounded-lg ${colors.hoverBg} text-${colors.primary}-600 transition-colors`}
          >
            {collapsed ? <Icons.ChevronRight className="w-4 h-4" /> : <Icons.ChevronLeft className="w-4 h-4" />}
          </button>
          
          {/* Mobile Close */}
          <button
            onClick={closeMobileMenu}
            className={`lg:hidden p-1.5 rounded-lg ${colors.hoverBg} text-${colors.primary}-600`}
          >
            <Icons.ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* User Profile */}
        <div className={`p-4 border-b border-${colors.light} flex-shrink-0 shadow-sm bg-gradient-to-r from-${colors.lightBg}/50 to-white`}>
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className={`w-10 h-10 bg-gradient-to-r ${colors.gradient} rounded-full flex items-center justify-center text-white font-semibold shadow-md shadow-${colors.shadowDark}`}>
                {userInfo.avatar}
              </div>
            </div>
            {(!collapsed || isMobile) && (
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium text-${colors.text} truncate`}>{userInfo.name}</p>
                <p className={`text-xs text-${colors.textLight} truncate`}>{userInfo.email}</p>
                <span className={`text-[10px] px-1.5 py-0.5 bg-${colors.lightBg} text-${colors.primary}-600 rounded-full mt-1 inline-block`}>
                  {getRoleLabel(role)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`
                  flex items-center space-x-3 px-3 py-2 rounded-lg transition-all
                  ${item.active 
                    ? `bg-gradient-to-r ${colors.gradient} text-white shadow-md shadow-${colors.shadowDark}` 
                    : `text-${colors.primary}-700 ${colors.hoverBg} ${colors.hoverText}`
                  }
                  ${collapsed && !isMobile ? 'justify-center' : ''}
                  group relative
                `}
              >
                <IconComponent 
                  name={item.icon} 
                  className={`w-5 h-5 ${
                    item.active 
                      ? 'text-white' 
                      : `${colors.iconColor} ${colors.iconHover}`
                  }`} 
                />
                {(!collapsed || isMobile) && (
                  <>
                    <span className="text-sm font-medium flex-1">{item.label}</span>
                    {item.badge && (
                      <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                        item.active ? 'bg-white/20 text-white' : `bg-${colors.lightBg} text-${colors.primary}-600`
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                
                {/* Tooltip */}
                {collapsed && !isMobile && hoveredItem === item.label && (
                  <span className={`absolute left-full ml-2 px-2 py-1 bg-${colors.primary}-900 text-white text-xs rounded opacity-100 shadow-lg shadow-${colors.shadowDark} whitespace-nowrap z-50`}>
                    {item.label}
                    {item.badge && ` (${item.badge})`}
                  </span>
                )}
              </a>
            ))}
          </div>
        </nav>

        {/* Logout */}
        <div className={`p-4 border-t border-${colors.light} flex-shrink-0 shadow-inner bg-gradient-to-r from-${colors.lightBg}/50 to-white`}>
          <button
            onClick={handleLogout}
            className={`
              flex items-center space-x-3 px-3 py-2 w-full rounded-lg 
              text-${colors.primary}-700 ${colors.hoverBg} ${colors.hoverText} transition-all
              ${collapsed && !isMobile ? 'justify-center' : ''}
              group relative
            `}
          >
            <Icons.LogOut className={`w-5 h-5 ${colors.iconColor} ${colors.iconHover}`} />
            {(!collapsed || isMobile) && <span className="text-sm font-medium">Logout</span>}
            
            {/* Tooltip */}
            {collapsed && !isMobile && (
              <span className={`absolute left-full ml-2 px-2 py-1 bg-${colors.primary}-900 text-white text-xs rounded shadow-lg shadow-${colors.shadowDark} whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity`}>
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;