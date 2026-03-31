// src/modules/super-admin/pages/Master/OutcomeMaster.tsx
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
  Target,
  CheckCircle,
  XCircle,
  Award,
  Trash2
} from 'lucide-react';

interface Outcome {
  id: number;
  outcomeName: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

const OutcomeMaster = () => {
  const [outcomes, setOutcomes] = useState<Outcome[]>([
    { id: 1, outcomeName: 'Lead Generated', status: 'active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    { id: 2, outcomeName: 'Demo Scheduled', status: 'active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    { id: 3, outcomeName: 'Proposal Opportunity', status: 'active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    { id: 4, outcomeName: 'Tender Opportunity', status: 'active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    { id: 5, outcomeName: 'Order Received', status: 'active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    { id: 6, outcomeName: 'No Outcome', status: 'active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    { id: 7, outcomeName: 'Requirement Collected', status: 'inactive', createdAt: '2024-02-01', updatedAt: '2024-02-15' },
    { id: 8, outcomeName: 'Payment Follow-up', status: 'active', createdAt: '2024-02-10', updatedAt: '2024-02-20' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState<Outcome | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showInsertModal, setShowInsertModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [outcomeToDelete, setOutcomeToDelete] = useState<Outcome | null>(null);
  
  const [newOutcome, setNewOutcome] = useState({
    outcomeName: '',
    status: 'active' as 'active' | 'inactive'
  });

  const filteredOutcomes = outcomes.filter(outcome => {
    const matchesSearch = outcome.outcomeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || outcome.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOutcomes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOutcomes.length / itemsPerPage);

  const exportToCSV = () => {
    const headers = ['Outcome Name', 'Status', 'Created At', 'Updated At'];
    const csvData = filteredOutcomes.map(o => [o.outcomeName, o.status, o.createdAt, o.updatedAt]);
    const blob = new Blob([[headers, ...csvData].map(row => row.join(',')).join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `outcomes_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const viewOutcomeDetails = (outcome: Outcome) => { setSelectedOutcome(outcome); setShowViewModal(true); };
  
  // Delete outcome
  const handleDeleteOutcome = () => {
    if (outcomeToDelete) {
      setOutcomes(outcomes.filter(o => o.id !== outcomeToDelete.id));
      setShowDeleteModal(false);
      setOutcomeToDelete(null);
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (outcome: Outcome) => {
    setOutcomeToDelete(outcome);
    setShowDeleteModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewOutcome(prev => ({ ...prev, [name]: value }));
  };

  const handleInsertOutcome = () => {
    const newId = Math.max(...outcomes.map(o => o.id), 0) + 1;
    const currentDate = new Date().toISOString().split('T')[0];
    setOutcomes([...outcomes, { id: newId, ...newOutcome, createdAt: currentDate, updatedAt: currentDate }]);
    setShowInsertModal(false);
    setNewOutcome({ outcomeName: '', status: 'active' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-3 sm:p-4 md:p-6">
        {/* Header */}
        <div className="mb-4 sm:mb-5 md:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Outcome Master</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Manage business outcome types for tracking</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-3 sm:p-4 border-l-4 border-purple-500 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Total Outcomes</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{outcomes.length}</p>
              </div>
              <div className="bg-purple-100 rounded-lg p-1.5 sm:p-2 group-hover:bg-purple-200 transition-colors">
                <Target size={16} className="text-purple-600 sm:w-5 sm:h-5" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-3 sm:p-4 border-l-4 border-green-500 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Active Outcomes</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">{outcomes.filter(o => o.status === 'active').length}</p>
              </div>
              <div className="bg-green-100 rounded-lg p-1.5 sm:p-2 group-hover:bg-green-200 transition-colors">
                <CheckCircle size={16} className="text-green-600 sm:w-5 sm:h-5" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-3 sm:p-4 border-l-4 border-red-500 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Inactive Outcomes</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-red-600">{outcomes.filter(o => o.status === 'inactive').length}</p>
              </div>
              <div className="bg-red-100 rounded-lg p-1.5 sm:p-2 group-hover:bg-red-200 transition-colors">
                <XCircle size={16} className="text-red-600 sm:w-5 sm:h-5" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-3 sm:p-4 border-l-4 border-blue-500 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Revenue Linked</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">4</p>
              </div>
              <div className="bg-blue-100 rounded-lg p-1.5 sm:p-2 group-hover:bg-blue-200 transition-colors">
                <Award size={16} className="text-blue-600 sm:w-5 sm:h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm mb-4 sm:mb-5 md:mb-6 border border-gray-100">
          <div className="p-3 sm:p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1 max-w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={15} />
              <input
                type="text"
                placeholder="Search outcomes..."
                className="w-full pl-9 pr-3 py-1.5 sm:py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowInsertModal(true)} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center gap-1.5 text-sm shadow-sm">
                <Plus size={15} /><span className="hidden sm:inline">Add Outcome</span><span className="sm:hidden">Add</span>
              </button>
              <button onClick={() => setShowFilters(!showFilters)} className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-1.5 text-sm">
                <Filter size={15} />
              </button>
              <button onClick={exportToCSV} className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-1.5 text-sm">
                <Download size={15} />
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="p-3 sm:p-4 border-t border-gray-100 bg-gray-50 rounded-b-lg sm:rounded-b-xl">
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                <div className="w-full sm:w-56">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Filter by Status</label>
                  <select className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="all">All Outcomes</option>
                    <option value="active">Active Only</option>
                    <option value="inactive">Inactive Only</option>
                  </select>
                </div>
                <button onClick={() => { setFilterStatus('all'); setSearchTerm(''); }} className="px-3 py-1.5 text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm">
                  <RefreshCw size={12} /> Reset
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Table */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['S.No', 'Outcome ID', 'Outcome Name', 'Status', 'Actions'].map((h, i) => (
                    <th key={i} className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                   </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentItems.map((outcome, index) => (
                  <tr key={outcome.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-500">{indexOfFirstItem + index + 1}</td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-mono text-purple-600 font-medium">OUT-{outcome.id.toString().padStart(3, '0')}</td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Target size={12} className="text-purple-500 sm:w-4 sm:h-4" />
                        <p className="text-xs sm:text-sm font-medium text-gray-800">{outcome.outcomeName}</p>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${outcome.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {outcome.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3">
                      <div className="flex gap-1">
                        <button onClick={() => viewOutcomeDetails(outcome)} className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all" title="View Details">
                          <Eye size={13} />
                        </button>
                        <button onClick={() => openDeleteModal(outcome)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete Outcome">
                          <Trash2 size={13} />
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
        {filteredOutcomes.length > 0 && (
          <div className="mt-4 sm:mt-5 md:mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs sm:text-sm text-gray-500 bg-white px-3 py-1.5 rounded-lg shadow-sm">
              Showing <span className="font-semibold text-purple-600">{indexOfFirstItem + 1}</span> to{' '}
              <span className="font-semibold text-purple-600">{Math.min(indexOfLastItem, filteredOutcomes.length)}</span> of{' '}
              <span className="font-semibold text-purple-600">{filteredOutcomes.length}</span> outcomes
            </div>
            <div className="flex gap-1.5">
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-2.5 sm:px-3 py-1 text-xs sm:text-sm border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-all flex items-center gap-1">
                <ChevronLeft size={12} /> Prev
              </button>
              <div className="flex gap-1">
                {[...Array(Math.min(3, totalPages))].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs sm:text-sm font-medium transition-all ${currentPage === pageNum ? 'bg-purple-600 text-white shadow-sm' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                {totalPages > 3 && <span className="px-1 text-gray-400 text-xs">...</span>}
              </div>
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-2.5 sm:px-3 py-1 text-xs sm:text-sm border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-all flex items-center gap-1">
                Next <ChevronRight size={12} />
              </button>
            </div>
          </div>
        )}

        {/* View Modal */}
        {showViewModal && selectedOutcome && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm max-h-[85vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-4 py-3 flex justify-between items-center">
                <h2 className="text-base font-bold text-gray-800">Outcome Details</h2>
                <button onClick={() => { setShowViewModal(false); setSelectedOutcome(null); }} className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="p-4 space-y-3">
                <div className="bg-purple-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <Target size={14} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500">Outcome ID</p>
                      <p className="text-xs font-mono font-semibold">OUT-{selectedOutcome.id.toString().padStart(3, '0')}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div><p className="text-gray-500">Outcome Name</p><p className="font-medium">{selectedOutcome.outcomeName}</p></div>
                    <div><p className="text-gray-500">Status</p><span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${selectedOutcome.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{selectedOutcome.status}</span></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 mb-2">System Information</h3>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between"><span className="text-gray-500">Created</span><span>{new Date(selectedOutcome.createdAt).toLocaleDateString()}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Updated</span><span>{new Date(selectedOutcome.updatedAt).toLocaleDateString()}</span></div>
                  </div>
                </div>
              </div>
              <div className="sticky bottom-0 bg-white border-t px-4 py-3 flex justify-end">
                <button onClick={() => { setShowViewModal(false); setSelectedOutcome(null); }} className="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs hover:bg-purple-700">Close</button>
              </div>
            </div>
          </div>
        )}

        {/* Insert Modal */}
        {showInsertModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm max-h-[85vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-4 py-3 flex justify-between items-center">
                <h2 className="text-base font-bold">Add New Outcome</h2>
                <button onClick={() => { setShowInsertModal(false); setNewOutcome({ outcomeName: '', status: 'active' }); }} className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); handleInsertOutcome(); }}>
                <div className="p-4 space-y-3">
                  <div><label className="block text-xs font-medium text-gray-700 mb-1">Outcome Name *</label><input type="text" name="outcomeName" value={newOutcome.outcomeName} onChange={handleInputChange} required placeholder="e.g., Lead Generated" className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg" /></div>
                  <div><label className="block text-xs font-medium text-gray-700 mb-1">Status</label><select name="status" value={newOutcome.status} onChange={handleInputChange} className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg"><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
                </div>
                <div className="sticky bottom-0 bg-white border-t px-4 py-3 flex justify-end gap-2">
                  <button type="button" onClick={() => setShowInsertModal(false)} className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                  <button type="submit" className="px-3 py-1.5 text-xs bg-purple-600 text-white rounded-lg hover:bg-purple-700">Add</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && outcomeToDelete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm">
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-red-100 rounded-full">
                    <Trash2 className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-center text-gray-800 mb-2">Confirm Delete</h3>
                <p className="text-xs sm:text-sm text-gray-600 text-center mb-4">
                  Are you sure you want to delete the outcome <strong className="text-gray-800">{outcomeToDelete.outcomeName}</strong>?
                  <br />
                  This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setOutcomeToDelete(null);
                    }}
                    className="flex-1 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteOutcome}
                    className="flex-1 px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredOutcomes.length === 0 && (
          <div className="text-center py-8 sm:py-10 bg-white rounded-lg shadow-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-2">
              <Target className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">No outcomes found</p>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filters</p>
            <button onClick={() => { setSearchTerm(''); setFilterStatus('all'); }} className="mt-2 px-3 py-1.5 text-purple-600 bg-purple-50 rounded-lg text-xs font-medium hover:bg-purple-100">Clear filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutcomeMaster;