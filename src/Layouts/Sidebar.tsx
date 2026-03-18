import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import * as Icons from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  setCollapsed: (value: boolean) => void;
  closeMobileMenu: () => void;
  isMobile: boolean;
  navItems: any[];
  userInfo: { name: string; email: string; avatar: string };
  role: string;
   theme?: string;
}

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
  role
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const toggleSidebar = () => {
    if (!isMobile) setCollapsed(!collapsed);
  };

  const getRoleLabel = (r: string) => {
    switch (r) {
      case 'super_admin': return 'Super Admin';
      case 'admin': return 'Admin';
      case 'manager': return 'Manager';
      case 'employee': return 'Employee';
      default: return r;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-purple-900/30 backdrop-blur-sm z-20 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static z-30 h-full bg-white border-r border-purple-200
          shadow-xl transition-all duration-300
          ${collapsed && !isMobile ? 'w-20' : 'w-72'}
          ${mobileOpen ? 'left-0' : '-left-72 lg:left-0'}
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-purple-200 bg-purple-50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
              VT
            </div>

            {(!collapsed || isMobile) && (
              <span className="font-semibold text-lg text-purple-900">
                VisitTracker
              </span>
            )}
          </div>

          {/* Toggle */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:block p-1.5 rounded-lg hover:bg-purple-100 text-purple-600"
          >
            {collapsed ? <Icons.ChevronRight size={16} /> : <Icons.ChevronLeft size={16} />}
          </button>

          {/* Mobile Close */}
          <button
            onClick={closeMobileMenu}
            className="lg:hidden p-1.5 rounded-lg hover:bg-purple-100 text-purple-600"
          >
            <Icons.ChevronLeft size={18} />
          </button>
        </div>

        {/* User */}
        <div className="p-4 border-b border-purple-200 bg-purple-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
              {userInfo.avatar}
            </div>

            {(!collapsed || isMobile) && (
              <div>
                <p className="text-sm font-medium text-purple-900">{userInfo.name}</p>
                <p className="text-xs text-purple-500">{userInfo.email}</p>
                <span className="text-[10px] px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full mt-1 inline-block">
                  {getRoleLabel(role)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={index}
                  to={item.href}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`
                    flex items-center space-x-3 px-3 py-2 rounded-lg transition-all
                    ${isActive
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                      : 'text-purple-700 hover:bg-purple-100 hover:text-purple-900'
                    }
                    ${collapsed && !isMobile ? 'justify-center' : ''}
                    group relative
                  `}
                >
                  <IconComponent
                    name={item.icon}
                    className={`w-5 h-5 ${
                      isActive ? 'text-white' : 'text-purple-500 group-hover:text-purple-700'
                    }`}
                  />

                  {(!collapsed || isMobile) && (
                    <span className="text-sm font-medium flex-1">
                      {item.label}
                    </span>
                  )}

                  {/* Tooltip */}
                  {collapsed && !isMobile && hoveredItem === item.label && (
                    <span className="absolute left-full ml-2 px-2 py-1 bg-purple-900 text-white text-xs rounded shadow-lg whitespace-nowrap z-50">
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-purple-200">
          <button
            onClick={handleLogout}
            className={`
              flex items-center space-x-3 px-3 py-2 w-full rounded-lg
              text-purple-700 hover:bg-purple-100 hover:text-purple-900
              ${collapsed && !isMobile ? 'justify-center' : ''}
              group relative
            `}
          >
            <Icons.LogOut className="w-5 h-5 text-purple-500 group-hover:text-purple-700" />

            {(!collapsed || isMobile) && (
              <span className="text-sm font-medium">Logout</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;