import React from 'react';
import { 
  Users, Settings, FileText, Eye,
  Calendar, MapPin, BarChart3,
  PlusCircle, Download, Filter,
  UserPlus, Shield, Activity,
  Clock, CheckCircle, AlertCircle
} from 'lucide-react';

const AdminDashboard = () => {
  // Stats cards
  const stats = [
    { 
      label: 'Total Users', 
      value: '1,234', 
      change: '+12%',
      icon: Users,
      borderColor: 'border-l-blue-500',
      shadowColor: 'shadow-blue-100',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      lightBg: 'bg-blue-50'
    },
    { 
      label: 'Active Masters', 
      value: '48', 
      change: '+3',
      icon: Settings,
      borderColor: 'border-l-purple-500',
      shadowColor: 'shadow-purple-100',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      lightBg: 'bg-purple-50'
    },
    { 
      label: 'Total Reports', 
      value: '567', 
      change: '+8%',
      icon: FileText,
      borderColor: 'border-l-emerald-500',
      shadowColor: 'shadow-emerald-100',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      lightBg: 'bg-emerald-50'
    },
    { 
      label: 'Active Visits', 
      value: '89', 
      change: '+23%',
      icon: Eye,
      borderColor: 'border-l-orange-500',
      shadowColor: 'shadow-orange-100',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      lightBg: 'bg-orange-50'
    },
  ];

  // Quick actions
  const quickActions = [
    { icon: UserPlus, label: 'Add User', color: 'blue', onClick: () => {} },
    { icon: Settings, label: 'Manage Masters', color: 'purple', onClick: () => {} },
    { icon: FileText, label: 'Generate Report', color: 'emerald', onClick: () => {} },
    { icon: Calendar, label: 'Schedule', color: 'orange', onClick: () => {} },
  ];

  // Recent activities
  const recentActivities = [
    { user: 'John Smith', action: 'added new user', target: 'Emma Wilson', time: '5 min ago', type: 'create' },
    { user: 'Admin', action: 'updated master', target: 'Location Settings', time: '15 min ago', type: 'update' },
    { user: 'Sarah Johnson', action: 'generated report', target: 'Monthly Summary', time: '1 hour ago', type: 'report' },
    { user: 'Michael Chen', action: 'modified permissions', target: 'Manager Role', time: '2 hours ago', type: 'security' },
  ];

  // Pending approvals
  const pendingApprovals = [
    { item: 'New User Registration', count: 5, priority: 'high' },
    { item: 'Master Data Changes', count: 3, priority: 'medium' },
    { item: 'Report Requests', count: 8, priority: 'low' },
  ];

  // Master data stats
  const masterStats = [
    { name: 'Locations', count: 42, icon: MapPin },
    { name: 'Roles', count: 8, icon: Shield },
    { name: 'Permissions', count: 24, icon: Settings },
    { name: 'Categories', count: 15, icon: FileText },
  ];

  return (
    <div className="p-4 md:p-6 space-y-5 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      {/* Header with Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg shadow-blue-200">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
            <p className="text-xs text-gray-500 mt-0.5">Manage users, masters, and reports</p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-lg hover:shadow-lg transition-all flex items-center gap-1">
            <PlusCircle className="w-3.5 h-3.5" />
            Quick Action
          </button>
          <button className="p-1.5 bg-white rounded-lg hover:bg-gray-50 border border-gray-200">
            <Download className="w-3.5 h-3.5 text-gray-600" />
          </button>
          <button className="p-1.5 bg-white rounded-lg hover:bg-gray-50 border border-gray-200">
            <Filter className="w-3.5 h-3.5 text-gray-600" />
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
          </div>
        ))}
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickActions.map((action, i) => (
          <button
            key={i}
            onClick={action.onClick}
            className={`p-4 bg-gradient-to-br from-${action.color}-50 to-white rounded-xl border border-${action.color}-100 hover:shadow-md transition-all group`}
          >
            <action.icon className={`w-5 h-5 text-${action.color}-600 mb-2 group-hover:scale-110 transition-transform`} />
            <p className={`text-xs font-medium text-${action.color}-700`}>{action.label}</p>
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column - 2 columns */}
        <div className="lg:col-span-2 space-y-4">
          {/* Recent Activities */}
          <div className="bg-white rounded-lg border border-gray-100 shadow-lg shadow-blue-100/50">
            <div className="p-3 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <h2 className="text-sm font-medium text-gray-700">Recent Activities</h2>
                </div>
                <button className="text-xs text-blue-600 hover:text-blue-700">
                  View All
                </button>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {recentActivities.map((activity, i) => (
                <div key={i} className="p-3 hover:bg-blue-50/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-[10px] font-medium`}>
                        {activity.user.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs text-gray-700">
                          <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                          <span className="font-medium text-blue-600">{activity.target}</span>
                        </p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{activity.time}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
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
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-lg shadow-purple-100/50">
            <h2 className="text-sm font-medium text-gray-700 mb-3">Master Data Overview</h2>
            <div className="grid grid-cols-2 gap-3">
              {masterStats.map((stat, i) => (
                <div key={i} className="flex items-center gap-2 p-2 hover:bg-purple-50/30 rounded-lg">
                  <div className="p-1.5 bg-purple-100 rounded-md">
                    <stat.icon className="w-3.5 h-3.5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{stat.name}</p>
                    <p className="text-sm font-semibold text-gray-800">{stat.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - 1 column */}
        <div className="space-y-4">
          {/* Pending Approvals */}
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-lg shadow-orange-100/50">
            <h2 className="text-sm font-medium text-gray-700 mb-3">Pending Approvals</h2>
            <div className="space-y-3">
              {pendingApprovals.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      item.priority === 'high' ? 'bg-red-500' :
                      item.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <span className="text-xs text-gray-600">{item.item}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-800">{item.count}</span>
                    <button className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100">
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-3 shadow-lg shadow-blue-200">
              <Clock className="w-4 h-4 text-white mb-1" />
              <p className="text-[10px] text-blue-100">Pending Tasks</p>
              <p className="text-lg font-bold text-white">12</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-3 shadow-lg shadow-purple-200">
              <CheckCircle className="w-4 h-4 text-white mb-1" />
              <p className="text-[10px] text-purple-100">Completed</p>
              <p className="text-lg font-bold text-white">48</p>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-lg shadow-emerald-100/50">
            <h2 className="text-sm font-medium text-gray-700 mb-2">System Health</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Server Status</span>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">API Response</span>
                <span className="text-xs font-medium text-emerald-600">120ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Active Sessions</span>
                <span className="text-xs font-medium text-blue-600">342</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;