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
  ScheduleItem 
} from '../types/super-admin.types';

// Simple Stat Card Component with proper typing
const StatCard = ({ stat }: { stat: StatCardType }) => (
  <div className={`bg-white rounded-lg p-3 border-l-4 ${stat.borderColor} border border-gray-100 shadow-lg ${stat.shadowColor} hover:shadow-xl transition-all`}>
    <div className="flex items-start justify-between mb-2">
      <div className={`p-1.5 ${stat.iconBg} rounded-md`}>
        <stat.icon className={`w-3.5 h-3.5 ${stat.iconColor}`} />
      </div>
      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
        stat.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
      }`}>
        {stat.change}
      </span>
    </div>
    <h3 className="text-base font-bold text-gray-800">{stat.value}</h3>
    <p className="text-[10px] text-gray-500 mt-0.5">{stat.label}</p>
    <div className={`w-full h-1 ${stat.lightBg} rounded-full mt-2 overflow-hidden`}>
      <div className={`h-full ${stat.iconBg} rounded-full`} style={{ width: '70%' }} />
    </div>
  </div>
);

// Simple Line Chart Component with proper typing
const LineChart = ({ data }: { data: ChartData[] }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="relative h-32 mt-2">
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
      <div className="flex justify-between px-2 mt-1">
        {data.map((d, i) => (
          <span key={i} className="text-[8px] text-gray-400">{d.day}</span>
        ))}
      </div>
    </div>
  );
};

// Simple Recent Visit Item with proper typing
const RecentVisitItem = ({ visit }: { visit: Visit }) => (
  <div className="p-3 hover:bg-purple-50/30 transition-colors">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-md flex items-center justify-center text-white text-[10px] font-medium shadow-sm">
          {visit.avatar}
        </div>
        <div>
          <p className="text-xs font-medium text-gray-800">{visit.user}</p>
          <div className="flex items-center gap-1 text-[10px] text-gray-500">
            <MapPin className="w-2.5 h-2.5" />
            <span>{visit.location}</span>
          </div>
        </div>
      </div>
      <span className="text-[10px] text-gray-400">{visit.time}</span>
    </div>
  </div>
);

// Simple Location Item with proper typing
const LocationItem = ({ location }: { location: Location }) => (
  <div>
    <div className="flex items-center justify-between text-xs mb-1">
      <span className="text-gray-700">{location.name}</span>
      <span className="font-medium text-gray-800">{location.count}</span>
    </div>
    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div 
        className="h-full bg-purple-500 rounded-full"
        style={{ width: `${(location.count / 150) * 100}%` }}
      />
    </div>
  </div>
);

// Simple Schedule Item with proper typing
const ScheduleItemComp = ({ item }: { item: ScheduleItem }) => (
  <div className="flex items-center gap-2 p-2 hover:bg-purple-50 rounded-lg transition-colors">
    <span className="text-[10px] font-medium text-purple-600 w-16">{item.time}</span>
    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
    <p className="text-xs text-gray-700">{item.title}</p>
  </div>
);

// Main Dashboard Component
const SuperAdminDashboard = () => {
  const {
    filterState,
    showDatePicker,
    filterLabel,
    handleTimeRangeChange,
    handleDateSelect,
    toggleDatePicker,
    setShowDatePicker
  } = useDashboardFilter();

  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Refs for outside click detection
  const filterRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close filter menu if clicked outside
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilterMenu(false);
      }
      
      // Close calendar if clicked outside
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
      
      // Close date picker if clicked outside
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowDatePicker]);

  const timeRangeOptions = [
    { label: 'Today', value: 'today' },
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' },
    { label: 'Custom', value: 'custom' }
  ];

  return (
    <div className="p-4 md:p-6 space-y-5 bg-gradient-to-br from-purple-50 via-white to-purple-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-100 rounded-lg">
            <LayoutDashboard className="w-5 h-5 text-purple-600" />
          </div>
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full ml-2">
            Super Admin
          </span>
        </div>
        
        {/* Filter Button with Ref */}
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-purple-200 hover:bg-purple-50"
          >
            <Filter className="w-3.5 h-3.5 text-purple-600" />
            <span className="text-xs text-gray-600">{filterLabel}</span>
          </button>

          {showFilterMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-purple-100 p-2 z-50">
              {timeRangeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    if (option.value === 'custom') {
                      toggleDatePicker();
                    } else {
                      handleTimeRangeChange(option.value as any);
                    }
                    setShowFilterMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-purple-50 ${
                    filterState.timeRange === option.value ? 'text-purple-600 bg-purple-50' : 'text-gray-600'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons - Only Export and Calendar */}
      <div className="flex items-center justify-end gap-2">
        <button className="px-3 py-1.5 bg-white text-purple-600 text-xs rounded-lg hover:bg-purple-50 border border-purple-200 flex items-center gap-1">
          <Download className="w-3.5 h-3.5" />
          Export
        </button>
        
        {/* Calendar Button with Ref */}
        <div className="relative" ref={calendarRef}>
          <button 
            onClick={() => setShowCalendar(!showCalendar)}
            className="p-1.5 bg-white rounded-lg hover:bg-purple-50 border border-purple-200"
          >
            <CalendarIcon className="w-3.5 h-3.5 text-purple-600" />
          </button>
          
          {showCalendar && (
            <div className="absolute right-0 mt-2 z-50">
              <Calendar
                onChange={(value) => {
                  setSelectedDate(value as Date);
                  console.log('Selected date:', value);
                }}
                value={selectedDate}
                className="rounded-lg shadow-xl border border-purple-100"
              />
            </div>
          )}
        </div>
      </div>

      {/* Custom Date Picker with Ref */}
      {showDatePicker && (
        <div className="relative" ref={datePickerRef}>
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-purple-100 p-4 z-50">
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Start Date</label>
                <input
                  type="date"
                  onChange={(e) => handleDateSelect(new Date(e.target.value), filterState.endDate)}
                  className="w-full p-2 text-sm border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600 mb-1 block">End Date</label>
                <input
                  type="date"
                  onChange={(e) => handleDateSelect(filterState.startDate, new Date(e.target.value))}
                  className="w-full p-2 text-sm border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowDatePicker(false)}
                  className="flex-1 px-3 py-1.5 bg-purple-600 text-white text-xs rounded-lg hover:bg-purple-700"
                >
                  Apply
                </button>
                <button
                  onClick={() => setShowDatePicker(false)}
                  className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {STATS_CARDS.map((stat, i) => (
          <StatCard key={i} stat={stat} />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Chart Card */}
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-lg shadow-purple-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-purple-100 rounded-md">
                  <Activity className="w-4 h-4 text-purple-600" />
                </div>
                <h2 className="text-sm font-medium text-gray-700">Weekly Activity</h2>
              </div>
              <span className="text-[10px] bg-purple-50 text-purple-600 px-2 py-1 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +23% vs last week
              </span>
            </div>
            <LineChart data={CHART_DATA} />
          </div>

          {/* Recent Visits */}
          <div className="bg-white rounded-lg border border-gray-100 shadow-lg shadow-purple-100/50">
            <div className="p-3 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-600" />
                  <h2 className="text-sm font-medium text-gray-700">Recent Visits</h2>
                </div>
                <button className="text-xs text-purple-600 hover:text-purple-700 flex items-center">
                  View all <ChevronRight className="w-3 h-3 ml-0.5" />
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {RECENT_VISITS.map((visit) => (
                <RecentVisitItem key={visit.id} visit={visit} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Schedule */}
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-lg shadow-purple-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-purple-100 rounded-md">
                <CalendarIcon className="w-4 h-4 text-purple-600" />
              </div>
              <h2 className="text-sm font-medium text-gray-700">Today's Schedule</h2>
            </div>
            <div className="space-y-2">
              {SCHEDULE_ITEMS.map((item, i) => (
                <ScheduleItemComp key={i} item={item} />
              ))}
            </div>
          </div>

          {/* Popular Locations */}
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-lg shadow-purple-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-purple-100 rounded-md">
                <MapIcon className="w-4 h-4 text-purple-600" />
              </div>
              <h2 className="text-sm font-medium text-gray-700">Popular Locations</h2>
            </div>
            <div className="space-y-3">
              {POPULAR_LOCATIONS.map((loc, i) => (
                <LocationItem key={i} location={loc} />
              ))}
            </div>
          </div>

          {/* Quick Actions - Only Add User */}
          <div className="grid grid-cols-1 gap-2">
            <button className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow-lg shadow-indigo-200 hover:shadow-xl transition-all">
              <Users className="w-5 h-5 text-white mb-1" />
              <p className="text-xs font-medium text-white">Add User</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;