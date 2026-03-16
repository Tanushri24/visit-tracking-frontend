import React from 'react';

const EmployeeDashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Employee Dashboard</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm text-gray-600 mb-1">Total Visits</h3>
          <p className="text-2xl font-bold text-gray-800">24</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm text-gray-600 mb-1">Pending Follow-ups</h3>
          <p className="text-2xl font-bold text-gray-800">5</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm text-gray-600 mb-1">Total Expenses</h3>
          <p className="text-2xl font-bold text-gray-800">₹2,450</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6">
        <h3 className="text-md font-medium mb-3">Quick Actions</h3>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm">
            Start Visit
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
            My Schedule
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
            Submit Expenses
          </button>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="mt-6">
        <h3 className="text-md font-medium mb-3">Today's Schedule</h3>
        <div className="bg-white rounded-lg border border-gray-200 divide-y">
          <div className="p-3 flex justify-between">
            <div>
              <span className="text-sm font-medium text-gray-800">Downtown Office</span>
              <p className="text-xs text-gray-500">Client meeting</p>
            </div>
            <span className="text-xs text-gray-400">10:00 AM</span>
          </div>
          <div className="p-3 flex justify-between">
            <div>
              <span className="text-sm font-medium text-gray-800">North Warehouse</span>
              <p className="text-xs text-gray-500">Inspection</p>
            </div>
            <span className="text-xs text-gray-400">2:00 PM</span>
          </div>
          <div className="p-3 flex justify-between">
            <div>
              <span className="text-sm font-medium text-gray-800">Tech Hub</span>
              <p className="text-xs text-gray-500">Team meeting</p>
            </div>
            <span className="text-xs text-gray-400">4:30 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;