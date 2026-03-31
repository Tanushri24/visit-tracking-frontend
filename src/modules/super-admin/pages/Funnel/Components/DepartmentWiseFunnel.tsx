import React, { useState, useMemo } from "react";
import { 
  Search, 
  Eye, 
  RefreshCcw, 
  Download, 
  Filter, 
  Users, 
  Building2, 
  DollarSign, 
  TrendingUp,
  ChevronDown,
  ChevronRight,
  Activity
} from "lucide-react";

type FunnelRecord = {
  id: number;
  company: string;
  organisation: string;
  department: string;
  contactPerson: string;
  employee: string;
  stage: string;
  outcome: string;
  expectedValue: number;
  probability: number;
  lastVisit: string;
  nextFollowUp: string;
  status: "Active" | "Won" | "Lost";
};

const DepartmentWiseFunnel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const data: FunnelRecord[] = [
    {
      id: 1,
      company: "MP Board",
      organisation: "Examination Wing",
      department: "Examination Department",
      contactPerson: "Controller",
      employee: "Amit Sharma",
      stage: "Demo Conducted",
      outcome: "Proposal Opportunity",
      expectedValue: 1200000,
      probability: 70,
      lastVisit: "15 Mar 2026",
      nextFollowUp: "18 Mar 2026",
      status: "Active"
    },
    {
      id: 2,
      company: "Bhoj University",
      organisation: "University Campus",
      department: "IT Department",
      contactPerson: "IT Officer",
      employee: "Neha Singh",
      stage: "Proposal Shared",
      outcome: "Demo Scheduled",
      expectedValue: 850000,
      probability: 60,
      lastVisit: "10 Mar 2026",
      nextFollowUp: "20 Mar 2026",
      status: "Active"
    },
    {
      id: 3,
      company: "Reliance Industries",
      organisation: "Digital Division",
      department: "IT Department",
      contactPerson: "Mukesh Mehta",
      employee: "Rahul Sharma",
      stage: "Commercial Negotiation",
      outcome: "Negotiation",
      expectedValue: 15000000,
      probability: 50,
      lastVisit: "20 Feb 2026",
      nextFollowUp: "25 Mar 2026",
      status: "Active"
    },
    {
      id: 4,
      company: "Infosys",
      organisation: "Corporate Office",
      department: "Procurement",
      contactPerson: "Rajesh Kumar",
      employee: "Priya Singh",
      stage: "Order Expected",
      outcome: "Order Received",
      expectedValue: 3500000,
      probability: 90,
      lastVisit: "25 Feb 2026",
      nextFollowUp: "28 Mar 2026",
      status: "Won"
    },
    {
      id: 5,
      company: "Wipro",
      organisation: "Technology Division",
      department: "Engineering",
      contactPerson: "Sunil Gupta",
      employee: "Amit Verma",
      stage: "Technical Discussion",
      outcome: "Technical Discussion",
      expectedValue: 4200000,
      probability: 55,
      lastVisit: "12 Mar 2026",
      nextFollowUp: "27 Mar 2026",
      status: "Active"
    }
  ];

  const filteredData = useMemo(() => {
    let filtered = [...data];
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.organisation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const totalDepartments = [...new Set(data.map(d => d.department))].length;
  const totalPipelineValue = data.reduce((sum, item) => sum + item.expectedValue, 0);
  const avgProbability = Math.round(data.reduce((sum, item) => sum + item.probability, 0) / data.length);
  const totalWonValue = data.reduce((sum, item) => {
    if (item.status === 'Won') return sum + item.expectedValue;
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
      case 'Won':
        return <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Won</span>;
      case 'Lost':
        return <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">Lost</span>;
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
    const headers = ['Company', 'Organisation', 'Department', 'Contact Person', 'Employee', 'Stage', 'Expected Value', 'Probability', 'Last Visit', 'Next Follow-up', 'Status'];
    const csvData = filteredData.map(item => [
      item.company,
      item.organisation,
      item.department,
      item.contactPerson,
      item.employee,
      item.stage,
      `₹${item.expectedValue.toLocaleString()}`,
      `${item.probability}%`,
      item.lastVisit,
      item.nextFollowUp,
      item.status
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `department_funnel_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Building2 className="w-5 h-5 text-purple-600" />
          <h1 className="text-xl font-bold text-gray-800">Department-wise Funnel</h1>
        </div>
        <p className="text-sm text-gray-500 ml-7">
          Track department performance across funnel stages, monitor pipeline value, and analyze conversion metrics
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <div className="bg-white rounded-lg p-3 border-l-4 border-blue-500 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <Users className="w-4 h-4 text-blue-500" />
            <span className="text-xs text-gray-400">Departments</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{totalDepartments}</p>
          <p className="text-xs text-gray-500">Active Departments</p>
        </div>

        <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <DollarSign className="w-4 h-4 text-purple-500" />
            <span className="text-xs text-gray-400">Pipeline</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">₹{(totalPipelineValue / 100000).toFixed(1)}L</p>
          <p className="text-xs text-gray-500">Total Pipeline Value</p>
        </div>

        <div className="bg-white rounded-lg p-3 border-l-4 border-green-500 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-xs text-gray-400">Won</span>
          </div>
          <p className="text-2xl font-bold text-green-600">₹{(totalWonValue / 100000).toFixed(1)}L</p>
          <p className="text-xs text-gray-500">Won Value</p>
        </div>

        <div className="bg-white rounded-lg p-3 border-l-4 border-yellow-500 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <Activity className="w-4 h-4 text-yellow-500" />
            <span className="text-xs text-gray-400">Avg Prob</span>
          </div>
          <p className="text-2xl font-bold text-yellow-600">{avgProbability}%</p>
          <p className="text-xs text-gray-500">Average Probability</p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-lg shadow-sm mb-4">
        <div className="p-3 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="w-full sm:w-80 relative">
            <input
              type="text"
              placeholder="Search by company or department..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-1"
            >
              <Filter size={14} />
              Filter
            </button>
            <button
              onClick={exportToCSV}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-1"
            >
              <Download size={14} />
              Export
            </button>
            <button
              onClick={resetFilters}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-1"
            >
              <RefreshCcw size={14} />
              Refresh
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Department</label>
                <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg">
                  <option>All Departments</option>
                  <option>Examination Department</option>
                  <option>IT Department</option>
                  <option>Procurement</option>
                  <option>Engineering</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Won</option>
                  <option>Lost</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Stage</label>
                <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg">
                  <option>All Stages</option>
                  <option>Lead Identified</option>
                  <option>Demo Conducted</option>
                  <option>Proposal Shared</option>
                  <option>Order Expected</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Department Funnel Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Company/Organisation</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Contact Person</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Stage</th>
                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">Expected Value</th>
                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Prob%</th>
                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Last Visit</th>
                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Next Follow-up</th>
                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentItems.map((item) => (
                <React.Fragment key={item.id}>
                  <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleRowExpand(item.id)}>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        {expandedRows.has(item.id) ? 
                          <ChevronDown className="w-4 h-4 text-gray-400" /> : 
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        }
                        <div>
                          <div className="font-medium text-gray-800 text-sm">{item.department}</div>
                          <div className="text-xs text-gray-400">{item.company}</div>
                        </div>
                      </div>
                      </td>
                    <td className="px-3 py-2">
                      <div>
                        <p className="text-sm text-gray-800">{item.organisation}</p>
                        <p className="text-xs text-gray-400">{item.company}</p>
                      </div>
                      </td>
                    <td className="px-3 py-2">
                      <p className="text-sm text-gray-800">{item.contactPerson}</p>
                      </td>
                    <td className="px-3 py-2">
                      <span className="text-sm text-gray-600">{item.employee}</span>
                      </td>
                    <td className="px-3 py-2 text-center">
                      {getStageBadge(item.stage)}
                      </td>
                    <td className="px-3 py-2 text-right font-semibold text-green-600">
                      ₹{(item.expectedValue / 100000).toFixed(1)}L
                      </td>
                    <td className="px-3 py-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-sm font-medium">{item.probability}%</span>
                        <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: `${item.probability}%` }}></div>
                        </div>
                      </div>
                      </td>
                    <td className="px-3 py-2 text-center text-sm text-gray-600">
                      {item.lastVisit}
                      </td>
                    <td className="px-3 py-2 text-center text-sm text-orange-600 font-medium">
                      {item.nextFollowUp}
                      </td>
                    <td className="px-3 py-2 text-center">
                      {getStatusBadge(item.status)}
                      </td>
                    <td className="px-3 py-2 text-center">
                      <button className="p-1 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                        <Eye size={16} />
                      </button>
                      </td>
                  </tr>
                  {expandedRows.has(item.id) && (
                    <tr className="bg-gray-50">
                      <td colSpan={11} className="px-3 py-3">
                        <div className="grid grid-cols-4 gap-3">
                          <div className="bg-white rounded-lg p-2 border">
                            <p className="text-xs text-gray-500">Outcome</p>
                            <p className="text-sm font-medium text-gray-700">{item.outcome}</p>
                          </div>
                          <div className="bg-white rounded-lg p-2 border">
                            <p className="text-xs text-gray-500">Expected Value</p>
                            <p className="text-sm font-bold text-green-600">₹{item.expectedValue.toLocaleString()}</p>
                          </div>
                          <div className="bg-white rounded-lg p-2 border">
                            <p className="text-xs text-gray-500">Probability</p>
                            <p className="text-sm font-bold text-purple-600">{item.probability}%</p>
                          </div>
                          <div className="bg-white rounded-lg p-2 border">
                            <p className="text-xs text-gray-500">Contact Person</p>
                            <p className="text-sm font-medium text-gray-700">{item.contactPerson}</p>
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
          <div className="px-4 py-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-sm text-gray-600">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} records
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="px-4 py-1 text-sm bg-purple-600 text-white rounded-lg">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* No Results Message */}
      {filteredData.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">No department records found</p>
          <button onClick={resetFilters} className="mt-2 text-sm text-purple-600 hover:text-purple-700">
            Clear search
          </button>
        </div>
      )}
    </div>
  );
};

export default DepartmentWiseFunnel;