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
  DollarSign,
  Calendar,
  TrendingUp,
  PieChart
} from 'lucide-react';

interface ExpenseRate {
  id: number;
  vehicleTypeId: number;
  ratePerKm: number;
  effectiveFrom: string;
  effectiveTo: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const API_URL = 'https://localhost:7146/api/Expenserate';

const ExpenseRateMaster = () => {
  const [rates, setRates] = useState<ExpenseRate[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterVehicleTypeId, setFilterVehicleTypeId] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRate, setSelectedRate] = useState<ExpenseRate | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showInsertModal, setShowInsertModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRate, setEditingRate] = useState<ExpenseRate | null>(null);

  const [newRate, setNewRate] = useState({
    vehicleTypeId: 0,
    ratePerKm: 0,
    effectiveFrom: '',
    effectiveTo: '',
    isActive: true
  });

  const [editRate, setEditRate] = useState({
    vehicleTypeId: 0,
    ratePerKm: 0,
    effectiveFrom: '',
    effectiveTo: '',
    isActive: true
  });

  const normalizeRate = (rate: Partial<ExpenseRate>): ExpenseRate => ({
    id: Number(rate.id ?? 0),
    vehicleTypeId: Number(rate.vehicleTypeId ?? 0),
    ratePerKm: Number(rate.ratePerKm ?? 0),
    effectiveFrom: rate.effectiveFrom ?? '',
    effectiveTo: rate.effectiveTo ?? '',
    isActive: Boolean(rate.isActive ?? true),
    createdAt: rate.createdAt ?? '',
    updatedAt: rate.updatedAt ?? ''
  });

  const fetchRates = async (): Promise<ExpenseRate[]> => {
    try {
      setLoading(true);
      const response = await axios.get<ExpenseRate[]>(API_URL);
      const normalizedRates = (response.data ?? []).map((rate) => normalizeRate(rate));
      setRates(normalizedRates);
      return normalizedRates;
    } catch (error) {
      console.error('Failed to fetch expense rates:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const uniqueVehicleTypeIds = ['all', ...Array.from(new Set(rates.map((rate) => rate.vehicleTypeId.toString())))];

  const filteredRates = rates.filter((rate) => {
    const matchesSearch =
      rate.vehicleTypeId.toString().includes(searchTerm) ||
      rate.ratePerKm.toString().includes(searchTerm) ||
      rate.id.toString().includes(searchTerm);

    const status = rate.isActive ? 'active' : 'inactive';
    const matchesStatus = filterStatus === 'all' || status === filterStatus;
    const matchesVehicleTypeId = filterVehicleTypeId === 'all' || rate.vehicleTypeId.toString() === filterVehicleTypeId;

    return matchesSearch && matchesStatus && matchesVehicleTypeId;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRates.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.max(1, Math.ceil(filteredRates.length / itemsPerPage));

  const exportToCSV = () => {
    const headers = ['Id', 'Vehicle Type Id', 'Rate Per KM', 'Effective From', 'Effective To', 'Status', 'Created At', 'Updated At'];
    const csvData = filteredRates.map((rate) => [
      rate.id.toString(),
      rate.vehicleTypeId.toString(),
      rate.ratePerKm.toString(),
      rate.effectiveFrom,
      rate.effectiveTo,
      rate.isActive ? 'active' : 'inactive',
      rate.createdAt || '',
      rate.updatedAt || ''
    ]);
    const blob = new Blob([[headers, ...csvData].map((row) => row.join(',')).join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `expense_rates_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const viewRateDetails = (rate: ExpenseRate) => {
    setSelectedRate(rate);
    setShowViewModal(true);
  };

  const editRateDetails = (rate: ExpenseRate) => {
    setEditingRate(rate);
    setEditRate({
      vehicleTypeId: rate.vehicleTypeId,
      ratePerKm: rate.ratePerKm,
      effectiveFrom: rate.effectiveFrom ? rate.effectiveFrom.split('T')[0] : '',
      effectiveTo: rate.effectiveTo ? rate.effectiveTo.split('T')[0] : '',
      isActive: rate.isActive
    });
    setShowEditModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = target.checked;

    setNewRate((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'vehicleTypeId' || name === 'ratePerKm'
          ? Number(value) || 0
          : value
    }));
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = target.checked;

    setEditRate((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'vehicleTypeId' || name === 'ratePerKm'
          ? Number(value) || 0
          : value
    }));
  };

  const handleInsertRate = async () => {
    if (
      newRate.vehicleTypeId <= 0 ||
      newRate.ratePerKm <= 0 ||
      !newRate.effectiveFrom ||
      !newRate.effectiveTo
    ) {
      alert('Vehicle Type Id, Rate Per Km, Effective From and Effective To are required');
      return;
    }

    const payload = {
      id: 0,
      vehicleTypeId: Number(newRate.vehicleTypeId),
      ratePerKm: Number(newRate.ratePerKm),
      effectiveFrom: new Date(newRate.effectiveFrom).toISOString(),
      effectiveTo: new Date(newRate.effectiveTo).toISOString(),
      isActive: newRate.isActive
    };

    try {
      setLoading(true);
      const response = await axios.post(API_URL, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const createdRate = normalizeRate({
        id: response?.data?.id ?? Date.now(),
        vehicleTypeId: response?.data?.vehicleTypeId ?? payload.vehicleTypeId,
        ratePerKm: response?.data?.ratePerKm ?? payload.ratePerKm,
        effectiveFrom: response?.data?.effectiveFrom ?? payload.effectiveFrom,
        effectiveTo: response?.data?.effectiveTo ?? payload.effectiveTo,
        isActive: response?.data?.isActive ?? payload.isActive,
        createdAt: response?.data?.createdAt ?? new Date().toISOString(),
        updatedAt: response?.data?.updatedAt ?? new Date().toISOString()
      });

      setRates((prev) => [createdRate, ...prev]);
      setCurrentPage(1);
      setShowInsertModal(false);
      setNewRate({
        vehicleTypeId: 0,
        ratePerKm: 0,
        effectiveFrom: '',
        effectiveTo: '',
        isActive: true
      });
      alert('Expense rate created successfully');
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
        'Failed to create expense rate';

      alert(typeof errorMessage === 'string' ? errorMessage : 'Failed to create expense rate');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRate = async () => {
    if (!editingRate) return;

    if (
      editRate.vehicleTypeId <= 0 ||
      editRate.ratePerKm <= 0 ||
      !editRate.effectiveFrom ||
      !editRate.effectiveTo
    ) {
      alert('Vehicle Type Id, Rate Per Km, Effective From and Effective To are required');
      return;
    }

    const payload = {
      id: editingRate.id,
      vehicleTypeId: Number(editRate.vehicleTypeId),
      ratePerKm: Number(editRate.ratePerKm),
      effectiveFrom: new Date(editRate.effectiveFrom).toISOString(),
      effectiveTo: new Date(editRate.effectiveTo).toISOString(),
      isActive: editRate.isActive
    };

    try {
      setLoading(true);
      const response = await axios.put(`${API_URL}/${editingRate.id}`, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const updatedRate = normalizeRate({
        id: response?.data?.id ?? payload.id,
        vehicleTypeId: response?.data?.vehicleTypeId ?? payload.vehicleTypeId,
        ratePerKm: response?.data?.ratePerKm ?? payload.ratePerKm,
        effectiveFrom: response?.data?.effectiveFrom ?? payload.effectiveFrom,
        effectiveTo: response?.data?.effectiveTo ?? payload.effectiveTo,
        isActive: response?.data?.isActive ?? payload.isActive,
        createdAt: response?.data?.createdAt ?? editingRate.createdAt ?? '',
        updatedAt: response?.data?.updatedAt ?? new Date().toISOString()
      });

      setRates((prev) => prev.map((rate) => (rate.id === editingRate.id ? updatedRate : rate)));
      setShowEditModal(false);
      setEditingRate(null);
      alert('Expense rate updated successfully');
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
        'Failed to update expense rate';

      alert(typeof errorMessage === 'string' ? errorMessage : 'Failed to update expense rate');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (value?: string) => {
    if (!value) return '-';
    return new Date(value).toLocaleDateString('en-IN');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-3 sm:p-4 md:p-5 lg:p-6">
        <div className="mb-5 sm:mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            Expense Rate Master
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Manage expense rates per kilometer</p>
          <div className="h-0.5 w-16 bg-purple-500 rounded-full mt-2"></div>
        </div>

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
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all p-2.5 sm:p-3 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] sm:text-xs font-medium text-gray-500">Active Rates</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">{rates.filter((r) => r.isActive).length}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-1.5 sm:p-2">
                <TrendingUp size={14} className="text-green-600 sm:w-4 sm:h-4" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all p-2.5 sm:p-3 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] sm:text-xs font-medium text-gray-500">Inactive Rates</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-red-600">{rates.filter((r) => !r.isActive).length}</p>
              </div>
              <div className="bg-red-50 rounded-lg p-1.5 sm:p-2">
                <Calendar size={14} className="text-red-600 sm:w-4 sm:h-4" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all p-2.5 sm:p-3 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] sm:text-xs font-medium text-gray-500">Vehicle Types</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">{uniqueVehicleTypeIds.length - 1}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-1.5 sm:p-2">
                <PieChart size={14} className="text-blue-600 sm:w-4 sm:h-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm mb-5 sm:mb-6 md:mb-8 border border-gray-100">
          <div className="p-3 sm:p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1 max-w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={15} />
              <input
                type="text"
                placeholder="Search by id, vehicle type id or rate..."
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
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Vehicle Type Id</label>
                  <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white" value={filterVehicleTypeId} onChange={(e) => setFilterVehicleTypeId(e.target.value)}>
                    {uniqueVehicleTypeIds.map((id) => (
                      <option key={id} value={id}>
                        {id === 'all' ? 'All Vehicle Type Ids' : id}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button onClick={() => { setFilterStatus('all'); setFilterVehicleTypeId('all'); setSearchTerm(''); }} className="px-3 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-1 text-sm">
                    <RefreshCw size={13} /> Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading expense rates...</div>
            ) : (
              <table className="w-full min-w-[850px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    {['S.No', 'Rate ID', 'Vehicle Type Id', 'Rate Per KM', 'Effective From', 'Effective To', 'Status', 'Actions'].map((h, i) => (
                      <th key={i} className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentItems.map((rate, index) => (
                    <tr key={rate.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-500">{indexOfFirstItem + index + 1}</td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm font-mono text-purple-600 font-semibold">R-{rate.id.toString().padStart(4, '0')}</td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-700">{rate.vehicleTypeId}</td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm font-bold text-purple-600">₹{rate.ratePerKm}/km</td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-600">{formatDate(rate.effectiveFrom)}</td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-600">{formatDate(rate.effectiveTo)}</td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${rate.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {rate.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2.5 sm:py-3">
                        <div className="flex gap-1.5">
                          <button onClick={() => viewRateDetails(rate)} className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="View Details">
                            <Eye size={14} />
                          </button>
                          <button onClick={() => editRateDetails(rate)} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit Rate">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
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

        {filteredRates.length > 0 && !loading && (
          <div className="mt-4 sm:mt-5 md:mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs sm:text-sm text-gray-500 bg-white px-3 py-1.5 rounded-lg shadow-sm">
              Showing <span className="font-semibold text-purple-600">{indexOfFirstItem + 1}</span> to{' '}
              <span className="font-semibold text-purple-600">{Math.min(indexOfLastItem, filteredRates.length)}</span> of{' '}
              <span className="font-semibold text-purple-600">{filteredRates.length}</span> entries
            </div>
            <div className="flex gap-1.5">
              <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-all flex items-center gap-1">
                <ChevronLeft size={12} /> Previous
              </button>
              <span className="px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm bg-purple-600 text-white rounded-lg font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-all flex items-center gap-1">
                Next <ChevronRight size={12} />
              </button>
            </div>
          </div>
        )}

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
                    <div className="flex justify-between"><span className="text-xs text-gray-500">Vehicle Type Id</span><span className="text-sm">{selectedRate.vehicleTypeId}</span></div>
                    <div className="flex justify-between"><span className="text-xs text-gray-500">Rate Per KM</span><span className="text-sm font-bold text-purple-600">₹{selectedRate.ratePerKm}/km</span></div>
                    <div className="flex justify-between"><span className="text-xs text-gray-500">Effective From</span><span className="text-sm">{formatDate(selectedRate.effectiveFrom)}</span></div>
                    <div className="flex justify-between"><span className="text-xs text-gray-500">Effective To</span><span className="text-sm">{formatDate(selectedRate.effectiveTo)}</span></div>
                    <div className="flex justify-between"><span className="text-xs text-gray-500">Status</span><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${selectedRate.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{selectedRate.isActive ? 'active' : 'inactive'}</span></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-purple-600 mb-2">System Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between"><span className="text-xs text-gray-500">Created At</span><span className="text-sm">{formatDate(selectedRate.createdAt)}</span></div>
                    <div className="flex justify-between"><span className="text-xs text-gray-500">Last Updated</span><span className="text-sm">{formatDate(selectedRate.updatedAt)}</span></div>
                  </div>
                </div>
              </div>
              <div className="sticky bottom-0 bg-white border-t px-4 py-3 flex justify-end">
                <button onClick={() => { setShowViewModal(false); setSelectedRate(null); }} className="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700">Close</button>
              </div>
            </div>
          </div>
        )}

        {showInsertModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-4 py-3 flex justify-between items-center">
                <h2 className="text-base sm:text-lg font-bold text-gray-800">Add New Expense Rate</h2>
                <button
                  onClick={() => {
                    setShowInsertModal(false);
                    setNewRate({ vehicleTypeId: 0, ratePerKm: 0, effectiveFrom: '', effectiveTo: '', isActive: true });
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); handleInsertRate(); }}>
                <div className="p-4 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Vehicle Type Id *</label>
                    <input type="number" name="vehicleTypeId" value={newRate.vehicleTypeId} onChange={handleInputChange} required min="1" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Rate Per KM (₹) *</label>
                    <input type="number" name="ratePerKm" value={newRate.ratePerKm} onChange={handleInputChange} required min="0" step="0.01" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Effective From *</label>
                      <input type="date" name="effectiveFrom" value={newRate.effectiveFrom} onChange={handleInputChange} required className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Effective To *</label>
                      <input type="date" name="effectiveTo" value={newRate.effectiveTo} onChange={handleInputChange} required className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg" />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 text-xs">
                    <input type="checkbox" name="isActive" checked={newRate.isActive} onChange={handleInputChange} />
                    Active
                  </label>
                </div>
                <div className="sticky bottom-0 bg-white border-t px-4 py-3 flex justify-end gap-2">
                  <button type="button" onClick={() => setShowInsertModal(false)} className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                  <button type="submit" className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700">Add Rate</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showEditModal && editingRate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-4 py-3 flex justify-between items-center">
                <h2 className="text-base sm:text-lg font-bold text-gray-800">Edit Expense Rate</h2>
                <button onClick={() => { setShowEditModal(false); setEditingRate(null); }} className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); handleUpdateRate(); }}>
                <div className="p-4 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Vehicle Type Id *</label>
                    <input type="number" name="vehicleTypeId" value={editRate.vehicleTypeId} onChange={handleEditInputChange} required min="1" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Rate Per KM (₹) *</label>
                    <input type="number" name="ratePerKm" value={editRate.ratePerKm} onChange={handleEditInputChange} required min="0" step="0.01" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Effective From *</label>
                      <input type="date" name="effectiveFrom" value={editRate.effectiveFrom} onChange={handleEditInputChange} required className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Effective To *</label>
                      <input type="date" name="effectiveTo" value={editRate.effectiveTo} onChange={handleEditInputChange} required className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg" />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 text-xs">
                    <input type="checkbox" name="isActive" checked={editRate.isActive} onChange={handleEditInputChange} />
                    Active
                  </label>
                </div>
                <div className="sticky bottom-0 bg-white border-t px-4 py-3 flex justify-end gap-2">
                  <button type="button" onClick={() => { setShowEditModal(false); setEditingRate(null); }} className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                  <button type="submit" className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700">Update Rate</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {filteredRates.length === 0 && !loading && (
          <div className="text-center py-8 sm:py-10 bg-white rounded-lg shadow-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-3">
              <DollarSign className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">No expense rates found</p>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filters</p>
            <button onClick={() => { setSearchTerm(''); setFilterStatus('all'); setFilterVehicleTypeId('all'); }} className="mt-3 px-3 py-1.5 text-purple-600 bg-purple-50 rounded-lg text-xs font-medium hover:bg-purple-100">Clear all filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseRateMaster;
