import React from 'react';
import { TrendingUp, Users, MapPin, Clock } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Total Visits', value: '1,234', change: '+12%', icon: TrendingUp, color: 'bg-blue-500' },
    { label: 'Active Users', value: '567', change: '+8%', icon: Users, color: 'bg-green-500' },
    { label: 'Locations', value: '42', change: '+3', icon: MapPin, color: 'bg-purple-500' },
    { label: 'Avg. Duration', value: '2.4h', change: '-5%', icon: Clock, color: 'bg-orange-500' },
  ];

  const recentVisits = [
    { id: 1, user: 'John Smith', location: 'Downtown Office', time: '10 min ago', status: 'completed' },
    { id: 2, user: 'Emma Wilson', location: 'North Warehouse', time: '25 min ago', status: 'in-progress' },
    { id: 3, user: 'Michael Chen', location: 'Tech Hub', time: '1 hour ago', status: 'completed' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, Super Admin</h1>
        <p className="text-gray-600">Here's what's happening with your visits today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className={`text-sm font-medium ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Visits */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Recent Visits</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentVisits.map((visit) => (
              <div key={visit.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    visit.status === 'completed' ? 'bg-green-500' :
                    visit.status === 'in-progress' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{visit.user}</p>
                    <p className="text-xs text-gray-500">{visit.location}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{visit.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;