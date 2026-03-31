import React, { useState, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
  LayoutDashboard, Download, Filter,
  Calendar as CalendarIcon, Users, MapPin, Activity, TrendingUp,
  ChevronRight, MapPin as MapIcon
} from 'lucide-react';
import {
  STATS_CARDS,
  CHART_DATA,
  RECENT_VISITS,
  POPULAR_LOCATIONS,
  SCHEDULE_ITEMS
} from '../data/data';
import { useDashboardFilter } from '../Hooks/useDashboardFilter';
import type { 
  StatCard as StatCardType, 
  ChartData, 
  Visit, 
  Location, 
  ScheduleItem,
  TimeRange
} from '../types/super-admin.types';

// Define Value type for Calendar
type ValuePiece = Date | null;
type CalendarValue = ValuePiece | [ValuePiece, ValuePiece];

// Simple Stat Card Component with proper typing
const StatCard = ({ stat }: { stat: StatCardType }) => (
  <div className={`bg-white rounded-lg p-2 sm:p-3 border-l-4 ${stat.borderColor} border border-gray-100 shadow-lg ${stat.shadowColor} hover:shadow-xl transition-all`}>
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
    <div className={`w-full h-0.5 sm:h-1 ${stat.lightBg} rounded-full mt-1 sm:mt-2 overflow-hidden`}>
      <div className={`h-full ${stat.iconBg} rounded-full`} style={{ width: '70%' }} />
    </div>
  </div>
);

// Simple Line Chart Component with proper typing
const LineChart = ({ data }: { data: ChartData[] }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="relative h-24 sm:h-28 md:h-32 mt-2">
      <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        <path
          d={`M ${data.map((d, i) => `${(i * 40) + 20},${100 - (d.value / maxValue) * 80}`).join(' L ')} L 260,95 L 20,95 Z`}
          fill="url(#purpleGradient)"
        />
        
        <path
          d={`M ${data.map((d, i) => `${(i * 40) + 20},${100 - (d.value / maxValue) * 80}`).join(' L ')}`}
          fill="none"
          stroke="#a855f7"
          strokeWidth="2.5"
          className="drop-shadow-sm"
        />
        
        {data.map((d, i) => (
          <circle
            key={i}
            cx={(i * 40) + 20}
            cy={100 - (d.value / maxValue) * 80}
            r="3"
            fill="#a855f7"
            stroke="white"
            strokeWidth="2"
          />
        ))}
      </svg>
      <div className="flex justify-between px-1 sm:px-2 mt-1">
        {data.map((d, i) => (
          <span key={i} className="text-[6px] sm:text-[7px] md:text-[8px] text-gray-400">{d.day}</span>
        ))}
      </div>
    </div>
  );
};

// Simple Recent Visit Item with proper typing
const RecentVisitItem = ({ visit }: { visit: Visit }) => (
  <div className="p-2 sm:p-3 hover:bg-purple-50/30 transition-colors">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-white rounded-md flex items-center justify-center text-white text-[8px] sm:text-[10px] font-medium shadow-sm">
          {visit.avatar}
        </div>
        <div>
          <p className="text-[10px] sm:text-xs font-medium text-gray-800">{visit.user}</p>
          <div className="flex items-center gap-0.5 sm:gap-1 text-[8px] sm:text-[10px] text-gray-500">
            <MapPin className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
            <span className="truncate max-w-[80px] sm:max-w-[120px] md:max-w-[150px]">{visit.location}</span>
          </div>
        </div>
      </div>
      <span className="text-[8px] sm:text-[10px] text-gray-400 whitespace-nowrap ml-1">{visit.time}</span>
    </div>
  </div>
);

// Simple Location Item with proper typing
const LocationItem = ({ location }: { location: Location }) => (
  <div>
    <div className="flex items-center justify-between text-[10px] sm:text-xs mb-1">
      <span className="text-gray-700 truncate max-w-[100px] sm:max-w-[150px]">{location.name}</span>
      <span className="font-medium text-gray-800 ml-1">{location.count}</span>
    </div>
    <div className="w-full h-1 sm:h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div 
        className="h-full bg-purple-500 rounded-full"
        style={{ width: `${(location.count / 150) * 100}%` }}
      />
    </div>
  </div>
);

// Simple Schedule Item with proper typing
const ScheduleItemComp = ({ item }: { item: ScheduleItem }) => (
  <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 hover:bg-purple-50 rounded-lg transition-colors">
    <span className="text-[8px] sm:text-[10px] font-medium text-purple-600 w-12 sm:w-16">{item.time}</span>
    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-500 rounded-full flex-shrink-0" />
    <p className="text-[10px] sm:text-xs text-gray-700 truncate">{item.title}</p>
  </div>
);

// Main Dashboard Component
const SuperAdminDashboard: React.FC = () => {
  const {
    filterState,
    showDatePicker,
    filterLabel,
    handleTimeRangeChange,
    handleDateSelect,
    toggleDatePicker,
    setShowDatePicker
  } = useDashboardFilter();

  const [showFilterMenu, setShowFilterMenu] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Refs for outside click detection
  const filterRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilterMenu(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowDatePicker]);

  // Handle calendar date change with proper type
  const handleCalendarChange = (value: CalendarValue) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      setShowCalendar(false);
    }
  };

  const timeRangeOptions = [
    { label: 'Today', value: 'today' },
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' },
    { label: 'Custom', value: 'custom' }
  ];

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-5 bg-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
        <div className="flex items-center gap-2">
          <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg">
            <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
          </div>
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Dashboard</h1>
          <span className="text-[8px] sm:text-xs bg-purple-100 text-purple-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ml-1 sm:ml-2">
            Super Admin
          </span>
        </div>
        
        {/* Action Buttons Group - Filter, Export, Calendar together */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Export Button */}
          <button className="p-1.5 sm:px-3 sm:py-1.5 bg-white text-purple-600 text-xs rounded-lg hover:bg-purple-50 border border-purple-200 flex items-center gap-1">
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>
          
          {/* Filter Button with Dropdown */}
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="p-1.5 sm:px-3 sm:py-1.5 bg-white rounded-lg border border-purple-200 hover:bg-purple-50 flex items-center gap-1"
            >
              <Filter className="w-3.5 h-3.5 text-purple-600" />
              <span className="hidden sm:inline text-xs text-gray-600">{filterLabel}</span>
            </button>

            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-lg shadow-xl border border-purple-100 p-1 sm:p-2 z-50">
                {timeRangeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      if (option.value === 'custom') {
                        toggleDatePicker();
                      } else {
                        handleTimeRangeChange(option.value as TimeRange);
                      }
                      setShowFilterMenu(false);
                    }}
                    className={`w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg hover:bg-purple-50 ${
                      filterState.timeRange === option.value ? 'text-purple-600 bg-purple-50' : 'text-gray-600'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Calendar Button with Dropdown */}
          <div className="relative" ref={calendarRef}>
            <button 
              onClick={() => setShowCalendar(!showCalendar)}
              className="p-1.5 sm:p-1.5 bg-white rounded-lg hover:bg-purple-50 border border-purple-200"
            >
              <CalendarIcon className="w-3.5 h-3.5 text-purple-600" />
            </button>
            
            {showCalendar && (
              <div className="absolute right-0 mt-2 z-50">
                <Calendar
                  onChange={handleCalendarChange}
                  value={selectedDate}
                  className="!w-64 sm:!w-auto rounded-lg shadow-xl border border-purple-100 text-xs sm:text-sm"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Date Picker with Ref */}
      {showDatePicker && (
        <div className="relative" ref={datePickerRef}>
          <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-white rounded-lg shadow-xl border border-purple-100 p-3 sm:p-4 z-50">
            <div className="space-y-2 sm:space-y-3">
              <div>
                <label className="text-[10px] sm:text-xs text-gray-600 mb-1 block">Start Date</label>
                <input
                  type="date"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDateSelect(new Date(e.target.value), filterState.endDate)}
                  className="w-full p-1.5 sm:p-2 text-xs sm:text-sm border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="text-[10px] sm:text-xs text-gray-600 mb-1 block">End Date</label>
                <input
                  type="date"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDateSelect(filterState.startDate, new Date(e.target.value))}
                  className="w-full p-1.5 sm:p-2 text-xs sm:text-sm border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex gap-2 pt-1 sm:pt-2">
                <button
                  onClick={() => setShowDatePicker(false)}
                  className="flex-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-purple-600 text-white text-xs rounded-lg hover:bg-purple-700"
                >
                  Apply
                </button>
                <button
                  onClick={() => setShowDatePicker(false)}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 text-gray-600 text-xs rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
        {STATS_CARDS.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
          {/* Chart Card */}
          <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-100 shadow-lg shadow-purple-100">
            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 mb-3 sm:mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1 sm:p-1.5 bg-purple-100 rounded-md">
                  <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" />
                </div>
                <h2 className="text-xs sm:text-sm font-medium text-gray-700">Weekly Activity</h2>
              </div>
              <span className="text-[8px] sm:text-[10px] bg-purple-50 text-purple-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center gap-1 self-start xs:self-auto">
                <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                +23%
              </span>
            </div>
            <LineChart data={CHART_DATA} />
          </div>

          {/* Recent Visits */}
          <div className="bg-white rounded-lg border border-gray-100 shadow-lg shadow-purple-100/50">
            <div className="p-2 sm:p-3 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" />
                  <h2 className="text-xs sm:text-sm font-medium text-gray-700">Recent Visits</h2>
                </div>
                <button className="text-[10px] sm:text-xs text-purple-600 hover:text-purple-700 flex items-center">
                  View all <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-0.5" />
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-100 max-h-[300px] sm:max-h-[350px] overflow-y-auto">
              {RECENT_VISITS.map((visit, index) => (
                <RecentVisitItem key={index} visit={visit} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-3 sm:space-y-4">
          {/* Schedule */}
          <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-100 shadow-lg shadow-purple-100">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
              <div className="p-1 sm:p-1.5 bg-purple-100 rounded-md">
                <CalendarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" />
              </div>
              <h2 className="text-xs sm:text-sm font-medium text-gray-700">Today's Schedule</h2>
            </div>
            <div className="space-y-1 sm:space-y-2">
              {SCHEDULE_ITEMS.map((item, index) => (
                <ScheduleItemComp key={index} item={item} />
              ))}
            </div>
          </div>

          {/* Popular Locations */}
          <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-100 shadow-lg shadow-purple-100">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
              <div className="p-1 sm:p-1.5 bg-purple-100 rounded-md">
                <MapIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" />
              </div>
              <h2 className="text-xs sm:text-sm font-medium text-gray-700">Popular Locations</h2>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {POPULAR_LOCATIONS.map((loc, index) => (
                <LocationItem key={index} location={loc} />
              ))}
            </div>
          </div>

          {/* Quick Actions - Only Add User */}
          <div className="grid grid-cols-1 gap-2">
            <button className="p-2 sm:p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow-lg shadow-indigo-200 hover:shadow-xl transition-all">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white mb-0.5 sm:mb-1" />
              <p className="text-[10px] sm:text-xs font-medium text-white">Add User</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;