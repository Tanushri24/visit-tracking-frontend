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
  Plus
} from 'lucide-react';
import StatsCard from './Components/StatsCards';
import FilterMenu from './Components/FilterMenu';
import FilterChips from './Components/FilterChips';
import UserTable from './Components/UserTable';
import UserCard from './Components/UserCard';
import UserFormModal from './Components/UserFormModal';
import DeleteConfirmModal from './Components/DeleteConfirmModal';

// Mock data for dropdowns
const designations = [
  { id: 1, name: 'Sales Executive' },
  { id: 2, name: 'Team Lead' },
  { id: 3, name: 'Regional Manager' },
  { id: 4, name: 'Software Developer' },
  { id: 5, name: 'HR Manager' },
  { id: 6, name: 'Marketing Executive' },
  { id: 7, name: 'Finance Manager' }
];

const departments = [
  { id: 1, name: 'Sales' },
  { id: 2, name: 'Marketing' },
  { id: 3, name: 'IT' },
  { id: 4, name: 'HR' },
  { id: 5, name: 'Finance' },
  { id: 6, name: 'Operations' }
];

const managers = [
  { id: 1, name: 'Amit Verma' },
  { id: 2, name: 'Neha Kapoor' },
  { id: 3, name: 'Rajesh Kumar' },
  { id: 4, name: 'Priya Singh' },
  { id: 5, name: 'Super Admin' },
  { id: 6, name: 'Vikram Sharma' }
];

const locations = [
  { id: 1, name: 'Mumbai' },
  { id: 2, name: 'Delhi' },
  { id: 3, name: 'Bangalore' },
  { id: 4, name: 'Pune' },
  { id: 5, name: 'Hyderabad' },
  { id: 6, name: 'Chennai' },
  { id: 7, name: 'Kolkata' }
];

const userRoles = [
  { id: 1, name: 'Admin' },
  { id: 2, name: 'Manager' },
  { id: 3, name: 'User' }
];

interface User {
  id: number;
  employeeCode: string;
  fullName: string;
  email: string;
  mobile: string;
  designation: string;
  department: string;
  role: string;
  reportingManager: string;
  location: string;
  isActive: boolean;
  password?: string;
}

const UserManagement: React.FC = () => {
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form state with all registration fields
  const [formData, setFormData] = useState({
    employeeCode: '',
    fullName: '',
    email: '',
    mobile: '',
    designation: '',
    department: '',
    role: '',
    reportingManager: '',
    location: '',
    password: '',
    confirmPassword: '',
    isActive: true
  });

  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Ref for outside click detection
  const filterRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      employeeCode: "USR001",
      fullName: "Rahul Sharma",
      email: "rahul@company.com",
      mobile: "9876543210",
      designation: "Sales Executive",
      department: "Sales",
      role: "Employee",
      reportingManager: "Amit Verma",
      location: "Mumbai",
      isActive: true,
    },
    {
      id: 2,
      employeeCode: "USR002",
      fullName: "Priya Singh",
      email: "priya@company.com",
      mobile: "9123456780",
      designation: "Team Lead",
      department: "Marketing",
      role: "Manager",
      reportingManager: "Neha Kapoor",
      location: "Delhi",
      isActive: true,
    },
    {
      id: 3,
      employeeCode: "USR003",
      fullName: "Amit Verma",
      email: "amit@company.com",
      mobile: "9988776655",
      designation: "Regional Manager",
      department: "Sales",
      role: "Admin",
      reportingManager: "Super Admin",
      location: "Bangalore",
      isActive: false,
    },
  ]);

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
      if (modalRef.current && !modalRef.current.contains(event.target as Node) && showAddModal) {
        setShowAddModal(false);
        setEditingUser(null);
        resetForm();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAddModal]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedRole('all');
    setSelectedStatus('all');
    setSelectedDepartment('all');
  };

  // Check if any filter is active
  const hasActiveFilters = searchQuery !== '' || selectedRole !== 'all' || selectedStatus !== 'all' || selectedDepartment !== 'all';

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.employeeCode) newErrors.employeeCode = 'User code is required';
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
    else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Mobile number must be 10 digits';
    if (!formData.designation) newErrors.designation = 'Designation is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.reportingManager) newErrors.reportingManager = 'Reporting manager is required';
    if (!formData.location) newErrors.location = 'Location is required';
    
    if (!editingUser) {
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Add new user
  const handleAddUser = () => {
    if (!validateForm()) return;
    
    const newId = Math.max(...users.map(u => u.id), 0) + 1;
    const newUser: User = {
      id: newId,
      employeeCode: formData.employeeCode,
      fullName: formData.fullName,
      email: formData.email,
      mobile: formData.mobile,
      designation: formData.designation,
      department: formData.department,
      role: formData.role,
      reportingManager: formData.reportingManager,
      location: formData.location,
      isActive: formData.isActive,
      password: formData.password
    };
    setUsers([...users, newUser]);
    setShowAddModal(false);
    resetForm();
  };

  // Update user
  const handleUpdateUser = () => {
    if (!validateForm()) return;
    
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id ? { 
          ...user, 
          employeeCode: formData.employeeCode,
          fullName: formData.fullName,
          email: formData.email,
          mobile: formData.mobile,
          designation: formData.designation,
          department: formData.department,
          role: formData.role,
          reportingManager: formData.reportingManager,
          location: formData.location,
          isActive: formData.isActive,
          ...(formData.password && { password: formData.password })
        } : user
      ));
      setShowAddModal(false);
      setEditingUser(null);
      resetForm();
    }
  };

  // Delete user
  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
    setShowDeleteConfirm(null);
  };

  // Edit user
  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      employeeCode: user.employeeCode,
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
      designation: user.designation,
      department: user.department,
      role: user.role,
      reportingManager: user.reportingManager,
      location: user.location,
      password: '',
      confirmPassword: '',
      isActive: user.isActive
    });
    setErrors({});
    setShowAddModal(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      employeeCode: '',
      fullName: '',
      email: '',
      mobile: '',
      designation: '',
      department: '',
      role: '',
      reportingManager: '',
      location: '',
      password: '',
      confirmPassword: '',
      isActive: true
    });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // Filter users based on search, role, status, and department
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === '' || 
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.employeeCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'active' && user.isActive) ||
                         (selectedStatus === 'inactive' && !user.isActive);
    const matchesDepartment = selectedDepartment === 'all' || user.department === selectedDepartment;
    return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
  });

  // Export to CSV function similar to AllVisits
  const exportToCSV = () => {
    const headers = [
      'User Code', 'Full Name', 'Email', 'Mobile', 'Designation',
      'Department', 'Role', 'Reporting Manager', 'Location', 'Status'
    ];
    
    const csvData = filteredUsers.map(user => [
      user.employeeCode,
      user.fullName,
      user.email,
      user.mobile,
      user.designation,
      user.department,
      user.role,
      user.reportingManager,
      user.location,
      user.isActive ? 'Active' : 'Inactive'
    ]);

    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const STATS_CARDS = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      borderColor: "border-l-blue-500",
      change: "+12%",
      changeType: "positive" as const
    },
    {
      label: "Active Users",
      value: activeUsers,
      icon: UserCheck,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      borderColor: "border-l-green-500",
      change: `${activePercentage}%`,
      changeType: "positive" as const
    },
    {
      label: "Inactive Users",
      value: inactiveUsers,
      icon: UserX,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      borderColor: "border-l-red-500",
      change: `${100 - Number(activePercentage)}%`,
      changeType: "negative" as const
    },
    {
      label: "Departments",
      value: uniqueDepartments,
      icon: Briefcase,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      borderColor: "border-l-purple-500",
      change: "Active",
      changeType: "positive" as const
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
        
        {/* Add User Button */}
        <button
          onClick={() => {
            resetForm();
            setEditingUser(null);
            setShowAddModal(true);
          }}
          className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-xs sm:text-sm font-medium shadow-md hover:shadow-lg"
        >
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Add New User
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5">
        {STATS_CARDS.map((stat, i) => (
          <StatsCard key={i} {...stat} />
        ))}
      </div>

      {/* Search, Export & Filter Buttons Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name, email, code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Export Button - Similar to AllVisits */}
          <button 
            onClick={exportToCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium text-gray-700"
          >
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

            <FilterMenu
              showFilterMenu={showFilterMenu}
              selectedRole={selectedRole}
              selectedStatus={selectedStatus}
              selectedDepartment={selectedDepartment}
              roleOptions={roleOptions}
              statusOptions={statusOptions}
              departmentOptions={departmentOptions}
              hasActiveFilters={hasActiveFilters}
              onRoleChange={setSelectedRole}
              onStatusChange={setSelectedStatus}
              onDepartmentChange={setSelectedDepartment}
              onClearFilters={clearFilters}
              onClose={() => setShowFilterMenu(false)}
            />
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <FilterChips
        selectedRole={selectedRole}
        selectedStatus={selectedStatus}
        selectedDepartment={selectedDepartment}
        searchQuery={searchQuery}
        onClearRole={() => setSelectedRole('all')}
        onClearStatus={() => setSelectedStatus('all')}
        onClearDepartment={() => setSelectedDepartment('all')}
        onClearSearch={() => setSearchQuery('')}
        onClearAll={clearFilters}
      />

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
        <UserTable
          users={filteredUsers}
          onEdit={handleEditUser}
          onDelete={(id) => setShowDeleteConfirm(id)}
        />
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-2.5">
        {filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={handleEditUser}
            onDelete={(id) => setShowDeleteConfirm(id)}
          />
        ))}
        {filteredUsers.length === 0 && (
          <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
            <Users className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-400 text-sm font-medium">No users found</p>
            <p className="text-xs text-gray-300 mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Add/Edit User Modal */}
      <UserFormModal
        isOpen={showAddModal}
        editingUser={editingUser}
        formData={formData}
        errors={errors}
        showPassword={showPassword}
        showConfirmPassword={showConfirmPassword}
        designations={designations}
        departments={departments}
        userRoles={userRoles}
        managers={managers}
        locations={locations}
        onClose={() => {
          setShowAddModal(false);
          setEditingUser(null);
          resetForm();
        }}
        onInputChange={handleInputChange}
        onTogglePassword={() => setShowPassword(!showPassword)}
        onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
        onSubmit={editingUser ? handleUpdateUser : handleAddUser}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteConfirm !== null}
        onConfirm={() => handleDeleteUser(showDeleteConfirm!)}
        onCancel={() => setShowDeleteConfirm(null)}
      />

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