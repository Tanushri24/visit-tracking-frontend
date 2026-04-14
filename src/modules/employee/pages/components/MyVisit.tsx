import React, { useState, useMemo } from 'react';

// ===================== INTERFACE =====================
interface Visit {
  id: number;
  visitCode: string;
  visitDate: string;
  employeeId: number;
  companyId: number;
  organisationId: number;
  departmentId: number;
  contactPersonId: number;
  visitPurposeId: number;
  discussionSummary: string;
  nextAction: string;
  nextFollowUpDate: string;
  vehicleTypeId: number;
  distanceKm: number;
  rateAppliedPerKm: number;
  travelExpenseAmount: number;
  funnelStageId: number;
  outcomeTypeId: number;
  expectedBusinessValue: number;
  actualBusinessValue: number;
  probabilityPercent: number;
  status: string;
  checkInTime: string;
  checkOutTime: string;
  latitude: string;
  longitude: string;
  remarks: string;
  attachmentPath: string;
  insertedBy: number;
  insertedDate: string;
  updatedBy: number;
  updatedDate: string;
}

// Helper: random ISO datetime between two dates
const randomISO = (start: Date, end: Date): string => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString();
};

// Mock data generation – matches the exact spec
const generateMockVisits = (count: number): Visit[] => {
  const statuses = ['Scheduled', 'Completed', 'Cancelled', 'Rescheduled'];
  const purposes = [1, 2, 3, 4];
  const funnelStages = [1, 2, 3, 4, 5];
  const outcomeTypes = [1, 2, 3];
  const vehicleTypes = [1, 2, 3];

  return Array.from({ length: count }, (_, i) => {
    const id = i + 1;
    const baseDate = new Date(2024, 0, 1);
    const endDate = new Date(2025, 5, 1);

    return {
      id,
      visitCode: `VIS-${1000 + id}`,
      visitDate: randomISO(baseDate, endDate),
      employeeId: 200 + id,
      companyId: 10 + (id % 5),
      organisationId: 500 + (id % 3),
      departmentId: 30 + (id % 4),
      contactPersonId: 400 + id,
      visitPurposeId: purposes[id % purposes.length],
      discussionSummary: `Discussed product roadmap, integration possibilities and pricing models. Client showed interest in API access. ${id % 2 === 0 ? 'Follow-up on technical requirements.' : ''}`,
      nextAction: id % 3 === 0 ? 'Send proposal' : id % 2 === 0 ? 'Schedule demo' : 'Share documentation',
      nextFollowUpDate: randomISO(new Date(2025, 2, 1), new Date(2025, 8, 1)),
      vehicleTypeId: vehicleTypes[id % vehicleTypes.length],
      distanceKm: Number((Math.random() * 120 + 5).toFixed(1)),
      rateAppliedPerKm: Number((Math.random() * 8 + 2).toFixed(2)),
      travelExpenseAmount: Number((Math.random() * 800 + 100).toFixed(2)),
      funnelStageId: funnelStages[id % funnelStages.length],
      outcomeTypeId: outcomeTypes[id % outcomeTypes.length],
      expectedBusinessValue: Math.floor(Math.random() * 50000 + 5000),
      actualBusinessValue: Math.floor(Math.random() * 45000 + 2000),
      probabilityPercent: Math.floor(Math.random() * 100),
      status: statuses[id % statuses.length],
      checkInTime: randomISO(new Date(2024, 5, 1), new Date(2025, 5, 1)),
      checkOutTime: randomISO(new Date(2025, 0, 1), new Date(2025, 5, 1)),
      latitude: (19.0760 + (Math.random() - 0.5) * 0.5).toFixed(6),
      longitude: (72.8777 + (Math.random() - 0.5) * 0.5).toFixed(6),
      remarks: id % 4 === 0 ? 'Client requested additional compliance docs' : 'Standard visit, all good',
      attachmentPath: id % 3 === 0 ? '/uploads/visit_report.pdf' : '',
      insertedBy: 1000 + (id % 10),
      insertedDate: randomISO(new Date(2024, 1, 1), new Date(2024, 12, 1)),
      updatedBy: 1000 + (id % 10),
      updatedDate: randomISO(new Date(2025, 0, 1), new Date(2025, 5, 1)),
    };
  });
};

