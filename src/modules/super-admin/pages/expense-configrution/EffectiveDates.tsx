// src/modules/super-admin/pages/master-management/EffectiveDates.tsx

import React, { useState } from 'react';
import {
  Calendar,
  Car,
  Bike,
  TrendingUp,
  Search,
  Download,
  CheckCircle,
  Filter,
  RefreshCw
} from 'lucide-react';

interface EffectiveRate {
  id: number;
  vehicleTypeId: number;
  vehicleTypeName: string;
  ratePerKm: number;
  effectiveFrom: string;
  effectiveTo: string | null;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  remarks: string;
}

const EffectiveDates: React.FC = () => {
  // State for effective rates
  const [effectiveRates] = useState<EffectiveRate[]>([
    {
      id: 1,
      vehicleTypeId: 1,
      vehicleTypeName: "Two Wheeler",
      ratePerKm: 4.00,
      effectiveFrom: "2024-01-01",
      effectiveTo: null,
      isActive: true,
      createdBy: "Admin",
      createdAt: "2024-01-01",
      remarks: "Initial rate setup for Two Wheeler"
    },
    {
      id: 2,
      vehicleTypeId: 2,
      vehicleTypeName: "Four Wheeler",
      ratePerKm: 10.00,
      effectiveFrom: "2024-01-01",
      effectiveTo: null,
      isActive: true,
      createdBy: "Admin",
      createdAt: "2024-01-01",
      remarks: "Initial rate setup for Four Wheeler"
    },
    {
      id: 3,
      vehicleTypeId: 3,
      vehicleTypeName: "Auto Rickshaw",
      ratePerKm: 6.00,
      effectiveFrom: "2024-01-15",
      effectiveTo: null,
      isActive: true,
      createdBy: "Admin",
      createdAt: "2024-01-15",
      remarks: "Added Auto Rickshaw with special rates"
    },
    {
      id: 4,
      vehicleTypeId: 4,
      vehicleTypeName: "Electric Vehicle",
      ratePerKm: 3.50,
      effectiveFrom: "2024-02-01",
      effectiveTo: null,
      isActive: true,
      createdBy: "Admin",
      createdAt: "2024-02-01",
      remarks: "Special rates for Electric Vehicles"
    }
  ]);

  // UI States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Vehicle options
  const vehicleOptions = [
    { value: 'all', label: 'All Vehicles' },
    { value: 'Two Wheeler', label: 'Two Wheeler' },
    { value: 'Four Wheeler', label: 'Four Wheeler' },
    { value: 'Auto Rickshaw', label: 'Auto Rickshaw' },
    { value: 'Electric Vehicle', label: 'Electric Vehicle' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'expired', label: 'Expired' }
  ];

  // Stats
  const totalRates = effectiveRates.length;
  const activeRates = effectiveRates.filter(r => r.isActive).length;
  const avgRate = totalRates > 0 ? (effectiveRates.reduce((sum, r) => sum + r.ratePerKm, 0) / totalRates).toFixed(2) : '0';

  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedVehicle('all');
    setSelectedStatus('all');
  };

  // Filter effective rates
  const filteredRates = effectiveRates.filter(r => {
    const matchesSearch = searchQuery === '' || 
      r.vehicleTypeName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVehicle = selectedVehicle === 'all' || r.vehicleTypeName === selectedVehicle;
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'active' && r.isActive) ||
                         (selectedStatus === 'expired' && !r.isActive);
    return matchesSearch && matchesVehicle && matchesStatus;
  });

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Vehicle Type', 'Rate (₹/km)', 'Effective From', 'Effective To', 'Status', 'Remarks', 'Created By', 'Created At'];
    const csvData = filteredRates.map(rate => [
      rate.vehicleTypeName,
      rate.ratePerKm.toString(),
      rate.effectiveFrom,
      rate.effectiveTo || 'Ongoing',
      rate.isActive ? 'Active' : 'Expired',
      rate.remarks,
      rate.createdBy,
      rate.createdAt
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `effective_rates_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">Effective Dates</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Effective date tracking for expense rates</p>
          </div>
        </div>

        {/* Stats Cards - Simple Design */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Total Rate Records</p>
                <p className="text-xl font-bold text-gray-800 mt-1">{totalRates}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">All configurations</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Active Rates</p>
                <p className="text-xl font-bold text-green-600 mt-1">{activeRates}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Currently effective</p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Average Rate</p>
                <p className="text-xl font-bold text-orange-600 mt-1">₹{avgRate}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Per kilometer</p>
              </div>
              <div className="p-2 bg-orange-50 rounded-lg">
                <TrendingUp className="w-4 h-4 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-4">
          <div className="p-3 sm:p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by vehicle type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Filters</span>
              </button>
              <select
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {vehicleOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {statusOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <button 
                onClick={exportToCSV}
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
              {(searchQuery || selectedVehicle !== 'all' || selectedStatus !== 'all') && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Expanded Filters Panel */}
          {showFilters && (
            <div className="p-3 sm:p-4 border-t border-gray-200 bg-gray-50">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Vehicle Type</label>
                  <select
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {vehicleOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {statusOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Effective Rates Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-semibold text-gray-600 uppercase">Vehicle Type</th>
                  <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-semibold text-gray-600 uppercase">Rate (₹/km)</th>
                  <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-semibold text-gray-600 uppercase">Effective From</th>
                  <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-semibold text-gray-600 uppercase">Effective To</th>
                  <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-semibold text-gray-600 uppercase">Remarks</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRates.map((rate) => {
                  const Icon = rate.vehicleTypeName === 'Two Wheeler' ? Bike : Car;
                  return (
                    <tr key={rate.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-2 sm:px-4 sm:py-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className={`p-1.5 sm:p-2 rounded-lg ${rate.isActive ? 'bg-blue-100' : 'bg-gray-100'}`}>
                            <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${rate.isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                          </div>
                          <span className="font-medium text-gray-800 text-xs sm:text-sm">{rate.vehicleTypeName}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-3">
                        <span className="text-xs sm:text-sm font-semibold text-green-600">₹{rate.ratePerKm.toFixed(2)}</span>
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-xs sm:text-sm text-gray-600">{rate.effectiveFrom}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-3">
                        <span className="text-xs sm:text-sm text-gray-600">
                          {rate.effectiveTo || 'Ongoing'}
                        </span>
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-3">
                        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2 sm:py-1 text-[9px] sm:text-xs rounded-full ${
                          rate.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                        }`}>
                          <span className={`w-1 h-1 rounded-full ${rate.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          {rate.isActive ? 'Active' : 'Expired'}
                        </span>
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-3">
                        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{rate.remarks}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredRates.length === 0 && (
            <div className="py-8 sm:py-12 text-center">
              <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2 sm:mb-3" />
              <p className="text-sm text-gray-400">No effective rates found</p>
              {(searchQuery || selectedVehicle !== 'all' || selectedStatus !== 'all') && (
                <button
                  onClick={resetFilters}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EffectiveDates;