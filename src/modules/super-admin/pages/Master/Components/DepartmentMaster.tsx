// src/modules/super-admin/pages/Master/DepartmentMaster.tsx
import React, { useState } from 'react';
import { 
  Search, 
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Layers
} from 'lucide-react';

interface Department {
  id: number;
  departmentName: string;
  organizationId: number;
  organizationName: string;
  companyId: number;
  companyName: string;
  departmentHead: string;
  headDesignation: string;
  headEmail: string;
  headPhone: string;
  employeeCount: number;
  location: string;
  city: string;
  state: string;
  pincode: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  extensionNumber: string;
  workingHours: string;
  workingDays: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

const DepartmentMaster = () => {
  const [departments] = useState<Department[]>([
    {
      id: 1,
      departmentName: 'Examination Department',
      organizationId: 1,
      organizationName: 'Examination Wing - MP Board',
      companyId: 2,
      companyName: 'MP Board of Secondary Education',
      departmentHead: 'Dr. S.K. Rao',
      headDesignation: 'Controller of Examinations',
      headEmail: 'controller@mpbse.com',
      headPhone: '+91 755 2551234',
      employeeCount: 45,
      location: 'Board Headquarters',
      city: 'Bhopal',
      state: 'Madhya Pradesh',
      pincode: '462011',
      contactPerson: 'Ramesh Gupta',
      contactEmail: 'examdept@mpbse.com',
      contactPhone: '+91 755 2555678',
      extensionNumber: '101',
      workingHours: '10:00 AM - 6:00 PM',
      workingDays: 'Monday - Saturday',
      status: 'active',
      createdAt: '2024-01-20',
      updatedAt: '2024-02-18'
    },
    {
      id: 2,
      departmentName: 'IT Department',
      organizationId: 2,
      organizationName: 'University Campus Office',
      companyId: 4,
      companyName: 'Bhoj University',
      departmentHead: 'Prof. V.K. Shrivastava',
      headDesignation: 'Director - IT',
      headEmail: 'itdirector@bhojuni.ac.in',
      headPhone: '+91 755 2731234',
      employeeCount: 25,
      location: 'University Campus',
      city: 'Bhopal',
      state: 'Madhya Pradesh',
      pincode: '462022',
      contactPerson: 'Sunil Patel',
      contactEmail: 'itdept@bhojuni.ac.in',
      contactPhone: '+91 755 2735678',
      extensionNumber: '201',
      workingHours: '9:30 AM - 5:30 PM',
      workingDays: 'Monday - Friday',
      status: 'active',
      createdAt: '2024-02-01',
      updatedAt: '2024-02-10'
    },
    {
      id: 3,
      departmentName: 'Production Department',
      organizationId: 3,
      organizationName: 'ITI Limited - Rae Bareli Plant',
      companyId: 3,
      companyName: 'ITI Limited',
      departmentHead: 'A.K. Singh',
      headDesignation: 'Plant Manager',
      headEmail: 'plantmanager@iti.co.in',
      headPhone: '+91 535 2701234',
      employeeCount: 350,
      location: 'Industrial Area',
      city: 'Rae Bareli',
      state: 'Uttar Pradesh',
      pincode: '229010',
      contactPerson: 'Mohan Lal',
      contactEmail: 'production@iti.co.in',
      contactPhone: '+91 535 2705678',
      extensionNumber: '301',
      workingHours: '8:00 AM - 8:00 PM',
      workingDays: 'Monday - Saturday',
      status: 'inactive',
      createdAt: '2024-01-25',
      updatedAt: '2024-02-15'
    },
    {
      id: 4,
      departmentName: 'Software Development',
      organizationId: 4,
      organizationName: 'Infosys - Electronic City Campus',
      companyId: 5,
      companyName: 'Infosys Limited',
      departmentHead: 'Sundar Rajan',
      headDesignation: 'Delivery Manager',
      headEmail: 'delivery@infosys.com',
      headPhone: '+91 80 4112 3456',
      employeeCount: 250,
      location: 'Electronic City',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560100',
      contactPerson: 'Priya Krishnan',
      contactEmail: 'hr@infosys.com',
      contactPhone: '+91 80 4112 7890',
      extensionNumber: '401',
      workingHours: '9:00 AM - 7:00 PM',
      workingDays: 'Monday - Friday',
      status: 'active',
      createdAt: '2024-02-05',
      updatedAt: '2024-02-12'
    },
    {
      id: 5,
      departmentName: 'Assembly Line',
      organizationId: 5,
      organizationName: 'Tata Motors - Pimpri Plant',
      companyId: 6,
      companyName: 'Tata Motors',
      departmentHead: 'Vikram Singh',
      headDesignation: 'Production Head',
      headEmail: 'production@tatamotors.com',
      headPhone: '+91 20 6732 1234',
      employeeCount: 500,
      location: 'Pimpri Industrial Area',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411018',
      contactPerson: 'Rajesh Kulkarni',
      contactEmail: 'assembly@tatamotors.com',
      contactPhone: '+91 20 6732 5678',
      extensionNumber: '501',
      workingHours: '7:00 AM - 7:00 PM',
      workingDays: 'Monday - Saturday',
      status: 'active',
      createdAt: '2024-02-08',
      updatedAt: '2024-02-14'
    },
    {
      id: 6,
      departmentName: 'Retail Banking',
      organizationId: 6,
      organizationName: 'ICICI Bank - BKC Branch',
      companyId: 7,
      companyName: 'ICICI Bank',
      departmentHead: 'Priya Mehta',
      headDesignation: 'Branch Manager',
      headEmail: 'bm.bkc@icicibank.com',
      headPhone: '+91 22 2653 1234',
      employeeCount: 45,
      location: 'Bandra Kurla Complex',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400051',
      contactPerson: 'Amit Sharma',
      contactEmail: 'retail.bkc@icicibank.com',
      contactPhone: '+91 22 2653 5678',
      extensionNumber: '601',
      workingHours: '9:30 AM - 6:30 PM',
      workingDays: 'Monday - Saturday',
      status: 'inactive',
      createdAt: '2024-02-10',
      updatedAt: '2024-02-16'
    },
    {
      id: 7,
      departmentName: 'Research & Development',
      organizationId: 7,
      organizationName: 'Agnigate - Corporate Office',
      companyId: 1,
      companyName: 'Agnigate Technologies Pvt. Ltd.',
      departmentHead: 'Rajesh Sharma',
      headDesignation: 'CTO',
      headEmail: 'cto@agnigate.com',
      headPhone: '+91 9876543210',
      employeeCount: 15,
      location: 'Corporate Office',
      city: 'Indore',
      state: 'Madhya Pradesh',
      pincode: '452010',
      contactPerson: 'Neha Gupta',
      contactEmail: 'hr@agnigate.com',
      contactPhone: '+91 9876543222',
      extensionNumber: '701',
      workingHours: '9:30 AM - 6:30 PM',
      workingDays: 'Monday - Friday',
      status: 'active',
      createdAt: '2024-01-15',
      updatedAt: '2024-02-20'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCompany, setFilterCompany] = useState<string>('all');
  const [filterOrganization, setFilterOrganization] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  // Get unique values for filters
  const companies = ['all', ...new Set(departments.map(d => d.companyName))];
  const organizations = ['all', ...new Set(departments.map(d => d.organizationName))];

  // Filter departments based on search and filters
  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = 
      dept.departmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.departmentHead.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || dept.status === filterStatus;
    const matchesCompany = filterCompany === 'all' || dept.companyName === filterCompany;
    const matchesOrganization = filterOrganization === 'all' || dept.organizationName === filterOrganization;
    
    return matchesSearch && matchesStatus && matchesCompany && matchesOrganization;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDepartments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Department Name', 'Organization', 'Company', 'Department Head', 'City', 'Contact Person', 'Email', 'Phone', 'Employee Count', 'Status'];
    const csvData = filteredDepartments.map(dept => [
      dept.departmentName,
      dept.organizationName,
      dept.companyName,
      dept.departmentHead,
      dept.city,
      dept.contactPerson,
      dept.contactEmail,
      dept.contactPhone,
      dept.employeeCount.toString(),
      dept.status
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `departments_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // View department details
  const viewDepartmentDetails = (department: Department) => {
    setSelectedDepartment(department);
    setShowViewModal(true);
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Department Master</h1>
        <p className="text-sm text-gray-600 mt-1">View department details (Read Only)</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
          <p className="text-sm text-gray-600">Total Departments</p>
          <p className="text-2xl font-bold text-gray-800">{departments.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-600">Active Departments</p>
          <p className="text-2xl font-bold text-green-600">{departments.filter(d => d.status === 'active').length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
          <p className="text-sm text-gray-600">Inactive Departments</p>
          <p className="text-2xl font-bold text-red-600">{departments.filter(d => d.status === 'inactive').length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">Total Employees</p>
          <p className="text-2xl font-bold text-blue-600">
            {departments.reduce((sum, dept) => sum + dept.employeeCount, 0)}
          </p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="w-full md:w-96 relative">
            <input
              type="text"
              placeholder="Search departments..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex-1 md:flex-none px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <Filter size={18} />
              <span className="md:hidden lg:inline">Filters</span>
            </button>
            <button
              onClick={exportToCSV}
              className="flex-1 md:flex-none px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <Download size={18} />
              <span className="md:hidden lg:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={filterCompany}
                  onChange={(e) => setFilterCompany(e.target.value)}
                >
                  {companies.map(company => (
                    <option key={company} value={company}>{company === 'all' ? 'All Companies' : company}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={filterOrganization}
                  onChange={(e) => setFilterOrganization(e.target.value)}
                >
                  {organizations.map(org => (
                    <option key={org} value={org}>{org === 'all' ? 'All Organizations' : org}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setFilterStatus('all');
                    setFilterCompany('all');
                    setFilterOrganization('all');
                    setSearchTerm('');
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2"
                >
                  <RefreshCw size={16} />
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Table with Horizontal Scroll - Works on all devices */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1600px] lg:min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department Head</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Person</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.map((dept, index) => (
                <tr key={dept.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{dept.departmentName}</p>
                    <p className="text-xs text-gray-500">Ext: {dept.extensionNumber}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{dept.organizationName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{dept.companyName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <div>
                      <p className="font-medium">{dept.departmentHead}</p>
                      <p className="text-xs text-gray-500">{dept.headDesignation}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{dept.city}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{dept.contactPerson}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <a href={`mailto:${dept.contactEmail}`} className="text-blue-600 hover:underline">
                      {dept.contactEmail}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{dept.contactPhone}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{dept.employeeCount}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                      dept.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {dept.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => viewDepartmentDetails(dept)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded flex items-center gap-1"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredDepartments.length)} of {filteredDepartments.length} entries
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-1"
          >
            <ChevronLeft size={16} /> Previous
          </button>
          <span className="px-4 py-1 bg-purple-600 text-white rounded-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-1"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* View Details Modal */}
      {showViewModal && selectedDepartment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Department Details</h2>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedDepartment(null);
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {/* Department Basic Information */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">Department Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Department Name</p>
                      <p className="font-medium">{selectedDepartment.departmentName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Extension Number</p>
                      <p className="font-medium">{selectedDepartment.extensionNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Organization</p>
                      <p className="font-medium">{selectedDepartment.organizationName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Company</p>
                      <p className="font-medium">{selectedDepartment.companyName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Employee Count</p>
                      <p className="font-medium">{selectedDepartment.employeeCount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                        selectedDepartment.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedDepartment.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Department Head Information */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">Department Head</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{selectedDepartment.departmentHead}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Designation</p>
                      <p className="font-medium">{selectedDepartment.headDesignation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-blue-600">
                        <a href={`mailto:${selectedDepartment.headEmail}`}>{selectedDepartment.headEmail}</a>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{selectedDepartment.headPhone}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Contact Person</p>
                      <p className="font-medium">{selectedDepartment.contactPerson}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-blue-600">
                        <a href={`mailto:${selectedDepartment.contactEmail}`}>{selectedDepartment.contactEmail}</a>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{selectedDepartment.contactPhone}</p>
                    </div>
                  </div>
                </div>

                {/* Address and Working Information */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">Location & Working Hours</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{selectedDepartment.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{selectedDepartment.city}, {selectedDepartment.state} - {selectedDepartment.pincode}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Working Hours</p>
                      <p className="font-medium">{selectedDepartment.workingHours}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Working Days</p>
                      <p className="font-medium">{selectedDepartment.workingDays}</p>
                    </div>
                  </div>
                </div>

                {/* System Information */}
                <div>
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">System Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Created At</p>
                      <p className="font-medium">{new Date(selectedDepartment.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Last Updated</p>
                      <p className="font-medium">{new Date(selectedDepartment.updatedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedDepartment(null);
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No Results Message */}
      {filteredDepartments.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Layers className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">No departments found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default DepartmentMaster;