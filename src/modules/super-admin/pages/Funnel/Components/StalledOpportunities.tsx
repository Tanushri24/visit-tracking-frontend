import React, { useState } from "react";
import { 
  AlertCircle, 
  ChevronDown,
  ChevronUp,
  Download,
  Filter,
  RefreshCw,
  Eye,
  Clock as ClockIcon,
  Search
} from "lucide-react";

interface StalledOpportunity {
  id: number;
  visitId: number;
  company: string;
  organisation: string;
  department: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  employee: string;
  currentStage: string;
  stageEnteredDate: string;
  daysInStage: number;
  expectedValue: number;
  probability: number;
  lastFollowUpDate: string;
  nextFollowUpDate: string;
  lastAction: string;
  reasonForStall: string;
  priority: "High" | "Medium" | "Low" | "Critical";
  status: "Active" | "Requires Attention" | "Critical";
  assignedTo: string;
  reminderSent: boolean;
}

const stalledData: StalledOpportunity[] = [
  {
    id: 1,
    visitId: 1001,
    company: "MP Board",
    organisation: "Examination Wing",
    department: "Examination Department",
    contactPerson: "Dr. Rajesh Kumar",
    contactEmail: "rajesh.kumar@mpboard.edu",
    contactPhone: "+91 98765 43210",
    employee: "Amit Sharma",
    currentStage: "Proposal Shared",
    stageEnteredDate: "2026-02-15",
    daysInStage: 41,
    expectedValue: 1200000,
    probability: 70,
    lastFollowUpDate: "2026-03-10",
    nextFollowUpDate: "2026-03-20",
    lastAction: "Sent proposal, waiting for response",
    reasonForStall: "Awaiting budget approval from finance department",
    priority: "High",
    status: "Requires Attention",
    assignedTo: "Amit Sharma",
    reminderSent: false
  },
  {
    id: 2,
    visitId: 1002,
    company: "Bhoj University",
    organisation: "University Campus",
    department: "IT Department",
    contactPerson: "Prof. Sunil Mehta",
    contactEmail: "sunil.mehta@bhojuniv.ac.in",
    contactPhone: "+91 87654 32109",
    employee: "Neha Singh",
    currentStage: "Technical Discussion",
    stageEnteredDate: "2026-02-20",
    daysInStage: 36,
    expectedValue: 850000,
    probability: 60,
    lastFollowUpDate: "2026-03-05",
    nextFollowUpDate: "2026-03-22",
    lastAction: "Technical discussion completed, awaiting IT committee review",
    reasonForStall: "Technical committee review delayed",
    priority: "Medium",
    status: "Active",
    assignedTo: "Neha Singh",
    reminderSent: true
  },
  {
    id: 3,
    visitId: 1003,
    company: "Reliance Industries",
    organisation: "Digital Division",
    department: "IT Department",
    contactPerson: "Mukesh Mehta",
    contactEmail: "mukesh.mehta@reliance.com",
    contactPhone: "+91 76543 21098",
    employee: "Rahul Sharma",
    currentStage: "Commercial Negotiation",
    stageEnteredDate: "2026-01-25",
    daysInStage: 62,
    expectedValue: 15000000,
    probability: 50,
    lastFollowUpDate: "2026-03-01",
    nextFollowUpDate: "2026-03-25",
    lastAction: "Price negotiation in progress",
    reasonForStall: "Budget constraints, renegotiating terms",
    priority: "Critical",
    status: "Critical",
    assignedTo: "Rahul Sharma",
    reminderSent: false
  },
  {
    id: 4,
    visitId: 1004,
    company: "Infosys",
    organisation: "Corporate Office",
    department: "Procurement",
    contactPerson: "Rajesh Kumar",
    contactEmail: "rajesh.kumar@infosys.com",
    contactPhone: "+91 65432 10987",
    employee: "Priya Singh",
    currentStage: "Order Expected",
    stageEnteredDate: "2026-02-28",
    daysInStage: 28,
    expectedValue: 3500000,
    probability: 90,
    lastFollowUpDate: "2026-03-12",
    nextFollowUpDate: "2026-03-28",
    lastAction: "PO expected this week",
    reasonForStall: "Vendor registration process pending",
    priority: "High",
    status: "Requires Attention",
    assignedTo: "Priya Singh",
    reminderSent: false
  },
  {
    id: 5,
    visitId: 1005,
    company: "Wipro",
    organisation: "Technology Division",
    department: "Engineering",
    contactPerson: "Sunil Gupta",
    contactEmail: "sunil.gupta@wipro.com",
    contactPhone: "+91 54321 09876",
    employee: "Amit Verma",
    currentStage: "Demo Conducted",
    stageEnteredDate: "2026-02-10",
    daysInStage: 46,
    expectedValue: 4200000,
    probability: 55,
    lastFollowUpDate: "2026-03-08",
    nextFollowUpDate: "2026-03-26",
    lastAction: "Demo completed, feedback awaited",
    reasonForStall: "Decision maker on leave",
    priority: "Medium",
    status: "Active",
    assignedTo: "Amit Verma",
    reminderSent: true
  }
];

const StalledOpportunities: React.FC = () => {
  const [sortField, setSortField] = useState<keyof StalledOpportunity | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [selectedStage, setSelectedStage] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSort = (field: keyof StalledOpportunity) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const getSortIcon = (field: keyof StalledOpportunity) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? 
      <ChevronUp className="w-3 h-3 inline ml-1" /> : 
      <ChevronDown className="w-3 h-3 inline ml-1" />;
  };

  const filteredData = stalledData
    .filter(item => 
      (selectedPriority === "all" || item.priority === selectedPriority) &&
      (selectedStage === "all" || item.currentStage === selectedStage) &&
      (selectedStatus === "all" || item.status === selectedStatus) &&
      (searchTerm === "" || 
        item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.employee.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      return 0;
    });

  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    return `₹${value.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getPriorityClass = (priority: string) => {
    switch(priority) {
      case 'Critical': return 'bg-red-100 text-red-700';
      case 'High': return 'bg-orange-100 text-orange-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  const getStatusClass = (status: string) => {
    switch(status) {
      case 'Critical': return 'bg-red-100 text-red-700';
      case 'Requires Attention': return 'bg-orange-100 text-orange-700';
      default: return 'bg-green-100 text-green-700';
    }
  };

  const getDaysClass = (days: number) => {
    if (days >= 60) return "bg-red-100 text-red-700";
    if (days >= 30) return "bg-orange-100 text-orange-700";
    return "bg-yellow-100 text-yellow-700";
  };

  const summaryStats = {
    totalStalled: stalledData.length,
    criticalCount: stalledData.filter(item => item.priority === "Critical").length,
    highPriorityCount: stalledData.filter(item => item.priority === "High").length,
    totalValue: stalledData.reduce((sum, item) => sum + item.expectedValue, 0),
    avgDaysStalled: Math.round(stalledData.reduce((sum, item) => sum + item.daysInStage, 0) / stalledData.length),
  };

  const handleExport = () => {
    const headers = ['Company', 'Contact Person', 'Employee', 'Stage', 'Days Stalled', 'Value', 'Probability', 'Next Follow-up', 'Reason', 'Priority', 'Status'];
    const csvData = filteredData.map(row => [
      row.company, row.contactPerson, row.employee, row.currentStage, row.daysInStage,
      row.expectedValue, row.probability, row.nextFollowUpDate, row.reasonForStall, row.priority, row.status
    ]);
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stalled_opportunities_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <h1 className="text-xl font-bold text-gray-800">Stalled Opportunities</h1>
          </div>
          <p className="text-sm text-gray-500 ml-7">Track and manage stalled opportunities</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
          <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-purple-500">
            <p className="text-xs text-gray-500">Total Stalled</p>
            <p className="text-2xl font-bold text-gray-800">{summaryStats.totalStalled}</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-purple-500">
            <p className="text-xs text-gray-500">Critical</p>
            <p className="text-2xl font-bold text-gray-800">{summaryStats.criticalCount}</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-purple-500">
            <p className="text-xs text-gray-500">High Priority</p>
            <p className="text-2xl font-bold text-gray-800">{summaryStats.highPriorityCount}</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-purple-500">
            <p className="text-xs text-gray-500">Pipeline Value</p>
            <p className="text-base font-bold text-gray-800">{formatCurrency(summaryStats.totalValue)}</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-purple-500">
            <p className="text-xs text-gray-500">Avg Days Stalled</p>
            <p className="text-2xl font-bold text-gray-800">{summaryStats.avgDaysStalled}</p>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1 sm:flex-none sm:w-80">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowFilters(!showFilters)} className="px-3 py-2 text-sm bg-white border rounded-lg hover:bg-gray-50 flex items-center gap-1">
              <Filter className="w-4 h-4" /> 
            </button>
            <button onClick={handleExport} className="px-3 py-2 text-sm bg-white border rounded-lg hover:bg-gray-50 flex items-center gap-1">
              <Download className="w-4 h-4" /> 
            </button>
            <button onClick={() => { setSortField(null); setSelectedPriority("all"); setSelectedStage("all"); setSelectedStatus("all"); setSearchTerm(""); }} className="px-3 py-2 text-sm bg-white border rounded-lg hover:bg-gray-50 flex items-center gap-1">
              <RefreshCw className="w-4 h-4" /> 
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <select value={selectedPriority} onChange={(e) => setSelectedPriority(e.target.value)} className="px-3 py-2 text-sm border rounded-lg">
                <option value="all">All Priorities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
              </select>
              <select value={selectedStage} onChange={(e) => setSelectedStage(e.target.value)} className="px-3 py-2 text-sm border rounded-lg">
                <option value="all">All Stages</option>
                {[...new Set(stalledData.map(item => item.currentStage))].map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
              <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="px-3 py-2 text-sm border rounded-lg">
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Requires Attention">Requires Attention</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left cursor-pointer hover:text-purple-600" onClick={() => handleSort("company")}>
                    Company {getSortIcon("company")}
                  </th>
                  <th className="px-3 py-3 text-left cursor-pointer" onClick={() => handleSort("contactPerson")}>
                    Contact {getSortIcon("contactPerson")}
                  </th>
                  <th className="px-3 py-3 text-center cursor-pointer" onClick={() => handleSort("currentStage")}>
                    Stage {getSortIcon("currentStage")}
                  </th>
                  <th className="px-3 py-3 text-center cursor-pointer" onClick={() => handleSort("daysInStage")}>
                    Days {getSortIcon("daysInStage")}
                  </th>
                  <th className="px-3 py-3 text-right cursor-pointer" onClick={() => handleSort("expectedValue")}>
                    Value {getSortIcon("expectedValue")}
                  </th>
                  <th className="px-2 py-3 text-center">Prob%</th>
                  <th className="px-3 py-3 text-center cursor-pointer" onClick={() => handleSort("nextFollowUpDate")}>
                    Next Follow-up {getSortIcon("nextFollowUpDate")}
                  </th>
                  <th className="px-2 py-3 text-center">Priority</th>
                  <th className="px-2 py-3 text-center">Status</th>
                  <th className="px-3 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-medium">{item.company}</p>
                      <p className="text-xs text-gray-500">{item.organisation}</p>
                    </td>
                    <td className="px-3 py-3">
                      <p className="text-sm">{item.contactPerson}</p>
                      <p className="text-xs text-gray-500">{item.employee}</p>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className="px-2 py-1 rounded text-xs bg-gray-100">{item.currentStage}</span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getDaysClass(item.daysInStage)}`}>
                        <ClockIcon className="w-3 h-3" /> {item.daysInStage}d
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right font-semibold text-green-600">
                      {formatCurrency(item.expectedValue)}
                    </td>
                    <td className="px-2 py-3 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-sm">{item.probability}%</span>
                        <div className="w-12 h-1 bg-gray-200 rounded-full mt-1">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: `${item.probability}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <div>
                        <p className="text-sm text-orange-600">{formatDate(item.nextFollowUpDate)}</p>
                        <p className="text-xs text-gray-400">Last: {formatDate(item.lastFollowUpDate)}</p>
                      </div>
                    </td>
                    <td className="px-2 py-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityClass(item.priority)}`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="px-2 py-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusClass(item.status)}`}>
                        {item.status === "Requires Attention" ? "Attention" : item.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1 text-purple-500 hover:bg-purple-50 rounded" title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 bg-gray-50 border-t text-xs text-gray-500 text-center">
            Showing {filteredData.length} of {stalledData.length} stalled opportunities
          </div>
        </div>
      </div>
    </div>
  );
};

export default StalledOpportunities;