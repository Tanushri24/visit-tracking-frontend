// src/modules/super-admin/pages/Master/ExpenseRateMaster.tsx
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
  DollarSign,
  Calendar,
  TrendingUp,
  PieChart,
  Trash2
} from 'lucide-react';

interface ExpenseRate {
  id: number;
  vehicleType: string;
  ratePerKm: number;
  effectiveFrom: string;
  effectiveTo: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

const sampleVehicleTypes = [
  { id: 1, name: 'Two Wheeler', defaultRate: 4 },
  { id: 2, name: 'Four Wheeler', defaultRate: 10 },
  { id: 3, name: 'Three Wheeler', defaultRate: 8 },
  { id: 4, name: 'Mini Bus', defaultRate: 15 },
  { id: 5, name: 'Bus', defaultRate: 20 },
];

const ExpenseRateMaster = () => {
  const [rates, setRates] = useState<ExpenseRate[]>([
    { id: 1, vehicleType: 'Two Wheeler', ratePerKm: 4, effectiveFrom: '2024-01-01', effectiveTo: '2024-12-31', status: 'active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    { id: 2, vehicleType: 'Four Wheeler', ratePerKm: 10, effectiveFrom: '2024-01-01', effectiveTo: '2024-12-31', status: 'active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    { id: 3, vehicleType: 'Three Wheeler', ratePerKm: 8, effectiveFrom: '2024-01-01', effectiveTo: '2024-06-30', status: 'active', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
    { id: 4, vehicleType: 'Mini Bus', ratePerKm: 15, effectiveFrom: '2024-01-01', effectiveTo: '2024-12-31', status: 'inactive', createdAt: '2024-01-15', updatedAt: '2024-02-20' },
    { id: 5, vehicleType: 'Bus', ratePerKm: 20, effectiveFrom: '2024-01-01', effectiveTo: '2024-12-31', status: 'active', createdAt: '2024-01-20', updatedAt: '2024-02-18' },
    { id: 6, vehicleType: 'Two Wheeler', ratePerKm: 5, effectiveFrom: '2025-01-01', effectiveTo: '2025-12-31', status: 'active', createdAt: '2024-12-01', updatedAt: '2024-12-01' },
    { id: 7, vehicleType: 'Four Wheeler', ratePerKm: 12, effectiveFrom: '2025-01-01', effectiveTo: '2025-12-31', status: 'active', createdAt: '2024-12-01', updatedAt: '2024-12-01' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterVehicleType, setFilterVehicleType] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRate, setSelectedRate] = useState<ExpenseRate | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showInsertModal, setShowInsertModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [rateToDelete, setRateToDelete] = useState<ExpenseRate | null>(null);
  
  const [newRate, setNewRate] = useState({
    vehicleType: '',
    ratePerKm: 0,
    effectiveFrom: '',
    effectiveTo: '',
    status: 'active' as 'active' | 'inactive'
  });

  const vehicleTypes = ['all', ...new Set(rates.map(r => r.vehicleType))];

  const filteredRates = rates.filter(rate => {
    const matchesSearch = rate.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()) || rate.ratePerKm.toString().includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || rate.status === filterStatus;
    const matchesVehicleType = filterVehicleType === 'all' || rate.vehicleType === filterVehicleType;
    return matchesSearch && matchesStatus && matchesVehicleType;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRates.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRates.length / itemsPerPage);

  const exportToCSV = () => {
    const headers = ['Vehicle Type', 'Rate Per KM (₹)', 'Effective From', 'Effective To', 'Status', 'Created At', 'Updated At'];
    const csvData = filteredRates.map(r => [r.vehicleType, r.ratePerKm.toString(), r.effectiveFrom, r.effectiveTo, r.status, r.createdAt, r.updatedAt]);
    const blob = new Blob([[headers, ...csvData].map(row => row.join(',')).join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `expense_rates_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const viewRateDetails = (rate: ExpenseRate) => { setSelectedRate(rate); setShowViewModal(true); };
  
  // Delete rate
  const handleDeleteRate = () => {
    if (rateToDelete) {
      setRates(rates.filter(r => r.id !== rateToDelete.id));
      setShowDeleteModal(false);
      setRateToDelete(null);
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (rate: ExpenseRate) => {
    setRateToDelete(rate);
    setShowDeleteModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewRate(prev => ({ ...prev, [name]: name === 'ratePerKm' ? parseFloat(value) || 0 : value }));
  };

  const handleInsertRate = () => {
    const newId = Math.max(...rates.map(r => r.id), 0) + 1;
    const currentDate = new Date().toISOString().split('T')[0];
    setRates([...rates, { id: newId, ...newRate, createdAt: currentDate, updatedAt: currentDate }]);
    setShowInsertModal(false);
    setNewRate({ vehicleType: '', ratePerKm: 0, effectiveFrom: '', effectiveTo: '', status: 'active' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-3 sm:p-4 md:p-5 lg:p-6">
        {/* Header */}
        <div className="mb-5 sm:mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            Expense Rate Master
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Manage expense rates per kilometer for vehicle types</p>
          <div className="h-0.5 w-16 bg-purple-500 rounded-full mt-2"></div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4 mb-5 sm:mb-6 md:mb-8">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all p-2.5 sm:p-3 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] sm:text-xs font-medium text-gray-500">Total Rates</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{rates.length}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-1.5 sm:p-2">
                <DollarSign size={14} className="text-purple-600 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div className="mt-1.5 sm:mt-2">
              <div className="h-0.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-full bg-purple-500 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all p-2.5 sm:p-3 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] sm:text-xs font-medium text-gray-500">Active Rates</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">{rates.filter(r => r.status === 'active').length}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-1.5 sm:p-2">
                <TrendingUp size={14} className="text-green-600 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div className="mt-1.5 sm:mt-2">
              <div className="h-0.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-full bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all p-2.5 sm:p-3 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] sm:text-xs font-medium text-gray-500">Inactive Rates</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-red-600">{rates.filter(r => r.status === 'inactive').length}</p>
              </div>
              <div className="bg-red-50 rounded-lg p-1.5 sm:p-2">
                <Calendar size={14} className="text-red-600 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div className="mt-1.5 sm:mt-2">
              <div className="h-0.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-full bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all p-2.5 sm:p-3 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] sm:text-xs font-medium text-gray-500">Vehicle Types</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">{vehicleTypes.length - 1}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-1.5 sm:p-2">
                <PieChart size={14} className="text-blue-600 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div className="mt-1.5 sm:mt-2">
              <div className="h-0.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-full bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm mb-5 sm:mb-6 md:mb-8 border border-gray-100">
          <div className="p-3 sm:p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1 max-w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={15} />
              <input
                type="text"
                placeholder="Search by vehicle type or rate..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowInsertModal(true)} className="px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center gap-1.5 text-sm">
                <Plus size={15} /><span className="hidden sm:inline">Add New Rate</span><span className="sm:hidden">Add</span>
              </button>
              <button onClick={() => setShowFilters(!showFilters)} className="px-3 sm:px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-1.5 text-sm">
                <Filter size={15} /><span className="hidden sm:inline">Filters</span>
              </button>
              <button onClick={exportToCSV} className="px-3 sm:px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-1.5 text-sm">
                <Download size={15} /><span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="p-3 sm:p-4 border-t border-gray-100 bg-gray-50 rounded-b-lg sm:rounded-b-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
                  <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="all">All Status</option><option value="active">Active</option><option value="inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Vehicle Type</label>
                  <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white" value={filterVehicleType} onChange={(e) => setFilterVehicleType(e.target.value)}>
                    {vehicleTypes.map(vt => <option key={vt} value={vt}>{vt === 'all' ? 'All Types' : vt}</option>)}
                  </select>
                </div>
                <div className="flex items-end">
                  <button onClick={() => { setFilterStatus('all'); setFilterVehicleType('all'); setSearchTerm(''); }} className="px-3 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-1 text-sm">
                    <RefreshCw size={13} /> Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {['S.No', 'Rate ID', 'Vehicle Type', 'Rate Per KM', 'Effective From', 'Effective To', 'Status', 'Actions'].map((h, i) => (
                    <th key={i} className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{h}</th>
                  ))}
                  </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentItems.map((rate, index) => (
                  <tr key={rate.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-500">{indexOfFirstItem + index + 1}</td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm font-mono text-purple-600 font-semibold">R-{rate.id.toString().padStart(4, '0')}</td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-700">{rate.vehicleType}</td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm font-bold text-purple-600">₹{rate.ratePerKm}/km</td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-600">{new Date(rate.effectiveFrom).toLocaleDateString('en-IN')}</td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-600">{new Date(rate.effectiveTo).toLocaleDateString('en-IN')}</td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${rate.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {rate.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2.5 sm:py-3">
                      <div className="flex gap-1.5">
                        <button onClick={() => viewRateDetails(rate)} className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="View Details">
                          <Eye size={14} />
                        </button>
                        <button onClick={() => openDeleteModal(rate)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Rate">
                          <Trash2 size={14} />
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
        {filteredRates.length > 0 && (
          <div className="mt-4 sm:mt-5 md:mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs sm:text-sm text-gray-500 bg-white px-3 py-1.5 rounded-lg shadow-sm">
              Showing <span className="font-semibold text-purple-600">{indexOfFirstItem + 1}</span> to{' '}
              <span className="font-semibold text-purple-600">{Math.min(indexOfLastItem, filteredRates.length)}</span> of{' '}
              <span className="font-semibold text-purple-600">{filteredRates.length}</span> entries
            </div>
            <div className="flex gap-1.5">
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-all flex items-center gap-1">
                <ChevronLeft size={12} /> Previous
              </button>
              <span className="px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm bg-purple-600 text-white rounded-lg font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-all flex items-center gap-1">
                Next <ChevronRight size={12} />
              </button>
            </div>
          </div>
        )}

        {/* View Modal */}
        {showViewModal && selectedRate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-4 py-3 flex justify-between items-center">
                <h2 className="text-base sm:text-lg font-bold text-gray-800">Expense Rate Details</h2>
                <button onClick={() => { setShowViewModal(false); setSelectedRate(null); }} className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="p-4 space-y-3">
                <div className="border-b pb-3">
                  <h3 className="text-sm font-semibold text-purple-600 mb-2">Rate Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between"><span className="text-xs text-gray-500">Rate ID</span><span className="text-sm font-mono">R-{selectedRate.id.toString().padStart(4, '0')}</span></div>
                    <div className="flex justify-between"><span className="text-xs text-gray-500">Vehicle Type</span><span className="text-sm">{selectedRate.vehicleType}</span></div>
                    <div className="flex justify-between"><span className="text-xs text-gray-500">Rate Per KM</span><span className="text-sm font-bold text-purple-600">₹{selectedRate.ratePerKm}/km</span></div>
                    <div className="flex justify-between"><span className="text-xs text-gray-500">Effective From</span><span className="text-sm">{new Date(selectedRate.effectiveFrom).toLocaleDateString()}</span></div>
                    <div className="flex justify-between"><span className="text-xs text-gray-500">Effective To</span><span className="text-sm">{new Date(selectedRate.effectiveTo).toLocaleDateString()}</span></div>
                    <div className="flex justify-between"><span className="text-xs text-gray-500">Status</span><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${selectedRate.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{selectedRate.status}</span></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-purple-600 mb-2">System Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between"><span className="text-xs text-gray-500">Created At</span><span className="text-sm">{new Date(selectedRate.createdAt).toLocaleDateString()}</span></div>
                    <div className="flex justify-between"><span className="text-xs text-gray-500">Last Updated</span><span className="text-sm">{new Date(selectedRate.updatedAt).toLocaleDateString()}</span></div>
                  </div>
                </div>
              </div>
              <div className="sticky bottom-0 bg-white border-t px-4 py-3 flex justify-end">
                <button onClick={() => { setShowViewModal(false); setSelectedRate(null); }} className="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700">Close</button>
              </div>
            </div>
          </div>
        )}

        {/* Insert Modal */}
        {showInsertModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-4 py-3 flex justify-between items-center">
                <h2 className="text-base sm:text-lg font-bold text-gray-800">Add New Expense Rate</h2>
                <button onClick={() => { setShowInsertModal(false); setNewRate({ vehicleType: '', ratePerKm: 0, effectiveFrom: '', effectiveTo: '', status: 'active' }); }} className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); handleInsertRate(); }}>
                <div className="p-4 space-y-3">
                  <div><label className="block text-xs font-medium text-gray-700 mb-1">Vehicle Type *</label><select name="vehicleType" value={newRate.vehicleType} onChange={handleInputChange} required className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg"><option value="">Select Vehicle Type</option>{sampleVehicleTypes.map(vt => <option key={vt.id} value={vt.name}>{vt.name} (Default: ₹{vt.defaultRate}/km)</option>)}</select></div>
                  <div><label className="block text-xs font-medium text-gray-700 mb-1">Rate Per KM (₹) *</label><input type="number" name="ratePerKm" value={newRate.ratePerKm} onChange={handleInputChange} required min="0" step="0.5" placeholder="e.g., 4, 10" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg" /><p className="text-xs text-gray-400 mt-1">Default: Two Wheeler ₹4/km, Four Wheeler ₹10/km</p></div>
                  <div className="grid grid-cols-2 gap-2"><div><label className="block text-xs font-medium text-gray-700 mb-1">Effective From *</label><input type="date" name="effectiveFrom" value={newRate.effectiveFrom} onChange={handleInputChange} required className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg" /></div><div><label className="block text-xs font-medium text-gray-700 mb-1">Effective To *</label><input type="date" name="effectiveTo" value={newRate.effectiveTo} onChange={handleInputChange} required className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg" /></div></div>
                  <div><label className="block text-xs font-medium text-gray-700 mb-1">Status</label><select name="status" value={newRate.status} onChange={handleInputChange} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg"><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
                </div>
                <div className="sticky bottom-0 bg-white border-t px-4 py-3 flex justify-end gap-2">
                  <button type="button" onClick={() => setShowInsertModal(false)} className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                  <button type="submit" className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700">Add Rate</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && rateToDelete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-red-100 rounded-full">
                    <Trash2 className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-center text-gray-800 mb-2">Confirm Delete</h3>
                <p className="text-xs sm:text-sm text-gray-600 text-center mb-4">
                  Are you sure you want to delete the expense rate for <strong className="text-gray-800">{rateToDelete.vehicleType}</strong>?
                  <br />
                  This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setRateToDelete(null);
                    }}
                    className="flex-1 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteRate}
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
        {filteredRates.length === 0 && (
          <div className="text-center py-8 sm:py-10 bg-white rounded-lg shadow-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-3">
              <DollarSign className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">No expense rates found</p>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filters</p>
            <button onClick={() => { setSearchTerm(''); setFilterStatus('all'); setFilterVehicleType('all'); }} className="mt-3 px-3 py-1.5 text-purple-600 bg-purple-50 rounded-lg text-xs font-medium hover:bg-purple-100">Clear all filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseRateMaster;
