import React, { useState } from "react";
import {
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  Filter,
  DollarSign,
  MapPin,
  TrendingUp,
  Edit,
  Trash2,
  X,
} from "lucide-react";

interface ExpenseReport {
  id: number;
  visitDate: string;
  employee: string;
  vehicleType: string;
  distance: number;
  ratePerKm: number;
  totalExpense: number;
  approvalStatus: string;
}

const ExpenseReport: React.FC = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState<ExpenseReport | null>(null);
  const [data, setData] = useState<ExpenseReport[]>([
    {
      id: 1,
      visitDate: "2026-03-30",
      employee: "Rahul Sharma",
      vehicleType: "Two Wheeler",
      distance: 15,
      ratePerKm: 10,
      totalExpense: 150,
      approvalStatus: "Approved",
    },
    {
      id: 2,
      visitDate: "2026-03-29",
      employee: "Ankit Verma",
      vehicleType: "Four Wheeler",
      distance: 20,
      ratePerKm: 12,
      totalExpense: 240,
      approvalStatus: "Pending",
    },
    {
      id: 3,
      visitDate: "2026-03-28",
      employee: "Priya Patel",
      vehicleType: "Two Wheeler",
      distance: 12,
      ratePerKm: 10,
      totalExpense: 120,
      approvalStatus: "Approved",
    },
    {
      id: 4,
      visitDate: "2026-03-27",
      employee: "Amit Kumar",
      vehicleType: "Four Wheeler",
      distance: 25,
      ratePerKm: 12,
      totalExpense: 300,
      approvalStatus: "Rejected",
    },
    {
      id: 5,
      visitDate: "2026-03-26",
      employee: "Neha Singh",
      vehicleType: "Two Wheeler",
      distance: 18,
      ratePerKm: 10,
      totalExpense: 180,
      approvalStatus: "Pending",
    },
  ]);

  const [filters, setFilters] = useState({
    status: "",
    vehicleType: "",
  });
  const itemsPerPage = 5;

  const filteredData = data.filter((item) => {
    const matchSearch = item.employee.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !filters.status || item.approvalStatus === filters.status;
    const matchVehicle = !filters.vehicleType || item.vehicleType === filters.vehicleType;
    return matchSearch && matchStatus && matchVehicle;
  });

  // Calculate summary statistics
  const totalExpenses = filteredData.reduce((sum, item) => sum + item.totalExpense, 0);
  const totalDistance = filteredData.reduce((sum, item) => sum + item.distance, 0);
  const avgExpense = filteredData.length > 0 ? (totalExpenses / filteredData.length).toFixed(0) : 0;

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      "Approved": "bg-green-100 text-green-700",
      "Pending": "bg-yellow-100 text-yellow-700",
      "Rejected": "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  const getVehicleIcon = (type: string) => {
    return type === "Two Wheeler" ? "🏍️" : "🚗";
  };

  const handleEdit = (record: ExpenseReport) => {
    setEditingRecord(record);
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    if (editingRecord) {
      const updatedExpense = {
        ...editingRecord,
        totalExpense: editingRecord.distance * editingRecord.ratePerKm,
      };
      setData(data.map(item => item.id === editingRecord.id ? updatedExpense : item));
      setShowEditModal(false);
      setEditingRecord(null);
      alert("Record updated successfully!");
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Delete this expense record?")) {
      setData(data.filter(item => item.id !== id));
    }
  };

  const clearFilters = () => {
    setFilters({ status: "", vehicleType: "" });
    setCurrentPage(1);
  };

  const uniqueStatuses = [...new Set(data.map(d => d.approvalStatus))];
  const uniqueVehicleTypes = [...new Set(data.map(d => d.vehicleType))];
  const hasActiveFilters = filters.status || filters.vehicleType;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Expense Report
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Track and manage employee travel expenses
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="group bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Expenses</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">₹{totalExpenses}</p>
                <p className="text-xs text-gray-400 mt-1">All time expenses</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-md group-hover:scale-110 transition-all duration-300">
                <DollarSign size={22} className="text-white" />
              </div>
            </div>
          </div>

          <div className="group bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-green-200 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Distance</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{totalDistance} <span className="text-sm font-normal text-gray-500">KM</span></p>
                <p className="text-xs text-gray-400 mt-1">Covered across all trips</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl shadow-md group-hover:scale-110 transition-all duration-300">
                <MapPin size={22} className="text-white" />
              </div>
            </div>
          </div>

          <div className="group bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-lg hover:border-purple-200 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Avg. Expense</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">₹{avgExpense}</p>
                <p className="text-xs text-gray-400 mt-1">Per trip average</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl shadow-md group-hover:scale-110 transition-all duration-300">
                <TrendingUp size={22} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Search, Filter and Export Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-4">
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by employee name..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm"
              >
                <Filter size={16} />
                <span>Filter</span>
                {hasActiveFilters && <span className="ml-1 text-xs">✓</span>}
              </button>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm"
              >
                <Download size={16} />
                <span>Export</span>
              </a>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilter && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="">All</option>
                    {uniqueStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Vehicle Type</label>
                  <select
                    value={filters.vehicleType}
                    onChange={(e) => setFilters({...filters, vehicleType: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="">All</option>
                    {uniqueVehicleTypes.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Edit Record Modal */}
        {showEditModal && editingRecord && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Edit Expense Record</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Visit Date</label>
                  <input
                    type="date"
                    value={editingRecord.visitDate}
                    onChange={(e) => setEditingRecord({...editingRecord, visitDate: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
                  <input
                    type="text"
                    placeholder="Enter employee name"
                    value={editingRecord.employee}
                    onChange={(e) => setEditingRecord({...editingRecord, employee: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                  <select
                    value={editingRecord.vehicleType}
                    onChange={(e) => setEditingRecord({...editingRecord, vehicleType: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="Two Wheeler">Two Wheeler</option>
                    <option value="Four Wheeler">Four Wheeler</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Distance (KM)</label>
                  <input
                    type="number"
                    placeholder="Enter distance"
                    value={editingRecord.distance}
                    onChange={(e) => setEditingRecord({...editingRecord, distance: parseInt(e.target.value) || 0})}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rate per KM (₹)</label>
                  <input
                    type="number"
                    placeholder="Enter rate per km"
                    value={editingRecord.ratePerKm}
                    onChange={(e) => setEditingRecord({...editingRecord, ratePerKm: parseInt(e.target.value) || 0})}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={editingRecord.approvalStatus}
                    onChange={(e) => setEditingRecord({...editingRecord, approvalStatus: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleUpdate}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                >
                  Update Record
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-600 whitespace-nowrap">Visit Date</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-600 whitespace-nowrap">Employee</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-600 whitespace-nowrap">Vehicle</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-600 whitespace-nowrap hidden sm:table-cell">Distance</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-600 whitespace-nowrap hidden sm:table-cell">Rate/KM</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-600 whitespace-nowrap">Total</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-600 whitespace-nowrap">Status</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-600 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">{item.visitDate}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 font-medium whitespace-nowrap">{item.employee}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                      <span className="flex items-center gap-1">
                        {getVehicleIcon(item.vehicleType)} {item.vehicleType}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap hidden sm:table-cell">{item.distance} km</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap hidden sm:table-cell">₹{item.ratePerKm}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 font-semibold whitespace-nowrap">₹{item.totalExpense}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.approvalStatus)}`}>
                        {item.approvalStatus}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredData.length === 0 && (
            <div className="text-center py-8 sm:py-12 text-gray-500 text-sm">No expense records found</div>
          )}
        </div>

        {/* Pagination */}
        {filteredData.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 mt-6">
            <p className="text-xs sm:text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 sm:p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 sm:p-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseReport;