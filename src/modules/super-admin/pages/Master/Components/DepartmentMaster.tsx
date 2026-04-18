// src/modules/super-admin/pages/Master/DepartmentMaster.tsx
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  RefreshCw,
  Layers,
  Plus,
  Trash2,
  Edit
} from 'lucide-react';
import { 
  createDepartment, 
  getDepartments, 
  updateDepartment 
} from '../../../services/department.service';

interface Department {
  id: number;
  departmentName: string;
  organisationId: number;
  createdAt: string;
  updatedAt: string;
}

interface DepartmentPayload {
  id: number;
  departmentName: string;
  organisationId: number;
}

// Sample data for dropdowns (you can replace with API if needed)
const sampleOrganizations = [
  { id: 1, name: 'Examination Wing - MP Board' },
  { id: 2, name: 'University Campus Office' },
  { id: 3, name: 'ITI Limited - Rae Bareli Plant' },
  { id: 4, name: 'Infosys - Electronic City Campus' },
  { id: 5, name: 'Tata Motors - Pimpri Plant' },
  { id: 6, name: 'ICICI Bank - BKC Branch' },
  { id: 7, name: 'Agnigate - Corporate Office' },
];

const DepartmentMaster = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOrganization, setFilterOrganization] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [showInsertModal, setShowInsertModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState<Department | null>(null);
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Form state for new department
  const [newDepartment, setNewDepartment] = useState({
    departmentName: '',
    organisationId: 1
  });

  // Form state for edit department
  const [editDepartment, setEditDepartment] = useState({
    id: 0,
    departmentName: '',
    organisationId: 0
  });

  // Get unique values for filters
  const organizations = ['all', ...new Set(departments.map(d => {
    const org = sampleOrganizations.find(o => o.id === d.organisationId);
    return org ? org.name : 'Unknown';
  }))];

  // Filter departments
  const filteredDepartments = departments.filter(dept => {
    const orgName = sampleOrganizations.find(o => o.id === dept.organisationId)?.name || 'Unknown';
    const matchesSearch = 
      dept.departmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orgName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesOrganization = filterOrganization === 'all' || orgName === filterOrganization;
    
    return matchesSearch && matchesOrganization;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDepartments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);

  // Fetch departments from API
  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const res = await getDepartments();
      setDepartments(res);
    } catch (err) {
      console.error("Error fetching departments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['ID', 'Department Name', 'Organization ID', 'Organization Name', 'Created At', 'Updated At'];
    const csvData = filteredDepartments.map(dept => {
      const orgName = sampleOrganizations.find(o => o.id === dept.organisationId)?.name || 'Unknown';
      return [
        dept.id,
        dept.departmentName,
        dept.organisationId,
        orgName,
        new Date(dept.createdAt).toLocaleString(),
        new Date(dept.updatedAt).toLocaleString()
      ];
    });
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `departments_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Open delete confirmation modal
  const openDeleteModal = (department: Department) => {
    setDepartmentToDelete(department);
    setShowDeleteModal(true);
  };

  // Open edit modal
  const openEditModal = (department: Department) => {
    setEditDepartment({
      id: department.id,
      departmentName: department.departmentName,
      organisationId: department.organisationId
    });
    setShowEditModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewDepartment({ ...newDepartment, [name]: value });
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditDepartment({ ...editDepartment, [name]: value });
  };

  // CREATE department
  const handleInsertDepartment = async () => {
    try {
      const payload: DepartmentPayload = {
        id: 0,
        departmentName: newDepartment.departmentName,
        organisationId: newDepartment.organisationId
      };
      await createDepartment(payload);
      await fetchDepartments(); // refresh list
      setShowInsertModal(false);
      setNewDepartment({ departmentName: "", organisationId: 1 });
    } catch (error) {
      console.error("Error creating department", error);
    }
  };

  // ✅ UPDATE department
  const handleUpdateDepartment = async () => {
    setIsUpdating(true);
    try {
      const payload = {
        departmentName: editDepartment.departmentName,
        organisationId: editDepartment.organisationId
      };
      await updateDepartment(editDepartment.id, payload);
      await fetchDepartments(); // refresh list
      setShowEditModal(false);
      setEditDepartment({ id: 0, departmentName: '', organisationId: 0 });
    } catch (error) {
      console.error("Error updating department", error);
    } finally {
      setIsUpdating(false);
    }
  };

  // DELETE department (commented in UI, but function kept)
  const handleDeleteDepartment = async () => {
    if (!departmentToDelete) return;
    try {
      // await deleteDepartment(departmentToDelete.id);   // API not provided
      setDepartments(prev => prev.filter(d => d.id !== departmentToDelete.id));
      setShowDeleteModal(false);
      setDepartmentToDelete(null);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const getOrganizationName = (organisationId: number) => {
    const org = sampleOrganizations.find(o => o.id === organisationId);
    return org ? org.name : 'Unknown';
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
          <p className="text-2xl font-bold text-green-600">{departments.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">Total Organizations</p>
          <p className="text-2xl font-bold text-blue-600">{sampleOrganizations.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-orange-500">
          <p className="text-sm text-gray-600">Last Updated</p>
          <p className="text-lg font-bold text-gray-800">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-96 relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search departments by name or organization..." 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Organization</label>
                <select className="w-full px-3 py-2 border rounded-lg" value={filterOrganization} onChange={(e) => setFilterOrganization(e.target.value)}>
                  {organizations.map(o => <option key={o} value={o}>{o === 'all' ? 'All Organizations' : o}</option>)}
                </select>
              </div>
              <div className="flex items-end">
                <button onClick={() => { setFilterOrganization('all'); setSearchTerm(''); }} className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2">
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
          <table className="w-full min-w-[1200px] lg:min-w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Department Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Organization ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Organization Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Created At</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Updated At</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {currentItems.map((dept) => (
                <tr key={dept.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{dept.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Layers size={16} className="text-purple-500" />
                      <span className="font-medium text-gray-900">{dept.departmentName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{dept.organisationId}</td>
                  <td className="px-4 py-3 text-sm">{getOrganizationName(dept.organisationId)}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-700">{new Date(dept.createdAt).toLocaleDateString()}</span>
                      <span className="text-xs text-gray-400">{new Date(dept.createdAt).toLocaleTimeString()}</span>
                    </div>
                   </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-700">{new Date(dept.updatedAt).toLocaleDateString()}</span>
                      <span className="text-xs text-gray-400">{new Date(dept.updatedAt).toLocaleTimeString()}</span>
                    </div>
                   </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => openEditModal(dept)} 
                        className="p-1 text-green-600 hover:bg-green-50 rounded" 
                        title="Edit Department"
                      >
                        <Edit size={18} />
                      </button>
                      {/* Delete button hidden as per original */}
                    </div>
                   </td>
                </tr>
              ))}
            </tbody>
           </table>
        </div>
      </div>

      {/* Pagination */}
      {filteredDepartments.length > 0 && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredDepartments.length)} of {filteredDepartments.length} entries
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1} 
              className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-50 flex items-center gap-1"
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <span className="px-4 py-1 bg-purple-600 text-white rounded-lg">Page {currentPage} of {totalPages}</span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages} 
              className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-50 flex items-center gap-1"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ==================== EDIT MODAL ==================== */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Department</h2>
              <button onClick={() => setShowEditModal(false)} className="p-1 hover:bg-gray-100 rounded">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleUpdateDepartment(); }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Department Name *</label>
                  <input 
                    type="text" 
                    name="departmentName" 
                    value={editDepartment.departmentName} 
                    onChange={handleEditInputChange} 
                    required 
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" 
                    placeholder="Enter department name"
                  />
                </div>
                {/* Optionally add organization dropdown for edit */}
                <div>
                  <label className="block text-sm font-medium mb-1">Organization *</label>
                  <select
                    name="organisationId"
                    value={editDepartment.organisationId}
                    onChange={handleEditInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    {sampleOrganizations.map(org => (
                      <option key={org.id} value={org.id}>{org.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={isUpdating} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50">
                  {isUpdating ? 'Updating...' : 'Update Department'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== INSERT MODAL ==================== */}
      {showInsertModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Department</h2>
              <button onClick={() => setShowInsertModal(false)} className="p-1 hover:bg-gray-100 rounded">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleInsertDepartment(); }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Department Name *</label>
                  <input 
                    type="text" 
                    name="departmentName" 
                    value={newDepartment.departmentName} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" 
                    placeholder="Enter department name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Organization *</label>
                  <select
                    name="organisationId"
                    value={newDepartment.organisationId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    {sampleOrganizations.map(org => (
                      <option key={org.id} value={org.id}>{org.name}</option>
                    ))}
                  </select>
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

      {/* ==================== DELETE MODAL ==================== */}
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
                  className="flex-1 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteDepartment}
                  className="flex-1 px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700"
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
        <div className="text-center py-12 bg-white rounded-lg shadow mt-6">
          <Layers className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">No departments found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default DepartmentMaster;