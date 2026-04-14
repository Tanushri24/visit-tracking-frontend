import React, { useState } from "react";

interface VisitFollowUp {
  id: number;
  visitId: number;
  followUpDate: string;
  followUpRemarks: string;
  funnelStageId: number;
  outcomeTypeId: number;
  expectedBusinessValue: number;
  actualBusinessValue: number;
  nextFollowUpDate: string;
  isActive: boolean;
}

// ---------- STATIC DEMO DATA (unchanged) ----------
const initialStaticData: VisitFollowUp[] = [
  {
    id: 1,
    visitId: 101,
    followUpDate: "2026-04-05T10:30:00Z",
    followUpRemarks: "Initial meeting with IT head, discussed OMS requirements.",
    funnelStageId: 2,
    outcomeTypeId: 3,
    expectedBusinessValue: 250000,
    actualBusinessValue: 0,
    nextFollowUpDate: "2026-04-12T09:00:00Z",
    isActive: true,
  },
  {
    id: 2,
    visitId: 102,
    followUpDate: "2026-04-06T14:15:00Z",
    followUpRemarks: "Demo conducted for examination department. Positive feedback.",
    funnelStageId: 5,
    outcomeTypeId: 4,
    expectedBusinessValue: 750000,
    actualBusinessValue: 0,
    nextFollowUpDate: "2026-04-15T11:30:00Z",
    isActive: true,
  },
  {
    id: 3,
    visitId: 103,
    followUpDate: "2026-04-02T09:45:00Z",
    followUpRemarks: "Proposal shared, awaiting budget approval.",
    funnelStageId: 4,
    outcomeTypeId: 5,
    expectedBusinessValue: 1200000,
    actualBusinessValue: 0,
    nextFollowUpDate: "2026-04-10T14:00:00Z",
    isActive: true,
  },
  {
    id: 4,
    visitId: 104,
    followUpDate: "2026-03-28T11:00:00Z",
    followUpRemarks: "Commercial negotiation completed, order expected next month.",
    funnelStageId: 7,
    outcomeTypeId: 6,
    expectedBusinessValue: 500000,
    actualBusinessValue: 500000,
    nextFollowUpDate: "2026-04-18T10:00:00Z",
    isActive: true,
  },
  {
    id: 5,
    visitId: 105,
    followUpDate: "2026-04-01T16:20:00Z",
    followUpRemarks: "No response from client, need to follow up.",
    funnelStageId: 1,
    outcomeTypeId: 2,
    expectedBusinessValue: 0,
    actualBusinessValue: 0,
    nextFollowUpDate: "2026-04-08T09:30:00Z",
    isActive: false,
  },
  {
    id: 6,
    visitId: 106,
    followUpDate: "2026-04-07T13:00:00Z",
    followUpRemarks: "Technical discussion with IT team, they requested additional features.",
    funnelStageId: 3,
    outcomeTypeId: 3,
    expectedBusinessValue: 350000,
    actualBusinessValue: 0,
    nextFollowUpDate: "2026-04-14T15:00:00Z",
    isActive: true,
  },
];

const VisitFollowUpPage: React.FC = () => {
  const [data, setData] = useState<VisitFollowUp[]>(initialStaticData);

  // ---------- Form state for inserting ----------
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRecord, setNewRecord] = useState<Omit<VisitFollowUp, "id">>({
    visitId: 0,
    followUpDate: "",
    followUpRemarks: "",
    funnelStageId: 0,
    outcomeTypeId: 0,
    expectedBusinessValue: 0,
    actualBusinessValue: 0,
    nextFollowUpDate: "",
    isActive: true,
  });

  // ---------- Search & filter ----------
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);      // ← changed from showFilterDropdown
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");

  // ---------- Edit & view ----------
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<VisitFollowUp | null>(null);
  const [editFormData, setEditFormData] = useState<VisitFollowUp | null>(null);

  // ---------- Formatting ----------
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // ---------- Add record ----------
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setNewRecord({ ...newRecord, [name]: newValue });
  };

  const handleAddRecord = () => {
    if (!newRecord.visitId || !newRecord.followUpDate) {
      alert("Please fill at least Visit ID and Follow Up Date");
      return;
    }
    const maxId = data.length > 0 ? Math.max(...data.map(item => item.id)) : 0;
    const recordToAdd: VisitFollowUp = { ...newRecord, id: maxId + 1 };
    setData([...data, recordToAdd]);
    setNewRecord({
      visitId: 0,
      followUpDate: "",
      followUpRemarks: "",
      funnelStageId: 0,
      outcomeTypeId: 0,
      expectedBusinessValue: 0,
      actualBusinessValue: 0,
      nextFollowUpDate: "",
      isActive: true,
    });
    setShowAddModal(false);
  };

  // ---------- Export CSV ----------
  const exportToCSV = () => {
    if (data.length === 0) {
      alert("No data to export");
      return;
    }
    const headers = [
      "ID", "Visit ID", "FollowUp Date", "Remarks", "Funnel Stage ID",
      "Outcome Type ID", "Expected Value", "Actual Value", "Next FollowUp Date", "Status"
    ];
    const rows = data.map(item => [
      item.id,
      item.visitId,
      item.followUpDate,
      item.followUpRemarks,
      item.funnelStageId,
      item.outcomeTypeId,
      item.expectedBusinessValue,
      item.actualBusinessValue,
      item.nextFollowUpDate,
      item.isActive ? "Active" : "Inactive"
    ]);
    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "followup_records.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // ---------- Edit handlers ----------
  const openEditModal = (record: VisitFollowUp) => {
    setSelectedRecord(record);
    setEditFormData({ ...record });
    setShowEditModal(true);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editFormData) return;
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setEditFormData({ ...editFormData, [name]: newValue });
  };

  const handleUpdateRecord = () => {
    if (!editFormData) return;
    const updatedData = data.map(item =>
      item.id === editFormData.id ? editFormData : item
    );
    setData(updatedData);
    setShowEditModal(false);
    setSelectedRecord(null);
    setEditFormData(null);
  };

  // ---------- View handler ----------
  const openViewModal = (record: VisitFollowUp) => {
    setSelectedRecord(record);
    setShowViewModal(true);
  };

  // ---------- Filter logic ----------
  const filteredData = data.filter(item => {
    const matchesSearch =
      searchTerm === "" ||
      item.visitId.toString().includes(searchTerm) ||
      item.followUpRemarks.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && item.isActive) ||
      (filterStatus === "inactive" && !item.isActive);
    return matchesSearch && matchesStatus;
  });

  // ---------- Summary stats (based on all data) ----------
  const totalRecords = data.length;
  const totalExpected = data.reduce((sum, rec) => sum + rec.expectedBusinessValue, 0);
  const totalActual = data.reduce((sum, rec) => sum + rec.actualBusinessValue, 0);
  const activeCount = data.filter((rec) => rec.isActive).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
            📋 Visit Follow‑Up
          </h1>
          <p className="text-slate-500 mt-1 text-sm sm:text-base">
            Track and manage all your follow‑up activities
          </p>
        </div>

        {/* Stats Cards (unchanged) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-md p-5 border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-purple-600 font-semibold uppercase tracking-wide">Total Records</p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-800 mt-1">{totalRecords}</p>
              </div>
              <div className="bg-purple-100 rounded-full p-2 sm:p-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-md p-5 border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-green-600 font-semibold uppercase tracking-wide">Active</p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-800 mt-1">{activeCount}</p>
              </div>
              <div className="bg-green-100 rounded-full p-2 sm:p-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-md p-5 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-blue-600 font-semibold uppercase tracking-wide">Pipeline Value</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-800 mt-1">{formatCurrency(totalExpected)}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-2 sm:p-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl shadow-md p-5 border border-emerald-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-emerald-600 font-semibold uppercase tracking-wide">Closed Won</p>
                <p className="text-lg sm:text-2xl font-bold text-slate-800 mt-1">{formatCurrency(totalActual)}</p>
              </div>
              <div className="bg-emerald-100 rounded-full p-2 sm:p-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar (Search, Add, Export, Filter) */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden mb-8">
          <div className="p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search input */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by Visit ID or Remarks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>

            {/* Add New button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2 text-sm shadow-sm"
            >
              <span>+</span> Add New
            </button>

            {/* Export button */}
            <button
              onClick={exportToCSV}
              className="px-4 py-2 border border-slate-300 rounded-xl hover:bg-slate-50 transition flex items-center justify-center gap-2 text-sm"
            >
              📎 Export CSV
            </button>

            {/* Filter button (toggles panel, no dropdown) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-slate-300 rounded-xl hover:bg-slate-50 transition flex items-center justify-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
              Filter
            </button>
          </div>

          {/* Filters Panel (same style as DepartmentMaster) */}
          {showFilters && (
            <div className="p-4 border-t border-slate-200 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as "all" | "active" | "inactive")}
                  >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setFilterStatus("all");
                      setSearchTerm("");
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

        {/* Table (unchanged) */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
          <div className="px-4 sm:px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center flex-wrap gap-2">
            <h2 className="text-base sm:text-lg font-semibold text-slate-700">📋 Follow‑Up Records</h2>
            <span className="text-xs sm:text-sm bg-slate-200 text-slate-700 px-3 py-1 rounded-full">
              {filteredData.length} total
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm min-w-[800px] md:min-w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold text-slate-600">Visit ID</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold text-slate-600">FollowUp Date</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold text-slate-600">Remarks</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold text-slate-600">Funnel</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold text-slate-600">Outcome</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold text-slate-600">Expected</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold text-slate-600">Actual</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold text-slate-600">Next FollowUp</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold text-slate-600">Status</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="text-center py-12 text-slate-400">
                      No follow‑up records match your search/filter.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                      <td className="px-3 sm:px-4 py-3 font-medium text-slate-700">{item.visitId}</td>
                      <td className="px-3 sm:px-4 py-3 text-slate-600">{formatDate(item.followUpDate)}</td>
                      <td className="px-3 sm:px-4 py-3 text-slate-600 max-w-[150px] truncate">{item.followUpRemarks || "—"}</td>
                      <td className="px-3 sm:px-4 py-3 text-slate-600">{item.funnelStageId || "—"}</td>
                      <td className="px-3 sm:px-4 py-3 text-slate-600">{item.outcomeTypeId || "—"}</td>
                      <td className="px-3 sm:px-4 py-3 font-medium text-emerald-600">{formatCurrency(item.expectedBusinessValue)}</td>
                      <td className="px-3 sm:px-4 py-3 font-medium text-blue-600">{formatCurrency(item.actualBusinessValue)}</td>
                      <td className="px-3 sm:px-4 py-3 text-slate-600">{formatDate(item.nextFollowUpDate)}</td>
                      <td className="px-3 sm:px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${item.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                          {item.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => openViewModal(item)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          </button>
                          <button onClick={() => openEditModal(item)} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ADD MODAL (unchanged) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Add New Follow‑Up</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleAddRecord(); }}>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Visit ID *</label><input type="number" name="visitId" value={newRecord.visitId || ""} onChange={handleFormChange} required className="w-full px-3 py-2 border rounded-lg" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Follow‑Up Date *</label><input type="date" name="followUpDate" value={newRecord.followUpDate} onChange={handleFormChange} required className="w-full px-3 py-2 border rounded-lg" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label><input type="text" name="followUpRemarks" value={newRecord.followUpRemarks} onChange={handleFormChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Funnel Stage ID</label><input type="number" name="funnelStageId" value={newRecord.funnelStageId || ""} onChange={handleFormChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Outcome Type ID</label><input type="number" name="outcomeTypeId" value={newRecord.outcomeTypeId || ""} onChange={handleFormChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Expected Value</label><input type="number" name="expectedBusinessValue" value={newRecord.expectedBusinessValue || ""} onChange={handleFormChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Actual Value</label><input type="number" name="actualBusinessValue" value={newRecord.actualBusinessValue || ""} onChange={handleFormChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Next Follow‑Up</label><input type="date" name="nextFollowUpDate" value={newRecord.nextFollowUpDate} onChange={handleFormChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" name="isActive" checked={newRecord.isActive} onChange={handleFormChange} className="w-4 h-4" />
                    <label className="text-sm font-medium text-gray-700">Active</label>
                  </div>
                </div>
              </div>
              <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW MODAL (unchanged) */}
      {showViewModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Follow‑Up Details</h2>
              <button onClick={() => setShowViewModal(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-600">Visit ID</label><p className="mt-1 text-gray-900">{selectedRecord.visitId}</p></div>
                <div><label className="block text-sm font-medium text-gray-600">Follow‑Up Date</label><p className="mt-1 text-gray-900">{formatDate(selectedRecord.followUpDate)}</p></div>
                <div><label className="block text-sm font-medium text-gray-600">Remarks</label><p className="mt-1 text-gray-900">{selectedRecord.followUpRemarks || "—"}</p></div>
                <div><label className="block text-sm font-medium text-gray-600">Funnel Stage ID</label><p className="mt-1 text-gray-900">{selectedRecord.funnelStageId || "—"}</p></div>
                <div><label className="block text-sm font-medium text-gray-600">Outcome Type ID</label><p className="mt-1 text-gray-900">{selectedRecord.outcomeTypeId || "—"}</p></div>
                <div><label className="block text-sm font-medium text-gray-600">Expected Value</label><p className="mt-1 text-gray-900">{formatCurrency(selectedRecord.expectedBusinessValue)}</p></div>
                <div><label className="block text-sm font-medium text-gray-600">Actual Value</label><p className="mt-1 text-gray-900">{formatCurrency(selectedRecord.actualBusinessValue)}</p></div>
                <div><label className="block text-sm font-medium text-gray-600">Next Follow‑Up</label><p className="mt-1 text-gray-900">{formatDate(selectedRecord.nextFollowUpDate)}</p></div>
                <div><label className="block text-sm font-medium text-gray-600">Status</label><p className="mt-1"><span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${selectedRecord.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{selectedRecord.isActive ? "Active" : "Inactive"}</span></p></div>
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-end">
              <button onClick={() => setShowViewModal(false)} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL (unchanged) */}
      {showEditModal && editFormData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Edit Follow‑Up</h2>
              <button onClick={() => setShowEditModal(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateRecord(); }}>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Visit ID *</label><input type="number" name="visitId" value={editFormData.visitId} onChange={handleEditFormChange} required className="w-full px-3 py-2 border rounded-lg" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Follow‑Up Date *</label><input type="date" name="followUpDate" value={editFormData.followUpDate.split('T')[0]} onChange={handleEditFormChange} required className="w-full px-3 py-2 border rounded-lg" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label><input type="text" name="followUpRemarks" value={editFormData.followUpRemarks} onChange={handleEditFormChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Funnel Stage ID</label><input type="number" name="funnelStageId" value={editFormData.funnelStageId} onChange={handleEditFormChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Outcome Type ID</label><input type="number" name="outcomeTypeId" value={editFormData.outcomeTypeId} onChange={handleEditFormChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Expected Value</label><input type="number" name="expectedBusinessValue" value={editFormData.expectedBusinessValue} onChange={handleEditFormChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Actual Value</label><input type="number" name="actualBusinessValue" value={editFormData.actualBusinessValue} onChange={handleEditFormChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Next Follow‑Up</label><input type="date" name="nextFollowUpDate" value={editFormData.nextFollowUpDate.split('T')[0]} onChange={handleEditFormChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" name="isActive" checked={editFormData.isActive} onChange={handleEditFormChange} className="w-4 h-4" />
                    <label className="text-sm font-medium text-gray-700">Active</label>
                  </div>
                </div>
              </div>
              <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitFollowUpPage;