import React from 'react';
import { 
  Eye, Users, MapPin, Clock,
  Calendar, Activity, TrendingUp,
  ChevronRight, LayoutDashboard,
  PlusCircle, Download, Filter,
  MapPin as MapIcon, Star
} from 'lucide-react';

const Dashboard = () => {
  // Stats cards with purple theme
  const stats = [
    { 
      label: 'Total Visits', 
      value: '1,234', 
      change: '+12%',
      icon: Eye,
      borderColor: 'border-l-purple-500',
      shadowColor: 'shadow-purple-100',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      lightBg: 'bg-purple-50'
    },
    { 
      label: 'Active Users', 
      value: '567', 
      change: '+8%',
      icon: Users,
      borderColor: 'border-l-purple-400',
      shadowColor: 'shadow-purple-100',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-500',
      lightBg: 'bg-purple-50'
    },
    { 
      label: 'Locations', 
      value: '42', 
      change: '+3',
      icon: MapPin,
      borderColor: 'border-l-purple-500',
      shadowColor: 'shadow-purple-100',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      lightBg: 'bg-purple-50'
    },
    { 
      label: 'Avg Time', 
      value: '2.4h', 
      change: '-5%',
      icon: Clock,
      borderColor: 'border-l-purple-400',
      shadowColor: 'shadow-purple-100',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-500',
      lightBg: 'bg-purple-50'
    },
  ];

  // Line chart data
  const chartData = [
    { day: 'Mon', value: 30 },
    { day: 'Tue', value: 55 },
    { day: 'Wed', value: 75 },
    { day: 'Thu', value: 45 },
    { day: 'Fri', value: 85 },
    { day: 'Sat', value: 50 },
    { day: 'Sun', value: 35 },
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));

  // Recent visits
  const recentVisits = [
    { id: 1, user: 'John Smith', location: 'Downtown Office', time: '10 min ago', avatar: 'JS' },
    { id: 2, user: 'Emma Wilson', location: 'North Warehouse', time: '25 min ago', avatar: 'EW' },
    { id: 3, user: 'Michael Chen', location: 'Tech Hub', time: '1 hour ago', avatar: 'MC' },
    { id: 4, user: 'Sarah Johnson', location: 'South Branch', time: '2 hours ago', avatar: 'SJ' },
    { id: 5, user: 'David Brown', location: 'East Facility', time: '3 hours ago', avatar: 'DB' },
  ];

  return (
    <div className="p-4 md:p-6 space-y-5 bg-gradient-to-br from-purple-50 via-white to-purple-50 min-h-screen">
      {/* Simple Title with Icon */}
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-purple-100 rounded-lg">
          <LayoutDashboard className="w-5 h-5 text-purple-600" />
        </div>
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full ml-2">Super Admin</span>
      </div>

      {/* Action Buttons Row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-purple-600 text-white text-xs rounded-lg hover:bg-purple-700 flex items-center gap-1 shadow-sm shadow-purple-200">
            <PlusCircle className="w-3.5 h-3.5" />
            New Visit
          </button>
          <button className="px-3 py-1.5 bg-white text-purple-600 text-xs rounded-lg hover:bg-purple-50 border border-purple-200 flex items-center gap-1">
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 bg-white rounded-lg hover:bg-purple-50 border border-purple-200">
            <Filter className="w-3.5 h-3.5 text-purple-600" />
          </button>
          <button className="p-1.5 bg-white rounded-lg hover:bg-purple-50 border border-purple-200">
            <Calendar className="w-3.5 h-3.5 text-purple-600" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <div 
            key={i}
            className={`bg-white rounded-lg p-3 border-l-4 ${stat.borderColor} border border-gray-100 shadow-lg ${stat.shadowColor} hover:shadow-xl transition-all`}
          >
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
              <div className={`h-full ${stat.iconBg} rounded-full`} style={{ width: '70%' }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Line Chart Card */}
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-lg shadow-purple-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-purple-100 rounded-md">
                  <Activity className="w-4 h-4 text-purple-600" />
                </div>
                <h2 className="text-sm font-medium text-gray-700">Weekly Activity</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-purple-50 text-purple-600 px-2 py-1 rounded-full flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +23% vs last week
                </span>
              </div>
            </div>

            {/* Line Chart */}
            <div className="relative h-32 mt-2">
              <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                <path
                  d={`M ${chartData.map((d, i) => `${(i * 40) + 20},${100 - (d.value / maxValue) * 80}`).join(' L ')} L 260,95 L 20,95 Z`}
                  fill="url(#purpleGradient)"
                />
                
                <path
                  d={`M ${chartData.map((d, i) => `${(i * 40) + 20},${100 - (d.value / maxValue) * 80}`).join(' L ')}`}
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="2.5"
                  className="drop-shadow-sm"
                />
                
                {chartData.map((d, i) => (
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
                {chartData.map((d, i) => (
                  <span key={i} className="text-[8px] text-gray-400">{d.day}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Visits Card */}
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
              {recentVisits.map((visit) => (
                <div key={visit.id} className="p-3 hover:bg-purple-50/30 transition-colors">
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
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Today's Schedule */}
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-lg shadow-purple-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-purple-100 rounded-md">
                <Calendar className="w-4 h-4 text-purple-600" />
              </div>
              <h2 className="text-sm font-medium text-gray-700">Today's Schedule</h2>
            </div>

            <div className="space-y-2">
              {[
                { time: '09:00 AM', title: 'Downtown Office' },
                { time: '11:30 AM', title: 'Team Meeting' },
                { time: '02:00 PM', title: 'Site Inspection' },
                { time: '04:30 PM', title: 'Client Call' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-2 hover:bg-purple-50 rounded-lg transition-colors">
                  <span className="text-[10px] font-medium text-purple-600 w-16">{item.time}</span>
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  <p className="text-xs text-gray-700">{item.title}</p>
                </div>
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
              {[
                { name: 'Downtown Office', count: 145 },
                { name: 'North Warehouse', count: 98 },
                { name: 'Tech Hub', count: 87 },
                { name: 'South Branch', count: 76 },
              ].map((loc, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-700">{loc.name}</span>
                    <span className="font-medium text-gray-800">{loc.count}</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${(loc.count / 150) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg shadow-purple-200 hover:shadow-xl transition-all">
              <PlusCircle className="w-5 h-5 text-white mb-1" />
              <p className="text-xs font-medium text-white">New Visit</p>
            </button>
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

export default Dashboard;