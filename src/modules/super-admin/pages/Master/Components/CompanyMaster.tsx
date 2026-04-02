// src/modules/super-admin/pages/Master/CompanyMaster.tsx
import React, { useState, useEffect } from 'react';
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
import { companyApi } from '../../../services/companyApi';

interface Company {
  id: number;
  companyName: string;
  companyType: string;
  industryType: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isActive: boolean;
}

const CompanyMaster = () => {
  const [companies, setCompanies] = useState<Company[]>([]);

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

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await companyApi.getCompanies();
        setCompanies(data.map(c => ({
          id: c.id,
          companyName: c.companyName,
          companyType: c.companyType,
          industryType: c.industryType,
          address: c.address,
          city: c.city,
          state: c.state,
          pincode: c.pincode,
          isActive: c.isActive
        })));
      } catch (error) {
        console.error('Failed to load companies from API', error);
      }
    };

    fetchCompanies();
  }, []);

  // Form state for new company (API-only fields)
  const [newCompany, setNewCompany] = useState({
    companyName: '',
    companyType: '',
    industryType: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    status: 'active' as 'active' | 'inactive'
  });

  // Get unique industry types for filter
  const industryTypes = ['all', ...new Set(companies.map(c => c.industryType))];

  // Filter companies based on search and filters
 const filteredCompanies = companies.filter(company => {
  const matchesSearch =
    (company.companyName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (company.companyType || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (company.city || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (company.industryType || "").toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || (company.isActive ? 'active' : 'inactive') === filterStatus;
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
    const headers = ['Company Name', 'Industry', 'City', 'State', 'Pincode', 'Status'];
    const csvData = filteredCompanies.map(c => [
      c.companyName,
      c.industryType,
      c.city,
      c.state,
      c.pincode,
      c.isActive ? 'active' : 'inactive'
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
    window.URL.revokeObjectURL(url);
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
  const handleInsertCompany = async () => {
    const createPayload = {
      companyName: newCompany.companyName,
      companyType: newCompany.companyType,
      industryType: newCompany.industryType,
      address: newCompany.address,
      city: newCompany.city,
      state: newCompany.state,
      pincode: newCompany.pincode,
      isActive: newCompany.status === 'active'
    };

    try {
      const created = await companyApi.createCompany(createPayload);
      const companyToAdd: Company = {
        id: created.id,
        companyName: created.companyName,
        companyType: created.companyType,
        industryType: created.industryType,
        address: created.address,
        city: created.city,
        state: created.state,
        pincode: created.pincode,
        isActive: created.isActive
      };

      setCompanies(prev => [...prev, companyToAdd]);
      setShowInsertModal(false);
      setNewCompany({
        companyName: '',
        companyType: '',
        industryType: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        status: 'active'
      });
    } catch (error) {
      console.error('Company creation failed', error);
      alert('Failed to create company. Please check server and try again.');
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Company Master</h1>
        <p className="text-sm text-gray-600 mt-1">Manage company details</p>
      </div>

      {/* Add Button */}
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
          <p className="text-2xl font-bold text-green-600">{companies.filter(c => c.isActive).length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
          <p className="text-sm text-gray-600">Inactive Companies</p>
          <p className="text-2xl font-bold text-red-600">{companies.filter(c => !c.isActive).length}</p>
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
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search companies..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex-1 md:flex-none px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <Filter size={18} />
              <span className="hidden sm:inline">Filters</span>
            </button>
            <button
              onClick={exportToCSV}
              className="flex-1 md:flex-none px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <Download size={18} />
              <span className="hidden sm:inline">Export</span>
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

      {/* Table */}
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pincode</th>
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
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{company.industryType}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{company.city}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{company.state}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{company.pincode}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                      company.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {company.isActive ? 'active' : 'inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => viewCompanyDetails(company)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(company)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
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
      {filteredCompanies.length > 0 && (
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
      )}

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
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">Company Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Company Name</p>
                      <p className="font-medium">{selectedCompany.companyName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Company Type</p>
                      <p className="font-medium">{selectedCompany.companyType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Industry Type</p>
                      <p className="font-medium">{selectedCompany.industryType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                        selectedCompany.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedCompany.isActive ? 'active' : 'inactive'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">Address</h3>
                  <div className="grid grid-cols-1 gap-2">
                    <p className="font-medium">{selectedCompany.address}</p>
                    <p>{selectedCompany.city}, {selectedCompany.state} - {selectedCompany.pincode}</p>
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
                      companyType: '',
                      industryType: '',
                      address: '',
                      city: '',
                      state: '',
                      pincode: '',
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Type *</label>
                        <input
                          type="text"
                          name="companyType"
                          value={newCompany.companyType}
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

                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowInsertModal(false);
                      setNewCompany({
                        companyName: '',
                        companyType: '',
                        industryType: '',
                        address: '',
                        city: '',
                        state: '',
                        pincode: '',
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
                  className="flex-1 px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
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
        <div className="text-center py-12 bg-white rounded-lg shadow mt-6">
          <p className="text-gray-500">No companies found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default CompanyMaster;