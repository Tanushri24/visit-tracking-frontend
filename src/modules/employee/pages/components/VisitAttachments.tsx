import React, { useState, useEffect, useMemo, useCallback } from "react";

interface Attachment {
  id: number;
  visitId: number;
  fileName: string;
  filePath: string;
  fileType: string;
  isActive: boolean;
}

// ---------- Mock data generator (reduced to 8 records) ----------
const generateMockData = (count = 8): Attachment[] => {
  const fileTypes = ["pdf", "jpg", "png", "docx", "xlsx"];
  const names = [
    "VisitReport", "MeetingPhoto", "SignedAgreement", "Proposal", "TenderDoc",
    "ExpenseReceipt", "CheckinSelfie", "ClientLetter"
  ];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    visitId: Math.floor(Math.random() * 100) + 1000,
    fileName: `${names[i % names.length]}_${i + 1}.${fileTypes[i % fileTypes.length]}`,
    filePath: `/uploads/visits/${Math.floor(Math.random() * 500)}/${names[i % names.length]}.${fileTypes[i % fileTypes.length]}`,
    fileType: fileTypes[i % fileTypes.length].toUpperCase(),
    isActive: Math.random() > 0.2,
  }));
};

const VisitAttachment: React.FC = () => {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);     // changed from showFilterDropdown
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Attachment | null>(null);
  const [editFormData, setEditFormData] = useState<Attachment | null>(null);
  const [newRecord, setNewRecord] = useState<Omit<Attachment, "id">>({
    visitId: 0,
    fileName: "",
    filePath: "",
    fileType: "",
    isActive: true,
  });

  // Load mock data
  useEffect(() => {
    const timer = setTimeout(() => {
      const data = generateMockData(8);
      setAttachments(data);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Memoized filtered data
  const filteredData = useMemo(() => {
    return attachments.filter(item => {
      const matchesSearch =
        searchTerm === "" ||
        item.visitId.toString().includes(searchTerm) ||
        item.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.fileType.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "active" && item.isActive) ||
        (filterStatus === "inactive" && !item.isActive);
      return matchesSearch && matchesStatus;
    });
  }, [attachments, searchTerm, filterStatus]);

  // Memoized stats
  const totalRecords = useMemo(() => attachments.length, [attachments]);
  const activeCount = useMemo(() => attachments.filter(a => a.isActive).length, [attachments]);
  const totalFileTypes = useMemo(() => new Set(attachments.map(a => a.fileType)).size, [attachments]);

  // CRUD operations with useCallback
  const handleAddRecord = useCallback(() => {
    if (!newRecord.visitId || !newRecord.fileName) {
      alert("Please fill at least Visit ID and File Name");
      return;
    }
    const maxId = attachments.length > 0 ? Math.max(...attachments.map(a => a.id)) : 0;
    const recordToAdd: Attachment = { ...newRecord, id: maxId + 1 };
    setAttachments(prev => [...prev, recordToAdd]);
    setNewRecord({ visitId: 0, fileName: "", filePath: "", fileType: "", isActive: true });
    setShowAddModal(false);
  }, [newRecord, attachments]);

  const handleUpdateRecord = useCallback(() => {
    if (!editFormData) return;
    setAttachments(prev =>
      prev.map(item => (item.id === editFormData.id ? editFormData : item))
    );
    setShowEditModal(false);
    setSelectedRecord(null);
    setEditFormData(null);
  }, [editFormData]);

  const handleDelete = useCallback((id: number) => {
    if (window.confirm("Are you sure you want to delete this attachment?")) {
      setAttachments(prev => prev.filter(a => a.id !== id));
    }
  }, []);

  const openEditModal = useCallback((record: Attachment) => {
    setSelectedRecord(record);
    setEditFormData({ ...record });
    setShowEditModal(true);
  }, []);

  const openViewModal = useCallback((record: Attachment) => {
    setSelectedRecord(record);
    setShowViewModal(true);
  }, []);

  const exportToCSV = useCallback(() => {
    if (attachments.length === 0) {
      alert("No data to export");
      return;
    }
    const headers = ["ID", "Visit ID", "File Name", "File Path", "File Type", "Status"];
    const rows = attachments.map(item => [
      item.id,
      item.visitId,
      item.fileName,
      item.filePath,
      item.fileType,
      item.isActive ? "Active" : "Inactive"
    ]);
    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "attachments.csv";
    a.click();
    URL.revokeObjectURL(url);
  }, [attachments]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-3 sm:p-4 md:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 tracking-tight">
            Visit Attachments
          </h1>
          <p className="text-slate-500 mt-1 text-xs sm:text-sm md:text-base">
            Manage all uploaded documents, proofs, and files per visit
          </p>
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-xl text-sm flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
            Loading attachments...
          </div>
        )}

        {/* Stats Cards - with colorful bottom borders */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 md:mb-8">
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-purple-100 overflow-hidden">
            <div className="p-3 sm:p-4 md:p-5 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs text-purple-600 font-semibold uppercase tracking-wide">Total</p>
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-800 mt-1">{totalRecords}</p>
                </div>
                <div className="bg-purple-100 rounded-full p-1.5 sm:p-2 md:p-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
              </div>
            </div>
            <div className="h-1 bg-gradient-to-r from-purple-400 to-purple-600"></div>
          </div>

          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-green-100 overflow-hidden">
            <div className="p-3 sm:p-4 md:p-5 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs text-green-600 font-semibold uppercase tracking-wide">Active</p>
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-800 mt-1">{activeCount}</p>
                </div>
                <div className="bg-green-100 rounded-full p-1.5 sm:p-2 md:p-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
              </div>
            </div>
            <div className="h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
          </div>

          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100 overflow-hidden">
            <div className="p-3 sm:p-4 md:p-5 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs text-blue-600 font-semibold uppercase tracking-wide">Types</p>
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-800 mt-1">{totalFileTypes}</p>
                </div>
                <div className="bg-blue-100 rounded-full p-1.5 sm:p-2 md:p-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                </div>
              </div>
            </div>
            <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
          </div>

          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-emerald-100 overflow-hidden">
            <div className="p-3 sm:p-4 md:p-5 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs text-emerald-600 font-semibold uppercase tracking-wide">Size (MB)</p>
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-800 mt-1">~{totalRecords * 2.4}</p>
                </div>
                <div className="bg-emerald-100 rounded-full p-1.5 sm:p-2 md:p-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                </div>
              </div>
            </div>
            <div className="h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
          </div>
        </div>

        {/* Action Bar - with Filter Panel (instead of dropdown) */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md border border-slate-200 overflow-hidden mb-6 md:mb-8">
          <div className="p-3 sm:p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by Visit ID, File Name or Type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>

            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowAddModal(true)} className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-1 text-sm shadow-sm">
                <span className="text-base sm:text-lg">+ Add Attach</span>
              </button>
              <button onClick={exportToCSV} className="px-3 sm:px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition flex items-center justify-center gap-1 text-sm">
                Export
              </button>
              {/* Filter button - toggles panel */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-3 sm:px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition flex items-center justify-center gap-1 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                Filter
              </button>
            </div>
          </div>

          {/* Filter Panel (toggled) - same style as DepartmentMaster */}
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

        {/* Table Card - unchanged */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md border border-slate-200 overflow-hidden">
          <div className="px-3 sm:px-4 md:px-6 py-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center flex-wrap gap-2">
            <h2 className="text-sm sm:text-base font-semibold text-slate-700">📄 Attachment Records</h2>
            <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">{filteredData.length} total</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm min-w-[640px] md:min-w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left font-semibold text-slate-600">ID</th>
                  <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left font-semibold text-slate-600">Visit ID</th>
                  <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left font-semibold text-slate-600">File Name</th>
                  <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left font-semibold text-slate-600">File Path</th>
                  <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left font-semibold text-slate-600">Type</th>
                  <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left font-semibold text-slate-600">Status</th>
                  <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 sm:py-12 text-slate-400 text-sm">
                      No attachments match your search/filter.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition">
                      <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-medium text-slate-700">{item.id}</td>
                      <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-slate-600">{item.visitId}</td>
                      <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-slate-600 max-w-[120px] sm:max-w-[200px] truncate" title={item.fileName}>{item.fileName}</td>
                      <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-slate-600 font-mono text-[10px] sm:text-xs max-w-[150px] sm:max-w-[250px] truncate" title={item.filePath}>{item.filePath}</td>
                      <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-blue-100 text-blue-800">{item.fileType}</span>
                      </td>
                      <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${item.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                          {item.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                        <div className="flex gap-1.5 sm:gap-2">
                          <button onClick={() => openViewModal(item)} className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View Details">
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          </button>
                          <button onClick={() => openEditModal(item)} className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors" title="Edit">
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          </button>
                          <button onClick={() => handleDelete(item.id)} className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
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

      {/* ADD MODAL - unchanged */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">Add New Attachment</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleAddRecord(); }}>
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Visit ID *</label>
                    <input type="number" value={newRecord.visitId || ""} onChange={(e) => setNewRecord({ ...newRecord, visitId: parseInt(e.target.value) || 0 })} required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">File Name *</label>
                    <input type="text" value={newRecord.fileName} onChange={(e) => setNewRecord({ ...newRecord, fileName: e.target.value })} required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">File Path</label>
                    <input type="text" value={newRecord.filePath} onChange={(e) => setNewRecord({ ...newRecord, filePath: e.target.value })} placeholder="/uploads/visits/123/report.pdf" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">File Type</label>
                    <input type="text" value={newRecord.fileType} onChange={(e) => setNewRecord({ ...newRecord, fileType: e.target.value.toUpperCase() })} placeholder="PDF, JPG, DOCX" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={newRecord.isActive} onChange={(e) => setNewRecord({ ...newRecord, isActive: e.target.checked })} className="w-4 h-4 text-blue-600" />
                    <label className="text-xs sm:text-sm font-medium text-gray-700">Active</label>
                  </div>
                </div>
              </div>
              <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 sm:px-6 py-3 sm:py-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">Save Attachment</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW MODAL - unchanged */}
      {showViewModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">Attachment Details</h2>
              <button onClick={() => setShowViewModal(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div><label className="block text-xs sm:text-sm font-medium text-gray-600">ID</label><p className="mt-1 text-sm sm:text-base text-gray-900">{selectedRecord.id}</p></div>
                <div><label className="block text-xs sm:text-sm font-medium text-gray-600">Visit ID</label><p className="mt-1 text-sm sm:text-base text-gray-900">{selectedRecord.visitId}</p></div>
                <div className="sm:col-span-2"><label className="block text-xs sm:text-sm font-medium text-gray-600">File Name</label><p className="mt-1 text-sm sm:text-base text-gray-900 break-all">{selectedRecord.fileName}</p></div>
                <div className="sm:col-span-2"><label className="block text-xs sm:text-sm font-medium text-gray-600">File Path</label><p className="mt-1 text-xs sm:text-sm text-gray-900 break-all font-mono">{selectedRecord.filePath}</p></div>
                <div><label className="block text-xs sm:text-sm font-medium text-gray-600">File Type</label><p className="mt-1 text-sm sm:text-base text-gray-900">{selectedRecord.fileType}</p></div>
                <div><label className="block text-xs sm:text-sm font-medium text-gray-600">Status</label><p className="mt-1"><span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${selectedRecord.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{selectedRecord.isActive ? "Active" : "Inactive"}</span></p></div>
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 sm:px-6 py-3 sm:py-4 flex justify-end">
              <button onClick={() => setShowViewModal(false)} className="px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL - unchanged */}
      {showEditModal && editFormData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">Edit Attachment</h2>
              <button onClick={() => setShowEditModal(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateRecord(); }}>
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Visit ID *</label>
                    <input type="number" value={editFormData.visitId} onChange={(e) => setEditFormData({ ...editFormData, visitId: parseInt(e.target.value) || 0 })} required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500" />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">File Name *</label>
                    <input type="text" value={editFormData.fileName} onChange={(e) => setEditFormData({ ...editFormData, fileName: e.target.value })} required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">File Path</label>
                    <input type="text" value={editFormData.filePath} onChange={(e) => setEditFormData({ ...editFormData, filePath: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500" />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">File Type</label>
                    <input type="text" value={editFormData.fileType} onChange={(e) => setEditFormData({ ...editFormData, fileType: e.target.value.toUpperCase() })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={editFormData.isActive} onChange={(e) => setEditFormData({ ...editFormData, isActive: e.target.checked })} className="w-4 h-4 text-purple-600" />
                    <label className="text-xs sm:text-sm font-medium text-gray-700">Active</label>
                  </div>
                </div>
              </div>
              <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 sm:px-6 py-3 sm:py-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowEditModal(false)} className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitAttachment;