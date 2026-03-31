import React, { useState, useMemo, useCallback } from "react";
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Bike,
  Activity,
  DollarSign,
  TrendingUp,
  Calendar,
  X
} from "lucide-react";

/*Types*/
interface Visit {
  id: number;
  visitId: string;
  date: string;
  employee: string;
  designation: string;
  company: string;
  purpose: string;
  vehicle: "Two Wheeler" | "Four Wheeler";
  distance: number;
  rate: number;
  stage: string;
  outcome: string;
  expectedValue: number;
}

/* Mock Data */
const visitData: Visit[] = [
  {
    id: 1,
    visitId: "VIS-1023",
    date: "2026-03-10",
    employee: "Rahul Sharma",
    designation: "Sales Executive",
    company: "MP Board",
    purpose: "Demo",
    vehicle: "Four Wheeler",
    distance: 35,
    rate: 10,
    stage: "Demo Conducted",
    outcome: "Proposal Opportunity",
    expectedValue: 1200000
  },
  {
    id: 2,
    visitId: "VIS-1024",
    date: "2026-03-12",
    employee: "Priya Verma",
    designation: "Business Developer",
    company: "Bhoj University",
    purpose: "Requirement Discussion",
    vehicle: "Two Wheeler",
    distance: 18,
    rate: 4,
    stage: "Requirement Discussion",
    outcome: "Lead Generated",
    expectedValue: 500000
  },
  {
    id: 3,
    visitId: "VIS-1025",
    date: "2026-03-15",
    employee: "Amit Singh",
    designation: "Sales Manager",
    company: "ITI Limited",
    purpose: "Proposal Meeting",
    vehicle: "Four Wheeler",
    distance: 48,
    rate: 10,
    stage: "Proposal Shared",
    outcome: "Proposal Opportunity",
    expectedValue: 850000
  }
];

// Components
const MonthlyVisits: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterStage, setFilterStage] = useState<string>("all");
  const itemsPerPage: number = 5;

  // Get unique stages for filter
  const stages = useMemo(() => ['all', ...new Set(visitData.map(v => v.stage))], []);

  const filteredData = useMemo(() => {
    return visitData.filter((v) => {
      const matchesSearch = search === '' ||
        v.employee.toLowerCase().includes(search.toLowerCase()) ||
        v.company.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || v.outcome === filterStatus;
      const matchesStage = filterStage === 'all' || v.stage === filterStage;
      
      return matchesSearch && matchesStatus && matchesStage;
    });
  }, [search, filterStatus, filterStage]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Generate page numbers
  const pageNumbers = useMemo(() => {
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }, [currentPage, totalPages]);

  // KPI Calculations
  const totalVisits = filteredData.length;
  const totalDistance = filteredData.reduce((sum, v) => sum + v.distance, 0);
  const totalExpense = filteredData.reduce((sum, v) => sum + v.distance * v.rate, 0);
  const totalPipeline = filteredData.reduce((sum, v) => sum + v.expectedValue, 0);

  // Export to CSV
  const handleExport = useCallback(async () => {
    if (isExporting) return;
    setIsExporting(true);
    
    try {
      const headers = [
        'Visit ID', 'Date', 'Employee', 'Designation', 'Company', 'Purpose',
        'Vehicle', 'Distance (km)', 'Rate (₹/km)', 'Expense (₹)', 'Stage', 'Outcome', 'Expected Value (₹)'
      ];
      
      const csvData = filteredData.map(visit => [
        visit.visitId, visit.date, visit.employee, visit.designation, visit.company,
        visit.purpose, visit.vehicle, visit.distance, visit.rate,
        visit.distance * visit.rate, visit.stage, visit.outcome, visit.expectedValue
      ]);
      
      const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `monthly_visits_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  }, [filteredData, isExporting]);

  // Refresh data
  const handleRefresh = useCallback(async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Data refreshed at:', new Date().toLocaleTimeString());
      setCurrentPage(1);
      alert('Data refreshed successfully!');
    } catch (error) {
      console.error('Refresh failed:', error);
      alert('Failed to refresh data. Please try again.');
    } finally {
      setIsRefreshing(false);
    }
  }, [isRefreshing]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearch('');
    setFilterStatus('all');
    setFilterStage('all');
    setCurrentPage(1);
  }, []);

  const getStageColor = (stage: string): string => {
    const colors: Record<string, string> = {
      'Demo Conducted': 'bg-teal-100 text-teal-700',
      'Requirement Discussion': 'bg-indigo-100 text-indigo-700',
      'Proposal Shared': 'bg-cyan-100 text-cyan-700',
      'Lead Identified': 'bg-purple-100 text-purple-700',
      'Initial Visit Done': 'bg-blue-100 text-blue-700',
      'Commercial Negotiation': 'bg-orange-100 text-orange-700',
      'Order Expected': 'bg-yellow-100 text-yellow-700',
      'Won': 'bg-green-100 text-green-700',
      'Lost': 'bg-red-100 text-red-600'
    };
    return colors[stage] || 'bg-gray-100 text-gray-600';
  };

  const hasActiveFilters = search !== '' || filterStatus !== 'all' || filterStage !== 'all';

  // Pagination handlers
  const goToPreviousPage = useCallback(() => {
    setCurrentPage(p => Math.max(1, p - 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage(p => Math.min(totalPages, p + 1));
  }, [totalPages]);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // Reusable button className
  const buttonClassName = "flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm hover:bg-gray-50 transition disabled:opacity-50";

  return (
    <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 space-y-4 sm:space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      
      {/* Page Header */}
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" />
            Monthly Visits
          </h1>
          <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1">
            {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })} • {filteredData.length} visits recorded
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-3 sm:p-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] sm:text-xs text-gray-500">Total Visits</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{totalVisits}</p>
          </div>
          <Activity className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-purple-500" />
        </div>

        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-3 sm:p-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] sm:text-xs text-gray-500">Total Distance</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{totalDistance} <span className="text-[10px] sm:text-xs">KM</span></p>
          </div>
          <Bike className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-500" />
        </div>

        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-3 sm:p-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] sm:text-xs text-gray-500">Travel Expense</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-orange-600">₹{totalExpense.toLocaleString()}</p>
          </div>
          <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-orange-500" />
        </div>

        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-3 sm:p-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] sm:text-xs text-gray-500">Pipeline Value</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">₹{(totalPipeline / 100000).toFixed(1)}L</p>
          </div>
          <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-500" />
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1 sm:max-w-xs md:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-8 sm:pl-9 pr-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            {/* Buttons Group */}
            <div className="flex flex-wrap gap-2">
              {/* Export Button */}
              <button 
                onClick={handleExport}
                disabled={isExporting}
                className={buttonClassName}
              >
                {isExporting ? (
                  <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                ) : (
                  <Download size={16} className="text-purple-600" />
                )}
                <span className="xs:inline">{isExporting ? 'Exporting...' : 'Export'}</span>
              </button>
              
              {/* Refresh Button */}
              <button 
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={buttonClassName}
              >
                <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className=" xs:inline">{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
              </button>
              
              {/* Filters Button */}
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={buttonClassName}
              >
                <Filter size={16} />
                <span className=" xs:inline">Filter</span>
              </button>
              
              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <button 
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 text-red-600 hover:bg-red-50 rounded-lg text-xs sm:text-sm transition"
                >
                  <X size={14} />
                  <span className="hidden xs:inline">Clear</span>
                </button>
              )}
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-gray-700 mb-1">Outcome Type</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">All Outcomes</option>
                    <option value="Lead Generated">Lead Generated</option>
                    <option value="Proposal Opportunity">Proposal Opportunity</option>
                    <option value="Requirement Collected">Requirement Collected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-gray-700 mb-1">Funnel Stage</label>
                  <select
                    value={filterStage}
                    onChange={(e) => setFilterStage(e.target.value)}
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    {stages.map(stage => (
                      <option key={stage} value={stage}>{stage === 'all' ? 'All Stages' : stage}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
              <tr>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[11px] sm:text-xs font-semibold text-gray-600 uppercase">Visit ID</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[11px] sm:text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[11px] sm:text-xs font-semibold text-gray-600 uppercase">Employee</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[11px] sm:text-xs font-semibold text-gray-600 uppercase">Company</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[11px] sm:text-xs font-semibold text-gray-600 uppercase">Purpose</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[11px] sm:text-xs font-semibold text-gray-600 uppercase">Vehicle</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[11px] sm:text-xs font-semibold text-gray-600 uppercase">Distance</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[11px] sm:text-xs font-semibold text-gray-600 uppercase">Rate</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[11px] sm:text-xs font-semibold text-gray-600 uppercase">Expense</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[11px] sm:text-xs font-semibold text-gray-600 uppercase">Stage</th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-[11px] sm:text-xs font-semibold text-gray-600 uppercase">Expected</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedData.length > 0 ? (
                paginatedData.map((visit) => (
                  <tr key={visit.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                      <span className="text-xs sm:text-sm font-mono font-medium text-gray-800">{visit.visitId}</span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">{visit.date}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-800">{visit.employee}</p>
                        <p className="text-[10px] text-gray-400">{visit.designation}</p>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">{visit.company}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">{visit.purpose}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">{visit.vehicle}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">{visit.distance} KM</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium">₹{visit.rate}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-orange-600">₹{visit.distance * visit.rate}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                      <span className={`inline-flex px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${getStageColor(visit.stage)}`}>
                        {visit.stage}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-green-600">₹{(visit.expectedValue / 100000).toFixed(1)}L</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="px-4 py-8 sm:py-12 text-center text-gray-400">
                    <Calendar className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 text-gray-300" />
                    <p className="text-xs sm:text-sm">No visits found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden divide-y divide-gray-100">
          {paginatedData.length > 0 ? (
            paginatedData.map((visit) => (
              <div key={visit.id} className="p-3 sm:p-4 space-y-2 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs sm:text-sm font-mono font-semibold text-gray-800">{visit.visitId}</p>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">{visit.date}</p>
                  </div>
                  <span className={`inline-flex px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${getStageColor(visit.stage)}`}>
                    {visit.stage}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                  <div><span className="text-gray-500">Employee:</span> {visit.employee}</div>
                  <div><span className="text-gray-500">Company:</span> {visit.company}</div>
                  <div><span className="text-gray-500">Purpose:</span> {visit.purpose}</div>
                  <div><span className="text-gray-500">Expense:</span> <span className="text-orange-600 font-semibold">₹{visit.distance * visit.rate}</span></div>
                  <div><span className="text-gray-500">Distance:</span> {visit.distance} KM</div>
                  <div><span className="text-gray-500">Expected:</span> <span className="text-green-600">₹{(visit.expectedValue / 100000).toFixed(1)}L</span></div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 sm:py-12 text-center">
              <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-xs sm:text-sm text-gray-400">No visits found</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {filteredData.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="text-[11px] sm:text-xs text-gray-500 order-2 sm:order-1">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} visits
          </div>
          <div className="flex gap-2 order-1 sm:order-2">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="px-2 sm:px-3 py-1 text-xs sm:text-sm border border-gray-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition flex items-center gap-1"
            >
              <ChevronLeft size={14} />
              <span className="hidden xs:inline">Previous</span>
            </button>
            <div className="flex gap-1">
              {pageNumbers.map(pageNum => (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 text-xs sm:text-sm rounded-lg transition ${
                    currentPage === pageNum
                      ? 'bg-purple-600 text-white'
                      : 'border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-2 sm:px-3 py-1 text-xs sm:text-sm border border-gray-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition flex items-center gap-1"
            >
              <span className="hidden xs:inline">Next</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyVisits;