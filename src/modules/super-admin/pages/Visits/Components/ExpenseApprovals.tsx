import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Eye,
  User,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertCircle,
  ChevronDown,
  MoreVertical,
  Download,
  RefreshCw,

} from "lucide-react";

type ApprovalStatus =
  | "Pending"
  | "Approved"
  | "Rejected"
  | "Correction Required";

interface ExpenseApproval {
  id: number;
  visitId: string;
  employee: string;
  vehicleType: string;
  distance: number;
  rate: number;
  totalExpense: number;
  approvalStatus: ApprovalStatus;
  submittedAt: string;
  approvedBy?: string;
  approvedAt?: string;
  approvalRemarks?: string;
}

const mockData: ExpenseApproval[] = [
  {
    id: 1,
    visitId: "VIS-101",
    employee: "Rahul Sharma",
    vehicleType: "Two Wheeler",
    distance: 25,
    rate: 4,
    totalExpense: 100,
    approvalStatus: "Pending",
    submittedAt: "2026-03-20"
  },
  {
    id: 2,
    visitId: "VIS-102",
    employee: "Ankit Jain",
    vehicleType: "Four Wheeler",
    distance: 40,
    rate: 10,
    totalExpense: 400,
    approvalStatus: "Approved",
    submittedAt: "2026-03-21",
    approvedBy: "Manager",
    approvedAt: "2026-03-22",
    
  },
  {
    id: 3,
    visitId: "VIS-103",
    employee: "Priya Verma",
    vehicleType: "Two Wheeler",
    distance: 30,
    rate: 4,
    totalExpense: 120,
    approvalStatus: "Rejected",
    submittedAt: "2026-03-19",
    approvedBy: "Manager",
    approvedAt: "2026-03-20",
   
  },
  {
    id: 4,
    visitId: "VIS-104",
    employee: "Amit Kumar",
    vehicleType: "Four Wheeler",
    distance: 55,
    rate: 10,
    totalExpense: 550,
    approvalStatus: "Correction Required",
    submittedAt: "2026-03-22",
    approvedBy: "Manager",
    approvedAt: "2026-03-23",
    
  }
];

const ExpenseApprovals: React.FC = () => {
  const [data, setData] = useState(mockData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedRow, setSelectedRow] = useState<ExpenseApproval | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showMenuForId, setShowMenuForId] = useState<number | null>(null);

  const stats = useMemo(() => {
    return {
      total: data.length,
      pending: data.filter(item => item.approvalStatus === "Pending").length,
      approved: data.filter(item => item.approvalStatus === "Approved").length,
      rejected: data.filter(item => item.approvalStatus === "Rejected").length,
      correctionRequired: data.filter(item => item.approvalStatus === "Correction Required").length,
      totalExpense: data.reduce((sum, item) => sum + item.totalExpense, 0)
    };
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return (
        item.employee.toLowerCase().includes(search.toLowerCase()) ||
        item.visitId.toLowerCase().includes(search.toLowerCase())
      ) &&
      (statusFilter === "" || item.approvalStatus === statusFilter);
    });
  }, [data, search, statusFilter]);

  const handleApprove = (id: number) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id
          ? { 
              ...item, 
              approvalStatus: "Approved", 
              approvedBy: "Manager",
              approvedAt: new Date().toISOString().split('T')[0],
            }
          : item
      )
    );
  };

  const handleReject = (id: number) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id
          ? { 
              ...item, 
              approvalStatus: "Rejected", 
              approvedBy: "Manager",
              approvedAt: new Date().toISOString().split('T')[0],
            }
          : item
      )
    );
  };

  const handleViewDetails = (row: ExpenseApproval) => {
    setSelectedRow(row);
    setShowDetailsModal(true);
    setShowMenuForId(null);
  };

  const handleMenuClick = (id: number) => {
    setShowMenuForId(showMenuForId === id ? null : id);
  };

  const handleEdit = (row: ExpenseApproval) => {
    alert(`Edit functionality for ${row.visitId} - Coming soon!`);
    setShowMenuForId(null);
  };

  const handlePrint = (row: ExpenseApproval) => {
    alert(`Print functionality for ${row.visitId} - Coming soon!`);
    setShowMenuForId(null);
  };

  const handleShare = (row: ExpenseApproval) => {
    alert(`Share functionality for ${row.visitId} - Coming soon!`);
    setShowMenuForId(null);
  };

  const getStatusColor = (status: ApprovalStatus) => {
    switch (status) {
      case "Approved":
        return "bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-200";
      case "Rejected":
        return "bg-gradient-to-r from-red-50 to-red-100 text-red-700 border-red-200";
      case "Pending":
        return "bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 border-yellow-200";
      case "Correction Required":
        return "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200";
      default:
        return "";
    }
  };

  const getStatusIcon = (status: ApprovalStatus) => {
    switch (status) {
      case "Approved":
        return <CheckCircle size={14} className="text-green-600" />;
      case "Rejected":
        return <XCircle size={14} className="text-red-600" />;
      case "Pending":
        return <AlertCircle size={14} className="text-yellow-600" />;
      case "Correction Required":
        return <RefreshCw size={14} className="text-blue-600" />;
      default:
        return null;
    }
  };

  // Simple Export to Excel function
  const exportToExcel = () => {
    // Get current filtered data
    const exportData = filteredData;
    
    // Prepare headers
    const headers = [
      'Visit ID',
      'Employee',
      'Vehicle Type',
      'Distance (KM)',
      'Rate (₹/KM)',
      'Total Expense (₹)',
      'Submitted Date',
      'Status',
      'Approved By',
      'Approved Date'
    ];

    // Prepare data rows
    const rows = exportData.map(item => [
      item.visitId,
      item.employee,
      item.vehicleType,
      item.distance,
      item.rate,
      item.totalExpense,
      item.submittedAt,
      item.approvalStatus,
      item.approvedBy || '-',
      item.approvedAt || '-'
    ]);

    // Create Excel content (CSV format with .xls extension)
    const excelContent = [
      headers.join('\t'),
      ...rows.map(row => row.join('\t'))
    ].join('\n');

    // Create and trigger download
    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const timestamp = new Date().toISOString().split('T')[0];
    
    link.setAttribute('href', url);
    link.setAttribute('download', `expense_approvals_${timestamp}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      
      {/* Page Header with Gradient */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Expense Approvals
            </h1>
            <p className="text-gray-500 mt-1">
              Review and manage employee travel expense claims
            </p>
          </div>
          
          {/* Simple Export Button */}
          <button 
            onClick={exportToExcel}
            className="px-4 py-2 bg-white border rounded-lg text-sm font-medium text-gray-600 hover:shadow-md transition-all flex items-center gap-2"
          >
            <Download size={16} />
            Export 
          </button>
        </div>
      </div>

      {/* Stats Cards */}
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow relative overflow-hidden">
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600"></div>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">Total Claims</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">{stats.total}</p>
      </div>
      <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
        <TrendingUp size={20} className="text-blue-600" />
      </div>
    </div>
  </div>

  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow relative overflow-hidden">
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600"></div>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">Pending</p>
        <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
      </div>
      <div className="h-10 w-10 bg-yellow-100 rounded-lg flex items-center justify-center">
        <AlertCircle size={20} className="text-yellow-600" />
      </div>
    </div>
  </div>

  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow relative overflow-hidden">
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 via-green-500 to-green-600"></div>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">Approved</p>
        <p className="text-2xl font-bold text-green-600 mt-1">{stats.approved}</p>
      </div>
      <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
        <CheckCircle size={20} className="text-green-600" />
      </div>
    </div>
  </div>

  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow relative overflow-hidden">
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-400 via-red-500 to-red-600"></div>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">Rejected</p>
        <p className="text-2xl font-bold text-red-600 mt-1">{stats.rejected}</p>
      </div>
      <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center">
        <XCircle size={20} className="text-red-600" />
      </div>
    </div>
  </div>

  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow relative overflow-hidden">
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 via-purple-500 to-purple-600"></div>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">Total Expense</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">₹{stats.totalExpense}</p>
      </div>
      <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
        <DollarSign size={20} className="text-purple-600" />
      </div>
    </div>
  </div>
</div>
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 flex-1">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  placeholder="Search by employee or visit ID..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="relative">
              <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Correction Required">Correction Required</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="text-sm text-gray-500">
            Showing {filteredData.length} of {data.length} claims
          </div>
        </div>
      </div>

      {/* Table View */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visit ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Distance
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rate
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Expense
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Approved By
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Approved Date
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-mono text-gray-900">{row.visitId}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <User size={14} className="text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{row.employee}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      
                      <span className="text-sm text-gray-600">{row.vehicleType}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      
                      <span className="text-sm text-gray-600">{row.distance} KM</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">₹{row.rate}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">₹{row.totalExpense}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{row.submittedAt}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(row.approvalStatus)}`}>
                      {getStatusIcon(row.approvalStatus)}
                      {row.approvalStatus}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {row.approvedBy ? (
                      <div className="text-sm text-gray-600">
                        <div className="font-medium">{row.approvedBy}</div>
                        {row.approvalRemarks && (
                          <div className="text-xs text-gray-400 mt-1">{row.approvalRemarks}</div>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {row.approvedAt ? (
                      <span className="text-sm text-gray-600">{row.approvedAt}</span>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-2 relative">
                      <button 
                        onClick={() => handleViewDetails(row)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" 
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      
                      {row.approvalStatus === "Pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(row.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <CheckCircle size={16} />
                          </button>

                          <button
                            onClick={() => handleReject(row.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Reject"
                          >
                            <XCircle size={16} />
                          </button>
                        </>
                      )}
                      
                      <div className="relative">
                        <button 
                          onClick={() => handleMenuClick(row.id)}
                          className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors" 
                          title="More Options"
                        >
                          <MoreVertical size={16} />
                        </button>
                        
                        {showMenuForId === row.id && (
                          <>
                            <div 
                              className="fixed inset-0 z-10"
                              onClick={() => setShowMenuForId(null)}
                            />
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                              <button
                                onClick={() => handleEdit(row)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handlePrint(row)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Print
                              </button>
                              <button
                                onClick={() => handleShare(row)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg"
                              >
                                Share
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={11} className="px-6 py-12 text-center">
                    <AlertCircle size={48} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">No expense approvals found</p>
                    <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filter criteria</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedRow && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowDetailsModal(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">Visit Details</h2>
                <p className="text-gray-500 mt-1">Complete information for {selectedRow.visitId}</p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Visit ID</label>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedRow.visitId}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Employee</label>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedRow.employee}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Vehicle Type</label>
                    <p className="text-sm text-gray-700 mt-1">{selectedRow.vehicleType}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Distance</label>
                    <p className="text-sm text-gray-700 mt-1">{selectedRow.distance} KM</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Rate per KM</label>
                    <p className="text-sm text-gray-700 mt-1">₹{selectedRow.rate}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Total Expense</label>
                    <p className="text-sm font-semibold text-gray-900 mt-1">₹{selectedRow.totalExpense}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Submitted Date</label>
                    <p className="text-sm text-gray-700 mt-1">{selectedRow.submittedAt}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase">Status</label>
                    <p className="text-sm mt-1">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedRow.approvalStatus)}`}>
                        {getStatusIcon(selectedRow.approvalStatus)}
                        {selectedRow.approvalStatus}
                      </span>
                    </p>
                  </div>
                  {selectedRow.approvedBy && (
                    <>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase">Approved By</label>
                        <p className="text-sm text-gray-700 mt-1">{selectedRow.approvedBy}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase">Approved Date</label>
                        <p className="text-sm text-gray-700 mt-1">{selectedRow.approvedAt}</p>
                      </div>
                    </>
                  )}
                  {selectedRow.approvalRemarks && (
                    <div className="col-span-2">
                      <label className="text-xs font-medium text-gray-500 uppercase">Remarks</label>
                      <p className="text-sm text-gray-700 mt-1">{selectedRow.approvalRemarks}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExpenseApprovals;