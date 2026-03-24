// src/modules/super-admin/pages/master-management/UserManagement.tsx

import React, { useState, useRef, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Briefcase,
  Download,
  Filter as FilterIcon,
  Search,
  Mail,
  Phone,
  Building2,
  UserCog,
  X
} from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  mobile: string;
  designation: string;
  department: string;
  role: string;
  manager: string;
  isActive: boolean;
}

const UserManagement: React.FC = () => {
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  // Ref for outside click detection
  const filterRef = useRef<HTMLDivElement>(null);

  const users: User[] = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@company.com",
      mobile: "9876543210",
      designation: "Sales Executive",
      department: "Sales",
      role: "Employee",
      manager: "Amit Verma",
      isActive: true,
    },
    {
      id: 2,
      name: "Priya Singh",
      email: "priya@company.com",
      mobile: "9123456780",
      designation: "Team Lead",
      department: "Marketing",
      role: "Manager",
      manager: "Neha Kapoor",
      isActive: true,
    },
    {
      id: 3,
      name: "Amit Verma",
      email: "amit@company.com",
      mobile: "9988776655",
      designation: "Regional Manager",
      department: "Sales",
      role: "Admin",
      manager: "Super Admin",
      isActive: false,
    },
  ];

  // Calculate KPI metrics
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.isActive).length;
  const inactiveUsers = users.filter(user => !user.isActive).length;
  const activePercentage = totalUsers > 0 ? ((activeUsers / totalUsers) * 100).toFixed(1) : 0;
  const uniqueDepartments = new Set(users.map(user => user.department)).size;

  // Get unique departments for filter
  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    ...Array.from(new Set(users.map(user => user.department))).map(dept => ({
      value: dept,
      label: dept
    }))
  ];

  // Filter options
  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'Admin', label: 'Admin' },
    { value: 'Manager', label: 'Manager' },
    { value: 'Employee', label: 'Employee' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilterMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedRole('all');
    setSelectedStatus('all');
    setSelectedDepartment('all');
  };

  // Check if any filter is active
  const hasActiveFilters = searchQuery !== '' || selectedRole !== 'all' || selectedStatus !== 'all' || selectedDepartment !== 'all';

  // Filter users based on search, role, status, and department
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === '' || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.designation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'active' && user.isActive) ||
                         (selectedStatus === 'inactive' && !user.isActive);
    const matchesDepartment = selectedDepartment === 'all' || user.department === selectedDepartment;
    return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
  });

  const STATS_CARDS = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      borderColor: "border-l-blue-500",
      change: "+12%",
      changeType: "positive"
    },
    {
      label: "Active Users",
      value: activeUsers,
      icon: UserCheck,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      borderColor: "border-l-green-500",
      change: `${activePercentage}%`,
      changeType: "positive"
    },
    {
      label: "Inactive Users",
      value: inactiveUsers,
      icon: UserX,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      borderColor: "border-l-red-500",
      change: `${100 - Number(activePercentage)}%`,
      changeType: "negative"
    },
    {
      label: "Departments",
      value: uniqueDepartments,
      icon: Briefcase,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      borderColor: "border-l-purple-500",
      change: "Active",
      changeType: "positive"
    }
  ];

  return (
    <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6 space-y-3 sm:space-y-4 md:space-y-5 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 md:p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl shadow-lg shadow-blue-200">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">User Management</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Manage and monitor all users across your organization</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5">
        {STATS_CARDS.map((stat, i) => (
          <div 
            key={i}
            className={`bg-white rounded-lg p-2.5 sm:p-3 border-l-4 ${stat.borderColor} border border-gray-100 shadow-sm hover:shadow-md transition-all`}
          >
            <div className="flex items-start justify-between mb-1.5 sm:mb-2">
              <div className={`p-1.5 ${stat.iconBg} rounded-md`}>
                <stat.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${stat.iconColor}`} />
              </div>
              <span className={`text-[9px] sm:text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                stat.changeType === 'positive' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">{stat.value}</h3>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 font-medium">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search, Export & Filter Buttons Row */}
      <div className=" flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />
        </div>

        {/* Action Buttons */}
        <div className=" flex items-center gap-2">
          {/* Export Button */}
          <button className="bg:colinline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium text-gray-700">
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
          
          {/* Filter Button */}
          <div className="relative" ref={filterRef}>
            <button 
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium text-gray-700"
            >
              <FilterIcon className="w-3.5 h-3.5" />
              Filter
              {hasActiveFilters && (
                <span className="ml-0.5 w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
              )}
            </button>

            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 p-3 z-50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-700">Filters</h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <X className="w-3 h-3" />
                      Clear all
                    </button>
                  )}
                </div>
                
                {/* Role Filter */}
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Role</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {roleOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                
                {/* Status Filter */}
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                
                {/* Department Filter */}
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Department</label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {departmentOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                
                <button
                  onClick={() => setShowFilterMenu(false)}
                  className="w-full mt-2 px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] text-gray-500">Active filters:</span>
          {selectedRole !== 'all' && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded-md text-[10px]">
              Role: {selectedRole}
              <button onClick={() => setSelectedRole('all')} className="hover:text-blue-900">
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          )}
          {selectedStatus !== 'all' && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-green-50 text-green-700 rounded-md text-[10px]">
              Status: {selectedStatus === 'active' ? 'Active' : 'Inactive'}
              <button onClick={() => setSelectedStatus('all')} className="hover:text-green-900">
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          )}
          {selectedDepartment !== 'all' && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-purple-50 text-purple-700 rounded-md text-[10px]">
              Dept: {selectedDepartment}
              <button onClick={() => setSelectedDepartment('all')} className="hover:text-purple-900">
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded-md text-[10px]">
              Search: {searchQuery.length > 15 ? searchQuery.substring(0, 15) + '...' : searchQuery}
              <button onClick={() => setSearchQuery('')} className="hover:text-gray-900">
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          )}
          <button
            onClick={clearFilters}
            className="text-[10px] text-red-600 hover:text-red-700 underline"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Designation</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Manager</th>
                <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-xs shadow-sm flex-shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 text-xs sm:text-sm">{user.name}</div>
                        <div className="text-[10px] sm:text-xs text-gray-400">ID: #{user.id}</div>
                      </div>
                    </div>
                   </td>
                  <td className="px-3 py-2.5">
                    <div className="text-xs sm:text-sm text-gray-700 flex items-center gap-1">
                      <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 flex-shrink-0" />
                      <span className="break-all text-xs sm:text-sm">{user.email}</span>
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                      <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400 flex-shrink-0" />
                      <span>{user.mobile}</span>
                    </div>
                   </td>
                  <td className="px-3 py-2.5">
                    <span className="text-xs sm:text-sm text-gray-700">{user.designation}</span>
                   </td>
                  <td className="px-3 py-2.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-lg text-[10px] sm:text-xs font-medium">
                      <Building2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      {user.department}
                    </span>
                   </td>
                  <td className="px-3 py-2.5">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${
                      user.role === 'Admin' ? 'bg-purple-100 text-purple-700' :
                      user.role === 'Manager' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      <UserCog className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      {user.role}
                    </span>
                   </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-100 flex items-center justify-center text-[9px] sm:text-xs font-medium text-gray-600 flex-shrink-0">
                        {user.manager.charAt(0)}
                      </div>
                      <span className="text-xs sm:text-sm text-gray-600">{user.manager}</span>
                    </div>
                   </td>
                  <td className="px-3 py-2.5">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] sm:text-xs font-medium rounded-full ${
                      user.isActive ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"
                    }`}>
                      <span className={`w-1 h-1 rounded-full ${user.isActive ? "bg-green-500" : "bg-red-500"}`}></span>
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                   </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-3">
              <Users className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-400 text-sm font-medium">No users found</p>
            <p className="text-xs text-gray-300 mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-2.5">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 border-b border-gray-100">
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm truncate">{user.name}</h3>
                    <p className="text-[10px] text-gray-400">ID: #{user.id}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] rounded-full flex-shrink-0 ${
                  user.isActive ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"
                }`}>
                  <span className={`w-1 h-1 rounded-full ${user.isActive ? "bg-green-500" : "bg-red-500"}`}></span>
                  {user.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
            
            <div className="p-3 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-medium text-gray-500 flex items-center gap-1 whitespace-nowrap">
                  <Mail className="w-3 h-3" /> EMAIL
                </span>
                <span className="text-xs text-gray-700 text-right break-all">{user.email}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-medium text-gray-500 flex items-center gap-1">
                  <Phone className="w-3 h-3" /> MOBILE
                </span>
                <span className="text-xs text-gray-700">{user.mobile}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-medium text-gray-500">DESIGNATION</span>
                <span className="text-xs text-gray-700 text-right">{user.designation}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-medium text-gray-500">DEPARTMENT</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-lg text-[10px]">
                  <Building2 className="w-2.5 h-2.5" />
                  {user.department}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-medium text-gray-500">ROLE</span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                  user.role === 'Admin' ? 'bg-purple-100 text-purple-700' :
                  user.role === 'Manager' ? 'bg-orange-100 text-orange-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  <UserCog className="w-2.5 h-2.5" />
                  {user.role}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-medium text-gray-500">MANAGER</span>
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[9px] font-medium text-gray-600">
                    {user.manager.charAt(0)}
                  </div>
                  <span className="text-xs text-gray-700">{user.manager}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
            <Users className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-400 text-sm font-medium">No users found</p>
            <p className="text-xs text-gray-300 mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400 pt-2">
        <div>Showing {filteredUsers.length} of {users.length} users</div>
        <div className="flex items-center gap-1.5">
          <button className="px-2.5 py-1 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-xs">
            Previous
          </button>
          <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium">1</span>
          <button className="px-2.5 py-1 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-xs">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;