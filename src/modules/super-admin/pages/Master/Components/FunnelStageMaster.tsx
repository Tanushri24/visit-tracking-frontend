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
  Layers,
  Plus,
  TrendingUp,
  CheckCircle,
  XCircle,
  Activity,
  Award,
  Target
} from 'lucide-react';

interface FunnelStage {
  id: number;
  stageName: string;
  stageOrder: number;
  isClosedStage: boolean;
  isWonStage: boolean;
  isLostStage: boolean;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const API_URL = 'https://localhost:7146/api/FunnelStage';

const FunnelStageMaster = () => {
  const [stages, setStages] = useState<FunnelStage[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStage, setSelectedStage] = useState<FunnelStage | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showInsertModal, setShowInsertModal] = useState(false);

  const [newStage, setNewStage] = useState({
    stageName: '',
    stageOrder: 0,
    isClosedStage: false,
    isWonStage: false,
    isLostStage: false,
    isActive: true
  });

  const normalizeStage = (stage: Partial<FunnelStage>): FunnelStage => ({
    id: Number(stage.id ?? 0),
    stageName: stage.stageName ?? '',
    stageOrder: Number(stage.stageOrder ?? 0),
    isClosedStage: Boolean(stage.isClosedStage ?? false),
    isWonStage: Boolean(stage.isWonStage ?? false),
    isLostStage: Boolean(stage.isLostStage ?? false),
    isActive: Boolean(stage.isActive ?? true),
    createdAt: stage.createdAt ?? '',
    updatedAt: stage.updatedAt ?? ''
  });

  const fetchStages = async (): Promise<FunnelStage[]> => {
    try {
      setLoading(true);
      const response = await axios.get<FunnelStage[]>(API_URL);
      const normalizedStages = (response.data ?? []).map((stage) => normalizeStage(stage));
      setStages(normalizedStages);
      return normalizedStages;
    } catch (error) {
      console.error('Failed to fetch funnel stages:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStages();
  }, []);

  const filteredStages = stages.filter((stage) => {
    const matchesSearch = stage.stageName.toLowerCase().includes(searchTerm.toLowerCase());
    const status = stage.isActive ? 'active' : 'inactive';
    const matchesStatus = filterStatus === 'all' || status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStages.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.max(1, Math.ceil(filteredStages.length / itemsPerPage));

  const exportToCSV = () => {
    const headers = ['Stage Name', 'Stage Order', 'Closed Stage', 'Won Stage', 'Lost Stage', 'Status'];
    const csvData = filteredStages.map((stage) => [
      stage.stageName,
      stage.stageOrder.toString(),
      stage.isClosedStage ? 'Yes' : 'No',
      stage.isWonStage ? 'Yes' : 'No',
      stage.isLostStage ? 'Yes' : 'No',
      stage.isActive ? 'active' : 'inactive'
    ]);
    const blob = new Blob([[headers, ...csvData].map((row) => row.join(',')).join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `funnel_stages_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const viewStageDetails = (stage: FunnelStage) => {
    setSelectedStage(stage);
    setShowViewModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = target.checked;

    setNewStage((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'stageOrder'
          ? Number(value) || 0
          : value
    }));
  };

  const handleInsertStage = async () => {
    if (!newStage.stageName.trim() || newStage.stageOrder <= 0) {
      alert('Stage Name and valid Stage Order are required');
      return;
    }

    const payload = {
      id: 0,
      stageName: newStage.stageName.trim(),
      stageOrder: Number(newStage.stageOrder),
      isClosedStage: newStage.isClosedStage,
      isWonStage: newStage.isWonStage,
      isLostStage: newStage.isLostStage,
      isActive: newStage.isActive
    };

    try {
      setLoading(true);
      const response = await axios.post(API_URL, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const createdStage = normalizeStage({
        id: response?.data?.id ?? Date.now(),
        stageName: response?.data?.stageName ?? payload.stageName,
        stageOrder: response?.data?.stageOrder ?? payload.stageOrder,
        isClosedStage: response?.data?.isClosedStage ?? payload.isClosedStage,
        isWonStage: response?.data?.isWonStage ?? payload.isWonStage,
        isLostStage: response?.data?.isLostStage ?? payload.isLostStage,
        isActive: response?.data?.isActive ?? payload.isActive,
        createdAt: response?.data?.createdAt ?? new Date().toISOString(),
        updatedAt: response?.data?.updatedAt ?? new Date().toISOString()
      });

      setStages((prev) => [createdStage, ...prev]);
      setCurrentPage(1);
      setShowInsertModal(false);
      setNewStage({
        stageName: '',
        stageOrder: 0,
        isClosedStage: false,
        isWonStage: false,
        isLostStage: false,
        isActive: true
      });
      alert('Funnel stage created successfully');
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
        'Failed to create funnel stage';

      alert(typeof errorMessage === 'string' ? errorMessage : 'Failed to create funnel stage');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-3 sm:p-4 md:p-5 lg:p-6">
        <div className="mb-4 sm:mb-5 md:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Funnel Stage Master</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Configure and manage your sales pipeline stages</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-2.5 sm:p-3 border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <p className="text-[10px] sm:text-xs font-medium text-gray-500">Total Stages</p>
              <div className="bg-purple-100 rounded-lg p-1">
                <Layers size={14} className="text-purple-600 sm:w-4 sm:h-4" />
              </div>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{stages.length}</p>
            <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5 sm:mt-1">Complete funnel stages</p>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-2.5 sm:p-3 border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <p className="text-[10px] sm:text-xs font-medium text-gray-500">Active Stages</p>
              <div className="bg-green-100 rounded-lg p-1">
                <CheckCircle size={14} className="text-green-600 sm:w-4 sm:h-4" />
              </div>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">{stages.filter((s) => s.isActive).length}</p>
            <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5 sm:mt-1">Currently in use</p>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-2.5 sm:p-3 border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <p className="text-[10px] sm:text-xs font-medium text-gray-500">Inactive Stages</p>
              <div className="bg-red-100 rounded-lg p-1">
                <XCircle size={14} className="text-red-600 sm:w-4 sm:h-4" />
              </div>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-red-600">{stages.filter((s) => !s.isActive).length}</p>
            <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5 sm:mt-1">Temporarily disabled</p>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-2.5 sm:p-3 border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <p className="text-[10px] sm:text-xs font-medium text-gray-500">Win/Loss Stages</p>
              <div className="bg-blue-100 rounded-lg p-1">
                <Award size={14} className="text-blue-600 sm:w-4 sm:h-4" />
              </div>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">{stages.filter((s) => s.isWonStage || s.isLostStage).length}</p>
            <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5 sm:mt-1">Won/Lost markers</p>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm mb-4 sm:mb-5 md:mb-6 border border-gray-100">
          <div className="p-2.5 sm:p-3 md:p-4 flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
            <div className="relative flex-1 max-w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={15} />
              <input
                type="text"
                placeholder="Search by stage name..."
                className="w-full pl-9 pr-3 py-1.5 sm:py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 hover:bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-1.5 sm:gap-2">
              <button onClick={() => setShowInsertModal(true)} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center gap-1.5 text-xs sm:text-sm font-medium shadow-sm">
                <Plus size={14} /><span className="hidden sm:inline">Add Stage</span><span className="sm:hidden">Add</span>
              </button>
              <button onClick={() => setShowFilters(!showFilters)} className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-1.5 text-xs sm:text-sm text-gray-600">
                <Filter size={14} />
              </button>
              <button onClick={exportToCSV} className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-1.5 text-xs sm:text-sm text-gray-600">
                <Download size={14} />
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="p-2.5 sm:p-3 md:p-4 border-t border-gray-100 bg-gray-50 rounded-b-lg">
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                <div className="w-full sm:w-56">
                  <label className="block text-[10px] sm:text-xs font-medium text-gray-600 mb-1">Filter by Status</label>
                  <select className="w-full px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-lg bg-white" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="all">All Stages</option>
                    <option value="active">Active Only</option>
                    <option value="inactive">Inactive Only</option>
                  </select>
                </div>
                <button onClick={() => { setFilterStatus('all'); setSearchTerm(''); }} className="px-3 py-1.5 text-gray-500 hover:text-gray-700 flex items-center gap-1.5 text-xs sm:text-sm">
                  <RefreshCw size={12} /> Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading funnel stages...</div>
            ) : (
              <table className="w-full min-w-[850px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {['#', 'Stage ID', 'Stage Name', 'Order', 'Closed', 'Won', 'Lost', 'Status', 'Actions'].map((h, i) => (
                      <th key={i} className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {currentItems.map((stage, index) => (
                    <tr key={stage.id} className="hover:bg-purple-50/30 transition-colors">
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-400 font-medium">{indexOfFirstItem + index + 1}</td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3">
                        <span className="inline-flex px-2 py-0.5 bg-purple-50 text-purple-700 rounded-full text-[10px] sm:text-xs font-mono font-semibold">
                          STG-{stage.id.toString().padStart(3, '0')}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${stage.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span className="text-xs sm:text-sm font-medium text-gray-800">{stage.stageName}</span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-gray-100 flex items-center justify-center text-xs sm:text-sm font-bold text-gray-700">
                          {stage.stageOrder}
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm">{stage.isClosedStage ? 'Yes' : 'No'}</td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm">{stage.isWonStage ? 'Yes' : 'No'}</td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm">{stage.isLostStage ? 'Yes' : 'No'}</td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${stage.isActive ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                          {stage.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3">
                        <div className="flex gap-1">
                          <button onClick={() => viewStageDetails(stage)} className="p-1 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded transition-all" title="View Details">
                            <Eye size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {filteredStages.length > 0 && !loading && (
          <div className="mt-4 sm:mt-5 md:mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-[11px] sm:text-xs text-gray-500">
              Showing <span className="font-semibold text-purple-600">{indexOfFirstItem + 1}</span> to{' '}
              <span className="font-semibold text-purple-600">{Math.min(indexOfLastItem, filteredStages.length)}</span> of{' '}
              <span className="font-semibold text-purple-600">{filteredStages.length}</span> stages
            </div>
            <div className="flex gap-1.5">
              <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-2.5 sm:px-3 py-1 text-xs border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-all flex items-center gap-1">
                <ChevronLeft size={12} /> Prev
              </button>
              <div className="flex gap-1">
                {[...Array(Math.min(3, totalPages))].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-medium transition-all ${currentPage === pageNum ? 'bg-purple-600 text-white shadow-sm' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                {totalPages > 3 && <span className="px-1 text-gray-400 text-xs">...</span>}
              </div>
              <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-2.5 sm:px-3 py-1 text-xs border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-all flex items-center gap-1">
                Next <ChevronRight size={12} />
              </button>
            </div>
          </div>
        )}

        {showViewModal && selectedStage && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm max-h-[85vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-4 py-3 flex justify-between items-center">
                <h2 className="text-base font-bold text-gray-900">Stage Details</h2>
                <button onClick={() => { setShowViewModal(false); setSelectedStage(null); }} className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="p-4 space-y-3">
                <div className="bg-purple-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <Target size={16} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500">Stage ID</p>
                      <p className="text-xs font-mono font-semibold">STG-{selectedStage.id.toString().padStart(3, '0')}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div><p className="text-gray-500">Stage Name</p><p className="font-medium">{selectedStage.stageName}</p></div>
                    <div><p className="text-gray-500">Stage Order</p><p className="font-medium">{selectedStage.stageOrder}</p></div>
                    <div><p className="text-gray-500">Closed</p><p className="font-medium">{selectedStage.isClosedStage ? 'Yes' : 'No'}</p></div>
                    <div><p className="text-gray-500">Won</p><p className="font-medium">{selectedStage.isWonStage ? 'Yes' : 'No'}</p></div>
                    <div><p className="text-gray-500">Lost</p><p className="font-medium">{selectedStage.isLostStage ? 'Yes' : 'No'}</p></div>
                    <div><p className="text-gray-500">Status</p><span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${selectedStage.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{selectedStage.isActive ? 'Active' : 'Inactive'}</span></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1"><Activity size={12} /> System Info</h3>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between"><span className="text-gray-500">Created</span><span>{selectedStage.createdAt ? new Date(selectedStage.createdAt).toLocaleDateString() : '-'}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Updated</span><span>{selectedStage.updatedAt ? new Date(selectedStage.updatedAt).toLocaleDateString() : '-'}</span></div>
                  </div>
                </div>
              </div>
              <div className="sticky bottom-0 bg-white border-t px-4 py-3 flex justify-end">
                <button onClick={() => { setShowViewModal(false); setSelectedStage(null); }} className="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs hover:bg-purple-700">Close</button>
              </div>
            </div>
          </div>
        )}

        {showInsertModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm max-h-[85vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-4 py-3 flex justify-between items-center">
                <h2 className="text-base font-bold">Add New Stage</h2>
                <button
                  onClick={() => {
                    setShowInsertModal(false);
                    setNewStage({
                      stageName: '',
                      stageOrder: 0,
                      isClosedStage: false,
                      isWonStage: false,
                      isLostStage: false,
                      isActive: true
                    });
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); handleInsertStage(); }}>
                <div className="p-4 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Stage Name *</label>
                    <input type="text" name="stageName" value={newStage.stageName} onChange={handleInputChange} required placeholder="e.g., Lead Identified" className="w-full px-3 py-1.5 text-sm border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Stage Order *</label>
                    <input type="number" name="stageOrder" value={newStage.stageOrder} onChange={handleInputChange} required min="1" placeholder="e.g., 1, 2, 3" className="w-full px-3 py-1.5 text-sm border rounded-lg" />
                    <p className="text-[10px] text-gray-400 mt-1">Sequence in funnel</p>
                  </div>
                  <label className="flex items-center gap-2 text-xs"><input type="checkbox" name="isClosedStage" checked={newStage.isClosedStage} onChange={handleInputChange} /> Closed Stage</label>
                  <label className="flex items-center gap-2 text-xs"><input type="checkbox" name="isWonStage" checked={newStage.isWonStage} onChange={handleInputChange} /> Won Stage</label>
                  <label className="flex items-center gap-2 text-xs"><input type="checkbox" name="isLostStage" checked={newStage.isLostStage} onChange={handleInputChange} /> Lost Stage</label>
                  <label className="flex items-center gap-2 text-xs"><input type="checkbox" name="isActive" checked={newStage.isActive} onChange={handleInputChange} /> Active</label>
                </div>
                <div className="sticky bottom-0 bg-white border-t px-4 py-3 flex justify-end gap-2">
                  <button type="button" onClick={() => setShowInsertModal(false)} className="px-3 py-1.5 text-xs border rounded-lg hover:bg-gray-50">Cancel</button>
                  <button type="submit" className="px-3 py-1.5 text-xs bg-purple-600 text-white rounded-lg hover:bg-purple-700">Add Stage</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {filteredStages.length === 0 && !loading && (
          <div className="text-center py-8 sm:py-10 bg-white rounded-lg shadow-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-2">
              <TrendingUp className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">No stages found</p>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filters</p>
            <button onClick={() => { setSearchTerm(''); setFilterStatus('all'); }} className="mt-2 px-3 py-1.5 text-purple-600 bg-purple-50 rounded-lg text-xs font-medium hover:bg-purple-100">Clear filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FunnelStageMaster;
