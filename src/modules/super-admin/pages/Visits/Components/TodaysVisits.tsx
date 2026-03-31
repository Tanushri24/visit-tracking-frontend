// src/modules/super-admin/pages/Visits/Components/TodaysVisits.tsx

import React, { useState, useMemo, useCallback } from 'react';
import { 
  MapPin, User, Building2, Car, ChevronLeft, 
  ChevronRight, RefreshCw, Filter, Download, Clock, Layers,
  CheckCircle, Calendar
} from 'lucide-react';

interface TodayVisit {
  id: number;
  visitId: string;
  visitTime: string;
  employeeName: string;
  companyName: string;
  location: string;
  purposeOfVisit: string;
  vehicleType: string;
  distanceKm: number;
  totalExpense: number;
  status: 'scheduled' | 'checked-in' | 'completed' | 'cancelled';
  checkInTime?: string;
  checkOutTime?: string;
}

const TodaysVisits: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterLocation, setFilterLocation] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<TodayVisit | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  // Mock data for today's visits
  const [visits] = useState<TodayVisit[]>([
    {
      id: 1,
      visitId: "VIS-2024-001",
      visitTime: "10:30 AM",
      employeeName: "Rahul Sharma",
      companyName: "MP Board",
      location: "Bhopal",
      purposeOfVisit: "OMS Demo",
      vehicleType: "Four Wheeler",
      distanceKm: 35,
      totalExpense: 350,
      status: "checked-in",
      checkInTime: "10:30 AM",
      checkOutTime: undefined
    },
    {
      id: 2,
      visitId: "VIS-2024-002",
      visitTime: "11:00 AM",
      employeeName: "Priya Singh",
      companyName: "ITI Limited",
      location: "Rae Bareli",
      purposeOfVisit: "Requirement Gathering",
      vehicleType: "Four Wheeler",
      distanceKm: 48,
      totalExpense: 480,
      status: "scheduled",
      checkInTime: undefined,
      checkOutTime: undefined
    },
    {
      id: 3,
      visitId: "VIS-2024-003",
      visitTime: "02:00 PM",
      employeeName: "Amit Verma",
      companyName: "Bhoj University",
      location: "Bhopal",
      purposeOfVisit: "Proposal Discussion",
      vehicleType: "Four Wheeler",
      distanceKm: 25,
      totalExpense: 250,
      status: "scheduled",
      checkInTime: undefined,
      checkOutTime: undefined
    },
    {
      id: 4,
      visitId: "VIS-2024-004",
      visitTime: "03:30 PM",
      employeeName: "Neha Kapoor",
      companyName: "Tata Motors",
      location: "Pune",
      purposeOfVisit: "Initial Meeting",
      vehicleType: "Four Wheeler",
      distanceKm: 12,
      totalExpense: 120,
      status: "completed",
      checkInTime: "03:30 PM",
      checkOutTime: "05:00 PM"
    }
  ]);

  // Get unique locations for filter
  const locations = ['all', ...new Set(visits.map(v => v.location))];

  // Stats
  const stats = useMemo(() => {
    const total = visits.length;
    const scheduled = visits.filter(v => v.status === 'scheduled').length;
    const checkedIn = visits.filter(v => v.status === 'checked-in').length;
    const completed = visits.filter(v => v.status === 'completed').length;
    const totalExpense = visits.reduce((sum, v) => sum + v.totalExpense, 0);
    return { total, scheduled, checkedIn, completed, totalExpense };
  }, [visits]);

  // Filtered visits
  const filteredVisits = useMemo(() => {
    return visits.filter(visit => {
      const matchesSearch = searchTerm === '' ||
        visit.visitId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        visit.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        visit.companyName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || visit.status === filterStatus;
      const matchesLocation = filterLocation === 'all' || visit.location === filterLocation;
      
      return matchesSearch && matchesStatus && matchesLocation;
    });
  }, [visits, searchTerm, filterStatus, filterLocation]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVisits.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredVisits.length / itemsPerPage);

  // Refresh functionality
  const handleRefresh = useCallback(async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Data refreshed at:', new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, [isRefreshing]);

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Visit ID', 'Time', 'Employee', 'Company', 'Location', 'Purpose', 'Vehicle', 'Distance (km)', 'Expense (₹)', 'Status'];
    const csvData = filteredVisits.map(visit => [
      visit.visitId, visit.visitTime, visit.employeeName, visit.companyName,
      visit.location, visit.purposeOfVisit, visit.vehicleType,
      visit.distanceKm, visit.totalExpense, visit.status
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `todays_visits_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const viewVisitDetails = (visit: TodayVisit) => {
    setSelectedVisit(visit);
    setShowViewModal(true);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      scheduled: 'bg-yellow-100 text-yellow-800',
      'checked-in': 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    const labels = {
      scheduled: 'Scheduled',
      'checked-in': 'Checked In',
      completed: 'Completed',
      cancelled: 'Cancelled'
    };
    return (
      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Today's Visits</h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats Cards - Fully Responsive */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-3 sm:p-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] sm:text-xs text-gray-500">Total Visits</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{stats.total}</p>
          </div>
          <div className="p-1.5 sm:p-2 bg-purple-100 rounded-full">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-3 sm:p-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] sm:text-xs text-gray-500">Scheduled</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-600">{stats.scheduled}</p>
          </div>
          <div className="p-1.5 sm:p-2 bg-yellow-100 rounded-full">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-3 sm:p-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] sm:text-xs text-gray-500">Checked In</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">{stats.checkedIn}</p>
          </div>
          <div className="p-1.5 sm:p-2 bg-blue-100 rounded-full">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-3 sm:p-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] sm:text-xs text-gray-500">Completed</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">{stats.completed}</p>
          </div>
          <div className="p-1.5 sm:p-2 bg-green-100 rounded-full">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-lg shadow-sm mb-4 sm:mb-6">
        <div className="p-3 sm:p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative w-full sm:max-w-xs md:max-w-sm">
            <svg className="absolute left-3 top-2.5 text-gray-400" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search visits..." 
              className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-purple-500" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button 
              onClick={handleRefresh} 
              disabled={isRefreshing}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm border rounded-lg hover:bg-gray-50 flex items-center justify-center gap-1.5 disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden xs:inline">{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
              <span className="xs:hidden">⟳</span>
            </button>
            <button 
              onClick={() => setShowFilters(!showFilters)} 
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm border rounded-lg hover:bg-gray-50 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Filter size={16} />
              <span className="hidden xs:inline">Filters</span>
              <span className="xs:hidden">🔍</span>
            </button>
            <button 
              onClick={exportToCSV} 
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm border rounded-lg hover:bg-gray-50 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download size={16} />
              <span className="hidden xs:inline">Export</span>
              <span className="xs:hidden">📥</span>
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="p-3 sm:p-4 border-t bg-gray-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">Status</label>
                <select 
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm border rounded-lg focus:ring-2 focus:ring-purple-500" 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="checked-in">Checked In</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">Location</label>
                <select 
                  className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm border rounded-lg focus:ring-2 focus:ring-purple-500" 
                  value={filterLocation} 
                  onChange={(e) => setFilterLocation(e.target.value)}
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc === 'all' ? 'All Locations' : loc}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button 
                  onClick={() => { 
                    setFilterStatus('all'); 
                    setFilterLocation('all'); 
                    setSearchTerm(''); 
                    setCurrentPage(1);
                  }} 
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw size={14} /> Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Table - Fully Responsive */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[11px] sm:text-xs font-medium uppercase text-gray-600">S.No</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[11px] sm:text-xs font-medium uppercase text-gray-600">Time</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[11px] sm:text-xs font-medium uppercase text-gray-600">Visit ID</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[11px] sm:text-xs font-medium uppercase text-gray-600">Employee</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[11px] sm:text-xs font-medium uppercase text-gray-600">Company</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[11px] sm:text-xs font-medium uppercase text-gray-600">Location</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[11px] sm:text-xs font-medium uppercase text-gray-600">Purpose</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[11px] sm:text-xs font-medium uppercase text-gray-600">Expense</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[11px] sm:text-xs font-medium uppercase text-gray-600">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y">
              {currentItems.map((visit, index) => (
                <tr 
                  key={visit.id} 
                  className="hover:bg-gray-50 cursor-pointer transition-colors" 
                  onClick={() => viewVisitDetails(visit)}
                >
                  <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">{indexOfFirstItem + index + 1}</td>
                  <td className="px-3 sm:px-4 py-2 sm:py-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs sm:text-sm">{visit.visitTime}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 py-2 sm:py-3"><span className="text-xs sm:text-sm font-mono font-medium">{visit.visitId}</span></td>
                  <td className="px-3 sm:px-4 py-2 sm:py-3">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3 text-gray-400" />
                      <span className="text-xs sm:text-sm">{visit.employeeName}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 py-2 sm:py-3">
                    <div className="flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-gray-400" />
                      <span className="text-xs sm:text-sm">{visit.companyName}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 py-2 sm:py-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-xs sm:text-sm">{visit.location}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 py-2 sm:py-3"><span className="text-xs sm:text-sm line-clamp-1">{visit.purposeOfVisit}</span></td>
                  <td className="px-3 sm:px-4 py-2 sm:py-3">
                    <div className="flex items-center gap-1">
                      <Car className="w-3 h-3 text-gray-400" />
                      <span className="text-xs sm:text-sm font-semibold text-orange-600">₹{visit.totalExpense}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 py-2 sm:py-3">{getStatusBadge(visit.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y">
          {currentItems.map((visit) => (
            <div 
              key={visit.id} 
              className="p-3 sm:p-4 hover:bg-gray-50 cursor-pointer transition-colors space-y-2" 
              onClick={() => viewVisitDetails(visit)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs sm:text-sm font-mono font-semibold text-gray-800">{visit.visitId}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" /> {visit.visitTime}
                  </p>
                </div>
                {getStatusBadge(visit.status)}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                <div><span className="text-gray-500">Employee:</span> {visit.employeeName}</div>
                <div><span className="text-gray-500">Company:</span> {visit.companyName}</div>
                <div><span className="text-gray-500">Location:</span> {visit.location}</div>
                <div><span className="text-gray-500">Expense:</span> <span className="text-orange-600 font-semibold">₹{visit.totalExpense}</span></div>
              </div>
              <div className="text-xs sm:text-sm"><span className="text-gray-500">Purpose:</span> {visit.purposeOfVisit}</div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredVisits.length === 0 && (
          <div className="py-8 sm:py-12 text-center">
            <Layers className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-xs sm:text-sm text-gray-400">No visits found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredVisits.length > 0 && (
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] sm:text-xs text-gray-500 order-2 sm:order-1">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredVisits.length)} of {filteredVisits.length} entries
          </div>
          <div className="flex gap-2 order-1 sm:order-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1} 
              className="px-2.5 sm:px-3 py-1 text-xs sm:text-sm border rounded-lg disabled:opacity-50 hover:bg-gray-50 flex items-center gap-1 transition-colors"
            >
              <ChevronLeft size={14} /> Prev
            </button>
            <span className="px-3 sm:px-4 py-1 text-xs sm:text-sm bg-purple-600 text-white rounded-lg">
              {currentPage} / {totalPages}
            </span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages} 
              className="px-2.5 sm:px-3 py-1 text-xs sm:text-sm border rounded-lg disabled:opacity-50 hover:bg-gray-50 flex items-center gap-1 transition-colors"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* View Details Modal - Responsive */}
      {showViewModal && selectedVisit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-3 sm:p-4 flex justify-between items-center">
              <h2 className="text-base sm:text-lg md:text-xl font-bold">Visit Details</h2>
              <button onClick={() => setShowViewModal(false)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-purple-600 mb-2 sm:mb-3">Basic Information</h3>
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                  <div><p className="text-[10px] sm:text-xs text-gray-500">Visit ID</p><p className="text-xs sm:text-sm font-medium">{selectedVisit.visitId}</p></div>
                  <div><p className="text-[10px] sm:text-xs text-gray-500">Visit Time</p><p className="text-xs sm:text-sm font-medium">{selectedVisit.visitTime}</p></div>
                  <div><p className="text-[10px] sm:text-xs text-gray-500">Employee Name</p><p className="text-xs sm:text-sm font-medium">{selectedVisit.employeeName}</p></div>
                  <div><p className="text-[10px] sm:text-xs text-gray-500">Company</p><p className="text-xs sm:text-sm font-medium">{selectedVisit.companyName}</p></div>
                  <div><p className="text-[10px] sm:text-xs text-gray-500">Location</p><p className="text-xs sm:text-sm font-medium">{selectedVisit.location}</p></div>
                  <div><p className="text-[10px] sm:text-xs text-gray-500">Status</p>{getStatusBadge(selectedVisit.status)}</div>
                </div>
              </div>

              <div>
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-purple-600 mb-2 sm:mb-3">Visit Details</h3>
                <div><p className="text-[10px] sm:text-xs text-gray-500">Purpose of Visit</p><p className="text-xs sm:text-sm font-medium">{selectedVisit.purposeOfVisit}</p></div>
              </div>

              <div>
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-purple-600 mb-2 sm:mb-3">Travel & Expense</h3>
                <div className="grid grid-cols-2 xs:grid-cols-3 gap-3 sm:gap-4">
                  <div><p className="text-[10px] sm:text-xs text-gray-500">Vehicle Type</p><p className="text-xs sm:text-sm font-medium">{selectedVisit.vehicleType}</p></div>
                  <div><p className="text-[10px] sm:text-xs text-gray-500">Distance (km)</p><p className="text-xs sm:text-sm font-medium">{selectedVisit.distanceKm}</p></div>
                  <div><p className="text-[10px] sm:text-xs text-gray-500">Total Expense</p><p className="text-xs sm:text-sm font-semibold text-orange-600">₹{selectedVisit.totalExpense}</p></div>
                </div>
              </div>

              {selectedVisit.checkInTime && (
                <div>
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-purple-600 mb-2 sm:mb-3">Check In/Out</h3>
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                    <div><p className="text-[10px] sm:text-xs text-gray-500">Check In Time</p><p className="text-xs sm:text-sm font-medium">{selectedVisit.checkInTime}</p></div>
                    <div><p className="text-[10px] sm:text-xs text-gray-500">Check Out Time</p><p className="text-xs sm:text-sm font-medium">{selectedVisit.checkOutTime || 'Not checked out'}</p></div>
                  </div>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-white border-t p-3 sm:p-4 flex justify-end">
              <button onClick={() => setShowViewModal(false)} className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodaysVisits;