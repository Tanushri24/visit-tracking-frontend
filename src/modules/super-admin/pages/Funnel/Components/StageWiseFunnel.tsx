// src/modules/super-admin/pages/funnel-management/StageWiseFunnel.tsx

import React, { useState, useMemo, useCallback } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Clock,
  BarChart3,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Search,
  Filter,
  Download,
  RefreshCw,
  DollarSign,
  Percent,
  Activity
} from 'lucide-react';

// Types based on SRS document
interface FunnelStage {
  id: number;
  name: string;
  order: number;
  isActive: boolean;
  isClosedStage: boolean;
  isWonStage: boolean;
  isLostStage: boolean;
  color: string;
  bgColor: string;
}

interface Visit {
  id: number;
  visitId: string;
  visitDate: string;
  employeeName: string;
  employeeId: number;
  companyName: string;
  organisationName: string;
  departmentName: string;
  contactPerson: string;
  location: string;
  purposeOfVisit: string;
  currentStage: string;
  previousStage?: string;
  stageUpdatedDate: string;
  expectedBusinessValue: number;
  actualBusinessValue: number | null;
  probabilityPercentage: number;
  nextFollowUpDate: string;
  lastFollowUpDate: string;
  daysInStage: number;
  status: 'active' | 'stalled' | 'overdue';
  remarks: string;
  travelExpense: number;
  checkInTime: string;
  checkOutTime: string;
}

interface StageStatistics {
  stageName: string;
  stageOrder: number;
  totalVisits: number;
  totalValue: number;
  avgProbability: number;
  avgDaysInStage: number;
  conversionRate: number;
  conversionFromPrevious: number;
  stalled: number;
  overdue: number;
  wonValue?: number;
  lostValue?: number;
  visits: Visit[];
}

const StageWiseFunnel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedStages, setExpandedStages] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedStageDetails, setSelectedStageDetails] = useState<StageStatistics | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Funnel Stages Data from SRS
  const [funnelStages] = useState<FunnelStage[]>([
    { id: 1, name: 'Lead Identified', order: 1, isActive: true, isClosedStage: false, isWonStage: false, isLostStage: false, color: 'text-gray-900', bgColor: 'bg-purple-50' },
    { id: 2, name: 'Initial Visit Done', order: 2, isActive: true, isClosedStage: false, isWonStage: false, isLostStage: false, color: 'text-gray-900', bgColor: 'bg-blue-50' },
    { id: 3, name: 'Requirement Discussion', order: 3, isActive: true, isClosedStage: false, isWonStage: false, isLostStage: false, color: 'text-gray-900', bgColor: 'bg-indigo-50' },
    { id: 4, name: 'Proposal Shared', order: 4, isActive: true, isClosedStage: false, isWonStage: false, isLostStage: false, color: 'text-gray-900', bgColor: 'bg-cyan-50' },
    { id: 5, name: 'Demo Conducted', order: 5, isActive: true, isClosedStage: false, isWonStage: false, isLostStage: false, color: 'text-gray-900', bgColor: 'bg-teal-50' },
    { id: 6, name: 'Technical Discussion', order: 6, isActive: true, isClosedStage: false, isWonStage: false, isLostStage: false, color: 'text-gray-900', bgColor: 'bg-green-50' },
    { id: 7, name: 'Commercial Negotiation', order: 7, isActive: true, isClosedStage: false, isWonStage: false, isLostStage: false, color: 'text-gray-900', bgColor: 'bg-orange-50' },
    { id: 8, name: 'Follow-up', order: 8, isActive: true, isClosedStage: false, isWonStage: false, isLostStage: false, color: 'text-gray-900', bgColor: 'bg-yellow-50' },
    { id: 9, name: 'Order Expected', order: 9, isActive: true, isClosedStage: false, isWonStage: false, isLostStage: false, color: 'text-gray-900', bgColor: 'bg-amber-50' },
    { id: 10, name: 'Won', order: 10, isActive: true, isClosedStage: true, isWonStage: true, isLostStage: false, color: 'text-gray-900', bgColor: 'bg-emerald-50' },
    { id: 11, name: 'Lost', order: 11, isActive: true, isClosedStage: true, isWonStage: false, isLostStage: true, color: 'text-gray-900', bgColor: 'bg-red-50' },
    { id: 12, name: 'On Hold', order: 12, isActive: true, isClosedStage: false, isWonStage: false, isLostStage: false, color: 'text-gray-900', bgColor: 'bg-gray-50' },
  ]);

  // Mock Visits Data based on SRS
  const [visits] = useState<Visit[]>([
    {
      id: 1,
      visitId: 'VIS-2024-001',
      visitDate: '2024-03-15',
      employeeName: 'Rahul Sharma',
      employeeId: 1,
      companyName: 'MP Board',
      organisationName: 'Examination Wing',
      departmentName: 'Examination Department',
      contactPerson: 'Dr. S.K. Rao',
      location: 'Bhopal',
      purposeOfVisit: 'OMS Demo',
      currentStage: 'Demo Conducted',
      stageUpdatedDate: '2024-03-15',
      expectedBusinessValue: 1200000,
      actualBusinessValue: null,
      probabilityPercentage: 75,
      nextFollowUpDate: '2024-03-30',
      lastFollowUpDate: '2024-03-20',
      daysInStage: 5,
      status: 'active',
      remarks: 'Demo presented successfully',
      travelExpense: 350,
      checkInTime: '10:30 AM',
      checkOutTime: '12:45 PM'
    },
    {
      id: 2,
      visitId: 'VIS-2024-002',
      visitDate: '2024-03-10',
      employeeName: 'Priya Singh',
      employeeId: 2,
      companyName: 'ITI Limited',
      organisationName: 'IT Division',
      departmentName: 'IT Department',
      contactPerson: 'A.K. Singh',
      location: 'Rae Bareli',
      purposeOfVisit: 'Requirement Gathering',
      currentStage: 'Requirement Discussion',
      stageUpdatedDate: '2024-03-18',
      expectedBusinessValue: 2500000,
      actualBusinessValue: null,
      probabilityPercentage: 60,
      nextFollowUpDate: '2024-03-25',
      lastFollowUpDate: '2024-03-18',
      daysInStage: 12,
      status: 'active',
      remarks: 'Technical requirements documented',
      travelExpense: 480,
      checkInTime: '11:00 AM',
      checkOutTime: '01:30 PM'
    },
    {
      id: 3,
      visitId: 'VIS-2024-003',
      visitDate: '2024-03-05',
      employeeName: 'Amit Verma',
      employeeId: 3,
      companyName: 'Bhoj University',
      organisationName: 'Academic Wing',
      departmentName: 'Registrar Office',
      contactPerson: 'Prof. V.K. Shrivastava',
      location: 'Bhopal',
      purposeOfVisit: 'Proposal Discussion',
      currentStage: 'Proposal Shared',
      stageUpdatedDate: '2024-03-20',
      expectedBusinessValue: 5000000,
      actualBusinessValue: null,
      probabilityPercentage: 80,
      nextFollowUpDate: '2024-03-28',
      lastFollowUpDate: '2024-03-20',
      daysInStage: 10,
      status: 'overdue',
      remarks: 'Proposal submitted for review',
      travelExpense: 250,
      checkInTime: '02:00 PM',
      checkOutTime: '04:15 PM'
    },
    {
      id: 4,
      visitId: 'VIS-2024-004',
      visitDate: '2024-03-01',
      employeeName: 'Neha Kapoor',
      employeeId: 4,
      companyName: 'Tata Motors',
      organisationName: 'Manufacturing Division',
      departmentName: 'Production Department',
      contactPerson: 'Vikram Singh',
      location: 'Pune',
      purposeOfVisit: 'Initial Meeting',
      currentStage: 'Lead Identified',
      stageUpdatedDate: '2024-03-01',
      expectedBusinessValue: 8000000,
      actualBusinessValue: null,
      probabilityPercentage: 40,
      nextFollowUpDate: '2024-03-22',
      lastFollowUpDate: '2024-03-01',
      daysInStage: 29,
      status: 'stalled',
      remarks: 'Follow-up pending',
      travelExpense: 120,
      checkInTime: '03:30 PM',
      checkOutTime: '05:00 PM'
    },
    {
      id: 5,
      visitId: 'VIS-2024-005',
      visitDate: '2024-02-20',
      employeeName: 'Rahul Sharma',
      employeeId: 1,
      companyName: 'Reliance Industries',
      organisationName: 'Digital Division',
      departmentName: 'IT Department',
      contactPerson: 'Mukesh Mehta',
      location: 'Mumbai',
      purposeOfVisit: 'Negotiation',
      currentStage: 'Commercial Negotiation',
      stageUpdatedDate: '2024-03-15',
      expectedBusinessValue: 15000000,
      actualBusinessValue: null,
      probabilityPercentage: 50,
      nextFollowUpDate: '2024-03-22',
      lastFollowUpDate: '2024-03-15',
      daysInStage: 15,
      status: 'stalled',
      remarks: 'Price negotiation in progress',
      travelExpense: 850,
      checkInTime: '11:00 AM',
      checkOutTime: '03:00 PM'
    },
    {
      id: 6,
      visitId: 'VIS-2024-006',
      visitDate: '2024-02-25',
      employeeName: 'Priya Singh',
      employeeId: 2,
      companyName: 'Infosys',
      organisationName: 'Corporate Office',
      departmentName: 'Procurement',
      contactPerson: 'Rajesh Kumar',
      location: 'Bangalore',
      purposeOfVisit: 'Order Finalization',
      currentStage: 'Order Expected',
      stageUpdatedDate: '2024-03-10',
      expectedBusinessValue: 3500000,
      actualBusinessValue: null,
      probabilityPercentage: 90,
      nextFollowUpDate: '2024-03-25',
      lastFollowUpDate: '2024-03-10',
      daysInStage: 20,
      status: 'active',
      remarks: 'PO expected this week',
      travelExpense: 650,
      checkInTime: '10:00 AM',
      checkOutTime: '02:30 PM'
    },
    {
      id: 7,
      visitId: 'VIS-2024-007',
      visitDate: '2024-03-12',
      employeeName: 'Amit Verma',
      employeeId: 3,
      companyName: 'Wipro',
      organisationName: 'Technology Division',
      departmentName: 'Engineering',
      contactPerson: 'Sunil Gupta',
      location: 'Hyderabad',
      purposeOfVisit: 'Technical Discussion',
      currentStage: 'Technical Discussion',
      stageUpdatedDate: '2024-03-23',
      expectedBusinessValue: 4200000,
      actualBusinessValue: null,
      probabilityPercentage: 55,
      nextFollowUpDate: '2024-03-27',
      lastFollowUpDate: '2024-03-23',
      daysInStage: 7,
      status: 'overdue',
      remarks: 'Technical validation pending',
      travelExpense: 420,
      checkInTime: '01:00 PM',
      checkOutTime: '04:00 PM'
    },
    {
      id: 8,
      visitId: 'VIS-2024-008',
      visitDate: '2024-03-18',
      employeeName: 'Neha Kapoor',
      employeeId: 4,
      companyName: 'HCL Technologies',
      organisationName: 'Services Division',
      departmentName: 'Sales',
      contactPerson: 'Anjali Sharma',
      location: 'Noida',
      purposeOfVisit: 'Follow-up Meeting',
      currentStage: 'Follow-up',
      stageUpdatedDate: '2024-03-24',
      expectedBusinessValue: 2800000,
      actualBusinessValue: null,
      probabilityPercentage: 40,
      nextFollowUpDate: '2024-03-26',
      lastFollowUpDate: '2024-03-24',
      daysInStage: 6,
      status: 'active',
      remarks: 'Follow-up scheduled',
      travelExpense: 180,
      checkInTime: '02:30 PM',
      checkOutTime: '04:00 PM'
    }
  ]);

  // Refresh Data Function
  const refreshData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // Simulate API call to fetch latest data
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Increment refresh key to trigger re-renders
      setRefreshKey(prev => prev + 1);
      
      // Show success toast or notification (optional)
      console.log('Data refreshed successfully');
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Filter visits based on date range
  const filterVisitsByDate = useCallback((visits: Visit[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return visits.filter(visit => {
      const visitDate = new Date(visit.visitDate);
      visitDate.setHours(0, 0, 0, 0);

      if (dateRange === 'today') {
        return visitDate.getTime() === today.getTime();
      } else if (dateRange === 'week') {
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        return visitDate >= weekAgo;
      } else if (dateRange === 'month') {
        const monthAgo = new Date(today);
        monthAgo.setMonth(today.getMonth() - 1);
        return visitDate >= monthAgo;
      }
      return true;
    });
  }, [dateRange]);

  // Calculate Stage-wise Statistics
  const stageStatistics = useMemo(() => {
    const stats: StageStatistics[] = [];
    const activeStages = funnelStages.filter(s => s.isActive).sort((a, b) => a.order - b.order);
    const filteredVisits = filterVisitsByDate(visits);

    activeStages.forEach((stage, index) => {
      const stageVisits = filteredVisits.filter(v => v.currentStage === stage.name);
      const totalVisits = stageVisits.length;
      const totalValue = stageVisits.reduce((sum, v) => sum + v.expectedBusinessValue, 0);
      const avgProbability = totalVisits > 0 ? 
        Math.round(stageVisits.reduce((sum, v) => sum + v.probabilityPercentage, 0) / totalVisits) : 0;
      const avgDaysInStage = totalVisits > 0 ? 
        Math.round(stageVisits.reduce((sum, v) => sum + v.daysInStage, 0) / totalVisits) : 0;
      
      let conversionRate = 0;
      let conversionFromPrevious = 0;
      
      if (index > 0) {
        const prevStageVisits = filteredVisits.filter(v => v.currentStage === activeStages[index - 1].name);
        const prevStageCount = prevStageVisits.length;
        conversionFromPrevious = prevStageCount > 0 ? (totalVisits / prevStageCount) * 100 : 0;
      }
      
      const firstStageVisits = filteredVisits.filter(v => v.currentStage === activeStages[0].name);
      const firstStageCount = firstStageVisits.length;
      conversionRate = firstStageCount > 0 ? (totalVisits / firstStageCount) * 100 : 0;

      const stalled = stageVisits.filter(v => v.status === 'stalled').length;
      const overdue = stageVisits.filter(v => v.status === 'overdue').length;
      
      const wonValue = stage.name === 'Won' ? 
        stageVisits.reduce((sum, v) => sum + (v.actualBusinessValue || v.expectedBusinessValue), 0) : 0;
      const lostValue = stage.name === 'Lost' ? 
        stageVisits.reduce((sum, v) => sum + (v.actualBusinessValue || v.expectedBusinessValue), 0) : 0;

      stats.push({
        stageName: stage.name,
        stageOrder: stage.order,
        totalVisits,
        totalValue,
        avgProbability,
        avgDaysInStage,
        conversionRate,
        conversionFromPrevious,
        stalled,
        overdue,
        wonValue,
        lostValue,
        visits: stageVisits
      });
    });

    return stats;
  }, [visits, funnelStages, filterVisitsByDate, refreshKey]);

  // Filter statistics based on search and filters
  const filteredStatistics = useMemo(() => {
    let stats = stageStatistics;
    
    if (selectedStage !== 'all') {
      stats = stats.filter(s => s.stageName === selectedStage);
    }
    
    if (searchTerm) {
      stats = stats.filter(s => 
        s.stageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.visits.some(v => 
          v.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          v.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    if (selectedStatus !== 'all') {
      stats = stats.map(s => ({
        ...s,
        visits: s.visits.filter(v => v.status === selectedStatus),
        totalVisits: s.visits.filter(v => v.status === selectedStatus).length
      })).filter(s => s.totalVisits > 0);
    }
    
    return stats;
  }, [stageStatistics, selectedStage, searchTerm, selectedStatus]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStatistics.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStatistics.length / itemsPerPage);

  const toggleStageExpand = (stageName: string) => {
    const newExpanded = new Set(expandedStages);
    if (newExpanded.has(stageName)) {
      newExpanded.delete(stageName);
    } else {
      newExpanded.add(stageName);
    }
    setExpandedStages(newExpanded);
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'stalled': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'overdue': return <Clock className="w-4 h-4 text-orange-500" />;
      default: return null;
    }
  };

  const getStageColor = (stageName: string) => {
    const stage = funnelStages.find(s => s.name === stageName);
    return stage ? stage.color : 'text-gray-600';
  };

  const getStageBgColor = (stageName: string) => {
    const stage = funnelStages.find(s => s.name === stageName);
    return stage ? stage.bgColor : 'bg-gray-50';
  };

  // Calculate total pipeline value
  const totalPipelineValue = stageStatistics.reduce((sum, s) => sum + s.totalValue, 0);
  const totalWonValue = stageStatistics.find(s => s.stageName === 'Won')?.wonValue || 0;
  const totalLostValue = stageStatistics.find(s => s.stageName === 'Lost')?.lostValue || 0;

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedStage('all');
    setSelectedStatus('all');
    setDateRange('all');
    setCurrentPage(1);
  };

  const exportToCSV = () => {
    const headers = ['Stage', 'Visits', 'Pipeline Value', 'Avg Probability', 'Conversion Rate', 'Avg Days', 'Stalled', 'Overdue'];
    const csvData = filteredStatistics.map(s => [
      s.stageName,
      s.totalVisits,
      `₹${(s.totalValue / 100000).toFixed(1)}L`,
      `${s.avgProbability}%`,
      `${s.conversionRate.toFixed(1)}%`,
      `${s.avgDaysInStage} days`,
      s.stalled,
      s.overdue
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `funnel_stages_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const viewStageDetails = (stage: StageStatistics) => {
    setSelectedStageDetails(stage);
    setShowViewModal(true);
  };

  return (
    <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-5 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-6">
        <div className="p-1.5 sm:p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white shadow-lg">
          <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-800">Stage Wise Funnel</h1>
          <p className="text-[11px] sm:text-xs text-gray-500">Track business progress from lead identification to closure</p>
        </div>
      </div>

      {/* Enhanced KPI Cards - Compact Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-6">
        {/* Total Pipeline Value Card */}
        <div className="group bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
          <div className="p-2 sm:p-4">
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <div className="p-1 sm:p-1.5 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" />
              </div>
              <span className="text-[8px] sm:text-[10px] font-medium text-gray-400 bg-gray-50 px-1.5 sm:px-2 py-0.5 rounded-full">Pipeline</span>
            </div>
            <div className="space-y-0.5">
              <h3 className="text-base sm:text-xl md:text-2xl font-bold text-gray-800">₹{(totalPipelineValue / 100000).toFixed(1)}L</h3>
              <p className="text-[9px] sm:text-[10px] text-gray-500 flex items-center gap-1">
                <Activity className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                Total pipeline value
              </p>
            </div>
          </div>
          <div className="h-0.5 bg-gradient-to-r from-purple-500 to-purple-300 group-hover:h-0.5 transition-all"></div>
        </div>

        {/* Won Value Card */}
        <div className="group bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
          <div className="p-2 sm:p-4">
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <div className="p-1 sm:p-1.5 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
              </div>
              <span className="text-[8px] sm:text-[10px] font-medium text-gray-400 bg-gray-50 px-1.5 sm:px-2 py-0.5 rounded-full">Won</span>
            </div>
            <div className="space-y-0.5">
              <h3 className="text-base sm:text-xl md:text-2xl font-bold text-emerald-600">₹{(totalWonValue / 100000).toFixed(1)}L</h3>
              <p className="text-[9px] sm:text-[10px] text-gray-500 flex items-center gap-1">
                <TrendingUp className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                Closed won opportunities
              </p>
            </div>
          </div>
          <div className="h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-300 group-hover:h-0.5 transition-all"></div>
        </div>

        {/* Lost Value Card */}
        <div className="group bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
          <div className="p-2 sm:p-4">
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <div className="p-1 sm:p-1.5 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600" />
              </div>
              <span className="text-[8px] sm:text-[10px] font-medium text-gray-400 bg-gray-50 px-1.5 sm:px-2 py-0.5 rounded-full">Lost</span>
            </div>
            <div className="space-y-0.5">
              <h3 className="text-base sm:text-xl md:text-2xl font-bold text-red-600">₹{(totalLostValue / 100000).toFixed(1)}L</h3>
              <p className="text-[9px] sm:text-[10px] text-gray-500 flex items-center gap-1">
                <TrendingDown className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                Lost opportunities value
              </p>
            </div>
          </div>
          <div className="h-0.5 bg-gradient-to-r from-red-500 to-red-300 group-hover:h-0.5 transition-all"></div>
        </div>

        {/* Conversion Rate Card */}
        <div className="group bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
          <div className="p-2 sm:p-4">
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <div className="p-1 sm:p-1.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                <Percent className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
              </div>
              <span className="text-[8px] sm:text-[10px] font-medium text-gray-400 bg-gray-50 px-1.5 sm:px-2 py-0.5 rounded-full">Conversion</span>
            </div>
            <div className="space-y-0.5">
              <h3 className="text-base sm:text-xl md:text-2xl font-bold text-blue-600">
                {stageStatistics.find(s => s.stageName === 'Won')?.conversionRate.toFixed(1) || 0}%
              </h3>
              <p className="text-[9px] sm:text-[10px] text-gray-500 flex items-center gap-1">
                <Activity className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                Lead to won conversion
              </p>
            </div>
          </div>
          <div className="h-0.5 bg-gradient-to-r from-blue-500 to-blue-300 group-hover:h-0.5 transition-all"></div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="w-full md:w-96 relative">
            <input
              type="text"
              placeholder="Search stages, companies, employees..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex-1 md:flex-none px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <Filter size={18} />
              <span className="md:hidden lg:inline">Filters</span>
            </button>
            <button
              onClick={exportToCSV}
              className="flex-1 md:flex-none px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <Download size={18} />
              <span className="md:hidden lg:inline">Export</span>
            </button>
            <button
              onClick={refreshData}
              disabled={isRefreshing}
              className={`flex-1 md:flex-none px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 transition-all ${
                isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
              <span className="md:hidden lg:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Funnel Stage</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value)}
                >
                  <option value="all">All Stages</option>
                  {funnelStages.filter(s => s.isActive).map(stage => (
                    <option key={stage.id} value={stage.name}>{stage.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="stalled">Stalled</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value as any)}
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                </select>
              </div>
            </div>
            {(selectedStage !== 'all' || selectedStatus !== 'all' || dateRange !== 'all') && (
              <div className="mt-4">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2"
                >
                  <RefreshCw size={14} />
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Table View - Only Table View */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px] lg:min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Visits</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Pipeline Value</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Probability</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion Rate</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Days</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Stalled</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Overdue</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.map((stat, index) => (
                <React.Fragment key={stat.stageName}>
                  <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleStageExpand(stat.stageName)}>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {expandedStages.has(stat.stageName) ? 
                          <ChevronDown className="w-4 h-4 text-gray-400" /> : 
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        }
                        <div className={`w-2 h-2 rounded-full ${getStageBgColor(stat.stageName)}`}></div>
                        <span className={`text-sm font-medium ${getStageColor(stat.stageName)}`}>
                          {stat.stageName}
                        </span>
                        {stat.stageName === 'Won' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs">
                            <CheckCircle className="w-3 h-3" />
                            Closed
                          </span>
                        )}
                        {stat.stageName === 'Lost' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs">
                            <XCircle className="w-3 h-3" />
                            Closed
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm font-semibold text-gray-800">{stat.totalVisits}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-semibold text-green-600">₹{(stat.totalValue / 100000).toFixed(1)}L</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-sm">{stat.avgProbability}%</span>
                        <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: `${stat.avgProbability}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className={`text-sm font-medium ${stat.conversionRate >= 70 ? 'text-green-600' : stat.conversionRate >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {stat.conversionRate.toFixed(1)}%
                        </span>
                        {stat.conversionRate > 0 && (
                          stat.conversionRate >= 70 ? 
                            <TrendingUp className="w-3 h-3 text-green-500" /> : 
                            <TrendingDown className="w-3 h-3 text-red-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm text-gray-600">{stat.avgDaysInStage} days</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {stat.stalled > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                          <AlertCircle className="w-3 h-3" />
                          {stat.stalled}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">0</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {stat.overdue > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                          <Clock className="w-3 h-3" />
                          {stat.overdue}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">0</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          viewStageDetails(stat);
                        }}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded flex items-center gap-1"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                  {expandedStages.has(stat.stageName) && stat.visits.length > 0 && (
                    <tr className="bg-gray-50">
                      <td colSpan={10} className="px-4 py-3">
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">
                            Visits in {stat.stageName} ({stat.visits.length})
                          </h4>
                          <div className="space-y-2">
                            {stat.visits.map(visit => (
                              <div key={visit.id} className="bg-white rounded-lg p-3 border border-gray-200">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                  <div className="flex items-center gap-3 flex-wrap">
                                    <span className="text-xs font-mono text-gray-500">{visit.visitId}</span>
                                    <span className="text-sm font-medium text-gray-800">{visit.companyName}</span>
                                    <span className="text-xs text-gray-500">{visit.employeeName}</span>
                                    <span className="text-xs text-gray-400">{visit.location}</span>
                                  </div>
                                  <div className="flex items-center gap-3 flex-wrap">
                                    {getStatusIcon(visit.status)}
                                    <span className="text-sm font-semibold text-green-600">
                                      ₹{(visit.expectedBusinessValue / 100000).toFixed(1)}L
                                    </span>
                                    <span className="text-xs text-gray-500">{visit.probabilityPercentage}%</span>
                                    <span className="text-xs text-gray-400">{visit.daysInStage} days</span>
                                  </div>
                                </div>
                                {visit.nextFollowUpDate && (
                                  <div className="mt-2 text-xs text-gray-500">
                                    Next Follow-up: {visit.nextFollowUpDate}
                                  </div>
                                )}
                              </div>
                            ))}
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
        {filteredStatistics.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredStatistics.length)} of {filteredStatistics.length} stages
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-1"
              >
                Previous
              </button>
              <span className="px-4 py-1 bg-purple-600 text-white rounded-lg">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-1"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* View Details Modal */}
      {showViewModal && selectedStageDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">{selectedStageDetails.stageName} - Stage Details</h2>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedStageDetails(null);
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {/* Stage Statistics */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">Stage Statistics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Total Visits</p>
                      <p className="font-medium text-lg">{selectedStageDetails.totalVisits}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Pipeline Value</p>
                      <p className="font-medium text-lg text-green-600">₹{(selectedStageDetails.totalValue / 100000).toFixed(1)}L</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Average Probability</p>
                      <p className="font-medium text-lg">{selectedStageDetails.avgProbability}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Average Days in Stage</p>
                      <p className="font-medium text-lg">{selectedStageDetails.avgDaysInStage} days</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Conversion Rate</p>
                      <p className="font-medium text-lg">{selectedStageDetails.conversionRate.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Conversion from Previous</p>
                      <p className="font-medium text-lg">{selectedStageDetails.conversionFromPrevious.toFixed(1)}%</p>
                    </div>
                  </div>
                </div>

                {/* Status Breakdown */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">Status Breakdown</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <p className="text-sm text-gray-600">Active</p>
                      <p className="text-2xl font-bold text-green-600">
                        {selectedStageDetails.totalVisits - selectedStageDetails.stalled - selectedStageDetails.overdue}
                      </p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-3 text-center">
                      <p className="text-sm text-gray-600">Stalled</p>
                      <p className="text-2xl font-bold text-red-600">{selectedStageDetails.stalled}</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3 text-center">
                      <p className="text-sm text-gray-600">Overdue</p>
                      <p className="text-2xl font-bold text-orange-600">{selectedStageDetails.overdue}</p>
                    </div>
                  </div>
                </div>

                {/* Visits List */}
                <div>
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">Visits in this Stage</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {selectedStageDetails.visits.map(visit => (
                      <div key={visit.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-800">{visit.companyName}</p>
                            <p className="text-xs text-gray-500">{visit.visitId} | {visit.employeeName} | {visit.location}</p>
                          </div>
                          {getStatusIcon(visit.status)}
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                          <span className="text-sm font-semibold text-green-600">₹{(visit.expectedBusinessValue / 100000).toFixed(1)}L</span>
                          <span className="text-xs text-gray-500">{visit.probabilityPercentage}% probability</span>
                        </div>
                        {visit.nextFollowUpDate && (
                          <div className="mt-1 text-xs text-gray-400">
                            Next Follow-up: {visit.nextFollowUpDate}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedStageDetails(null);
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No Results Message */}
      {filteredStatistics.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No funnel data found matching your criteria.</p>
          <button onClick={resetFilters} className="mt-2 text-sm text-purple-600 hover:text-purple-700">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default StageWiseFunnel;