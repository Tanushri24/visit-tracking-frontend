import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  Users, 
  ShoppingCart,
  Target,
  ChevronDown,
  ChevronUp,
  Download,
  Filter,
  RefreshCw,
  BarChart3,
  ChevronRight,
  Eye,
  Search
} from "lucide-react";

interface ConversionTracking {
  id: number;
  employee: string;
  totalVisits: number;
  leadsGenerated: number;
  proposalsCreated: number;
  demosConducted: number;
  ordersWon: number;
  visitToLead: number;
  leadToProposal: number;
  proposalToDemo: number;
  demoToOrder: number;
  overallClosure: number;
}

const conversionData: ConversionTracking[] = [
  {
    id: 1,
    employee: "Rahul Sharma",
    totalVisits: 60,
    leadsGenerated: 25,
    proposalsCreated: 12,
    demosConducted: 8,
    ordersWon: 4,
    visitToLead: 41,
    leadToProposal: 48,
    proposalToDemo: 66,
    demoToOrder: 50,
    overallClosure: 6,
  },
  {
    id: 2,
    employee: "Priya Singh",
    totalVisits: 45,
    leadsGenerated: 20,
    proposalsCreated: 10,
    demosConducted: 6,
    ordersWon: 3,
    visitToLead: 44,
    leadToProposal: 50,
    proposalToDemo: 60,
    demoToOrder: 50,
    overallClosure: 7,
  },
];

const ConversionTrackingTable: React.FC = () => {
  const [sortField, setSortField] = useState<keyof ConversionTracking | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string>("all");
  const [mobileView, setMobileView] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [tabletView, setTabletView] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Check screen size for responsive design
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setMobileView(width < 768);
      setTabletView(width >= 768 && width < 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleSort = (field: keyof ConversionTracking) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const getSortIcon = (field: keyof ConversionTracking) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? 
      <ChevronUp className="w-3 h-3 inline ml-1" /> : 
      <ChevronDown className="w-3 h-3 inline ml-1" />;
  };

  // Apply search filter
  const searchFilteredData = [...conversionData].filter(item => 
    item.employee.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...searchFilteredData].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
    
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    return 0;
  });

  const filteredData = selectedEmployee === "all" 
    ? sortedData 
    : sortedData.filter(item => item.employee === selectedEmployee);

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 60) return "bg-green-500";
    if (percentage >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString();
  };

  // Calculate summary statistics
  const summaryStats = {
    totalVisits: conversionData.reduce((sum, row) => sum + row.totalVisits, 0),
    totalLeads: conversionData.reduce((sum, row) => sum + row.leadsGenerated, 0),
    totalOrders: conversionData.reduce((sum, row) => sum + row.ordersWon, 0),
    avgOverallClosure: Math.round(conversionData.reduce((sum, row) => sum + row.overallClosure, 0) / conversionData.length),
  };

  const handleExport = () => {
    const headers = ['Employee', 'Total Visits', 'Leads Generated', 'Proposals Created', 'Demos Conducted', 'Orders Won', 'Visit → Lead %', 'Lead → Proposal %', 'Proposal → Demo %', 'Demo → Order %', 'Overall Closure %'];
    const csvData = filteredData.map(row => [
      row.employee,
      row.totalVisits,
      row.leadsGenerated,
      row.proposalsCreated,
      row.demosConducted,
      row.ordersWon,
      row.visitToLead,
      row.leadToProposal,
      row.proposalToDemo,
      row.demoToOrder,
      row.overallClosure
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversion_tracking_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Mobile Card View Component
  const MobileCardView = () => (
    <div className="space-y-4 p-3">
      {filteredData.map((row) => (
        <div key={row.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div 
            className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setExpandedCard(expandedCard === row.id ? null : row.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-purple-600">
                    {row.employee.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{row.employee}</p>
                  <p className="text-xs text-gray-500">Overall: {row.overallClosure}%</p>
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${expandedCard === row.id ? 'rotate-90' : ''}`} />
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-gray-500 mb-1">Total Visits</p>
                <p className="font-semibold text-gray-800">{formatNumber(row.totalVisits)}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Leads Generated</p>
                <p className="font-semibold text-gray-800">{formatNumber(row.leadsGenerated)}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Proposals</p>
                <p className="font-semibold text-gray-800">{formatNumber(row.proposalsCreated)}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Demos</p>
                <p className="font-semibold text-gray-800">{formatNumber(row.demosConducted)}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Orders Won</p>
                <p className="font-semibold text-gray-800">{formatNumber(row.ordersWon)}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Closure Rate</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-emerald-500 text-white">
                    {row.overallClosure}%
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {expandedCard === row.id && (
            <div className="border-t border-gray-100 bg-gray-50 p-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-gray-500 mb-1">Visit → Lead</p>
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700">
                    {row.visitToLead}%
                  </span>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Lead → Proposal</p>
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-indigo-50 text-indigo-700">
                    {row.leadToProposal}%
                  </span>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Proposal → Demo</p>
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-50 text-purple-700">
                    {row.proposalToDemo}%
                  </span>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Demo → Order</p>
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-700">
                    {row.demoToOrder}%
                  </span>
                </div>
              </div>
              <div className="mt-3 pt-2">
                <div className="w-full">
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${getPerformanceColor(row.overallClosure)}`}
                      style={{ width: `${row.overallClosure}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  // Tablet Optimized Table View
  const TabletTableView = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
              onClick={() => handleSort("employee")}>
              <div className="flex items-center gap-1">
                Employee
                {getSortIcon("employee")}
              </div>
            </th>
            <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
              onClick={() => handleSort("totalVisits")}>
              <div className="flex items-center justify-center gap-1">
                Visits
                {getSortIcon("totalVisits")}
              </div>
            </th>
            <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
              onClick={() => handleSort("leadsGenerated")}>
              <div className="flex items-center justify-center gap-1">
                Leads
                {getSortIcon("leadsGenerated")}
              </div>
            </th>
            <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
              onClick={() => handleSort("ordersWon")}>
              <div className="flex items-center justify-center gap-1">
                Orders
                {getSortIcon("ordersWon")}
              </div>
            </th>
            <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              V→L
            </th>
            <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              L→P
            </th>
            <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              P→D
            </th>
            <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              D→O
            </th>
            <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
              onClick={() => handleSort("overallClosure")}>
              <div className="flex items-center justify-center gap-1">
                Overall
                {getSortIcon("overallClosure")}
              </div>
            </th>
          </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-purple-600">
                        {row.employee.charAt(0)}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-gray-800 truncate max-w-[100px]">
                      {row.employee}
                    </span>
                  </div>
                </td>
                <td className="px-2 py-2 text-center text-xs text-gray-700">
                  {formatNumber(row.totalVisits)}
                </td>
                <td className="px-2 py-2 text-center text-xs text-gray-700">
                  {formatNumber(row.leadsGenerated)}
                </td>
                <td className="px-2 py-2 text-center text-xs text-gray-700">
                  {formatNumber(row.ordersWon)}
                </td>
                <td className="px-2 py-2 text-center">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-700">
                    {row.visitToLead}%
                  </span>
                </td>
                <td className="px-2 py-2 text-center">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-indigo-50 text-indigo-700">
                    {row.leadToProposal}%
                  </span>
                </td>
                <td className="px-2 py-2 text-center">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-purple-50 text-purple-700">
                    {row.proposalToDemo}%
                  </span>
                </td>
                <td className="px-2 py-2 text-center">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-green-50 text-green-700">
                    {row.demoToOrder}%
                  </span>
                </td>
                <td className="px-2 py-2 text-center">
                  <div>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-white">
                      {row.overallClosure}%
                    </span>
                    <div className="mt-1 w-12 mx-auto">
                      <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${getPerformanceColor(row.overallClosure)}`}
                          style={{ width: `${row.overallClosure}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

    // Desktop Full Table View
    const DesktopTableView = () => (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort("employee")}>
                <div className="flex items-center gap-1">
                  Employee
                  {getSortIcon("employee")}
                </div>
              </th>
              <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort("totalVisits")}>
                <div className="flex items-center justify-center gap-1">
                  Total Visits
                  {getSortIcon("totalVisits")}
                </div>
              </th>
              <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort("leadsGenerated")}>
                <div className="flex items-center justify-center gap-1">
                  Leads Generated
                  {getSortIcon("leadsGenerated")}
                </div>
              </th>
              <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort("proposalsCreated")}>
                <div className="flex items-center justify-center gap-1">
                  Proposals Created
                  {getSortIcon("proposalsCreated")}
                </div>
              </th>
              <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort("demosConducted")}>
                <div className="flex items-center justify-center gap-1">
                  Demos Conducted
                  {getSortIcon("demosConducted")}
                </div>
              </th>
              <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort("ordersWon")}>
                <div className="flex items-center justify-center gap-1">
                  Orders Won
                  {getSortIcon("ordersWon")}
                </div>
              </th>
              <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Visit→Lead
              </th>
              <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lead→Prop
              </th>
              <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prop→Demo
              </th>
              <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Demo→Order
              </th>
              <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort("overallClosure")}>
                <div className="flex items-center justify-center gap-1">
                  Overall %
                  {getSortIcon("overallClosure")}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData.map((row) => (
              <tr 
                key={row.id} 
                className="hover:bg-gray-50 transition-colors"
                onMouseEnter={() => setHoveredRow(row.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-purple-600">
                        {row.employee.charAt(0)}
                      </span>
                    </div>
                    <span className="font-medium text-gray-800">{row.employee}</span>
                  </div>
                </td>
                <td className="px-3 py-3 text-center text-gray-700">
                  {formatNumber(row.totalVisits)}
                </td>
                <td className="px-3 py-3 text-center text-gray-700">
                  {formatNumber(row.leadsGenerated)}
                </td>
                <td className="px-3 py-3 text-center text-gray-700">
                  {formatNumber(row.proposalsCreated)}
                </td>
                <td className="px-3 py-3 text-center text-gray-700">
                  {formatNumber(row.demosConducted)}
                </td>
                <td className="px-3 py-3 text-center text-gray-700">
                  {formatNumber(row.ordersWon)}
                </td>
                <td className="px-2 py-3 text-center">
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700">
                    {row.visitToLead}%
                  </span>
                </td>
                <td className="px-2 py-3 text-center">
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-indigo-50 text-indigo-700">
                    {row.leadToProposal}%
                  </span>
                </td>
                <td className="px-2 py-3 text-center">
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-50 text-purple-700">
                    {row.proposalToDemo}%
                  </span>
                </td>
                <td className="px-2 py-3 text-center">
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-700">
                    {row.demoToOrder}%
                  </span>
                </td>
                <td className="px-3 py-3 text-center">
                  <div>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold bg-emerald-500 text-white">
                      {row.overallClosure}%
                    </span>
                    <div className="mt-1 w-16 mx-auto">
                      <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${getPerformanceColor(row.overallClosure)}`}
                          style={{ width: `${row.overallClosure}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

    return (
      <div className="bg-gray-50 min-h-screen p-3 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-purple-600 rounded-lg">
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-gray-800">Conversion Tracking</h1>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Monitor employee performance across the sales funnel
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
            <div className="bg-white rounded-lg shadow-sm p-2.5 sm:p-3 flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-blue-100 rounded">
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs text-gray-500 truncate">Total Visits</p>
                <p className="text-sm sm:text-base font-semibold text-gray-800">
                  {formatNumber(summaryStats.totalVisits)}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-2.5 sm:p-3 flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-green-100 rounded">
                <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs text-gray-500 truncate">Total Leads</p>
                <p className="text-sm sm:text-base font-semibold text-gray-800">
                  {formatNumber(summaryStats.totalLeads)}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-2.5 sm:p-3 flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-purple-100 rounded">
                <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs text-gray-500 truncate">Orders Won</p>
                <p className="text-sm sm:text-base font-semibold text-gray-800">
                  {formatNumber(summaryStats.totalOrders)}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-2.5 sm:p-3 flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-orange-100 rounded">
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs text-gray-500 truncate">Avg Closure</p>
                <p className="text-sm sm:text-base font-semibold text-gray-800">
                  {summaryStats.avgOverallClosure}%
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar and Action Buttons Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 sm:mb-6">
            {/* Search Bar - Left Side */}
            <div className="w-full sm:w-64 md:w-80">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by employee name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Search className="absolute left-2.5 top-2 sm:top-2.5 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
              </div>
            </div>

            {/* Action Buttons - Right Side */}
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex-1 sm:flex-none px-3 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-1 sm:gap-2"
              >
                <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Filter</span>
              </button>
              <button
                onClick={handleExport}
                className="flex-1 sm:flex-none px-3 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-1 sm:gap-2"
              >
                <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Export</span>
              </button>
              <button
                onClick={() => {
                  setSortField(null);
                  setSelectedEmployee("all");
                  setSearchTerm("");
                }}
                className="flex-1 sm:flex-none px-3 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-1 sm:gap-2"
              >
                <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-white rounded-lg shadow mb-4 sm:mb-6 p-3 sm:p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Employee
                  </label>
                  <select
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">All Employees</option>
                    {conversionData.map(emp => (
                      <option key={emp.id} value={emp.employee}>{emp.employee}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortField || ""}
                    onChange={(e) => handleSort(e.target.value as keyof ConversionTracking)}
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Default</option>
                    <option value="overallClosure">Overall Closure Rate</option>
                    <option value="totalVisits">Total Visits</option>
                    <option value="ordersWon">Orders Won</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Responsive Table View */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {filteredData.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No employees found matching "{searchTerm}"</p>
              </div>
            ) : (
              <>
                {mobileView ? (
                  <MobileCardView />
                ) : tabletView ? (
                  <TabletTableView />
                ) : (
                  <DesktopTableView />
                )}
              </>
            )}

            {/* Footer */}
            <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-xs text-gray-500">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500"></div>
                  <span>≥60%</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-500"></div>
                  <span>40-59%</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500"></div>
                  <span>&lt;40%</span>
                </div>
              </div>
              <div className="text-center">
                Showing {filteredData.length} of {searchFilteredData.length} employees
                {searchTerm && ` (filtered from ${conversionData.length})`}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default ConversionTrackingTable;