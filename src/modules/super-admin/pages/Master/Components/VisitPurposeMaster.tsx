// src/modules/super-admin/pages/Master/VisitPurposeMaster.tsx
import React, { useState, useEffect  } from 'react';
import { 
  Search, 
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  RefreshCw,
  Plus,
  Target,
  CheckCircle,
  XCircle,
  Layers,
  Trash2,
  Edit
} from 'lucide-react';
import { createVisitPurpose, getVisitPurposes } from "../../../services/visitPurpose.service";

interface VisitPurpose {
  id: number;
  purposeName: string;
  isActive: boolean;  // Changed from status to isActive boolean
  createdAt: string;
  updatedAt: string;
}

const VisitPurposeMaster = () => {
 const [purposes, setPurposes] = useState<VisitPurpose[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [showInsertModal, setShowInsertModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [purposeToDelete, setPurposeToDelete] = useState<VisitPurpose | null>(null);
  
  const [newPurpose, setNewPurpose] = useState({
    purposeName: '',
    isActive: true  // Changed to boolean
  });

  const [editPurpose, setEditPurpose] = useState({
    id: 0,
    purposeName: '',
    isActive: true,  // Changed to boolean
    createdAt: '',
    updatedAt: ''
  });

  const filteredPurposes = purposes.filter((purpose) => {
    const matchesSearch = purpose?.purposeName
      ?.toLowerCase()
      ?.includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' && purpose.isActive === true) ||
      (filterStatus === 'inactive' && purpose.isActive === false);
    
    return matchesSearch && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPurposes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPurposes.length / itemsPerPage);

  const exportToCSV = () => {
    const headers = ['Purpose Name', 'Status', 'Created At', 'Updated At'];
    const csvData = filteredPurposes.map(p => [
      p.purposeName, 
      p.isActive ? 'active' : 'inactive', 
      p.createdAt, 
      p.updatedAt
    ]);
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `visit_purposes_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Open edit modal
  const openEditModal = (purpose: VisitPurpose) => {
    setEditPurpose({
      id: purpose.id,
      purposeName: purpose.purposeName,
      isActive: purpose.isActive,
      createdAt: purpose.createdAt,
      updatedAt: purpose.updatedAt
    });
    setShowEditModal(true);
  };

  // Delete purpose
 const handleDeletePurpose = async () => {
  if (!purposeToDelete) return;

  try {

    // await deleteVisitPurpose(purposeToDelete.id);

    setPurposes((prev) => prev.filter(p => p.id !== purposeToDelete.id));

    setShowDeleteModal(false);
    setPurposeToDelete(null);

  } catch (error) {
    console.error("Delete failed:", error);
  }
};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'isActive') {
      setNewPurpose(prev => ({ ...prev, [name]: value === 'true' }));
    } else {
      setNewPurpose(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'isActive') {
      setEditPurpose(prev => ({ ...prev, [name]: value === 'true' }));
    } else {
      setEditPurpose(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleInsertPurpose = async () => {
    const payload = {
      id: 0,
      purposeName: newPurpose.purposeName,
      isActive: newPurpose.isActive,  // Changed to boolean
      updatedBy: "admin",
      updatedDate: new Date().toISOString(),
    };
    
    try {
      const data = await createVisitPurpose(payload); 
      await fetchVisitPurposes();

      setPurposes((prev) => [...prev, data]);

      setShowInsertModal(false);

      setNewPurpose({
        purposeName: "",
        isActive: true,
      });

    } catch (error) {
      console.error("Failed to add purpose:", error);
    }
  };

  const handleUpdatePurpose = () => {
    setPurposes(purposes.map(purpose => 
      purpose.id === editPurpose.id 
        ? {
            ...purpose,
            purposeName: editPurpose.purposeName,
            isActive: editPurpose.isActive,
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : purpose
    ));
    setShowEditModal(false);
    setEditPurpose({
      id: 0,
      purposeName: '',
      isActive: true,
      createdAt: '',
      updatedAt: ''
    });
  };

  const fetchVisitPurposes = async () => {
    try {
      const res = await getVisitPurposes();

      const apiData = res?.data || res || [];

      const mappedData: VisitPurpose[] = apiData.map((item: any) => ({
        id: item.id,
        purposeName: item.purposeName,
        isActive: item.isActive === true || item.isActive === 1 || item.status === 1 || item.status === 'active', // Handle both boolean and number
        createdAt: item.createdDate || item.createdAt || "",
        updatedAt: item.updatedDate || item.updatedAt || ""
      }));

      setPurposes(mappedData);

    } catch (error) {
      console.error("Error fetching visit purposes:", error);
    }
  };

  useEffect(() => {
    fetchVisitPurposes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Visit Purpose Master</h1>
          <p className="text-sm text-gray-500 mt-1">Manage visit purposes for tracking</p>
        </div>

        {/* Stats Cards */}
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
                <p className="text-xl sm:text-2xl font-bold text-green-600">{purposes.filter(p => p.isActive === true).length}</p>
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
                <p className="text-xl sm:text-2xl font-bold text-red-600">{purposes.filter(p => p.isActive === false).length}</p>
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

        {/* Action Bar */}
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

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
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
                        purpose.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {purpose.isActive ? 'active' : 'inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(purpose)}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit Purpose"
                        >
                          <Edit size={16} />
                        </button>
                       {/* <button
                          onClick={() => openDeleteModal(purpose)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Purpose"
                        >
                          <Trash2 size={16} />
                        </button>  */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {filteredPurposes.length > 0 && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
              <span className="font-medium">{Math.min(indexOfLastItem, filteredPurposes.length)}</span> of{' '}
              <span className="font-medium">{filteredPurposes.length}</span> entries
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center gap-1 text-sm"
              >
                <ChevronLeft size={14} /> Previous
              </button>
              <span className="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center gap-1 text-sm"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Insert Modal */}
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
              <form onSubmit={(e) => { e.preventDefault(); handleInsertPurpose(); }}>
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
                      value={newPurpose.isActive.toString()}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setShowInsertModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Add Purpose</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Edit Purpose</h2>
                <button onClick={() => setShowEditModal(false)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); handleUpdatePurpose(); }}>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Purpose Name *</label>
                    <input
                      type="text"
                      name="purposeName"
                      value={editPurpose.purposeName}
                      onChange={handleEditInputChange}
                      required
                      placeholder="e.g., Product Demo, Proposal Discussion"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      name="isActive"
                      value={editPurpose.isActive.toString()}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Update Purpose</button>
                </div>
              </form>
            </div>
          </div>
        )}

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
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No visit purposes found matching your criteria.</p>
            <button
              onClick={() => { setSearchTerm(''); setFilterStatus('all'); }}
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