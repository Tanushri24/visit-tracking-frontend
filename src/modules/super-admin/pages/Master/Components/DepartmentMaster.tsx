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
  Layers,
  Plus,
  Trash2
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

// Sample data for dropdowns
const sampleCompanies = [
  { id: 1, name: 'Agnigate Technologies Pvt. Ltd.' },
  { id: 2, name: 'MP Board of Secondary Education' },
  { id: 3, name: 'ITI Limited' },
  { id: 4, name: 'Bhoj University' },
  { id: 5, name: 'Infosys Limited' },
  { id: 6, name: 'Tata Motors' },
  { id: 7, name: 'ICICI Bank' },
];

const sampleOrganizations = [
  { id: 1, name: 'Examination Wing - MP Board', companyId: 2 },
  { id: 2, name: 'University Campus Office', companyId: 4 },
  { id: 3, name: 'ITI Limited - Rae Bareli Plant', companyId: 3 },
  { id: 4, name: 'Infosys - Electronic City Campus', companyId: 5 },
  { id: 5, name: 'Tata Motors - Pimpri Plant', companyId: 6 },
  { id: 6, name: 'ICICI Bank - BKC Branch', companyId: 7 },
  { id: 7, name: 'Agnigate - Corporate Office', companyId: 1 },
];

const DepartmentMaster = () => {
  const [departments, setDepartments] = useState<Department[]>([
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
  const [showInsertModal, setShowInsertModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState<Department | null>(null);
  
  // Form state for new department
  const [newDepartment, setNewDepartment] = useState({
    departmentName: '',
    organizationId: 0,
    organizationName: '',
    companyId: 0,
    companyName: '',
    departmentHead: '',
    headDesignation: '',
    headEmail: '',
    headPhone: '',
    employeeCount: 0,
    location: '',
    city: '',
    state: '',
    pincode: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    extensionNumber: '',
    workingHours: '',
    workingDays: '',
    status: 'active' as 'active' | 'inactive'
  });

  // Get unique values for filters
  const companies = ['all', ...new Set(departments.map(d => d.companyName))];
  const organizations = ['all', ...new Set(departments.map(d => d.organizationName))];

  // Filter departments
  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = 
      dept.departmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.departmentHead.toLowerCase().includes(searchTerm.toLowerCase());
    
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
      dept.departmentName, dept.organizationName, dept.companyName, dept.departmentHead,
      dept.city, dept.contactPerson, dept.contactEmail, dept.contactPhone,
      dept.employeeCount.toString(), dept.status
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `departments_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const viewDepartmentDetails = (department: Department) => {
    setSelectedDepartment(department);
    setShowViewModal(true);
  };

  // Delete department
  const handleDeleteDepartment = () => {
    if (departmentToDelete) {
      setDepartments(departments.filter(d => d.id !== departmentToDelete.id));
      setShowDeleteModal(false);
      setDepartmentToDelete(null);
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (department: Department) => {
    setDepartmentToDelete(department);
    setShowDeleteModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'organizationId') {
      const selectedOrg = sampleOrganizations.find(o => o.id === parseInt(value));
      const selectedCompany = sampleCompanies.find(c => c.id === selectedOrg?.companyId);
      setNewDepartment(prev => ({ 
        ...prev, 
        organizationId: parseInt(value),
        organizationName: selectedOrg ? selectedOrg.name : '',
        companyId: selectedOrg ? selectedOrg.companyId : 0,
        companyName: selectedCompany ? selectedCompany.name : ''
      }));
    } else if (name === 'employeeCount') {
      setNewDepartment(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setNewDepartment(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleInsertDepartment = () => {
    const newId = Math.max(...departments.map(d => d.id), 0) + 1;
    const currentDate = new Date().toISOString().split('T')[0];
    
    const departmentToAdd: Department = {
      id: newId,
      ...newDepartment,
      createdAt: currentDate,
      updatedAt: currentDate
    };
    
    setDepartments([...departments, departmentToAdd]);
    setShowInsertModal(false);
    setNewDepartment({
      departmentName: '', organizationId: 0, organizationName: '', companyId: 0, companyName: '',
      departmentHead: '', headDesignation: '', headEmail: '', headPhone: '', employeeCount: 0,
      location: '', city: '', state: '', pincode: '', contactPerson: '', contactEmail: '',
      contactPhone: '', extensionNumber: '', workingHours: '', workingDays: '', status: 'active'
    });
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Department Master</h1>
        <p className="text-sm text-gray-600 mt-1">Manage department details</p>
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
          <p className="text-2xl font-bold text-blue-600">{departments.reduce((sum, d) => sum + d.employeeCount, 0)}</p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-96 relative">
            <input type="text" placeholder="Search departments..." className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button onClick={() => setShowInsertModal(true)} className="flex-1 md:flex-none px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2">
              <Plus size={18} /><span>Add Department</span>
            </button>
            <button onClick={() => setShowFilters(!showFilters)} className="flex-1 md:flex-none px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
              <Filter size={18} /><span>Filters</span>
            </button>
            <button onClick={exportToCSV} className="flex-1 md:flex-none px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
              <Download size={18} /><span>Export</span>
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="p-4 border-t bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div><label className="block text-sm font-medium mb-1">Status</label>
                <select className="w-full px-3 py-2 border rounded-lg" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="all">All Status</option><option value="active">Active</option><option value="inactive">Inactive</option>
                </select>
              </div>
              <div><label className="block text-sm font-medium mb-1">Company</label>
                <select className="w-full px-3 py-2 border rounded-lg" value={filterCompany} onChange={(e) => setFilterCompany(e.target.value)}>
                  {companies.map(c => <option key={c} value={c}>{c === 'all' ? 'All Companies' : c}</option>)}
                </select>
              </div>
              <div><label className="block text-sm font-medium mb-1">Organization</label>
                <select className="w-full px-3 py-2 border rounded-lg" value={filterOrganization} onChange={(e) => setFilterOrganization(e.target.value)}>
                  {organizations.map(o => <option key={o} value={o}>{o === 'all' ? 'All Organizations' : o}</option>)}
                </select>
              </div>
              <div className="flex items-end">
                <button onClick={() => { setFilterStatus('all'); setFilterCompany('all'); setFilterOrganization('all'); setSearchTerm(''); }} className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2">
                  <RefreshCw size={16} /> Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1600px] lg:min-w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">S.No</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Department Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Organization</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Company</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Department Head</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">City</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Contact Person</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Employees</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {currentItems.map((dept, index) => (
                  <tr key={dept.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{indexOfFirstItem + index + 1}</td>
                    <td className="px-4 py-3"><p className="font-medium">{dept.departmentName}</p><p className="text-xs text-gray-500">Ext: {dept.extensionNumber}</p></td>
                    <td className="px-4 py-3 text-sm">{dept.organizationName}</td>
                    <td className="px-4 py-3 text-sm">{dept.companyName}</td>
                    <td className="px-4 py-3"><p className="font-medium">{dept.departmentHead}</p><p className="text-xs text-gray-500">{dept.headDesignation}</p></td>
                    <td className="px-4 py-3 text-sm">{dept.city}</td>
                    <td className="px-4 py-3 text-sm">{dept.contactPerson}</td>
                    <td className="px-4 py-3 text-sm"><a href={`mailto:${dept.contactEmail}`} className="text-blue-600 hover:underline">{dept.contactEmail}</a></td>
                    <td className="px-4 py-3 text-sm">{dept.contactPhone}</td>
                    <td className="px-4 py-3 text-sm">{dept.employeeCount}</td>
                    <td className="px-4 py-3"><span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${dept.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{dept.status}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => viewDepartmentDetails(dept)} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Eye size={18} /></button>
                        <button onClick={() => openDeleteModal(dept)} className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredDepartments.length)} of {filteredDepartments.length} entries</div>
          <div className="flex gap-2">
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-50 flex items-center gap-1"><ChevronLeft size={16} /> Previous</button>
            <span className="px-4 py-1 bg-purple-600 text-white rounded-lg">Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-50 flex items-center gap-1">Next <ChevronRight size={16} /></button>
          </div>
        </div>

        {/* View Details Modal */}
        {showViewModal && selectedDepartment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold">Department Details</h2><button onClick={() => setShowViewModal(false)} className="p-1 hover:bg-gray-100 rounded"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div>
              <div className="space-y-4">
                <div><h3 className="text-lg font-semibold text-purple-600 mb-3">Department Information</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><p className="text-sm text-gray-500">Department Name</p><p className="font-medium">{selectedDepartment.departmentName}</p></div>
                  <div><p className="text-sm text-gray-500">Extension</p><p className="font-medium">{selectedDepartment.extensionNumber}</p></div>
                  <div><p className="text-sm text-gray-500">Organization</p><p className="font-medium">{selectedDepartment.organizationName}</p></div>
                  <div><p className="text-sm text-gray-500">Company</p><p className="font-medium">{selectedDepartment.companyName}</p></div>
                  <div><p className="text-sm text-gray-500">Employee Count</p><p className="font-medium">{selectedDepartment.employeeCount}</p></div>
                  <div><p className="text-sm text-gray-500">Status</p><span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${selectedDepartment.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{selectedDepartment.status}</span></div>
                </div></div>
                <div><h3 className="text-lg font-semibold text-purple-600 mb-3">Department Head</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><p className="text-sm text-gray-500">Name</p><p className="font-medium">{selectedDepartment.departmentHead}</p></div>
                  <div><p className="text-sm text-gray-500">Designation</p><p className="font-medium">{selectedDepartment.headDesignation}</p></div>
                  <div><p className="text-sm text-gray-500">Email</p><p className="font-medium text-blue-600">{selectedDepartment.headEmail}</p></div>
                  <div><p className="text-sm text-gray-500">Phone</p><p className="font-medium">{selectedDepartment.headPhone}</p></div>
                </div></div>
                <div><h3 className="text-lg font-semibold text-purple-600 mb-3">Contact & Location</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><p className="text-sm text-gray-500">Contact Person</p><p className="font-medium">{selectedDepartment.contactPerson}</p></div>
                  <div><p className="text-sm text-gray-500">Email</p><p className="font-medium text-blue-600">{selectedDepartment.contactEmail}</p></div>
                  <div><p className="text-sm text-gray-500">Phone</p><p className="font-medium">{selectedDepartment.contactPhone}</p></div>
                  <div><p className="text-sm text-gray-500">Location</p><p className="font-medium">{selectedDepartment.location}</p></div>
                  <div><p className="text-sm text-gray-500">Address</p><p className="font-medium">{selectedDepartment.city}, {selectedDepartment.state} - {selectedDepartment.pincode}</p></div>
                  <div><p className="text-sm text-gray-500">Working Hours</p><p className="font-medium">{selectedDepartment.workingHours}</p></div>
                  <div><p className="text-sm text-gray-500">Working Days</p><p className="font-medium">{selectedDepartment.workingDays}</p></div>
                </div></div>
              </div>
              <div className="flex justify-end mt-6"><button onClick={() => setShowViewModal(false)} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Close</button></div>
            </div>
          </div>
        )}

        {/* Insert Department Modal */}
        {showInsertModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Add New Department</h2>
                <button onClick={() => setShowInsertModal(false)} className="p-1 hover:bg-gray-100 rounded"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleInsertDepartment(); }}>
                {/* Basic Information */}
                <div className="border-b pb-4 mb-4">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium mb-1">Department Name *</label><input type="text" name="departmentName" value={newDepartment.departmentName} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" /></div>
                    <div><label className="block text-sm font-medium mb-1">Organization *</label><select name="organizationId" value={newDepartment.organizationId} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded-lg"><option value="">Select Organization</option>{sampleOrganizations.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}</select></div>
                    <div><label className="block text-sm font-medium mb-1">Extension Number</label><input type="text" name="extensionNumber" value={newDepartment.extensionNumber} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                    <div><label className="block text-sm font-medium mb-1">Employee Count</label><input type="number" name="employeeCount" value={newDepartment.employeeCount} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                    <div><label className="block text-sm font-medium mb-1">Status</label><select name="status" value={newDepartment.status} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg"><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
                  </div>
                </div>

                {/* Department Head */}
                <div className="border-b pb-4 mb-4">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">Department Head</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium mb-1">Head Name *</label><input type="text" name="departmentHead" value={newDepartment.departmentHead} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded-lg" /></div>
                    <div><label className="block text-sm font-medium mb-1">Designation</label><input type="text" name="headDesignation" value={newDepartment.headDesignation} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                    <div><label className="block text-sm font-medium mb-1">Email</label><input type="email" name="headEmail" value={newDepartment.headEmail} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                    <div><label className="block text-sm font-medium mb-1">Phone</label><input type="text" name="headPhone" value={newDepartment.headPhone} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                  </div>
                </div>

                {/* Address & Location */}
                <div className="border-b pb-4 mb-4">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">Address & Location</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div><label className="block text-sm font-medium mb-1">Location</label><input type="text" name="location" value={newDepartment.location} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div><label className="block text-sm font-medium mb-1">City</label><input type="text" name="city" value={newDepartment.city} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                      <div><label className="block text-sm font-medium mb-1">State</label><input type="text" name="state" value={newDepartment.state} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                      <div><label className="block text-sm font-medium mb-1">Pincode</label><input type="text" name="pincode" value={newDepartment.pincode} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                    </div>
                  </div>
                </div>

                {/* Contact & Working Hours */}
                <div className="border-b pb-4 mb-4">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">Contact & Working Hours</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium mb-1">Contact Person</label><input type="text" name="contactPerson" value={newDepartment.contactPerson} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                    <div><label className="block text-sm font-medium mb-1">Contact Email</label><input type="email" name="contactEmail" value={newDepartment.contactEmail} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                    <div><label className="block text-sm font-medium mb-1">Contact Phone</label><input type="text" name="contactPhone" value={newDepartment.contactPhone} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                    <div><label className="block text-sm font-medium mb-1">Working Hours</label><input type="text" name="workingHours" value={newDepartment.workingHours} onChange={handleInputChange} placeholder="e.g., 9:00 AM - 6:00 PM" className="w-full px-3 py-2 border rounded-lg" /></div>
                    <div><label className="block text-sm font-medium mb-1">Working Days</label><input type="text" name="workingDays" value={newDepartment.workingDays} onChange={handleInputChange} placeholder="e.g., Monday - Friday" className="w-full px-3 py-2 border rounded-lg" /></div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button type="button" onClick={() => setShowInsertModal(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Add Department</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && departmentToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-red-100 rounded-full">
                    <Trash2 className="w-8 h-8 text-red-600" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-center text-gray-800 mb-2">Confirm Delete</h3>
                <p className="text-sm text-gray-600 text-center mb-4">
                  Are you sure you want to delete the department <strong className="text-gray-800">{departmentToDelete.departmentName}</strong>?
                  <br />
                  This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setDepartmentToDelete(null);
                    }}
                    className="flex-1 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteDepartment}
                    className="flex-1 px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Results */}
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