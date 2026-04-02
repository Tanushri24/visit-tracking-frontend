import React, { useState } from "react";
import {
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  Filter,
  Briefcase,
  TrendingUp,
  DollarSign,
  MapPin,
  Edit,
  Trash2,
} from "lucide-react";

interface VisitReport {
  id: number;
  visitDate: string;
  employeeName: string;
  company: string;
  organisation: string;
  department: string;
  purpose: string;
  funnelStage: string;
  outcome: string;
  distance: number;
  expense: number;
}

const EmployeeVisitReport: React.FC = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    funnelStage: "",
    outcome: "",
    department: "",
  });
  const [data, setData] = useState<VisitReport[]>([
    {
      id: 1,
      visitDate: "2026-03-30",
      employeeName: "Rahul Sharma",
      company: "ABC Pvt Ltd",
      organisation: "Sales Wing",
      department: "Procurement",
      purpose: "Product Demo",
      funnelStage: "Demo Conducted",
      outcome: "Lead Generated",
      distance: 12,
      expense: 120,
    },
    {
      id: 2,
      visitDate: "2026-03-29",
      employeeName: "Ankit Verma",
      company: "XYZ Ltd",
      organisation: "Admin Office",
      department: "IT",
      purpose: "Proposal Discussion",
      funnelStage: "Proposal Shared",
      outcome: "Proposal Opportunity",
      distance: 18,
      expense: 180,
    },
    {
      id: 3,
      visitDate: "2026-03-28",
      employeeName: "Priya Patel",
      company: "Tech Solutions Inc",
      organisation: "Tech Division",
      department: "Engineering",
      purpose: "Technical Review",
      funnelStage: "Negotiation",
      outcome: "Contract Pending",
      distance: 25,
      expense: 250,
    },
    {
      id: 4,
      visitDate: "2026-03-27",
      employeeName: "Amit Kumar",
      company: "Global Services",
      organisation: "Operations",
      department: "HR",
      purpose: "Initial Meeting",
      funnelStage: "Discovery",
      outcome: "Interested",
      distance: 8,
      expense: 80,
    },
    {
      id: 5,
      visitDate: "2026-03-26",
      employeeName: "Neha Singh",
      company: "Innovate Corp",
      organisation: "Strategy",
      department: "Marketing",
      purpose: "Campaign Planning",
      funnelStage: "Proposal Shared",
      outcome: "Follow-up Required",
      distance: 15,
      expense: 150,
    },
  ]);

  const itemsPerPage = 5;

  const filteredData = data.filter((item) => {
    const matchSearch = item.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      item.company.toLowerCase().includes(search.toLowerCase());
    const matchFunnel = !filters.funnelStage || item.funnelStage === filters.funnelStage;
    const matchOutcome = !filters.outcome || item.outcome === filters.outcome;
    const matchDept = !filters.department || item.department === filters.department;
    return matchSearch && matchFunnel && matchOutcome && matchDept;
  });

  const totalVisits = filteredData.length;
  const totalDistance = filteredData.reduce((sum, item) => sum + item.distance, 0);
  const totalExpense = filteredData.reduce((sum, item) => sum + item.expense, 0);
  const avgDistance = totalVisits > 0 ? (totalDistance / totalVisits).toFixed(1) : 0;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const getFunnelStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      "Discovery": "bg-blue-100 text-blue-700",
      "Demo Conducted": "bg-purple-100 text-purple-700",
      "Proposal Shared": "bg-yellow-100 text-yellow-700",
      "Negotiation": "bg-orange-100 text-orange-700",
    };
    return colors[stage] || "bg-gray-100 text-gray-700";
  };

  const getOutcomeColor = (outcome: string) => {
    const colors: Record<string, string> = {
      "Lead Generated": "bg-green-100 text-green-700",
      "Proposal Opportunity": "bg-emerald-100 text-emerald-700",
      "Interested": "bg-cyan-100 text-cyan-700",
      "Contract Pending": "bg-yellow-100 text-yellow-700",
      "Follow-up Required": "bg-orange-100 text-orange-700",
    };
    return colors[outcome] || "bg-gray-100 text-gray-700";
  };

  const handleEdit = (id: number) => {
    alert(`Edit record ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Delete this record?")) {
      setData(data.filter(item => item.id !== id));
    }
  };

  const handleExport = () => {
    const csvData = filteredData.map(item => ({
      Date: item.visitDate,
      Employee: item.employeeName,
      Company: item.company,
      Organisation: item.organisation,
      Department: item.department,
      Purpose: item.purpose,
      Stage: item.funnelStage,
      Outcome: item.outcome,
      Distance: item.distance,
      Expense: item.expense,
    }));
    
    const headers = Object.keys(csvData[0]);
    const csv = [
      headers.join(","),
      ...csvData.map(row => headers.map(h => row[h as keyof typeof row]).join(","))
    ].join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `visit-report-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setFilters({ funnelStage: "", outcome: "", department: "" });
    setCurrentPage(1);
  };

  const uniqueValues = {
    funnelStages: [...new Set(data.map(d => d.funnelStage))],
    outcomes: [...new Set(data.map(d => d.outcome))],
    departments: [...new Set(data.map(d => d.department))],
  };

  const hasActiveFilters = filters.funnelStage || filters.outcome || filters.department;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Employee Visit Report
            </h1>
            <p className="text-gray-500 text-sm sm:text-base mt-1">Track and manage field visits efficiently</p>
          </div>
        </div>

        {/* Stats Cards */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
  {/* Total Visits Card */}
  <div className="relative group bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gradient-to-br from-blue-500 to-blue-600 p-2 sm:p-2.5 rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
      <Briefcase size={18} className="sm:w-5 sm:h-5 text-white" />
    </div>
    <div className="space-y-1">
      <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">Total Visits</p>
      <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
        {totalVisits}
      </p>
      <p className="text-xs text-gray-400">+12% from last month</p>
    </div>
  </div>

  {/* Total Distance Card */}
  <div className="relative group bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gradient-to-br from-green-500 to-green-600 p-2 sm:p-2.5 rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
      <MapPin size={18} className="sm:w-5 sm:h-5 text-white" />
    </div>
    <div className="space-y-1">
      <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">Total Distance</p>
      <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
        {totalDistance} <span className="text-xs sm:text-sm font-normal text-gray-500">KM</span>
      </p>
      <p className="text-xs text-gray-400">Covered across all visits</p>
    </div>
  </div>

  {/* Total Expense Card */}
  <div className="relative group bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gradient-to-br from-orange-500 to-orange-600 p-2 sm:p-2.5 rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
      <DollarSign size={18} className="sm:w-5 sm:h-5 text-white" />
    </div>
    <div className="space-y-1">
      <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">Total Expense</p>
      <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
        ₹{totalExpense}
      </p>
      <p className="text-xs text-gray-400">Total reimbursable amount</p>
    </div>
  </div>

  {/* Average Distance Card */}
  <div className="relative group bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gradient-to-br from-purple-500 to-purple-600 p-2 sm:p-2.5 rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
      <TrendingUp size={18} className="sm:w-5 sm:h-5 text-white" />
    </div>
    <div className="space-y-1">
      <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">Avg. Distance</p>
      <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
        {avgDistance} <span className="text-xs sm:text-sm font-normal text-gray-500">KM</span>
      </p>
      <p className="text-xs text-gray-400">Per visit average</p>
    </div>
  </div>
</div>

        {/* Search and Action Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by employee or company..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center gap-2 px-3 sm:px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 transition-all shadow-md font-medium text-sm sm:text-base"
              >
                <Filter size={16} className="sm:w-4 sm:h-4" />
                <span>Filter</span>
                {hasActiveFilters && <span className="ml-1 text-xs">✓</span>}
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-3 sm:px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 transition-all shadow-md font-medium text-sm sm:text-base"
              >
                <Download size={16} className="sm:w-4 sm:h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilter && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Funnel Stage</label>
                  <select
                    value={filters.funnelStage}
                    onChange={(e) => setFilters({...filters, funnelStage: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="">All</option>
                    {uniqueValues.funnelStages.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Outcome</label>
                  <select
                    value={filters.outcome}
                    onChange={(e) => setFilters({...filters, outcome: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="">All</option>
                    {uniqueValues.outcomes.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Department</label>
                  <select
                    value={filters.department}
                    onChange={(e) => setFilters({...filters, department: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="">All</option>
                    {uniqueValues.departments.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-600 whitespace-nowrap">Visit Date</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-600 whitespace-nowrap">Employee Name</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-600 whitespace-nowrap">Company</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-600 whitespace-nowrap hidden md:table-cell">Organisation</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-600 whitespace-nowrap hidden lg:table-cell">Department</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-600 whitespace-nowrap hidden lg:table-cell">Purpose</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-600 whitespace-nowrap">Funnel Stage</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-600 whitespace-nowrap">Outcome</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-600 whitespace-nowrap hidden sm:table-cell">Distance</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-600 whitespace-nowrap hidden sm:table-cell">Expense</th>
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-600 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">{item.visitDate}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 font-medium whitespace-nowrap">{item.employeeName}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">{item.company}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap hidden md:table-cell">{item.organisation}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap hidden lg:table-cell">{item.department}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap hidden lg:table-cell">{item.purpose}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${getFunnelStageColor(item.funnelStage)} whitespace-nowrap`}>
                        {item.funnelStage}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${getOutcomeColor(item.outcome)} whitespace-nowrap`}>
                        {item.outcome}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap hidden sm:table-cell">{item.distance} km</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 font-medium whitespace-nowrap hidden sm:table-cell">₹{item.expense}</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                      <div className="flex gap-1 sm:gap-2">
                        <button onClick={() => handleEdit(item.id)} className="p-1 sm:p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                          <Edit size={14} className="sm:w-4 sm:h-4" />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-1 sm:p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors">
                          <Trash2 size={14} className="sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> 
          {filteredData.length === 0 && (
            <div className="text-center py-8 sm:py-12 text-gray-500 text-sm">No records found</div>
          )}
        </div>

        {/* Pagination */}
        {filteredData.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 mt-6">
            <p className="text-xs sm:text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length}
            </p>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p-1))} 
                disabled={currentPage === 1}
                className="p-1.5 sm:p-2 border rounded disabled:opacity-50 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft size={16} className="sm:w-4 sm:h-4" />
              </button>
              <span className="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm">Page {currentPage} of {totalPages}</span>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} 
                disabled={currentPage === totalPages}
                className="p-1.5 sm:p-2 border rounded disabled:opacity-50 hover:bg-gray-50 transition-colors"
              >
                <ChevronRight size={16} className="sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeVisitReport; 