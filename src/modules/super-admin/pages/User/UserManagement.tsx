import React, { useState, useRef, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Briefcase,
  Download,
  Filter as FilterIcon,
  Search,
  Plus,
  Loader,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import StatsCard from './Components/StatsCards';
import FilterMenu from './Components/FilterMenu';
import FilterChips from './Components/FilterChips';
import UserTable from './Components/UserTable';
import UserCard from './Components/UserCard';
import UserFormModal from './Components/UserFormModal';
import DeleteConfirmModal from './Components/DeleteConfirmModal';
import { fetchUsers, fetchUserById, createUser, updateUser, deleteUser, type User, type ApiUser, initializeMappings } from '../../services/Userlist';
import { 
  fetchDepartments, 
  fetchDesignations, 
  fetchManagers, 
  fetchLocations, 
  fetchUserRoles 
} from '../../services/userDropdownService';
import { useNavigate } from 'react-router-dom';

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
  const [loading, setLoading] = useState(true);
  const [loadingDropdowns, setLoadingDropdowns] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Dropdown data from API
  const [designations, setDesignations] = useState<Array<{ id: number; name: string }>>([]);
  const [departments, setDepartments] = useState<Array<{ id: number; name: string }>>([]);
  const [managers, setManagers] = useState<Array<{ id: number; name: string }>>([]);
  const [locations, setLocations] = useState<Array<{ id: number; name: string }>>([]);
  const [userRoles, setUserRoles] = useState<Array<{ id: number; name: string }>>([]);
  
  const [formData, setFormData] = useState({
    employeeCode: '',
    fullName: '',
    email: '',
    mobile: '',
    designationId: '',
    departmentId: '',
    roleId: '',
    managerId: '',
    locationId: '',
    password: '',
    confirmPassword: '',
    isActive: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const filterRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [users, setUsers] = useState<User[]>([]);

  // Fetch all data on component mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    setLoadingDropdowns(true);
    try {
      const [usersData, depts, desigs, mgrs, locs, roles] = await Promise.all([
        fetchUsers(),
        fetchDepartments(),
        fetchDesignations(),
        fetchManagers(),
        fetchLocations(),
        fetchUserRoles()
      ]);
      
      initializeMappings(desigs, depts, mgrs, locs, roles);
      const transformedUsers = await fetchUsers();
      
      setUsers(transformedUsers);
      setDepartments(depts);
      setDesignations(desigs);
      setManagers(mgrs);
      setLocations(locs);
      setUserRoles(roles);
    } catch (err) {
      console.error('Failed to load data:', err);
      setError('Failed to load data. Please try again later.');
    } finally {
      setLoading(false);
      setLoadingDropdowns(false);
    }
  };

  const loadUsers = async () => {
    try {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      console.error('Failed to load users:', err);
      setError('Failed to load users. Please try again later.');
    }
  };

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === '' || 
      user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.designation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.employeeCode?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'active' && user.isActive) ||
                         (selectedStatus === 'inactive' && !user.isActive);
    const matchesDepartment = selectedDepartment === 'all' || user.department === selectedDepartment;
    
    return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedRole, selectedStatus, selectedDepartment]);

  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.isActive).length;
  const inactiveUsers = users.filter(user => !user.isActive).length;
  const activePercentage = totalUsers > 0 ? ((activeUsers / totalUsers) * 100).toFixed(1) : 0;
  const uniqueDepartments = new Set(users.map(user => user.department)).size;

  // Dynamic department options from actual data
  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    ...Array.from(new Set(users.map(user => user.department).filter(Boolean))).map(dept => ({
      value: dept,
      label: dept
    }))
  ];

  // Dynamic role options from actual data
  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    ...Array.from(new Set(users.map(user => user.role).filter(Boolean))).map(role => ({
      value: role,
      label: role
    }))
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

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

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedRole('all');
    setSelectedStatus('all');
    setSelectedDepartment('all');
  };

  const hasActiveFilters = searchQuery !== '' || selectedRole !== 'all' || selectedStatus !== 'all' || selectedDepartment !== 'all';

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
    else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Mobile number must be 10 digits';
    if (!formData.designationId) newErrors.designationId = 'Designation is required';
    if (!formData.departmentId) newErrors.departmentId = 'Department is required';
    if (!formData.roleId) newErrors.roleId = 'Role is required';
    
    if (!editingUser) {
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddUser = async () => {
    if (!validateForm()) return;
    
    try {
      const newUserData: Partial<ApiUser> = {
        employeeCode: formData.employeeCode || null,
        fullName: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        roleId: parseInt(formData.roleId),
        designationId: parseInt(formData.designationId),
        departmentId: parseInt(formData.departmentId),
        managerId: formData.managerId ? parseInt(formData.managerId) : null,
        locationId: formData.locationId ? parseInt(formData.locationId) : null,
        isActive: formData.isActive
      };
      
      await createUser(newUserData);
      await loadUsers();
      setShowAddModal(false);
      resetForm();
    } catch (err) {
      console.error('Failed to create user:', err);
      setErrors({ submit: 'Failed to create user. Please try again.' });
    }
  };

  const handleUpdateUser = async () => {
    if (!validateForm() || !editingUser) return;
    
    try {
      const updateUserData: Partial<ApiUser> = {
        id: editingUser.id,
        employeeCode: formData.employeeCode || null,
        fullName: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        roleId: parseInt(formData.roleId),
        designationId: parseInt(formData.designationId),
        departmentId: parseInt(formData.departmentId),
        managerId: formData.managerId ? parseInt(formData.managerId) : null,
        locationId: formData.locationId ? parseInt(formData.locationId) : null,
        isActive: formData.isActive
      };
      
      await updateUser(editingUser.id, updateUserData);
      await loadUsers();
      setShowAddModal(false);
      setEditingUser(null);
      resetForm();
    } catch (err) {
      console.error('Failed to update user:', err);
      setErrors({ submit: 'Failed to update user. Please try again.' });
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      await loadUsers();
      setShowDeleteConfirm(null);
    } catch (err) {
      console.error('Failed to delete user:', err);
      setError('Failed to delete user. Please try again.');
    }
  };

  const handleEditUser = async (user: User) => {
    try {
      const apiUser = await fetchUserById(user.id);
      
      setEditingUser(user);
      setFormData({
        employeeCode: apiUser.employeeCode || '',
        fullName: apiUser.fullName || '',
        email: apiUser.email || '',
        mobile: apiUser.mobile || '',
        designationId: apiUser.designationId ? apiUser.designationId.toString() : '',
        departmentId: apiUser.departmentId ? apiUser.departmentId.toString() : '',
        roleId: apiUser.roleId ? apiUser.roleId.toString() : '',
        managerId: apiUser.managerId ? apiUser.managerId.toString() : '',
        locationId: apiUser.locationId ? apiUser.locationId.toString() : '',
        password: '',
        confirmPassword: '',
        isActive: apiUser.isActive ?? true
      });
      setErrors({});
      setShowAddModal(true);
    } catch (err) {
      console.error('Failed to fetch user details:', err);
      setError('Failed to load user details. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      employeeCode: '',
      fullName: '',
      email: '',
      mobile: '',
      designationId: '',
      departmentId: '',
      roleId: '',
      managerId: '',
      locationId: '',
      password: '',
      confirmPassword: '',
      isActive: true
    });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

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

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pageNumbers.push(i);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i);
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pageNumbers.push(i);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  const STATS_CARDS = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      borderColor: "border-l-blue-500",
      change: `${filteredUsers.length} shown`,
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

  if (loading && loadingDropdowns) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <UserX className="w-12 h-12 mx-auto mb-2" />
            <p>{error}</p>
          </div>
          <button
            onClick={loadAllData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
        
        <button
          onClick={() => {
            navigate('/super-admin/employee-registration');
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

        <div className="flex items-center gap-2">
          <button 
            onClick={exportToCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium text-gray-700"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
          
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
          users={currentItems}
          onEdit={handleEditUser}
          onDelete={(id) => setShowDeleteConfirm(id)}
        />
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-2.5">
        {currentItems.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={handleEditUser}
            onDelete={(id) => setShowDeleteConfirm(id)}
          />
        ))}
        {currentItems.length === 0 && (
          <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
            <Users className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-400 text-sm font-medium">No users found</p>
            <p className="text-xs text-gray-300 mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Show</span>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="px-2 py-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
            <span className="ml-4">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredUsers.length)} of {filteredUsers.length} users
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg border transition-colors ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && paginate(page)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : page === '...'
                    ? 'bg-transparent text-gray-500 cursor-default'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
                disabled={page === '...'}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg border transition-colors ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

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
    </div>
  );
};

export default UserManagement;