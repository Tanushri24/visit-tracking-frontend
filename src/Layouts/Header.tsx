import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, Bell, Download, Search, Filter, 
  User, Settings, LogOut, CheckCircle, 
  AlertCircle, Info, X, ChevronDown 
} from 'lucide-react';

interface HeaderProps {
  toggleMobileMenu: () => void;
  sidebarCollapsed: boolean;
  isMobile: boolean;
}

// Notification type
interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'success' | 'warning' | 'info' | 'error';
  read: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  toggleMobileMenu, 
  sidebarCollapsed,
  isMobile 
}) => {
  // State for dropdowns
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Refs for outside click handling
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'New Visit Completed',
      message: 'John Smith completed a visit at Downtown Office',
      time: '5 min ago',
      type: 'success',
      read: false
    },
    {
      id: 2,
      title: 'System Update',
      message: 'System maintenance scheduled for tonight',
      time: '1 hour ago',
      type: 'info',
      read: false
    },
    {
      id: 3,
      title: 'New User Registered',
      message: 'Sarah Johnson just joined as Employee',
      time: '3 hours ago',
      type: 'success',
      read: true
    },
    {
      id: 4,
      title: 'Location Alert',
      message: 'North Warehouse visit duration exceeded',
      time: '5 hours ago',
      type: 'warning',
      read: true
    }
  ]);

  // Filter options
  const filterOptions = [
    { label: 'Today', value: 'today', icon: CheckCircle },
    { label: 'This Week', value: 'week', icon: CheckCircle },
    { label: 'This Month', value: 'month', icon: CheckCircle },
    { label: 'Custom Range', value: 'custom', icon: CheckCircle }
  ];

  // Handle click outside to close dropdowns
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
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'error': return <X className="w-5 h-5 text-red-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  // Get notification count
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex-shrink-0 shadow-sm sticky top-0 z-40">
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 mr-2 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          {/* Page Title - Dynamic based on route */}
          <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">
            Super Admin Dashboard
          </h1>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:block flex-1 max-w-md mx-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search visits, users, locations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       bg-gray-50 hover:bg-white transition-all duration-200
                       shadow-sm hover:shadow"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-1 md:space-x-2">
          {/* Mobile Search Button with Dropdown */}
          <div className="relative md:hidden" ref={searchRef}>
            <button 
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            
            {/* Mobile Search Dropdown */}
            {searchOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-50">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                </div>
              </div>
            )}
          </div>

          {/* Filter Button with Dropdown */}
          <div className="relative hidden sm:block" ref={filterRef}>
            <button 
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
            
            {filterOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-700">Filter By</h3>
                </div>
                {filterOptions.map((option, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2 transition-colors"
                  >
                    <option.icon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Download Button */}
          <button className="hidden sm:block p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <Download className="w-5 h-5 text-gray-600" />
          </button>

          {/* Notifications with Dropdown */}
          <div className="relative" ref={notificationsRef}>
            <button 
              className="p-2 rounded-lg hover:bg-gray-100 relative transition-colors duration-200"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse"></span>
              )}
            </button>
            
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllAsRead}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                          !notification.read ? 'bg-blue-50/50' : ''
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex space-x-3">
                          <div className="flex-shrink-0">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">{notification.title}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p className="text-sm">No notifications</p>
                    </div>
                  )}
                </div>
                
                <div className="p-3 border-t border-gray-100 text-center">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

          {/* User Menu with Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button 
              className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <span className="text-white text-sm font-medium">SA</span>
              </div>
              <span className="text-sm font-medium text-gray-700 hidden lg:block">
                Super Admin
              </span>
              <ChevronDown className={`w-4 h-4 text-gray-500 hidden lg:block transition-transform duration-200 ${
                profileOpen ? 'rotate-180' : ''
              }`} />
            </button>
            
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800">Super Admin</p>
                  <p className="text-xs text-gray-500 mt-1">admin@visits.com</p>
                </div>
                
                {/* Menu Items */}
                <div className="py-2">
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3 transition-colors">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Profile</span>
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3 transition-colors">
                    <Settings className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Settings</span>
                  </button>
                </div>
                
                {/* Divider */}
                <div className="border-t border-gray-100 my-2"></div>
                
                {/* Logout */}
                <button className="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center space-x-3 transition-colors text-red-600">
                  <LogOut className="w-4 h-4" />
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