import React from 'react';

const ManagerDashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Manager Dashboard</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm text-gray-600 mb-1">Team Visits</h3>
          <p className="text-2xl font-bold text-gray-800">156</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm text-gray-600 mb-1">Pending Approvals</h3>
          <p className="text-2xl font-bold text-gray-800">8</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm text-gray-600 mb-1">Team Expenses</h3>
          <p className="text-2xl font-bold text-gray-800">₹12,450</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6">
        <h3 className="text-md font-medium mb-3">Quick Actions</h3>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm">
            Approve Requests
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
            View Team
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
            Generate Report
          </button>
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="mt-6">
        <h3 className="text-md font-medium mb-3">Recent Activity</h3>
        <div className="bg-white rounded-lg border border-gray-200 divide-y">
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-3 flex justify-between">
              <span className="text-sm text-gray-600">Team member requested approval</span>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;