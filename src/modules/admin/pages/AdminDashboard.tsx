import React, { useState, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { 
  Users, Activity, Clock, CheckCircle,
  PlusCircle, Download, Filter as FilterIcon,
  Calendar as CalendarIcon
} from 'lucide-react';
import { 
  STATS_CARDS, 
  QUICK_ACTIONS, 
  RECENT_ACTIVITIES, 
  PENDING_APPROVALS, 
  MASTER_STATS,
  FILTER_OPTIONS 
} from '../data/data';

const AdminDashboard = () => {
  // States for dropdowns
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [filterLabel, setFilterLabel] = useState('This Week');

  // Refs for outside click detection
  const filterRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilterMenu(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle filter selection
  const handleFilterSelect = (option: typeof FILTER_OPTIONS[0]) => {
    setFilterLabel(option.label);
    setShowFilterMenu(false);
    console.log('Filter selected:', option.value);
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-5 bg-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 md:p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl shadow-lg shadow-blue-200">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">Admin Dashboard</h1>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Manage users, masters, and reports</p>
          </div>
        </div>
        
        {/* Action Buttons Group */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Quick Action Button */}
          <button className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-lg hover:shadow-lg transition-all flex items-center gap-1">
            <PlusCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden xs:inline">Quick Action</span>
          </button>
          
          {/* Download Button */}
          <button className="p-1.5 sm:p-1.5 bg-white rounded-lg hover:bg-gray-50 border border-gray-200">
            <Download className="w-3.5 h-3.5 text-gray-600" />
          </button>
          
          {/* Filter Button */}
          <div className="relative" ref={filterRef}>
            <button 
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="p-1.5 sm:p-1.5 bg-white rounded-lg hover:bg-gray-50 border border-gray-200 flex items-center gap-1"
            >
              <FilterIcon className="w-3.5 h-3.5 text-gray-600" />
              <span className="hidden sm:inline text-xs text-gray-600">{filterLabel}</span>
            </button>

            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-36 sm:w-40 bg-white rounded-lg shadow-xl border border-gray-200 p-1 z-50">
                {FILTER_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleFilterSelect(option)}
                    className="w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Calendar Button */}
          <div className="relative" ref={calendarRef}>
            <button 
              onClick={() => setShowCalendar(!showCalendar)}
              className="p-1.5 sm:p-1.5 bg-white rounded-lg hover:bg-gray-50 border border-gray-200"
            >
              <CalendarIcon className="w-3.5 h-3.5 text-gray-600" />
            </button>
            
            {showCalendar && (
              <div className="absolute right-0 mt-2 z-50">
                <Calendar
                  onChange={(value) => {
                    setSelectedDate(value as Date);
                    setShowCalendar(false);
                  }}
                  value={selectedDate}
                  className="!w-64 sm:!w-auto rounded-lg shadow-xl border border-gray-200 text-xs"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
        {STATS_CARDS.map((stat, i) => (
          <div 
            key={i}
            className={`bg-white rounded-lg p-2 sm:p-3 border-l-4 ${stat.borderColor} border border-gray-100 shadow-lg ${stat.shadowColor} hover:shadow-xl transition-all`}
          >
            <div className="flex items-start justify-between mb-1 sm:mb-2">
              <div className={`p-1 sm:p-1.5 ${stat.iconBg} rounded-md`}>
                <stat.icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${stat.iconColor}`} />
              </div>
              <span className={`text-[8px] sm:text-[10px] font-medium px-1 sm:px-1.5 py-0.5 rounded-full ${
                stat.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-gray-800">{stat.value}</h3>
            <p className="text-[8px] sm:text-[10px] text-gray-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Left Column - 2 columns on desktop */}
        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
          {/* Recent Activities */}
          <div className="bg-white rounded-lg border border-gray-100 shadow-lg shadow-blue-100/50">
            <div className="p-2 sm:p-3 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                  <h2 className="text-xs sm:text-sm font-medium text-gray-700">Recent Activities</h2>
                </div>
                <button className="text-[10px] sm:text-xs text-blue-600 hover:text-blue-700">
                  View All
                </button>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100 max-h-[350px] sm:max-h-[400px] overflow-y-auto">
              {RECENT_ACTIVITIES.map((activity, i) => (
                <div key={i} className="p-2 sm:p-3 hover:bg-blue-50/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-[8px] sm:text-[10px] font-medium">
                        {activity.user.charAt(0)}
                      </div>
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-700">
                          <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                          <span className="font-medium text-blue-600 hidden xs:inline">{activity.target}</span>
                        </p>
                        <p className="text-[8px] sm:text-[10px] text-gray-400 mt-0.5">{activity.time}</p>
                      </div>
                    </div>
                    <span className={`text-[8px] sm:text-[10px] px-1 sm:px-2 py-0.5 rounded-full ${
                      activity.type === 'create' ? 'bg-green-50 text-green-600' :
                      activity.type === 'update' ? 'bg-blue-50 text-blue-600' :
                      activity.type === 'security' ? 'bg-purple-50 text-purple-600' :
                      'bg-orange-50 text-orange-600'
                    }`}>
                      {activity.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Master Data Stats */}
          <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-100 shadow-lg shadow-purple-100/50">
            <h2 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">Master Data Overview</h2>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {MASTER_STATS.map((stat, i) => (
                <div key={i} className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 hover:bg-purple-50/30 rounded-lg">
                  <div className="p-1 sm:p-1.5 bg-purple-100 rounded-md">
                    <stat.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500">{stat.name}</p>
                    <p className="text-xs sm:text-sm font-semibold text-gray-800">{stat.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - 1 column on desktop */}
        <div className="space-y-3 sm:space-y-4">
          {/* Pending Approvals */}
          <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-100 shadow-lg shadow-orange-100/50">
            <h2 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">Pending Approvals</h2>
            <div className="space-y-2 sm:space-y-3">
              {PENDING_APPROVALS.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                      item.priority === 'high' ? 'bg-red-500' :
                      item.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <span className="text-[10px] sm:text-xs text-gray-600 truncate max-w-[100px] sm:max-w-[150px]">
                      {item.item}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-[10px] sm:text-xs font-semibold text-gray-800">{item.count}</span>
                    <button className="text-[8px] sm:text-[10px] px-1 sm:px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100">
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-2 sm:p-3 shadow-lg shadow-blue-200">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white mb-0.5 sm:mb-1" />
              <p className="text-[8px] sm:text-[10px] text-blue-100">Pending Tasks</p>
              <p className="text-base sm:text-lg font-bold text-white">12</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-2 sm:p-3 shadow-lg shadow-purple-200">
              <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white mb-0.5 sm:mb-1" />
              <p className="text-[8px] sm:text-[10px] text-purple-100">Completed</p>
              <p className="text-base sm:text-lg font-bold text-white">48</p>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-100 shadow-lg shadow-emerald-100/50">
            <h2 className="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">System Health</h2>
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs text-gray-500">Server Status</span>
                <span className="text-[8px] sm:text-[10px] font-medium text-green-600 bg-green-50 px-1.5 sm:px-2 py-0.5 rounded-full">
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs text-gray-500">API Response</span>
                <span className="text-[10px] sm:text-xs font-medium text-emerald-600">120ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs text-gray-500">Active Sessions</span>
                <span className="text-[10px] sm:text-xs font-medium text-blue-600">342</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;