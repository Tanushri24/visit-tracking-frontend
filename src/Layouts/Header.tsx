import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  
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
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setFilterOpen(false);
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

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem('auth');
    // Redirect to welcome page
    navigate('/');
  };

  const filterOptions = [
    { label: 'Today', value: 'today', icon: Icons.Calendar },
    { label: 'This Week', value: 'week', icon: Icons.CalendarDays },
    { label: 'This Month', value: 'month', icon: Icons.CalendarRange },
    { label: 'Last Month', value: 'lastMonth', icon: Icons.CalendarOff },
    { label: 'Custom Range', value: 'custom', icon: Icons.SlidersHorizontal },
  ];

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
          {/* Filter Button with Dropdown */}
          <div className="relative" ref={filterRef}>
            <button 
              className={`p-2 rounded-lg hover:bg-${colors.light} transition-colors text-${colors.primary}-600`}
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Icons.Filter className="w-5 h-5" />
            </button>
            
            {filterOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 overflow-hidden">
                {/* Header */}
                <div className={`px-4 py-2 border-b border-${colors.light} mb-1`}>
                  <h3 className={`text-xs font-semibold text-${colors.text} uppercase tracking-wider`}>
                    Filter Options
                  </h3>
                </div>
                
                {/* Filter Options */}
                <div className="space-y-0.5">
                  {filterOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        console.log('Selected filter:', option.label);
                        setFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 hover:bg-${colors.lightBg} flex items-center space-x-3 transition-colors group`}
                    >
                      <div className={`p-1 rounded-md bg-${colors.lightBg} group-hover:bg-white transition-colors`}>
                        <option.icon className={`w-3.5 h-3.5 text-${colors.primary}-600`} />
                      </div>
                      <span className={`text-sm text-gray-700 group-hover:text-${colors.primary}-700 flex-1`}>
                        {option.label}
                      </span>
                      {option.value === 'today' && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full bg-${colors.primary}-100 text-${colors.primary}-600`}>
                          New
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                
                {/* Footer */}
                <div className={`mt-2 pt-2 border-t border-${colors.light} px-4 py-2`}>
                  <button 
                    onClick={() => setFilterOpen(false)}
                    className={`w-full text-center text-xs text-${colors.primary}-600 hover:text-${colors.primary}-700 font-medium`}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>

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
            
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
                </div>
                <div className="py-2">
                  <div className="px-4 py-3 hover:bg-gray-50">
                    <p className="text-sm text-gray-700">New visit scheduled</p>
                    <p className="text-xs text-gray-400 mt-1">5 min ago</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50">
                    <p className="text-sm text-gray-700">Report ready to download</p>
                    <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                  </div>
                </div>
              </div>
            )}
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
                
                <button 
                  onClick={handleLogout}
                  className={`w-full text-left px-4 py-2 hover:bg-${colors.lightBg} flex items-center space-x-3 text-${colors.primary}-700`}
                >
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