// Helper: format currency in INR
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
};

// Helper: format datetime
const formatDateTime = (isoString: string) => {
  if (!isoString) return '—';
  try {
    return new Date(isoString).toLocaleString();
  } catch {
    return isoString;
  }
};

// Probability cell component
const ProbabilityCell: React.FC<{ value: number }> = ({ value }) => (
  <div className="flex items-center gap-2">
    <span className="text-sm font-medium">{value}%</span>
    <div className="w-14 bg-gray-200 rounded-full h-1.5">
      <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

// Status badge component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const base = 'px-2 py-1 rounded-full text-xs font-semibold inline-block';
  switch (status.toLowerCase()) {
    case 'completed': return <span className={`${base} bg-green-100 text-green-800`}>{status}</span>;
    case 'scheduled': return <span className={`${base} bg-blue-100 text-blue-800`}>{status}</span>;
    case 'cancelled': return <span className={`${base} bg-red-100 text-red-800`}>{status}</span>;
    case 'rescheduled': return <span className={`${base} bg-amber-100 text-amber-800`}>{status}</span>;
    default: return <span className={`${base} bg-gray-100 text-gray-800`}>{status}</span>;
  }
};

const MyVisit: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);  // changed from showFilterDropdown
  const [showModal, setShowModal] = useState(false);
  const rowsPerPage = 8;

  // Make allVisits stateful so we can add new visits
  const [allVisits, setAllVisits] = useState<Visit[]>(() => generateMockVisits(28));

  // Form state for new visit
  const emptyForm: Omit<Visit, 'id'> = {
    visitCode: '',
    visitDate: '',
    employeeId: 0,
    companyId: 0,
    organisationId: 0,
    departmentId: 0,
    contactPersonId: 0,
    visitPurposeId: 0,
    discussionSummary: '',
    nextAction: '',
    nextFollowUpDate: '',
    vehicleTypeId: 0,
    distanceKm: 0,
    rateAppliedPerKm: 0,
    travelExpenseAmount: 0,
    funnelStageId: 0,
    outcomeTypeId: 0,
    expectedBusinessValue: 0,
    actualBusinessValue: 0,
    probabilityPercent: 0,
    status: 'Scheduled',
    checkInTime: '',
    checkOutTime: '',
    latitude: '',
    longitude: '',
    remarks: '',
    attachmentPath: '',
    insertedBy: 0,
    insertedDate: '',
    updatedBy: 0,
    updatedDate: '',
  };

  const [formData, setFormData] = useState(emptyForm);

  // Filter: search across key text fields
  const filteredVisits = useMemo(() => {
    let result = allVisits;
    if (searchTerm.trim()) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter((visit) =>
        visit.visitCode.toLowerCase().includes(lowerTerm) ||
        visit.status.toLowerCase().includes(lowerTerm) ||
        visit.discussionSummary.toLowerCase().includes(lowerTerm) ||
        visit.nextAction.toLowerCase().includes(lowerTerm) ||
        visit.remarks.toLowerCase().includes(lowerTerm) ||
        String(visit.insertedBy).includes(lowerTerm)
      );
    }
    if (statusFilter !== 'all') {
      result = result.filter((visit) => visit.status.toLowerCase() === statusFilter.toLowerCase());
    }
    return result;
  }, [searchTerm, statusFilter, allVisits]);

  const totalPages = Math.ceil(filteredVisits.length / rowsPerPage);
  const paginatedVisits = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredVisits.slice(start, start + rowsPerPage);
  }, [filteredVisits, currentPage, rowsPerPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  // Stats using allVisits
  const totalVisits = allVisits.length;
  const completedVisits = allVisits.filter(v => v.status === 'Completed').length;
  const scheduledVisits = allVisits.filter(v => v.status === 'Scheduled').length;
  const totalExpectedValue = allVisits.reduce((sum, v) => sum + v.expectedBusinessValue, 0);
  const averageProbability = Math.round(allVisits.reduce((sum, v) => sum + v.probabilityPercent, 0) / totalVisits);

  // CSV export
  const exportToCSV = () => {
    if (filteredVisits.length === 0) {
      alert('No data to export');
      return;
    }
    const headers = [
      'Visit Code', 'Visit Date', 'Employee ID', 'Company ID', 'Organisation ID', 'Department ID',
      'Contact Person ID', 'Visit Purpose ID', 'Discussion Summary', 'Next Action', 'Next Follow Up Date',
      'Vehicle Type ID', 'Distance (Km)', 'Rate/Km', 'Travel Expense', 'Funnel Stage ID', 'Outcome Type ID',
      'Expected Value', 'Actual Value', 'Probability %', 'Status', 'Check-In Time', 'Check-Out Time',
      'Latitude', 'Longitude', 'Remarks', 'Attachment Path', 'Inserted By', 'Inserted Date', 'Updated By', 'Updated Date'
    ];
    
    const escapeCSV = (cell: any) => {
      const str = String(cell ?? '');
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const rows = filteredVisits.map(v => [
      v.visitCode, v.visitDate, v.employeeId, v.companyId, v.organisationId, v.departmentId,
      v.contactPersonId, v.visitPurposeId, v.discussionSummary, v.nextAction, v.nextFollowUpDate,
      v.vehicleTypeId, v.distanceKm, v.rateAppliedPerKm, v.travelExpenseAmount, v.funnelStageId, v.outcomeTypeId,
      v.expectedBusinessValue, v.actualBusinessValue, v.probabilityPercent, v.status,
      v.checkInTime, v.checkOutTime, v.latitude, v.longitude, v.remarks, v.attachmentPath, v.insertedBy, v.insertedDate, v.updatedBy, v.updatedDate
    ].map(escapeCSV));
    
    const csvContent = [headers.map(escapeCSV), ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'visits_export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const truncate = (text: string, maxLen = 55) => {
    if (!text) return '—';
    return text.length > maxLen ? text.slice(0, maxLen) + '…' : text;
  };

  // Handle form input changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? 0 : Number(value)) : value,
    }));
  };

  // Add new visit
  const addNewVisit = () => {
    // Basic validation
    if (!formData.visitCode || !formData.visitDate || !formData.employeeId) {
      alert('Please fill at least Visit Code, Visit Date and Employee ID');
      return;
    }

    const newId = Math.max(...allVisits.map(v => v.id), 0) + 1;
    const now = new Date().toISOString();

    const newVisit: Visit = {
      id: newId,
      ...formData,
      insertedDate: formData.insertedDate || now,
      updatedDate: now,
      insertedBy: formData.insertedBy || 1,
      updatedBy: 1,
    };

    setAllVisits(prev => [newVisit, ...prev]);
    setShowModal(false);
    setFormData(emptyForm);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black tracking-tight flex items-center gap-2">
            📋 Visits Management
          </h1>
          <p className="text-black mt-1 text-sm sm:text-base">
            Complete list of all field visits with full details (aligned to API spec)
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border border-slate-100 hover:border-indigo-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-indigo-600 font-semibold uppercase tracking-wide">Total Visits</p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-800 mt-1">{totalVisits}</p>
              </div>
              <div className="bg-indigo-100 rounded-full p-2 sm:p-3 group-hover:bg-indigo-200 transition">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
            </div>
            <div className="mt-3 text-xs text-slate-400">Last 30 days trend ↑</div>
          </div>

          <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border border-slate-100 hover:border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-green-600 font-semibold uppercase tracking-wide">Completed</p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-800 mt-1">{completedVisits}</p>
              </div>
              <div className="bg-green-100 rounded-full p-2 sm:p-3 group-hover:bg-green-200 transition">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
            </div>
            <div className="mt-3 text-xs text-slate-400">Completion Rate: {Math.round((completedVisits / totalVisits) * 100)}%</div>
          </div>

          <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border border-slate-100 hover:border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-blue-600 font-semibold uppercase tracking-wide">Scheduled</p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-800 mt-1">{scheduledVisits}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-2 sm:p-3 group-hover:bg-blue-200 transition">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
            </div>
            <div className="mt-3 text-xs text-slate-400">Upcoming visits this week</div>
          </div>

          <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border border-slate-100 hover:border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-emerald-600 font-semibold uppercase tracking-wide">Pipeline Value</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-800 mt-1">{formatCurrency(totalExpectedValue)}</p>
              </div>
              <div className="bg-emerald-100 rounded-full p-2 sm:p-3 group-hover:bg-emerald-200 transition">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </div>
            <div className="mt-3 text-xs text-slate-400">Expected revenue from open deals</div>
          </div>

          <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border border-slate-100 hover:border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-purple-600 font-semibold uppercase tracking-wide">Avg. Probability</p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-800 mt-1">{averageProbability}%</p>
              </div>
              <div className="bg-purple-100 rounded-full p-2 sm:p-3 group-hover:bg-purple-200 transition">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
            </div>
            <div className="mt-3 text-xs text-slate-400">Weighted pipeline: {formatCurrency(totalExpectedValue * averageProbability / 100)}</div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden mb-8">
          <div className="p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by code, status, summary, remarks..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              {searchTerm && (
                <button onClick={clearSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition">✕</button>
              )}
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition flex items-center justify-center gap-2 text-sm shadow-sm"
            >
              <span className="text-lg">+</span> Add New
            </button>
            <button
              onClick={exportToCSV}
              className="px-5 py-2.5 border border-slate-300 rounded-xl hover:bg-slate-50 transition flex items-center justify-center gap-2 text-sm bg-white"
            >
              📎 Export CSV
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-5 py-2.5 border border-slate-300 rounded-xl hover:bg-slate-50 transition flex items-center justify-center gap-2 text-sm bg-white"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
              Filter Status
            </button>
          </div>

          {/* Filter Panel - now a collapsible panel like DepartmentMaster */}
          {showFilters && (
            <div className="p-4 border-t border-slate-200 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="all">All Statuses</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="rescheduled">Rescheduled</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setStatusFilter('all');
                      setSearchTerm('');
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
          <div className="px-4 sm:px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center flex-wrap gap-2">
            <h2 className="text-base sm:text-lg font-semibold text-slate-700 flex items-center gap-2">
              📋 Visit Records
              <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{filteredVisits.length} records</span>
            </h2>
          </div>
          <div className="overflow-x-auto overflow-y-auto max-h-[70vh]">
            <table className="min-w-[1400px] w-full border-collapse text-sm">
              <thead className="bg-slate-50 sticky top-0 z-10">
                <tr className="border-b border-slate-200">
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Visit Code</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Visit Date</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Employee ID</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Company ID</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Organisation ID</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Department ID</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Contact Person ID</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Visit Purpose ID</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Discussion Summary</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Next Action</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Next Follow-up Date</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Vehicle Type ID</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Distance (Km)</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Rate per Km</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Travel Expense</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Funnel Stage ID</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Outcome Type ID</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Expected Value</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actual Value</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Probability (%)</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Check-In Time</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Check-Out Time</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Latitude</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Longitude</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Remarks</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Attachment Path</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Inserted By</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Inserted Date</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Updated By</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Updated Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedVisits.map((visit) => (
                  <tr key={visit.id} className="hover:bg-slate-50 transition-colors duration-150">
                    <td className="px-3 py-2.5 whitespace-nowrap font-medium text-indigo-700">{visit.visitCode}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">{formatDateTime(visit.visitDate)}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">{visit.employeeId}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">{visit.companyId}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">{visit.organisationId}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">{visit.departmentId}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">{visit.contactPersonId}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">{visit.visitPurposeId}</td>
                    <td className="px-3 py-2.5 max-w-xs truncate" title={visit.discussionSummary}>{truncate(visit.discussionSummary, 50)}</td>
                    <td className="px-3 py-2.5 max-w-[150px] truncate" title={visit.nextAction}>{truncate(visit.nextAction, 35)}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">{formatDateTime(visit.nextFollowUpDate)}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">{visit.vehicleTypeId}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">{visit.distanceKm}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">₹{visit.rateAppliedPerKm.toFixed(2)}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap font-mono">₹{visit.travelExpenseAmount.toFixed(2)}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">{visit.funnelStageId}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">{visit.outcomeTypeId}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">₹{visit.expectedBusinessValue.toLocaleString()}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">₹{visit.actualBusinessValue.toLocaleString()}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap"><ProbabilityCell value={visit.probabilityPercent} /></td>
                    <td className="px-3 py-2.5 whitespace-nowrap"><StatusBadge status={visit.status} /></td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-xs">{formatDateTime(visit.checkInTime)}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-xs">{formatDateTime(visit.checkOutTime)}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap font-mono text-xs">{visit.latitude}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap font-mono text-xs">{visit.longitude}</td>
                    <td className="px-3 py-2.5 max-w-[180px] truncate" title={visit.remarks}>{truncate(visit.remarks, 40)}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      {visit.attachmentPath ? (
                        <a href={visit.attachmentPath} className="text-indigo-600 hover:underline flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                          File
                        </a>
                      ) : '—'}
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-xs">{visit.insertedBy}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-xs">{formatDateTime(visit.insertedDate)}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-xs">{visit.updatedBy}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap text-xs">{formatDateTime(visit.updatedDate)}</td>
                  </tr>
                ))}
                {paginatedVisits.length === 0 && (
                  <tr>
                    <td colSpan={31} className="text-center py-12 text-slate-400 text-sm">No visits match your search/filter criteria.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredVisits.length > 0 && (
            <div className="px-5 py-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-500">
                Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, filteredVisits.length)} of {filteredVisits.length} entries
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition"
                >
                  Previous
                </button>
                <span className="px-3 py-1.5 text-sm font-medium bg-white rounded-lg border border-slate-200">{currentPage} / {totalPages}</span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="text-center text-xs text-slate-400 mt-5">
          Showing all 31 fields • Aligned with API specification
        </div>
      </div>

      {/* Add New Visit Modal - Slides in from right side */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setShowModal(false)}
          />
          <div className="relative w-full max-w-2xl h-full bg-white shadow-2xl transform transition-transform duration-300 ease-out animate-slide-in-right overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">➕ Add New Visit</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 transition text-2xl leading-none">&times;</button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Visit Code */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Visit Code *</label>
                  <input type="text" name="visitCode" value={formData.visitCode} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" required />
                </div>
                {/* Visit Date */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Visit Date *</label>
                  <input type="datetime-local" name="visitDate" value={formData.visitDate.slice(0, 16)} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
                {/* Employee ID */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Employee ID *</label>
                  <input type="number" name="employeeId" value={formData.employeeId || ''} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
                {/* Company ID */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Company ID</label>
                  <input type="number" name="companyId" value={formData.companyId || ''} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
                {/* Organisation ID */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Organisation ID</label>
                  <input type="number" name="organisationId" value={formData.organisationId || ''} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
                {/* Department ID */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Department ID</label>
                  <input type="number" name="departmentId" value={formData.departmentId || ''} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
                {/* Contact Person ID */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Contact Person ID</label>
                  <input type="number" name="contactPersonId" value={formData.contactPersonId || ''} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
                {/* Visit Purpose ID */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Visit Purpose ID</label>
                  <select name="visitPurposeId" value={formData.visitPurposeId} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm">
                    <option value="0">Select</option>
                    <option value="1">Sales Meeting</option>
                    <option value="2">Support</option>
                    <option value="3">Training</option>
                    <option value="4">Inspection</option>
                  </select>
                </div>
                {/* Discussion Summary */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Discussion Summary</label>
                  <textarea name="discussionSummary" rows={2} value={formData.discussionSummary} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"></textarea>
                </div>
                {/* Next Action */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Next Action</label>
                  <input type="text" name="nextAction" value={formData.nextAction} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
                {/* Next Follow-up Date */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Next Follow-up Date</label>
                  <input type="datetime-local" name="nextFollowUpDate" value={formData.nextFollowUpDate.slice(0, 16)} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
                {/* Vehicle Type ID */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Vehicle Type ID</label>
                  <select name="vehicleTypeId" value={formData.vehicleTypeId} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm">
                    <option value="0">Select</option>
                    <option value="1">Car</option>
                    <option value="2">Bike</option>
                    <option value="3">Auto</option>
                  </select>
                </div>
                {/* Distance Km */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Distance (Km)</label>
                  <input type="number" step="0.1" name="distanceKm" value={formData.distanceKm || ''} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
                {/* Rate per Km */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Rate per Km (₹)</label>
                  <input type="number" step="0.01" name="rateAppliedPerKm" value={formData.rateAppliedPerKm || ''} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
                {/* Travel Expense */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Travel Expense (₹)</label>
                  <input type="number" step="0.01" name="travelExpenseAmount" value={formData.travelExpenseAmount || ''} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
                {/* Funnel Stage ID */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Funnel Stage ID</label>
                  <select name="funnelStageId" value={formData.funnelStageId} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm">
                    <option value="0">Select</option>
                    <option value="1">Lead</option><option value="2">Qualified</option><option value="3">Proposal</option><option value="4">Negotiation</option><option value="5">Closed</option>
                  </select>
                </div>
                {/* Outcome Type ID */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Outcome Type ID</label>
                  <select name="outcomeTypeId" value={formData.outcomeTypeId} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm">
                    <option value="0">Select</option>
                    <option value="1">Won</option><option value="2">Lost</option><option value="3">Pending</option>
                  </select>
                </div>
                {/* Expected Value */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Expected Value (₹)</label>
                  <input type="number" name="expectedBusinessValue" value={formData.expectedBusinessValue || ''} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
                {/* Actual Value */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Actual Value (₹)</label>
                  <input type="number" name="actualBusinessValue" value={formData.actualBusinessValue || ''} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
                {/* Probability % */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Probability (%)</label>
                  <input type="number" min="0" max="100" name="probabilityPercent" value={formData.probabilityPercent || ''} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
                {/* Status */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Status</label>
                  <select name="status" value={formData.status} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm">
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Rescheduled">Rescheduled</option>
                  </select>
                </div>
                {/* Check-In Time */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Check-In Time</label>
                  <input type="datetime-local" name="checkInTime" value={formData.checkInTime.slice(0, 16)} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
                {/* Check-Out Time */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Check-Out Time</label>
                  <input type="datetime-local" name="checkOutTime" value={formData.checkOutTime.slice(0, 16)} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
                {/* Latitude */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Latitude</label>
                  <input type="text" name="latitude" value={formData.latitude} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder="e.g., 19.0760" />
                </div>
                {/* Longitude */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Longitude</label>
                  <input type="text" name="longitude" value={formData.longitude} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder="e.g., 72.8777" />
                </div>
                {/* Remarks */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Remarks</label>
                  <textarea name="remarks" rows={2} value={formData.remarks} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"></textarea>
                </div>
                {/* Attachment Path */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Attachment Path</label>
                  <input type="text" name="attachmentPath" value={formData.attachmentPath} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" placeholder="/uploads/file.pdf" />
                </div>
                {/* Inserted By */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Inserted By (User ID)</label>
                  <input type="number" name="insertedBy" value={formData.insertedBy || ''} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
                {/* Inserted Date */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Inserted Date</label>
                  <input type="datetime-local" name="insertedDate" value={formData.insertedDate.slice(0, 16)} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
                {/* Updated By */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Updated By</label>
                  <input type="number" name="updatedBy" value={formData.updatedBy || ''} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
                {/* Updated Date */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Updated Date</label>
                  <input type="datetime-local" name="updatedDate" value={formData.updatedDate.slice(0, 16)} onChange={handleFormChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50">Cancel</button>
              <button onClick={addNewVisit} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">Add Visit</button>
            </div>
          </div>
        </div>
      )}

      {/* Animation keyframes */}
      <style>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MyVisit;