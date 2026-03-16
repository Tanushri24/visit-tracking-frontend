import React from 'react';
import { 
  Home, Users, MapPin, Calendar, 
  BarChart3, Globe, Settings, LogOut,
  ChevronLeft, ChevronRight 
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  setCollapsed: (value: boolean) => void;
  closeMobileMenu: () => void;
  isMobile: boolean;
}

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  collapsed, 
  mobileOpen, 
  setCollapsed, 
  closeMobileMenu,
  isMobile 
}) => {
  const navItems: NavItem[] = [
    { icon: Home, label: 'Dashboard', href: '/', active: true },
    { icon: Users, label: 'Users', href: '/users' },
    { icon: MapPin, label: 'Visits Map', href: '/map' },
    { icon: Calendar, label: 'Schedule', href: '/schedule' },
    { icon: BarChart3, label: 'Analytics', href: '/analytics' },
    { icon: Globe, label: 'Sites', href: '/sites' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  const toggleSidebar = () => {
    if (!isMobile) {
      setCollapsed(!collapsed);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static z-30 h-full bg-white border-r border-gray-200
          transition-all duration-300 ease-in-out
          ${collapsed && !isMobile ? 'w-20' : 'w-72'}
          ${mobileOpen ? 'left-0' : '-left-72 lg:left-0'}
          flex flex-col
        `}
      >
        {/* Sidebar Header with Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">VT</span>
              </div>
            </div>
            {(!collapsed || isMobile) && (
              <span className="font-semibold text-lg text-gray-800 whitespace-nowrap">
                VisitTracker
              </span>
            )}
          </div>
          
          {/* Desktop Collapse Button */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:block p-1.5 rounded-lg hover:bg-gray-100"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-500" />
            )}
          </button>
          
          {/* Mobile Close Button */}
          <button
            onClick={closeMobileMenu}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                SA
              </div>
            </div>
            {(!collapsed || isMobile) && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Super Admin
                </p>
                <p className="text-xs text-gray-500 truncate">
                  admin@visits.com
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`
                  flex items-center space-x-3 px-3 py-2 rounded-lg transition-all
                  ${item.active 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                  ${collapsed && !isMobile ? 'justify-center' : ''}
                  group relative
                `}
              >
                <item.icon className={`w-5 h-5 ${item.active ? 'text-blue-600' : 'text-gray-500'}`} />
                {(!collapsed || isMobile) && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
                
                {/* Tooltip for collapsed state */}
                {collapsed && !isMobile && (
                  <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </span>
                )}
              </a>
            ))}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <button
            className={`
              flex items-center space-x-3 px-3 py-2 w-full rounded-lg 
              text-red-600 hover:bg-red-50 transition-colors
              ${collapsed && !isMobile ? 'justify-center' : ''}
              group relative
            `}
          >
            <LogOut className="w-5 h-5" />
            {(!collapsed || isMobile) && (
              <span className="text-sm font-medium">Logout</span>
            )}
            
            {/* Tooltip for collapsed state */}
            {collapsed && !isMobile && (
              <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap">
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