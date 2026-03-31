// src/modules/super-admin/pages/Funnel/Components/EmployeeWiseFunnel.tsx

import React, { useState, useMemo } from "react";
import { 
  Users, 
  TrendingUp, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  ChevronDown, 
  ChevronRight,
  Percent,
  Eye,
  DollarSign,
  Activity,
} from "lucide-react";

interface EmployeeData {
  employee: string;
  employeeCode: string;
  designation: string;
  department: string;
  visits: number;
  leads: number;
  proposal: number;
  demo: number;
  negotiation: number;
  orderExpected: number;
  won: number;
  lost: number;
  pipelineValue: string;
  pipelineValueNum: number;
  wonValue: string;
  wonValueNum: number;
  conversionRate: number;
  avgProbability: number;
  stalledOpportunities: number;
  overdueFollowups: number;
}

const EmployeeWiseFunnel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [expandedEmployees, setExpandedEmployees] = useState<Set<number>>(new Set());
  const [sortBy, setSortBy] = useState<'visits' | 'pipelineValueNum' | 'conversionRate' | 'wonValueNum'>('pipelineValueNum');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const [data] = useState<EmployeeData[]>([
    {
      employee: "Rahul Sharma",
      employeeCode: "EMP001",
      designation: "Senior Sales Executive",
      department: "Sales",
      visits: 25,
      leads: 10,
      proposal: 6,
      demo: 4,
      negotiation: 3,
      orderExpected: 2,
      won: 1,
      lost: 2,
      pipelineValue: "₹12,50,000",
      pipelineValueNum: 1250000,
      wonValue: "₹4,50,000",
      wonValueNum: 450000,
      conversionRate: 10,
      avgProbability: 65,
      stalledOpportunities: 1,
      overdueFollowups: 1
    },
    {
      employee: "Ankit Verma",
      employeeCode: "EMP002",
      designation: "Business Development Executive",
      department: "Business Development",
      visits: 18,
      leads: 8,
      proposal: 5,
      demo: 3,
      negotiation: 2,
      orderExpected: 1,
      won: 1,
      lost: 1,
      pipelineValue: "₹8,40,000",
      pipelineValueNum: 840000,
      wonValue: "₹2,20,000",
      wonValueNum: 220000,
      conversionRate: 12.5,
      avgProbability: 58,
      stalledOpportunities: 0,
      overdueFollowups: 1
    },
    {
      employee: "Priya Singh",
      employeeCode: "EMP003",
      designation: "Sales Manager",
      department: "Sales",
      visits: 32,
      leads: 15,
      proposal: 10,
      demo: 8,
      negotiation: 6,
      orderExpected: 4,
      won: 3,
      lost: 2,
      pipelineValue: "₹28,50,000",
      pipelineValueNum: 2850000,
      wonValue: "₹12,80,000",
      wonValueNum: 1280000,
      conversionRate: 20,
      avgProbability: 72,
      stalledOpportunities: 0,
      overdueFollowups: 0
    },
    {
      employee: "Amit Kumar",
      employeeCode: "EMP004",
      designation: "Technical Consultant",
      department: "IT",
      visits: 22,
      leads: 9,
      proposal: 6,
      demo: 4,
      negotiation: 3,
      orderExpected: 2,
      won: 1,
      lost: 1,
      pipelineValue: "₹16,20,000",
      pipelineValueNum: 1620000,
      wonValue: "₹5,40,000",
      wonValueNum: 540000,
      conversionRate: 11.1,
      avgProbability: 62,
      stalledOpportunities: 1,
      overdueFollowups: 1
    },
    {
      employee: "Neha Kapoor",
      employeeCode: "EMP005",
      designation: "Marketing Executive",
      department: "Marketing",
      visits: 28,
      leads: 12,
      proposal: 8,
      demo: 6,
      negotiation: 4,
      orderExpected: 3,
      won: 2,
      lost: 1,
      pipelineValue: "₹22,30,000",
      pipelineValueNum: 2230000,
      wonValue: "₹8,90,000",
      wonValueNum: 890000,
      conversionRate: 16.7,
      avgProbability: 68,
      stalledOpportunities: 0,
      overdueFollowups: 0
    }
  ]);

  // Get unique departments for filter
  const departments = ['all', ...new Set(data.map(e => e.department))];

  // Filter and sort data
  const filteredData = useMemo(() => {
    let filtered = [...data];

    if (searchTerm) {
      filtered = filtered.filter(emp => 
        emp.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.employeeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.designation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(emp => emp.department === selectedDepartment);
    }

    // Sort data
    filtered.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  }, [data, searchTerm, selectedDepartment, sortBy, sortOrder]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Summary Statistics
  const totalVisits = data.reduce((sum, emp) => sum + emp.visits, 0);
  const totalPipelineValue = data.reduce((sum, emp) => sum + emp.pipelineValueNum, 0);
  const totalWonValue = data.reduce((sum, emp) => sum + emp.wonValueNum, 0);
  const avgConversionRate = (data.reduce((sum, emp) => sum + emp.conversionRate, 0) / data.length).toFixed(1);

  const toggleEmployeeExpand = (index: number) => {
    const newExpanded = new Set(expandedEmployees);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedEmployees(newExpanded);
  };

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getPerformanceBadge = (conversionRate: number) => {
    if (conversionRate >= 15) {
      return <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs">High</span>;
    } else if (conversionRate >= 10) {
      return <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs">Medium</span>;
    } else {
      return <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">Low</span>;
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedDepartment('all');
    setCurrentPage(1);
  };

  const exportToCSV = () => {
    const headers = ['Employee Code', 'Employee Name', 'Designation', 'Department', 'Total Visits', 'Leads', 'Proposal', 'Demo', 'Negotiation', 'Order Expected', 'Won', 'Lost', 'Pipeline Value', 'Won Value', 'Conversion Rate'];
    const csvData = filteredData.map(emp => [
      emp.employeeCode,
      emp.employee,
      emp.designation,
      emp.department,
      emp.visits,
      emp.leads,
      emp.proposal,
      emp.demo,
      emp.negotiation,
      emp.orderExpected,
      emp.won,
      emp.lost,
      emp.pipelineValue,
      emp.wonValue,
      `${emp.conversionRate}%`
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `employee_funnel_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
   <div className="p-4 bg-gray-50 min-h-screen">
  {/* Header */}
  <div className="mb-4">
    <div className="flex items-center gap-2 mb-1">
      <Users className="w-5 h-5 text-purple-600" />
      <h1 className="text-lg font-semibold text-gray-800">Employee-wise Funnel</h1>
    </div>
    <p className="text-xs text-gray-500 ml-7">
      Track employee performance across funnel stages
    </p>
  </div>

      {/* Summary Cards - Simplified with full border color */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
  {/* Total Visits Card */}
  <div className="group bg-white rounded shadow-sm hover:shadow-md transition-all duration-200 border-l-4 border-blue-500 px-2 py-1.5 overflow-hidden">
    <div className="flex items-center justify-between mb-1">
      <span className="text-[10px] text-gray-400">Total</span>
      <div className="p-0.5 bg-blue-50 rounded group-hover:bg-blue-100 transition-colors">
        <Activity className="w-3.5 h-3.5 text-blue-500" />
      </div>
    </div>
    <div>
      <p className="text-base font-bold text-gray-800">{totalVisits}</p>
      <p className="text-[10px] text-gray-500">Visits</p>
    </div>
  </div>

  {/* Pipeline Value Card */}
  <div className="group bg-white rounded shadow-sm hover:shadow-md transition-all duration-200 border-l-4 border-purple-500 px-2 py-1.5 overflow-hidden">
    <div className="flex items-center justify-between mb-1">
      <span className="text-[10px] text-gray-400">Pipeline</span>
      <div className="p-0.5 bg-purple-50 rounded group-hover:bg-purple-100 transition-colors">
        <DollarSign className="w-3.5 h-3.5 text-purple-500" />
      </div>
    </div>
    <div>
      <p className="text-base font-bold text-gray-800">₹{(totalPipelineValue / 100000).toFixed(1)}L</p>
      <p className="text-[10px] text-gray-500">Value</p>
    </div>
  </div>

  {/* Won Value Card */}
  <div className="group bg-white rounded shadow-sm hover:shadow-md transition-all duration-200 border-l-4 border-emerald-500 px-2 py-1.5 overflow-hidden">
    <div className="flex items-center justify-between mb-1">
      <span className="text-[10px] text-gray-400">Won</span>
      <div className="p-0.5 bg-emerald-50 rounded group-hover:bg-emerald-100 transition-colors">
        <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
      </div>
    </div>
    <div>
      <p className="text-base font-bold text-emerald-600">₹{(totalWonValue / 100000).toFixed(1)}L</p>
      <p className="text-[10px] text-gray-500">Value</p>
    </div>
  </div>

  {/* Conversion Rate Card */}
  <div className="group bg-white rounded shadow-sm hover:shadow-md transition-all duration-200 border-l-4 border-yellow-500 px-2 py-1.5 overflow-hidden">
    <div className="flex items-center justify-between mb-1">
      <span className="text-[10px] text-gray-400">Conversion</span>
      <div className="p-0.5 bg-yellow-50 rounded group-hover:bg-yellow-100 transition-colors">
        <Percent className="w-3.5 h-3.5 text-yellow-500" />
      </div>
    </div>
    <div>
      <p className="text-base font-bold text-yellow-600">{avgConversionRate}%</p>
      <p className="text-[10px] text-gray-500">Rate</p>
    </div>
  </div>
</div>
      {/* Action Bar */}
      <div className="bg-white rounded-lg shadow-sm mb-4">
        <div className="p-3 flex flex-col sm:flex-row gap-2 items-center justify-between">
          <div className="w-full sm:w-64 relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-2 top-2 text-gray-400" size={14} />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-1"
            >
              <Filter size={14} />
              Filter
            </button>
            <button
              onClick={exportToCSV}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-1"
            >
              <Download size={14} />
              Export
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Department</label>
                <select
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept === 'all' ? 'All' : dept}</option>
                  ))}
                </select>
              </div>
              {(searchTerm || selectedDepartment !== 'all') && (
                <div className="flex items-end">
                  <button
                    onClick={resetFilters}
                    className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md flex items-center gap-1"
                  >
                    <RefreshCw size={12} />
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Employee Funnel Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Employee</th>
                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 cursor-pointer hover:text-gray-700" onClick={() => handleSort('visits')}>
                  Visits {sortBy === 'visits' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500">Leads</th>
                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500">Proposal</th>
                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500">Demo</th>
                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500">Won</th>
                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500">Lost</th>
                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 cursor-pointer hover:text-gray-700" onClick={() => handleSort('pipelineValueNum')}>
                  Pipeline {sortBy === 'pipelineValueNum' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Won Value</th>
                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 cursor-pointer hover:text-gray-700" onClick={() => handleSort('conversionRate')}>
                  Conversion % {sortBy === 'conversionRate' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentItems.map((emp, idx) => (
                <React.Fragment key={emp.employeeCode}>
                  <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleEmployeeExpand(idx)}>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        {expandedEmployees.has(idx) ? 
                          <ChevronDown className="w-3 h-3 text-gray-400" /> : 
                          <ChevronRight className="w-3 h-3 text-gray-400" />
                        }
                        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-xs font-semibold text-purple-600">{emp.employee.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 text-xs">{emp.employee}</div>
                          <div className="text-[10px] text-gray-400">{emp.employeeCode}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-center text-xs">{emp.visits}</td>
                    <td className="px-3 py-2 text-center text-xs">{emp.leads}</td>
                    <td className="px-3 py-2 text-center text-xs">{emp.proposal}</td>
                    <td className="px-3 py-2 text-center text-xs">{emp.demo}</td>
                    <td className="px-3 py-2 text-center text-xs text-emerald-600 font-medium">{emp.won}</td>
                    <td className="px-3 py-2 text-center text-xs text-red-500">{emp.lost}</td>
                    <td className="px-3 py-2 text-right text-xs font-medium text-green-600">{emp.pipelineValue}</td>
                    <td className="px-3 py-2 text-right text-xs text-emerald-600">{emp.wonValue}</td>
                    <td className="px-3 py-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className={`text-xs font-medium ${emp.conversionRate >= 15 ? 'text-emerald-600' : emp.conversionRate >= 10 ? 'text-yellow-600' : 'text-gray-500'}`}>
                          {emp.conversionRate}%
                        </span>
                        {getPerformanceBadge(emp.conversionRate)}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <button className="p-1 text-blue-500 hover:bg-blue-50 rounded" title="View Details">
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                  {expandedEmployees.has(idx) && (
                    <tr className="bg-gray-50">
                      <td colSpan={11} className="px-3 py-2">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          <div className="bg-white rounded p-2 border">
                            <p className="text-[10px] text-gray-500">Avg Probability</p>
                            <p className="text-xs font-semibold text-purple-600">{emp.avgProbability}%</p>
                          </div>
                          <div className="bg-white rounded p-2 border">
                            <p className="text-[10px] text-gray-500">Stalled</p>
                            <p className="text-xs font-semibold text-red-600">{emp.stalledOpportunities}</p>
                          </div>
                          <div className="bg-white rounded p-2 border">
                            <p className="text-[10px] text-gray-500">Overdue</p>
                            <p className="text-xs font-semibold text-orange-600">{emp.overdueFollowups}</p>
                          </div>
                          <div className="bg-white rounded p-2 border">
                            <p className="text-[10px] text-gray-500">Department</p>
                            <p className="text-xs font-medium text-gray-700">{emp.department}</p>
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
          <div className="px-3 py-2 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="text-[11px] text-gray-500">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length}
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 text-xs border rounded disabled:opacity-50 hover:bg-gray-50"
              >
                Prev
              </button>
              <span className="px-2 py-1 text-xs bg-purple-600 text-white rounded">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-2 py-1 text-xs border rounded disabled:opacity-50 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* No Results Message */}
      {filteredData.length === 0 && (
        <div className="text-center py-8 bg-white rounded-lg shadow-sm">
          <Users className="w-10 h-10 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-500">No data found</p>
          <button onClick={resetFilters} className="mt-2 text-xs text-purple-600">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeWiseFunnel;