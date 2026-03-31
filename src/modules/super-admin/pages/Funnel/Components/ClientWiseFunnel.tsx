import React, { useState, useMemo } from "react";
import { 
  Eye, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  Users, 
  Building2, 
  DollarSign,
  TrendingUp,
  User,
  ChevronDown,
  ChevronRight
} from "lucide-react";

interface ClientFunnel {
  id: number;
  company: string;
  organisation: string;
  department: string;
  contactPerson: string;
  funnelStage: string;
  expectedValue: number;
  probability: number;
  lastVisit: string;
  nextFollowUp: string;
  employee: string;
  outcome: string;
  status: string;
}

const ClientWiseFunnel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const data: ClientFunnel[] = [
    {
      id: 1,
      company: "MP Board",
      organisation: "Examination Wing",
      department: "Examination Department",
      contactPerson: "Controller",
      funnelStage: "Demo Conducted",
      expectedValue: 1200000,
      probability: 70,
      lastVisit: "15 Mar 2026",
      nextFollowUp: "18 Mar 2026",
      employee: "Amit Sharma",
      outcome: "Proposal Opportunity",
      status: "Active",
    },
    {
      id: 2,
      company: "Bhoj University",
      organisation: "University Campus",
      department: "IT Department",
      contactPerson: "IT Officer",
      funnelStage: "Proposal Shared",
      expectedValue: 850000,
      probability: 60,
      lastVisit: "10 Mar 2026",
      nextFollowUp: "20 Mar 2026",
      employee: "Neha Singh",
      outcome: "Demo Scheduled",
      status: "Active",
    },
    {
      id: 3,
      company: "Reliance Industries",
      organisation: "Digital Division",
      department: "IT Department",
      contactPerson: "Mukesh Mehta",
      funnelStage: "Commercial Negotiation",
      expectedValue: 15000000,
      probability: 50,
      lastVisit: "20 Feb 2026",
      nextFollowUp: "25 Mar 2026",
      employee: "Rahul Sharma",
      outcome: "Negotiation",
      status: "Stalled",
    },
    {
      id: 4,
      company: "Infosys",
      organisation: "Corporate Office",
      department: "Procurement",
      contactPerson: "Rajesh Kumar",
      funnelStage: "Order Expected",
      expectedValue: 3500000,
      probability: 90,
      lastVisit: "25 Feb 2026",
      nextFollowUp: "28 Mar 2026",
      employee: "Priya Singh",
      outcome: "Order Received",
      status: "Active",
    },
    {
      id: 5,
      company: "Wipro",
      organisation: "Technology Division",
      department: "Engineering",
      contactPerson: "Sunil Gupta",
      funnelStage: "Technical Discussion",
      expectedValue: 4200000,
      probability: 55,
      lastVisit: "12 Mar 2026",
      nextFollowUp: "27 Mar 2026",
      employee: "Amit Verma",
      outcome: "Technical Discussion",
      status: "Overdue",
    },
  ];

  const filteredData = useMemo(() => {
    let filtered = [...data];
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.organisation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.employee.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const totalClients = data.length;
  const totalPipelineValue = data.reduce((sum, item) => sum + item.expectedValue, 0);
  const avgProbability = Math.round(data.reduce((sum, item) => sum + item.probability, 0) / data.length);
  const totalWonValue = data.reduce((sum, item) => {
    if (item.outcome === 'Order Received' || item.status === 'Won') {
      return sum + item.expectedValue;
    }
    return sum;
  }, 0);

  const toggleRowExpand = (id: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Active':
        return <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span>;
      case 'Stalled':
        return <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">Stalled</span>;
      case 'Overdue':
        return <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">Overdue</span>;
      default:
        return <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  const getStageBadge = (stage: string) => {
    const colors: Record<string, string> = {
      'Lead Identified': 'bg-purple-100 text-purple-700',
      'Initial Visit Done': 'bg-blue-100 text-blue-700',
      'Requirement Discussion': 'bg-indigo-100 text-indigo-700',
      'Proposal Shared': 'bg-cyan-100 text-cyan-700',
      'Demo Conducted': 'bg-teal-100 text-teal-700',
      'Technical Discussion': 'bg-green-100 text-green-700',
      'Commercial Negotiation': 'bg-orange-100 text-orange-700',
      'Order Expected': 'bg-amber-100 text-amber-700',
    };
    return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[stage] || 'bg-gray-100 text-gray-600'}`}>{stage}</span>;
  };

  const resetFilters = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  const exportToCSV = () => {
    const headers = ['Company', 'Organisation', 'Department', 'Contact Person', 'Stage', 'Expected Value', 'Probability', 'Last Visit', 'Next Follow-up', 'Employee', 'Outcome', 'Status'];
    const csvData = filteredData.map(item => [
      item.company,
      item.organisation,
      item.department,
      item.contactPerson,
      item.funnelStage,
      `₹${item.expectedValue.toLocaleString()}`,
      `${item.probability}%`,
      item.lastVisit,
      item.nextFollowUp,
      item.employee,
      item.outcome,
      item.status
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `client_funnel_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Users className="w-5 h-5 text-purple-600" />
          <h1 className="text-lg font-semibold text-gray-800">Client-wise Funnel</h1>
        </div>
        <p className="text-xs text-gray-500 ml-7">
          Track client progress across funnel stages, monitor pipeline value, and manage follow-ups
        </p>
      </div>

{/* Summary Cards - Simplified Design */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 mb-3">
  <div className="bg-white rounded-lg p-2 sm:p-3 border border-gray-100 shadow-sm hover:shadow-md transition-all">
    <div className="flex items-start justify-between mb-1 sm:mb-2">
      <div className="p-1 sm:p-1.5 bg-blue-50 rounded-md">
        <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600" />
      </div>
      <span className="text-[8px] sm:text-[10px] font-medium text-blue-600 bg-blue-50 px-1 sm:px-1.5 py-0.5 rounded-full">
        Total
      </span>
    </div>
    <h3 className="text-sm sm:text-base font-bold text-gray-800">{totalClients}</h3>
    <p className="text-[8px] sm:text-[10px] text-gray-500 mt-0.5">Total Clients</p>
    <div className="w-full h-0.5 sm:h-1 bg-blue-50 rounded-full mt-1 sm:mt-2 overflow-hidden">
      <div className="h-full bg-blue-500 rounded-full" style={{ width: '70%' }} />
    </div>
  </div>

  {/* Pipeline Value Card */}
  <div className="bg-white rounded-lg p-2 sm:p-3 border border-gray-100 shadow-sm hover:shadow-md transition-all">
    <div className="flex items-start justify-between mb-1 sm:mb-2">
      <div className="p-1 sm:p-1.5 bg-purple-50 rounded-md">
        <DollarSign className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-600" />
      </div>
      <span className="text-[8px] sm:text-[10px] font-medium text-purple-600 bg-purple-50 px-1 sm:px-1.5 py-0.5 rounded-full">
        Pipeline
      </span>
    </div>
    <h3 className="text-sm sm:text-base font-bold text-gray-800">₹{(totalPipelineValue / 100000).toFixed(1)}L</h3>
    <p className="text-[8px] sm:text-[10px] text-gray-500 mt-0.5">Pipeline Value</p>
    <div className="w-full h-0.5 sm:h-1 bg-purple-50 rounded-full mt-1 sm:mt-2 overflow-hidden">
      <div className="h-full bg-purple-500 rounded-full" style={{ width: '65%' }} />
    </div>
  </div>

  {/* Won Value Card */}
  <div className="bg-white rounded-lg p-2 sm:p-3 border border-gray-100 shadow-sm hover:shadow-md transition-all">
    <div className="flex items-start justify-between mb-1 sm:mb-2">
      <div className="p-1 sm:p-1.5 bg-green-50 rounded-md">
        <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-600" />
      </div>
      <span className="text-[8px] sm:text-[10px] font-medium text-green-600 bg-green-50 px-1 sm:px-1.5 py-0.5 rounded-full">
        Won
      </span>
    </div>
    <h3 className="text-sm sm:text-base font-bold text-green-600">₹{(totalWonValue / 100000).toFixed(1)}L</h3>
    <p className="text-[8px] sm:text-[10px] text-gray-500 mt-0.5">Won Value</p>
    <div className="w-full h-0.5 sm:h-1 bg-green-50 rounded-full mt-1 sm:mt-2 overflow-hidden">
      <div className="h-full bg-green-500 rounded-full" style={{ width: '45%' }} />
    </div>
  </div>

  {/* Avg Probability Card */}
  <div className="bg-white rounded-lg p-2 sm:p-3 border border-gray-100 shadow-sm hover:shadow-md transition-all">
    <div className="flex items-start justify-between mb-1 sm:mb-2">
      <div className="p-1 sm:p-1.5 bg-yellow-50 rounded-md">
        <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-600" />
      </div>
      <span className="text-[8px] sm:text-[10px] font-medium text-yellow-600 bg-yellow-50 px-1 sm:px-1.5 py-0.5 rounded-full">
        Avg
      </span>
    </div>
    <h3 className="text-sm sm:text-base font-bold text-yellow-600">{avgProbability}%</h3>
    <p className="text-[8px] sm:text-[10px] text-gray-500 mt-0.5">Success Probability</p>
    <div className="w-full h-0.5 sm:h-1 bg-yellow-50 rounded-full mt-1 sm:mt-2 overflow-hidden">
      <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${avgProbability}%` }} />
    </div>
  </div>
</div>
      {/* Action Bar */}
      <div className="bg-white rounded shadow-sm mb-4">
        <div className="p-2 flex flex-col sm:flex-row gap-2 items-center justify-between">
          <div className="w-full sm:w-64 relative">
            <input
              type="text"
              placeholder="Search client..."
              className="w-full pl-7 pr-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-1.5 top-1.5 text-gray-400" size={12} />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-2 py-1 text-xs border border-gray-200 rounded hover:bg-gray-50 flex items-center gap-1"
            >
              <Filter size={12} />
              Filter
            </button>
            <button
              onClick={exportToCSV}
              className="px-2 py-1 text-xs border border-gray-200 rounded hover:bg-gray-50 flex items-center gap-1"
            >
              <Download size={12} />
              Export
            </button>
            {searchTerm && (
              <button
                onClick={resetFilters}
                className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded flex items-center gap-1"
              >
                <RefreshCw size={10} />
                Clear
              </button>
            )}
          </div>
        </div>

        {showFilters && (
          <div className="p-2 border-t border-gray-200 bg-gray-50">
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-[10px] font-medium text-gray-700 mb-0.5">Status</label>
                <select className="w-full px-2 py-1 text-xs border border-gray-200 rounded">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Stalled</option>
                  <option>Overdue</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-[10px] font-medium text-gray-700 mb-0.5">Stage</label>
                <select className="w-full px-2 py-1 text-xs border border-gray-200 rounded">
                  <option>All Stages</option>
                  <option>Lead Identified</option>
                  <option>Demo Conducted</option>
                  <option>Proposal Shared</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Client Funnel Table */}
      <div className="bg-white rounded shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-xs">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-2 py-1.5 text-left text-[10px] font-medium text-gray-500">Client Details</th>
                <th className="px-2 py-1.5 text-center text-[10px] font-medium text-gray-500">Stage</th>
                <th className="px-2 py-1.5 text-right text-[10px] font-medium text-gray-500">Expected Value</th>
                <th className="px-2 py-1.5 text-center text-[10px] font-medium text-gray-500">Prob%</th>
                <th className="px-2 py-1.5 text-center text-[10px] font-medium text-gray-500">Last Visit</th>
                <th className="px-2 py-1.5 text-center text-[10px] font-medium text-gray-500">Next Follow-up</th>
                <th className="px-2 py-1.5 text-left text-[10px] font-medium text-gray-500">Employee</th>
                <th className="px-2 py-1.5 text-left text-[10px] font-medium text-gray-500">Outcome</th>
                <th className="px-2 py-1.5 text-center text-[10px] font-medium text-gray-500">Status</th>
                <th className="px-2 py-1.5 text-center text-[10px] font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentItems.map((item) => (
                <React.Fragment key={item.id}>
                  <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleRowExpand(item.id)}>
                    <td className="px-2 py-1.5">
                      <div className="flex items-center gap-1.5">
                        {expandedRows.has(item.id) ? 
                          <ChevronDown className="w-2.5 h-2.5 text-gray-400" /> : 
                          <ChevronRight className="w-2.5 h-2.5 text-gray-400" />
                        }
                        <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                          <Building2 className="w-2.5 h-2.5 text-purple-500" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 text-[10px]">{item.company}</div>
                          <div className="text-[8px] text-gray-400">{item.organisation}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-1.5 text-center">
                      {getStageBadge(item.funnelStage)}
                    </td>
                    <td className="px-2 py-1.5 text-right font-medium text-green-600">
                      ₹{(item.expectedValue / 100000).toFixed(1)}L
                    </td>
                    <td className="px-2 py-1.5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-[10px] font-medium">{item.probability}%</span>
                        <div className="w-10 h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: `${item.probability}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-1.5 text-center text-[10px] text-gray-600">{item.lastVisit}</td>
                    <td className="px-2 py-1.5 text-center text-[10px] text-orange-600 font-medium">{item.nextFollowUp}</td>
                    <td className="px-2 py-1.5 text-[10px] text-gray-600">{item.employee}</td>
                    <td className="px-2 py-1.5 text-[10px] text-gray-600">{item.outcome}</td>
                    <td className="px-2 py-1.5 text-center">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-2 py-1.5 text-center">
                      <button className="p-0.5 text-blue-500 hover:bg-blue-50 rounded" title="View Details">
                        <Eye size={12} />
                      </button>
                    </td>
                  </tr>
                  {expandedRows.has(item.id) && (
                    <tr className="bg-gray-50">
                      <td colSpan={10} className="px-2 py-1.5">
                        <div className="grid grid-cols-4 gap-2">
                          <div className="bg-white rounded p-1 border">
                            <p className="text-[8px] text-gray-500">Contact Person</p>
                            <div className="flex items-center gap-1 mt-0.5">
                              <User className="w-2.5 h-2.5 text-gray-400" />
                              <p className="text-[9px] font-medium text-gray-700">{item.contactPerson}</p>
                            </div>
                          </div>
                          <div className="bg-white rounded p-1 border">
                            <p className="text-[8px] text-gray-500">Department</p>
                            <p className="text-[9px] font-medium text-gray-700">{item.department}</p>
                          </div>
                          <div className="bg-white rounded p-1 border">
                            <p className="text-[8px] text-gray-500">Expected Value</p>
                            <p className="text-[9px] font-bold text-green-600">₹{item.expectedValue.toLocaleString()}</p>
                          </div>
                          <div className="bg-white rounded p-1 border">
                            <p className="text-[8px] text-gray-500">Probability</p>
                            <p className="text-[9px] font-bold text-purple-600">{item.probability}%</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredData.length > 0 && (
          <div className="px-2 py-1.5 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-1">
            <div className="text-[9px] text-gray-500">
              {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} clients
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-1.5 py-0.5 text-[9px] border rounded disabled:opacity-50 hover:bg-gray-50"
              >
                Prev
              </button>
              <span className="px-1.5 py-0.5 text-[9px] bg-purple-600 text-white rounded">
                {currentPage}/{totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-1.5 py-0.5 text-[9px] border rounded disabled:opacity-50 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* No Results Message */}
      {filteredData.length === 0 && (
        <div className="text-center py-8 bg-white rounded shadow-sm">
          <Users className="w-8 h-8 text-gray-300 mx-auto mb-1" />
          <p className="text-xs text-gray-500">No clients found</p>
          <button onClick={resetFilters} className="mt-1 text-[10px] text-purple-600">
            Clear search
          </button>
        </div>
      )}
    </div>
  );
};

export default ClientWiseFunnel;