// src/modules/super-admin/pages/Visits/Components/PendingFollowups.tsx

import React, { useState, useMemo, useCallback } from "react";
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  X,
  TrendingUp,
} from "lucide-react";

/*Types*/
interface FollowUp {
  id: number;
  visitId: string;
  visitDate: string;
  employeeName: string;
  employeeDesignation: string;
  companyName: string;
  organisationName: string;
  departmentName: string;
  contactPerson: string;
  contactNumber: string;
  contactEmail: string;
  purposeOfVisit: string;
  nextAction: string;
  followUpDate: string;
  followUpRemarks: string;
  funnelStage: string;
  outcomeType: string;
  expectedBusinessValue: number;
  actualBusinessValue: number | null;
  probabilityPercentage: number;
  status: 'pending' | 'today' | 'overdue' | 'completed';
  daysOverdue?: number;
}

/* Mock Data */
const followUpData: FollowUp[] = [
  {
    id: 1,
    visitId: "VIS-2024-001",
    visitDate: "2024-03-15",
    employeeName: "Rahul Sharma",
    employeeDesignation: "Business Development Executive",
    companyName: "MP Board",
    organisationName: "Examination Wing",
    departmentName: "Examination Department",
    contactPerson: "Dr. S.K. Rao",
    contactNumber: "+91 755 2551234",
    contactEmail: "controller@mpbse.com",
    purposeOfVisit: "OMS Demo",
    nextAction: "Share detailed proposal with pricing",
    followUpDate: "2026-03-25",
    followUpRemarks: "Client showed strong interest in the solution",
    funnelStage: "Demo Conducted",
    outcomeType: "Proposal Opportunity",
    expectedBusinessValue: 1200000,
    actualBusinessValue: null,
    probabilityPercentage: 75,
    status: 'pending'
  },
  {
    id: 2,
    visitId: "VIS-2024-002",
    visitDate: "2024-03-16",
    employeeName: "Priya Singh",
    employeeDesignation: "Senior Business Development Manager",
    companyName: "ITI Limited",
    organisationName: "IT Division",
    departmentName: "IT Department",
    contactPerson: "A.K. Singh",
    contactNumber: "+91 535 2701234",
    contactEmail: "plantmanager@iti.co.in",
    purposeOfVisit: "Requirement Gathering",
    nextAction: "Send technical specification document",
    followUpDate: "2026-03-20",
    followUpRemarks: "Technical team was very receptive",
    funnelStage: "Requirement Discussion",
    outcomeType: "Requirement Collected",
    expectedBusinessValue: 2500000,
    actualBusinessValue: null,
    probabilityPercentage: 60,
    status: 'today'
  },
  {
    id: 3,
    visitId: "VIS-2024-003",
    visitDate: "2024-03-10",
    employeeName: "Amit Verma",
    employeeDesignation: "Business Development Executive",
    companyName: "Bhoj University",
    organisationName: "Academic Wing",
    departmentName: "Registrar Office",
    contactPerson: "Prof. V.K. Shrivastava",
    contactNumber: "+91 755 2731234",
    contactEmail: "itdirector@bhojuni.ac.in",
    purposeOfVisit: "Proposal Discussion",
    nextAction: "Follow-up on proposal approval",
    followUpDate: "2026-03-18",
    followUpRemarks: "Proposal accepted for review",
    funnelStage: "Proposal Shared",
    outcomeType: "Proposal Opportunity",
    expectedBusinessValue: 5000000,
    actualBusinessValue: null,
    probabilityPercentage: 80,
    status: 'overdue',
    daysOverdue: 3
  },
  {
    id: 4,
    visitId: "VIS-2024-004",
    visitDate: "2024-03-05",
    employeeName: "Neha Kapoor",
    employeeDesignation: "Business Development Executive",
    companyName: "Tata Motors",
    organisationName: "Manufacturing Division",
    departmentName: "Production Department",
    contactPerson: "Vikram Singh",
    contactNumber: "+91 20 6732 1234",
    contactEmail: "production@tatamotors.com",
    purposeOfVisit: "Initial Meeting",
    nextAction: "Schedule demo with technical team",
    followUpDate: "2026-03-15",
    followUpRemarks: "Good potential for automation project",
    funnelStage: "Lead Identified",
    outcomeType: "Lead Generated",
    expectedBusinessValue: 8000000,
    actualBusinessValue: null,
    probabilityPercentage: 40,
    status: 'overdue',
    daysOverdue: 6
  },
  {
    id: 5,
    visitId: "VIS-2024-005",
    visitDate: "2024-03-20",
    employeeName: "Rahul Sharma",
    employeeDesignation: "Business Development Executive",
    companyName: "Infosys Limited",
    organisationName: "IT Services",
    departmentName: "Digital Transformation",
    contactPerson: "Rajesh Kumar",
    contactNumber: "+91 80 4112 3456",
    contactEmail: "delivery@infosys.com",
    purposeOfVisit: "Demo Presentation",
    nextAction: "Share technical specifications",
    followUpDate: "2026-03-28",
    followUpRemarks: "Team showed interest in integration",
    funnelStage: "Demo Conducted",
    outcomeType: "Demo Completed",
    expectedBusinessValue: 15000000,
    actualBusinessValue: null,
    probabilityPercentage: 65,
    status: 'pending'
  }
];

/* Component */
const PendingFollowups: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterEmployee, setFilterEmployee] = useState<string>("all");
  const [filterStage, setFilterStage] = useState<string>("all");
  const itemsPerPage: number = 10;

  // Get unique values for filters
  const employees = useMemo(() => ['all', ...new Set(followUpData.map(f => f.employeeName))], []);
  const stages = useMemo(() => ['all', ...new Set(followUpData.map(f => f.funnelStage))], []);

  const filteredData = useMemo(() => {
    return followUpData.filter((f) => {
      const matchesSearch = search === '' ||
        f.visitId.toLowerCase().includes(search.toLowerCase()) ||
        f.employeeName.toLowerCase().includes(search.toLowerCase()) ||
        f.companyName.toLowerCase().includes(search.toLowerCase()) ||
        f.contactPerson.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || f.status === filterStatus;
      const matchesEmployee = filterEmployee === 'all' || f.employeeName === filterEmployee;
      const matchesStage = filterStage === 'all' || f.funnelStage === filterStage;
      
      return matchesSearch && matchesStatus && matchesEmployee && matchesStage;
    });
  }, [search, filterStatus, filterEmployee, filterStage]);

  // Statistics
  const stats = useMemo(() => {
    const total = filteredData.length;
    const pending = filteredData.filter(f => f.status === 'pending').length;
    const today = filteredData.filter(f => f.status === 'today').length;
    const overdue = filteredData.filter(f => f.status === 'overdue').length;
    const completed = filteredData.filter(f => f.status === 'completed').length;
    const totalPipeline = filteredData.reduce((sum, f) => sum + f.expectedBusinessValue, 0);
    return { total, pending, today, overdue, completed, totalPipeline };
  }, [filteredData]);

  // Pagination
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

  // Export to CSV
  const handleExport = useCallback(async () => {
    if (isExporting) return;
    setIsExporting(true);
    
    try {
      const headers = [
        'Visit ID', 'Visit Date', 'Employee', 'Company', 'Contact Person',
        'Next Action', 'Follow-up Date', 'Funnel Stage', 'Outcome',
        'Expected Value', 'Probability', 'Status', 'Days Overdue'
      ];
      
      const csvData = filteredData.map(f => [
        f.visitId, f.visitDate, f.employeeName, f.companyName, f.contactPerson,
        f.nextAction, f.followUpDate, f.funnelStage, f.outcomeType,
        f.expectedBusinessValue, f.probabilityPercentage, f.status,
        f.daysOverdue || ''
      ]);
      
      const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pending_followups_${new Date().toISOString().split('T')[0]}.csv`;
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

  // Clear filters
  const clearFilters = useCallback(() => {
    setSearch('');
    setFilterStatus('all');
    setFilterEmployee('all');
    setFilterStage('all');
    setCurrentPage(1);
  }, []);

  const getStatusBadge = (status: string, daysOverdue?: number) => {
    switch(status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case 'today':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            <Calendar className="w-3 h-3" />
            Today
          </span>
        );
      case 'overdue':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600">
            <AlertCircle className="w-3 h-3" />
            Overdue ({daysOverdue} days)
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3" />
            Completed
          </span>
        );
      default:
        return null;
    }
  };

  const getStageBadge = (stage: string) => {
    const colors: Record<string, string> = {
      'Lead Identified': 'bg-purple-100 text-purple-700',
      'Initial Visit Done': 'bg-blue-100 text-blue-700',
      'Requirement Discussion': 'bg-indigo-100 text-indigo-700',
      'Proposal Shared': 'bg-cyan-100 text-cyan-700',
      'Demo Conducted': 'bg-teal-100 text-teal-700',
      'Commercial Negotiation': 'bg-orange-100 text-orange-700',
      'Order Expected': 'bg-yellow-100 text-yellow-700',
      'Won': 'bg-green-100 text-green-700',
      'Lost': 'bg-red-100 text-red-600'
    };
    return <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${colors[stage] || 'bg-gray-100 text-gray-600'}`}>{stage}</span>;
  };

  const getOutcomeBadge = (outcome: string) => {
    const colors: Record<string, string> = {
      'Lead Generated': 'bg-purple-100 text-purple-700',
      'Requirement Collected': 'bg-blue-100 text-blue-700',
      'Proposal Opportunity': 'bg-green-100 text-green-700',
      'Demo Completed': 'bg-teal-100 text-teal-700',
      'Order Received': 'bg-emerald-100 text-emerald-700',
      'No Outcome': 'bg-gray-100 text-gray-600'
    };
    return <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${colors[outcome] || 'bg-gray-100 text-gray-600'}`}>{outcome}</span>;
  };

  const hasActiveFilters = search !== '' || filterStatus !== 'all' || filterEmployee !== 'all' || filterStage !== 'all';

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

  const buttonClassName = "flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm hover:bg-gray-50 transition disabled:opacity-50";

  return (
    <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 space-y-4 sm:space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      
      {/* Page Header */}
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" />
            Pending Follow-ups
          </h1>
          <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1">
            Track and manage pending follow-ups
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-3 sm:p-4 flex items-center justify-between border-l-4 border-purple-500">
          <div>
            <p className="text-[10px] sm:text-xs text-gray-500">Total Follow-ups</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{stats.total}</p>
          </div>
          <div className="p-2 bg-purple-100 rounded-full">
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-3 sm:p-4 flex items-center justify-between border-l-4 border-yellow-500">
          <div>
            <p className="text-[10px] sm:text-xs text-gray-500">Pending</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="p-2 bg-yellow-100 rounded-full">
            <Clock className="w-5 h-5 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-3 sm:p-4 flex items-center justify-between border-l-4 border-blue-500">
          <div>
            <p className="text-[10px] sm:text-xs text-gray-500">Today's Follow-ups</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">{stats.today}</p>
          </div>
          <div className="p-2 bg-blue-100 rounded-full">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-3 sm:p-4 flex items-center justify-between border-l-4 border-red-500">
          <div>
            <p className="text-[10px] sm:text-xs text-gray-500">Overdue</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-red-600">{stats.overdue}</p>
          </div>
          <div className="p-2 bg-red-100 rounded-full">
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-3 sm:p-4 flex items-center justify-between border-l-4 border-green-500">
          <div>
            <p className="text-[10px] sm:text-xs text-gray-500">Pipeline Value</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">₹{(stats.totalPipeline / 100000).toFixed(1)}L</p>
          </div>
          <div className="p-2 bg-green-100 rounded-full">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
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
                placeholder="Search by Visit ID, Employee, Company..."
                className="w-full pl-8 sm:pl-9 pr-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            {/* Buttons Group */}
            <div className="flex flex-wrap gap-2">
              <button onClick={handleExport} disabled={isExporting} className={buttonClassName}>
                {isExporting ? (
                  <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                ) : (
                  <Download size={16} className="text-purple-600" />
                )}
                <span className="xs:inline">{isExporting ? 'Exporting...' : 'Export'}</span>
              </button>
              
              <button onClick={handleRefresh} disabled={isRefreshing} className={buttonClassName}>
                <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="xs:inline">{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
              </button>
              
              <button onClick={() => setShowFilters(!showFilters)} className={buttonClassName}>
                <Filter size={16} />
                <span className="xs:inline">Filters</span>
              </button>
              
              {hasActiveFilters && (
                <button onClick={clearFilters} className="flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 text-red-600 hover:bg-red-50 rounded-lg text-xs sm:text-sm transition">
                  <X size={14} />
                  <span className="xs:inline">Clear</span>
                </button>
              )}
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="today">Today</option>
                    <option value="overdue">Overdue</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-medium text-gray-700 mb-1">Employee</label>
                  <select
                    value={filterEmployee}
                    onChange={(e) => setFilterEmployee(e.target.value)}
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    {employees.map(emp => (
                      <option key={emp} value={emp}>{emp === 'all' ? 'All Employees' : emp}</option>
                    ))}
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

      {/* Responsive Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Desktop Table View - Hidden on mobile, visible on large screens */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Visit ID</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Company</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Contact</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Employee</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Stage</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Follow-up</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Next Action</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Outcome</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Value</th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedData.length > 0 ? (
                paginatedData.map((followup) => (
                  <tr key={followup.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-3">
                      <span className="text-xs font-mono font-medium text-gray-800">{followup.visitId}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-xs">{followup.companyName}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div>
                        <p className="text-xs font-medium">{followup.contactPerson}</p>
                        <p className="text-[10px] text-gray-400">{followup.contactNumber}</p>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div>
                        <p className="text-xs font-medium">{followup.employeeName}</p>
                        <p className="text-[10px] text-gray-400">{followup.employeeDesignation}</p>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      {getStageBadge(followup.funnelStage)}
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-xs">{followup.followUpDate}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-xs line-clamp-2">{followup.nextAction}</span>
                    </td>
                    <td className="px-3 py-3">
                      {getOutcomeBadge(followup.outcomeType)}
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-xs font-semibold text-green-600">₹{(followup.expectedBusinessValue / 100000).toFixed(1)}L</span>
                    </td>
                    <td className="px-3 py-3">
                      {getStatusBadge(followup.status, followup.daysOverdue)}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button className="px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors">
                          View
                        </button>
                        <button className="px-2 py-1 text-xs text-green-600 hover:bg-green-50 rounded transition-colors">
                          Update
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="px-4 py-8 text-center text-gray-400">
                    <Calendar className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No pending follow-ups found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View - Visible on mobile, hidden on desktop */}
        <div className="md:hidden divide-y divide-gray-100">
          {paginatedData.length > 0 ? (
            paginatedData.map((followup) => (
              <div key={followup.id} className="p-4 space-y-3 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm font-mono font-semibold text-gray-800">{followup.visitId}</p>
                    <p className="text-xs text-gray-600 mt-0.5 font-medium">{followup.companyName}</p>
                  </div>
                  {getStatusBadge(followup.status, followup.daysOverdue)}
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-500">Contact:</span>
                    <p className="font-medium mt-0.5">{followup.contactPerson}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{followup.contactNumber}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Employee:</span>
                    <p className="font-medium mt-0.5">{followup.employeeName}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{followup.employeeDesignation}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Follow-up:</span>
                    <p className="font-medium mt-0.5">{followup.followUpDate}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Stage:</span>
                    <div className="mt-1">{getStageBadge(followup.funnelStage)}</div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500">Next Action:</span>
                    <p className="text-xs mt-1">{followup.nextAction}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Outcome:</span>
                    <div className="mt-1">{getOutcomeBadge(followup.outcomeType)}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Expected:</span>
                    <p className="text-xs font-semibold text-green-600 mt-1">₹{(followup.expectedBusinessValue / 100000).toFixed(1)}L</p>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-2">
                  <button className="px-3 py-1.5 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                    View Details
                  </button>
                  <button className="px-3 py-1.5 text-xs text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                    Update
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center">
              <Calendar className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-400">No pending follow-ups found</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {filteredData.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="text-[11px] sm:text-xs text-gray-500 order-2 sm:order-1">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} follow-ups
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

export default PendingFollowups;