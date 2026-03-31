import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Plus,
  Target,
  CheckCircle,
  XCircle,
  Layers,
  Trash2
} from 'lucide-react';

interface VisitPurpose {
  id: number;
  purposeName: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const API_URL = 'http://192.168.29.8:8080/api/Auth/login';

const VisitPurposeMaster = () => {
  const [purposes, setPurposes] = useState<VisitPurpose[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState<VisitPurpose | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showInsertModal, setShowInsertModal] = useState(false);
<<<<<<< HEAD

=======
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [purposeToDelete, setPurposeToDelete] = useState<VisitPurpose | null>(null);
  
>>>>>>> 821998ecad2b67f4e96f3c7888ca89ce4dd2a039
  const [newPurpose, setNewPurpose] = useState({
    purposeName: '',
    isActive: true
  });

  const normalizePurpose = (purpose: Partial<VisitPurpose>): VisitPurpose => ({
    id: Number(purpose.id ?? 0),
    purposeName: purpose.purposeName ?? '',
    isActive: Boolean(purpose.isActive ?? true),
    createdAt: purpose.createdAt ?? '',
    updatedAt: purpose.updatedAt ?? ''
  });

  const fetchPurposes = async (): Promise<VisitPurpose[]> => {
    try {         
      setLoading(true);
      const response = await axios.get<VisitPurpose[]>(API_URL);
      const normalizedPurposes = (response.data ?? []).map((purpose) => normalizePurpose(purpose));
      setPurposes(normalizedPurposes);
      return normalizedPurposes;
    } catch (error) {
      console.error('Failed to fetch visit purposes:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurposes();
  }, []);

  const filteredPurposes = purposes.filter((purpose) => {
    const matchesSearch = purpose.purposeName.toLowerCase().includes(searchTerm.toLowerCase());
    const status = purpose.isActive ? 'active' : 'inactive';
    const matchesStatus = filterStatus === 'all' || status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPurposes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.max(1, Math.ceil(filteredPurposes.length / itemsPerPage));

  const exportToCSV = () => {
    const headers = ['Purpose Name', 'Status', 'Created At', 'Updated At'];
    const csvData = filteredPurposes.map((purpose) => [
      purpose.purposeName,
      purpose.isActive ? 'active' : 'inactive',
      purpose.createdAt || '',
      purpose.updatedAt || ''
    ]);
    const csvContent = [headers, ...csvData].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `visit_purposes_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const viewPurposeDetails = (purpose: VisitPurpose) => {
    setSelectedPurpose(purpose);
    setShowViewModal(true);
  };

  // Delete purpose
  const handleDeletePurpose = () => {
    if (purposeToDelete) {
      setPurposes(purposes.filter(p => p.id !== purposeToDelete.id));
      setShowDeleteModal(false);
      setPurposeToDelete(null);
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (purpose: VisitPurpose) => {
    setPurposeToDelete(purpose);
    setShowDeleteModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPurpose((prev) => ({
      ...prev,
      [name]: name === 'isActive' ? value === 'true' : value
    }));
  };

  const handleInsertPurpose = async () => {
    if (!newPurpose.purposeName.trim()) {
      alert('Purpose Name is required');
      return;
    }

    const payload = {
      purposeName: newPurpose.purposeName.trim(),
      isActive: newPurpose.isActive
    };

    try {
      setLoading(true);
      const response = await axios.post(API_URL, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const createdPurpose = normalizePurpose({
        id: response?.data?.id ?? Date.now(),
        purposeName: response?.data?.purposeName ?? payload.purposeName,
        isActive: response?.data?.isActive ?? payload.isActive,
        createdAt: response?.data?.createdAt ?? new Date().toISOString(),
        updatedAt: response?.data?.updatedAt ?? new Date().toISOString()
      });

      setPurposes((prev) => [createdPurpose, ...prev]);
      setCurrentPage(1);
      setShowInsertModal(false);
      setNewPurpose({ purposeName: '', isActive: true });
      alert('Visit purpose created successfully');
    } catch (error: any) {
      const validationErrors = error?.response?.data?.errors;
      const validationMessage =
        validationErrors && typeof validationErrors === 'object'
          ? Object.values(validationErrors).flat().join('\n')
          : null;

      const errorMessage =
        validationMessage ||
        error?.response?.data?.message ||
        error?.response?.data?.title ||
        'Failed to create visit purpose';

      alert(typeof errorMessage === 'string' ? errorMessage : 'Failed to create visit purpose');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Visit Purpose Master</h1>
          <p className="text-sm text-gray-500 mt-1">Manage visit purposes for tracking</p>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-purple-500 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Total Purposes</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{purposes.length}</p>
              </div>
              <div className="bg-purple-100 rounded-xl p-2 sm:p-2.5">
                <Layers size={20} className="text-purple-600 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-green-500 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Active Purposes</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">{purposes.filter((p) => p.isActive).length}</p>
              </div>
              <div className="bg-green-100 rounded-xl p-2 sm:p-2.5">
                <CheckCircle size={20} className="text-green-600 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-red-500 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Inactive Purposes</p>
                <p className="text-xl sm:text-2xl font-bold text-red-600">{purposes.filter((p) => !p.isActive).length}</p>
              </div>
              <div className="bg-red-100 rounded-xl p-2 sm:p-2.5">
                <XCircle size={20} className="text-red-600 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-blue-500 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Purpose Types</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">{purposes.length}</p>
              </div>
              <div className="bg-blue-100 rounded-xl p-2 sm:p-2.5">
                <Target size={20} className="text-blue-600 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="p-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            <div className="relative flex-1 max-w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search purposes..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowInsertModal(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Plus size={18} />
                <span className="hidden sm:inline">Add New Purpose</span>
                <span className="sm:hidden">Add</span>
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2 text-gray-700"
              >
                <Filter size={16} />
                <span className="hidden sm:inline">Filters</span>
              </button>
              <button
                onClick={exportToCSV}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2 text-gray-700"
              >
                <Download size={16} />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setFilterStatus('all');
                      setSearchTerm('');
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors"
                  >
                    <RefreshCw size={14} />
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
<<<<<<< HEAD
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading visit purposes...</div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
=======
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentItems.map((purpose, index) => (
                  <tr key={purpose.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-500">{indexOfFirstItem + index + 1}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{purpose.purposeName}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                        purpose.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {purpose.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => viewPurposeDetails(purpose)}
                          className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(purpose)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Purpose"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
>>>>>>> 821998ecad2b67f4e96f3c7888ca89ce4dd2a039
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentItems.map((purpose, index) => (
                    <tr key={purpose.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-gray-500">{indexOfFirstItem + index + 1}</td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{purpose.purposeName}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                            purpose.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {purpose.isActive ? 'active' : 'inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => viewPurposeDetails(purpose)}
                          className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {filteredPurposes.length > 0 && !loading && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
              <span className="font-medium">{Math.min(indexOfLastItem, filteredPurposes.length)}</span> of{' '}
              <span className="font-medium">{filteredPurposes.length}</span> entries
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center gap-1 text-sm"
              >
                <ChevronLeft size={14} /> Previous
              </button>
              <span className="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center gap-1 text-sm"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {showViewModal && selectedPurpose && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Purpose Details</h2>
                <button onClick={() => setShowViewModal(false)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">Purpose Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Purpose Name</p>
                      <p className="font-medium text-gray-900">{selectedPurpose.purposeName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          selectedPurpose.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {selectedPurpose.isActive ? 'active' : 'inactive'}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">System Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Created At</p>
                      <p className="font-medium text-gray-900">
                        {selectedPurpose.createdAt
                          ? new Date(selectedPurpose.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
                          : '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Last Updated</p>
                      <p className="font-medium text-gray-900">
                        {selectedPurpose.updatedAt
                          ? new Date(selectedPurpose.updatedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
                          : '-'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-end">
                <button onClick={() => setShowViewModal(false)} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Close</button>
              </div>
            </div>
          </div>
        )}

        {showInsertModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Add New Purpose</h2>
                <button onClick={() => setShowInsertModal(false)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleInsertPurpose();
                }}
              >
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Purpose Name *</label>
                    <input
                      type="text"
                      name="purposeName"
                      value={newPurpose.purposeName}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Product Demo, Proposal Discussion"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      name="isActive"
                      value={newPurpose.isActive ? 'true' : 'false'}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowInsertModal(false);
                      setNewPurpose({ purposeName: '', isActive: true });
                    }}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Add Purpose
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

<<<<<<< HEAD
        {filteredPurposes.length === 0 && !loading && (
=======
        {/* Delete Confirmation Modal */}
        {showDeleteModal && purposeToDelete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-red-100 rounded-full">
                    <Trash2 className="w-8 h-8 text-red-600" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-center text-gray-800 mb-2">Confirm Delete</h3>
                <p className="text-sm text-gray-600 text-center mb-4">
                  Are you sure you want to delete the visit purpose <strong className="text-gray-800">{purposeToDelete.purposeName}</strong>?
                  <br />
                  This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setPurposeToDelete(null);
                    }}
                    className="flex-1 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeletePurpose}
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
        {filteredPurposes.length === 0 && (
>>>>>>> 821998ecad2b67f4e96f3c7888ca89ce4dd2a039
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No visit purposes found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
              }}
              className="mt-3 text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitPurposeMaster;
