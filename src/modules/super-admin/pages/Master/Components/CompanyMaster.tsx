// src/modules/super-admin/pages/Master/CompanyMaster.tsx
import React, { useState } from 'react';
import { 
  Search, 
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Plus,
  Trash2
} from 'lucide-react';

interface Company {
  id: number;
  companyName: string;
  industryType: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  gstNo: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

const CompanyMaster = () => {
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: 1,
      companyName: 'Agnigate Technologies Pvt. Ltd.',
      industryType: 'IT Services',
      address: 'Plot No. 123, Scheme No. 74',
      city: 'Indore',
      state: 'Madhya Pradesh',
      pincode: '452010',
      contactPerson: 'Rajesh Sharma',
      contactEmail: 'rajesh@agnigate.com',
      contactPhone: '+91 9876543210',
      website: 'www.agnigate.com',
      gstNo: '23AAAAA0000A1Z5',
      status: 'active',
      createdAt: '2024-01-15',
      updatedAt: '2024-02-20'
    },
    {
      id: 2,
      companyName: 'MP Board of Secondary Education',
      industryType: 'Education',
      address: 'Bhopal',
      city: 'Bhopal',
      state: 'Madhya Pradesh',
      pincode: '462011',
      contactPerson: 'Dr. S.K. Rao',
      contactEmail: 'secretary@mpbse.com',
      contactPhone: '+91 755 2551234',
      website: 'www.mpbse.nic.in',
      gstNo: '23BBBBB0000B2Z6',
      status: 'active',
      createdAt: '2024-01-20',
      updatedAt: '2024-02-18'
    },
    {
      id: 3,
      companyName: 'ITI Limited',
      industryType: 'Manufacturing',
      address: 'ITI Industrial Area',
      city: 'Rae Bareli',
      state: 'Uttar Pradesh',
      pincode: '229010',
      contactPerson: 'A.K. Singh',
      contactEmail: 'aksingh@iti.co.in',
      contactPhone: '+91 535 2701234',
      website: 'www.itiltd.in',
      gstNo: '09CCCCC0000C3Z7',
      status: 'inactive',
      createdAt: '2024-01-25',
      updatedAt: '2024-02-15'
    },
    {
      id: 4,
      companyName: 'Bhoj University',
      industryType: 'Education',
      address: 'Bhopal',
      city: 'Bhopal',
      state: 'Madhya Pradesh',
      pincode: '462022',
      contactPerson: 'Prof. V.K. Shrivastava',
      contactEmail: 'registrar@bhojuni.ac.in',
      contactPhone: '+91 755 2731234',
      website: 'www.bhojuni.ac.in',
      gstNo: '23DDDDD0000D4Z8',
      status: 'active',
      createdAt: '2024-02-01',
      updatedAt: '2024-02-10'
    },
    {
      id: 5,
      companyName: 'Infosys Limited',
      industryType: 'IT Services',
      address: 'Electronic City',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560100',
      contactPerson: 'Sundar Rajan',
      contactEmail: 'sundar@infosys.com',
      contactPhone: '+91 80 4112 3456',
      website: 'www.infosys.com',
      gstNo: '29EEEEE0000E5Z9',
      status: 'active',
      createdAt: '2024-02-05',
      updatedAt: '2024-02-12'
    },
    {
      id: 6,
      companyName: 'Tata Motors',
      industryType: 'Automobile',
      address: 'Pimpri Chinchwad',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411018',
      contactPerson: 'Vikram Singh',
      contactEmail: 'vikram.singh@tatamotors.com',
      contactPhone: '+91 20 6732 1234',
      website: 'www.tatamotors.com',
      gstNo: '27FFFFF0000F6Z0',
      status: 'active',
      createdAt: '2024-02-08',
      updatedAt: '2024-02-14'
    },
    {
      id: 7,
      companyName: 'ICICI Bank',
      industryType: 'Banking',
      address: 'Bandra Kurla Complex',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400051',
      contactPerson: 'Priya Mehta',
      contactEmail: 'priya.mehta@icicibank.com',
      contactPhone: '+91 22 2653 1234',
      website: 'www.icicibank.com',
      gstNo: '27GGGGG0000G7Z1',
      status: 'inactive',
      createdAt: '2024-02-10',
      updatedAt: '2024-02-16'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterIndustry, setFilterIndustry] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showInsertModal, setShowInsertModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null);
  
  // Form state for new company
  const [newCompany, setNewCompany] = useState({
    companyName: '',
    industryType: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    gstNo: '',
    status: 'active' as 'active' | 'inactive'
  });

  // Get unique industry types for filter
  const industryTypes = ['all', ...new Set(companies.map(c => c.industryType))];

  // Filter companies based on search and filters
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = 
      company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.contactEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industryType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || company.status === filterStatus;
    const matchesIndustry = filterIndustry === 'all' || company.industryType === filterIndustry;
    
    return matchesSearch && matchesStatus && matchesIndustry;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCompanies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Company Name', 'Industry', 'City', 'State', 'Contact Person', 'Email', 'Phone', 'Status'];
    const csvData = filteredCompanies.map(c => [
      c.companyName,
      c.industryType,
      c.city,
      c.state,
      c.contactPerson,
      c.contactEmail,
      c.contactPhone,
      c.status
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `companies_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // View company details
  const viewCompanyDetails = (company: Company) => {
    setSelectedCompany(company);
    setShowViewModal(true);
  };

  // Delete company
  const handleDeleteCompany = () => {
    if (companyToDelete) {
      setCompanies(companies.filter(c => c.id !== companyToDelete.id));
      setShowDeleteModal(false);
      setCompanyToDelete(null);
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (company: Company) => {
    setCompanyToDelete(company);
    setShowDeleteModal(true);
  };

  // Handle insert form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCompany(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleInsertCompany = () => {
    const newId = Math.max(...companies.map(c => c.id), 0) + 1;
    const currentDate = new Date().toISOString().split('T')[0];
    
    const companyToAdd: Company = {
      id: newId,
      ...newCompany,
      createdAt: currentDate,
      updatedAt: currentDate
    };
    
    setCompanies([...companies, companyToAdd]);
    setShowInsertModal(false);
    setNewCompany({
      companyName: '',
      industryType: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      contactPerson: '',
      contactEmail: '',
      contactPhone: '',
      website: '',
      gstNo: '',
      status: 'active'
    });
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Company Master</h1>
        <p className="text-sm text-gray-600 mt-1">View company details (Read Only)</p>
      </div>

      {/* Add Button Only - Delete button removed */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setShowInsertModal(true)}
          className="px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 shadow-sm transition duration-200"
        >
          <Plus size={20} />
          <span>Add New Company</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
          <p className="text-sm text-gray-600">Total Companies</p>
          <p className="text-2xl font-bold text-gray-800">{companies.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-600">Active Companies</p>
          <p className="text-2xl font-bold text-green-600">{companies.filter(c => c.status === 'active').length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
          <p className="text-sm text-gray-600">Inactive Companies</p>
          <p className="text-2xl font-bold text-red-600">{companies.filter(c => c.status === 'inactive').length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">Industries</p>
          <p className="text-2xl font-bold text-blue-600">{industryTypes.length - 1}</p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="w-full md:w-96 relative">
            <input
              type="text"
              placeholder="Search companies..."
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={filterIndustry}
                  onChange={(e) => setFilterIndustry(e.target.value)}
                >
                  {industryTypes.map(industry => (
                    <option key={industry} value={industry}>{industry === 'all' ? 'All Industries' : industry}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setFilterStatus('all');
                    setFilterIndustry('all');
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
          <table className="w-full min-w-[1200px] lg:min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Person</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GST No</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.map((company, index) => (
                <tr key={company.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-900">{company.companyName}</p>
                      <p className="text-xs text-gray-500">{company.website}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{company.industryType}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{company.city}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{company.state}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{company.contactPerson}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <a href={`mailto:${company.contactEmail}`} className="text-blue-600 hover:underline">
                      {company.contactEmail}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{company.contactPhone}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{company.gstNo}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                      company.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {company.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => viewCompanyDetails(company)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded flex items-center gap-1"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(company)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded flex items-center gap-1"
                        title="Delete Company"
                      >
                        <Trash2 size={18} />
                      </button>
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
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredCompanies.length)} of {filteredCompanies.length} entries
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
      {showViewModal && selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Company Details</h2>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedCompany(null);
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {/* Company Information */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Company Name</p>
                      <p className="font-medium">{selectedCompany.companyName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Industry Type</p>
                      <p className="font-medium">{selectedCompany.industryType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">GST No</p>
                      <p className="font-medium">{selectedCompany.gstNo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <p className="font-medium text-blue-600">
                        <a href={`https://${selectedCompany.website}`} target="_blank" rel="noopener noreferrer">
                          {selectedCompany.website}
                        </a>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                        selectedCompany.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedCompany.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">Address</h3>
                  <div className="grid grid-cols-1 gap-2">
                    <p className="font-medium">{selectedCompany.address}</p>
                    <p>{selectedCompany.city}, {selectedCompany.state} - {selectedCompany.pincode}</p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Contact Person</p>
                      <p className="font-medium">{selectedCompany.contactPerson}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-blue-600">
                        <a href={`mailto:${selectedCompany.contactEmail}`}>{selectedCompany.contactEmail}</a>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{selectedCompany.contactPhone}</p>
                    </div>
                  </div>
                </div>

                {/* System Information */}
                <div>
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">System Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Created At</p>
                      <p className="font-medium">{new Date(selectedCompany.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Last Updated</p>
                      <p className="font-medium">{new Date(selectedCompany.updatedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedCompany(null);
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

      {/* Insert Company Modal */}
      {showInsertModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Add New Company</h2>
                <button
                  onClick={() => {
                    setShowInsertModal(false);
                    setNewCompany({
                      companyName: '',
                      industryType: '',
                      address: '',
                      city: '',
                      state: '',
                      pincode: '',
                      contactPerson: '',
                      contactEmail: '',
                      contactPhone: '',
                      website: '',
                      gstNo: '',
                      status: 'active'
                    });
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleInsertCompany(); }}>
                <div className="space-y-4">
                  {/* Basic Information */}
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-semibold text-purple-600 mb-3">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                        <input
                          type="text"
                          name="companyName"
                          value={newCompany.companyName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Industry Type *</label>
                        <input
                          type="text"
                          name="industryType"
                          value={newCompany.industryType}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">GST No</label>
                        <input
                          type="text"
                          name="gstNo"
                          value={newCompany.gstNo}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                        <input
                          type="text"
                          name="website"
                          value={newCompany.website}
                          onChange={handleInputChange}
                          placeholder="www.example.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          name="status"
                          value={newCompany.status}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-semibold text-purple-600 mb-3">Address</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                        <textarea
                          name="address"
                          value={newCompany.address}
                          onChange={handleInputChange}
                          required
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                          <input
                            type="text"
                            name="city"
                            value={newCompany.city}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                          <input
                            type="text"
                            name="state"
                            value={newCompany.state}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
                          <input
                            type="text"
                            name="pincode"
                            value={newCompany.pincode}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-semibold text-purple-600 mb-3">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person *</label>
                        <input
                          type="text"
                          name="contactPerson"
                          value={newCompany.contactPerson}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <input
                          type="email"
                          name="contactEmail"
                          value={newCompany.contactEmail}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                        <input
                          type="tel"
                          name="contactPhone"
                          value={newCompany.contactPhone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowInsertModal(false);
                      setNewCompany({
                        companyName: '',
                        industryType: '',
                        address: '',
                        city: '',
                        state: '',
                        pincode: '',
                        contactPerson: '',
                        contactEmail: '',
                        contactPhone: '',
                        website: '',
                        gstNo: '',
                        status: 'active'
                      });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Add Company
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && companyToDelete && (
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
                Are you sure you want to delete the company <strong className="text-gray-800">{companyToDelete.companyName}</strong>?
                <br />
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setCompanyToDelete(null);
                  }}
                  className="flex-1 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteCompany}
                  className="flex-1 px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No Results Message */}
      {filteredCompanies.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No companies found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default CompanyMaster;