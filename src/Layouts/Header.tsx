import React, { useState, useRef, useEffect } from 'react';
import * as Icons from 'lucide-react';

interface HeaderProps {
  toggleMobileMenu: () => void;
  sidebarCollapsed: boolean;
  isMobile: boolean;
  userInfo: { name: string; email: string; avatar: string };
  theme: string;
  role: string;
}

// Theme colors mapping
const themeColors = {
  purple: {
    primary: 'purple',
    light: 'purple-100',
    lightBg: 'purple-50',
    text: 'purple-900',
    textLight: 'purple-500',
    shadow: 'purple-200/20',
    gradient: 'from-purple-600 to-indigo-600'
  },
  blue: {
    primary: 'blue',
    light: 'blue-100',
    lightBg: 'blue-50',
    text: 'blue-900',
    textLight: 'blue-500',
    shadow: 'blue-200/20',
    gradient: 'from-blue-600 to-cyan-600'
  },
  orange: {
    primary: 'orange',
    light: 'orange-100',
    lightBg: 'orange-50',
    text: 'orange-900',
    textLight: 'orange-500',
    shadow: 'orange-200/20',
    gradient: 'from-orange-500 to-amber-500'
  },
  green: {
    primary: 'emerald',
    light: 'emerald-100',
    lightBg: 'emerald-50',
    text: 'emerald-900',
    textLight: 'emerald-500',
    shadow: 'emerald-200/20',
    gradient: 'from-emerald-600 to-green-600'
  }
};

const Header: React.FC<HeaderProps> = ({ 
  toggleMobileMenu, 
  sidebarCollapsed,
  isMobile,
  userInfo,
  theme = 'purple',
  role
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const colors = themeColors[theme as keyof typeof themeColors];

  const unreadCount = 3; // Mock count

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getRoleLabel = (r: string) => {
    switch(r) {
      case 'super_admin': return 'Super Admin';
      case 'admin': return 'Admin';
      case 'manager': return 'Manager';
      case 'employee': return 'Employee';
      default: return r;
    }
  };

  return (
    <header className={`bg-white border-b border-${colors.light} h-16 flex-shrink-0 shadow-md shadow-${colors.shadow} sticky top-0 z-40`}>
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center">
          <button
            onClick={toggleMobileMenu}
            className={`lg:hidden p-2 rounded-lg hover:bg-${colors.light} mr-2 transition-colors text-${colors.primary}-600`}
          >
            <Icons.Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="hidden md:block flex-1 max-w-md mx-4">
          <div className="relative group">
            <Icons.Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-${colors.primary}-400 group-hover:text-${colors.primary}-600 transition-colors`} />
            <input
              type="text"
              placeholder="Search..."
              className={`w-full pl-10 pr-4 py-2 border border-${colors.light} rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-${colors.primary}-500 focus:border-transparent
                       bg-${colors.lightBg}/30 hover:bg-white transition-all
                       shadow-sm hover:shadow-md text-gray-700 placeholder-${colors.primary}-400`}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button 
              className={`p-2 rounded-lg hover:bg-${colors.light} relative transition-colors text-${colors.primary}-600`}
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <Icons.Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className={`absolute top-1.5 right-1.5 w-2 h-2 bg-${colors.primary}-500 rounded-full ring-2 ring-white animate-pulse`}></span>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className={`h-8 w-px bg-${colors.light} hidden sm:block`}></div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button 
              className={`flex items-center space-x-2 p-1.5 rounded-lg hover:bg-${colors.light} transition-colors group`}
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <div className={`w-8 h-8 bg-gradient-to-r ${colors.gradient} rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow`}>
                <span className="text-white text-sm font-medium">{userInfo.avatar}</span>
              </div>
              <div className="hidden lg:block text-left">
                <p className={`text-sm font-medium text-${colors.text}`}>{userInfo.name}</p>
                <p className={`text-xs text-${colors.textLight}`}>{getRoleLabel(role)}</p>
              </div>
              <Icons.ChevronDown className={`w-4 h-4 text-${colors.primary}-500 hidden lg:block transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {profileOpen && (
              <div className={`absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg shadow-${colors.shadow} border border-${colors.light} py-2 z-50`}>
                <div className={`px-4 py-3 border-b border-${colors.light}`}>
                  <p className={`text-sm font-semibold text-${colors.text}`}>{userInfo.name}</p>
                  <p className={`text-xs text-${colors.textLight} mt-1`}>{userInfo.email}</p>
                  <span className={`text-[10px] px-2 py-0.5 bg-${colors.lightBg} text-${colors.primary}-600 rounded-full mt-2 inline-block`}>
                    {getRoleLabel(role)}
                  </span>
                </div>
                
                <div className="py-2">
                  <button className={`w-full text-left px-4 py-2 hover:bg-${colors.lightBg} flex items-center space-x-3`}>
                    <Icons.User className={`w-4 h-4 text-${colors.primary}-500`} />
                    <span className={`text-sm text-${colors.primary}-700`}>Profile</span>
                  </button>
                  <button className={`w-full text-left px-4 py-2 hover:bg-${colors.lightBg} flex items-center space-x-3`}>
                    <Icons.Settings className={`w-4 h-4 text-${colors.primary}-500`} />
                    <span className={`text-sm text-${colors.primary}-700`}>Settings</span>
                  </button>
                </div>
                
                <div className={`border-t border-${colors.light} my-2`}></div>
                
                <button className={`w-full text-left px-4 py-2 hover:bg-${colors.lightBg} flex items-center space-x-3 text-${colors.primary}-700`}>
                  <Icons.LogOut className={`w-4 h-4 text-${colors.primary}-500`} />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;