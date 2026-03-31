// src/modules/super-admin/pages/Visits/Components/AllVisits.tsx

import React, { useState, useMemo, useCallback } from 'react';
import { ClipboardList } from "lucide-react";
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit2,
  Calendar,
  MapPin,
  User,
  Building2,
  DollarSign,
  TrendingUp,
  X,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Car,
  FileText,
  Target,
  Percent,
  Upload,
  ClockIcon,
  PlusCircle
} from 'lucide-react';

interface Visit {
  id: number;
  visitId: string;
  visitDate: string;
  employeeName: string;
  companyName: string;
  organisationName: string;
  departmentName: string;
  contactPerson: string;
  location: string;
  purposeOfVisit: string;
  discussionSummary: string;
  nextAction: string;
  nextFollowUpDate: string;
  vehicleType: string;
  distanceKm: number;
  ratePerKm: number;
  totalExpense: number;
  funnelStage: string;
  outcomeType: string;
  expectedBusinessValue: number;
  actualBusinessValue: number | null;
  probabilityPercentage: number;
  remarks: string;
  attachment: string | null;
  checkInTime: string;
  checkOutTime: string;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
}

interface CreateVisitFormData {
  visitDate: string;
  employeeName: string;
  companyName: string;
  organisationName: string;
  departmentName: string;
  contactPerson: string;
  location: string;
  purposeOfVisit: string;
  discussionSummary: string;
  nextAction: string;
  nextFollowUpDate: string;
  vehicleType: string;
  distanceKm: number;
  ratePerKm: number;
  funnelStage: string;
  outcomeType: string;
  expectedBusinessValue: number;
  probabilityPercentage: number;
  remarks: string;
  checkInTime: string;
  checkOutTime: string;
}

// Constants
const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' }
];

const stageOptions = [
  { value: 'all', label: 'All Stages' },
  { value: 'Lead Identified', label: 'Lead Identified' },
  { value: 'Initial Visit Done', label: 'Initial Visit' },
  { value: 'Requirement Discussion', label: 'Requirement Discussion' },
  { value: 'Proposal Shared', label: 'Proposal Shared' },
  { value: 'Demo Conducted', label: 'Demo Conducted' },
  { value: 'Commercial Negotiation', label: 'Negotiation' },
  { value: 'Order Expected', label: 'Order Expected' },
  { value: 'Won', label: 'Won' },
  { value: 'Lost', label: 'Lost' }
];

const outcomeOptions = [
  { value: 'all', label: 'All Outcomes' },
  { value: 'Lead Generated', label: 'Lead Generated' },
  { value: 'Requirement Collected', label: 'Requirement Collected' },
  { value: 'Proposal Opportunity', label: 'Proposal Opportunity' },
  { value: 'Demo Completed', label: 'Demo Completed' },
  { value: 'Order Received', label: 'Order Received' },
  { value: 'No Outcome', label: 'No Outcome' }
];

const stageColors: Record<string, string> = {
  'Lead Identified': 'bg-purple-100 text-purple-700',
  'Initial Visit Done': 'bg-blue-100 text-blue-700',
  'Requirement Discussion': 'bg-indigo-100 text-indigo-700',
  'Proposal Shared': 'bg-cyan-100 text-cyan-700',
  'Demo Conducted': 'bg-teal-100 text-teal-700',
  'Commercial Negotiation': 'bg-orange-100 text-orange-700',
  'Order Expected': 'bg-yellow-100 text-yellow-700',
  'Won': 'bg-green-100 text-green-700',
  'Lost': 'bg-red-100 text-red-600'
};

const outcomeColors: Record<string, string> = {
  'Lead Generated': 'bg-purple-100 text-purple-700',
  'Requirement Collected': 'bg-blue-100 text-blue-700',
  'Proposal Opportunity': 'bg-green-100 text-green-700',
  'Demo Completed': 'bg-teal-100 text-teal-700',
  'Order Received': 'bg-emerald-100 text-emerald-700',
  'No Outcome': 'bg-gray-100 text-gray-600'
};

const getStatusBadgeClass = (status: string): string => {
  switch(status) {
    case 'active': return 'bg-blue-100 text-blue-700';
    case 'completed': return 'bg-green-100 text-green-700';
    case 'cancelled': return 'bg-red-100 text-red-600';
    default: return 'bg-gray-100 text-gray-600';
  }
};

const AllVisits: React.FC = () => {
  const [visits] = useState<Visit[]>([
    {
      id: 1,
      visitId: "VIS-2024-001",
      visitDate: "2024-03-15",
      employeeName: "Rahul Sharma",
      companyName: "MP Board",
      organisationName: "Examination Wing",
      departmentName: "Examination Department",
      contactPerson: "Dr. S.K. Rao",
      location: "Bhopal",
      purposeOfVisit: "OMS Demo",
      discussionSummary: "Demo of OMS system presented to examination team. They showed strong interest in the solution. Discussed integration with existing systems.",
      nextAction: "Share detailed proposal with pricing",
      nextFollowUpDate: "2024-03-30",
      vehicleType: "Four Wheeler",
      distanceKm: 35,
      ratePerKm: 10,
      totalExpense: 350,
      funnelStage: "Demo Conducted",
      outcomeType: "Proposal Opportunity",
      expectedBusinessValue: 1200000,
      actualBusinessValue: null,
      probabilityPercentage: 75,
      remarks: "Client requested additional features for the next meeting",
      attachment: "proposal_draft.pdf",
      checkInTime: "10:30 AM",
      checkOutTime: "12:45 PM",
      status: "active",
      createdAt: "2024-03-15T10:00:00"
    },
    {
      id: 2,
      visitId: "VIS-2024-002",
      visitDate: "2024-03-16",
      employeeName: "Priya Singh",
      companyName: "ITI Limited",
      organisationName: "IT Division",
      departmentName: "IT Department",
      contactPerson: "A.K. Singh",
      location: "Rae Bareli",
      purposeOfVisit: "Requirement Gathering",
      discussionSummary: "Discussed technical requirements for the new ERP system. Identified key modules needed.",
      nextAction: "Send technical specification document",
      nextFollowUpDate: "2024-03-25",
      vehicleType: "Four Wheeler",
      distanceKm: 48,
      ratePerKm: 10,
      totalExpense: 480,
      funnelStage: "Requirement Discussion",
      outcomeType: "Requirement Collected",
      expectedBusinessValue: 2500000,
      actualBusinessValue: null,
      probabilityPercentage: 60,
      remarks: "Technical team was very receptive",
      attachment: null,
      checkInTime: "11:00 AM",
      checkOutTime: "01:30 PM",
      status: "active",
      createdAt: "2024-03-16T09:30:00"
    },
    {
      id: 3,
      visitId: "VIS-2024-003",
      visitDate: "2024-03-10",
      employeeName: "Amit Verma",
      companyName: "Bhoj University",
      organisationName: "Academic Wing",
      departmentName: "Registrar Office",
      contactPerson: "Prof. V.K. Shrivastava",
      location: "Bhopal",
      purposeOfVisit: "Proposal Discussion",
      discussionSummary: "Submitted and discussed the university management system proposal. Got initial approval.",
      nextAction: "Follow-up on proposal approval",
      nextFollowUpDate: "2024-03-20",
      vehicleType: "Four Wheeler",
      distanceKm: 25,
      ratePerKm: 10,
      totalExpense: 250,
      funnelStage: "Proposal Shared",
      outcomeType: "Proposal Opportunity",
      expectedBusinessValue: 5000000,
      actualBusinessValue: null,
      probabilityPercentage: 80,
      remarks: "Proposal accepted for review by the committee",
      attachment: "university_proposal.pdf",
      checkInTime: "02:00 PM",
      checkOutTime: "04:15 PM",
      status: "completed",
      createdAt: "2024-03-10T13:00:00"
    },
    {
      id: 4,
      visitId: "VIS-2024-004",
      visitDate: "2024-03-05",
      employeeName: "Neha Kapoor",
      companyName: "Tata Motors",
      organisationName: "Manufacturing Division",
      departmentName: "Production Department",
      contactPerson: "Vikram Singh",
      location: "Pune",
      purposeOfVisit: "Initial Meeting",
      discussionSummary: "First meeting to understand manufacturing process automation needs.",
      nextAction: "Schedule demo with technical team",
      nextFollowUpDate: "2024-03-18",
      vehicleType: "Four Wheeler",
      distanceKm: 12,
      ratePerKm: 10,
      totalExpense: 120,
      funnelStage: "Lead Identified",
      outcomeType: "Lead Generated",
      expectedBusinessValue: 8000000,
      actualBusinessValue: null,
      probabilityPercentage: 40,
      remarks: "Good potential for automation project",
      attachment: null,
      checkInTime: "03:30 PM",
      checkOutTime: "05:00 PM",
      status: "completed",
      createdAt: "2024-03-05T14:00:00"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedOutcome, setSelectedOutcome] = useState<string>('all');
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createFormData, setCreateFormData] = useState<CreateVisitFormData>({
    visitDate: new Date().toISOString().split('T')[0],
    employeeName: '',
    companyName: '',
    organisationName: '',
    departmentName: '',
    contactPerson: '',
    location: '',
    purposeOfVisit: '',
    discussionSummary: '',
    nextAction: '',
    nextFollowUpDate: '',
    vehicleType: 'Four Wheeler',
    distanceKm: 0,
    ratePerKm: 10,
    funnelStage: 'Lead Identified',
    outcomeType: 'Lead Generated',
    expectedBusinessValue: 0,
    probabilityPercentage: 50,
    remarks: '',
    checkInTime: '09:00 AM',
    checkOutTime: '05:00 PM'
  });

  // Stats calculation
  const stats = useMemo(() => {
    const totalVisits = visits.length;
    const totalExpense = visits.reduce((sum, v) => sum + v.totalExpense, 0);
    const totalPipelineValue = visits.reduce((sum, v) => sum + v.expectedBusinessValue, 0);
    const avgProbability = Math.round(visits.reduce((sum, v) => sum + v.probabilityPercentage, 0) / totalVisits);
    const avgExpensePerVisit = Math.round(totalExpense / totalVisits);
    
    return { totalVisits, totalExpense, totalPipelineValue, avgProbability, avgExpensePerVisit };
  }, [visits]);

  // Filtered visits
  const filteredVisits = useMemo(() => {
    return visits.filter(visit => {
      const matchesSearch = searchQuery === '' ||
        visit.visitId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visit.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visit.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visit.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = selectedStatus === 'all' || visit.status === selectedStatus;
      const matchesStage = selectedStage === 'all' || visit.funnelStage === selectedStage;
      const matchesOutcome = selectedOutcome === 'all' || visit.outcomeType === selectedOutcome;

      let matchesDate = true;
      const today = new Date();
      const visitDate = new Date(visit.visitDate);
      today.setHours(0, 0, 0, 0);

      if (dateRange === 'today') {
        matchesDate = visitDate.toDateString() === today.toDateString();
      } else if (dateRange === 'week') {
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        matchesDate = visitDate >= weekAgo;
      } else if (dateRange === 'month') {
        const monthAgo = new Date(today);
        monthAgo.setMonth(today.getMonth() - 1);
        matchesDate = visitDate >= monthAgo;
      }

      return matchesSearch && matchesStatus && matchesStage && matchesOutcome && matchesDate;
    });
  }, [visits, searchQuery, selectedStatus, selectedStage, selectedOutcome, dateRange]);

  // Pagination
  const { currentItems, totalPages, indexOfFirstItem, indexOfLastItem } = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredVisits.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredVisits.length / itemsPerPage);
    
    return { currentItems, totalPages, indexOfFirstItem, indexOfLastItem };
  }, [filteredVisits, currentPage, itemsPerPage]);

  const hasActiveFilters = searchQuery || selectedStatus !== 'all' || selectedStage !== 'all' || selectedOutcome !== 'all' || dateRange !== 'all';

  // Handlers
  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedStatus('all');
    setSelectedStage('all');
    setSelectedOutcome('all');
    setDateRange('all');
    setCurrentPage(1);
  }, []);

  const viewVisitDetails = useCallback((visit: Visit) => {
    setSelectedVisit(visit);
    setShowViewModal(true);
  }, []);

  const handleCreateFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCreateFormData(prev => ({
      ...prev,
      [name]: name === 'distanceKm' || name === 'ratePerKm' || name === 'expectedBusinessValue' || name === 'probabilityPercentage' 
        ? Number(value) 
        : value
    }));
  };

  const handleSubmitCreateVisit = useCallback(() => {
    const totalExpense = createFormData.distanceKm * createFormData.ratePerKm;
    
    const newVisit: Visit = {
      id: visits.length + 1,
      visitId: `VIS-2024-${String(visits.length + 1).padStart(3, '0')}`,
      visitDate: createFormData.visitDate,
      employeeName: createFormData.employeeName,
      companyName: createFormData.companyName,
      organisationName: createFormData.organisationName,
      departmentName: createFormData.departmentName,
      contactPerson: createFormData.contactPerson,
      location: createFormData.location,
      purposeOfVisit: createFormData.purposeOfVisit,
      discussionSummary: createFormData.discussionSummary,
      nextAction: createFormData.nextAction,
      nextFollowUpDate: createFormData.nextFollowUpDate,
      vehicleType: createFormData.vehicleType,
      distanceKm: createFormData.distanceKm,
      ratePerKm: createFormData.ratePerKm,
      totalExpense: totalExpense,
      funnelStage: createFormData.funnelStage,
      outcomeType: createFormData.outcomeType,
      expectedBusinessValue: createFormData.expectedBusinessValue,
      actualBusinessValue: null,
      probabilityPercentage: createFormData.probabilityPercentage,
      remarks: createFormData.remarks,
      attachment: null,
      checkInTime: createFormData.checkInTime,
      checkOutTime: createFormData.checkOutTime,
      status: 'active',
      createdAt: new Date().toISOString()
    };

    console.log('New Visit Created:', newVisit);
    setShowCreateModal(false);
    setCreateFormData({
      visitDate: new Date().toISOString().split('T')[0],
      employeeName: '',
      companyName: '',
      organisationName: '',
      departmentName: '',
      contactPerson: '',
      location: '',
      purposeOfVisit: '',
      discussionSummary: '',
      nextAction: '',
      nextFollowUpDate: '',
      vehicleType: 'Four Wheeler',
      distanceKm: 0,
      ratePerKm: 10,
      funnelStage: 'Lead Identified',
      outcomeType: 'Lead Generated',
      expectedBusinessValue: 0,
      probabilityPercentage: 50,
      remarks: '',
      checkInTime: '09:00 AM',
      checkOutTime: '05:00 PM'
    });
    alert('Visit created successfully! (Demo)');
  }, [createFormData, visits.length]);

  const exportToCSV = useCallback(() => {
    const headers = [
      'Visit ID', 'Date', 'Employee', 'Company', 'Organisation', 'Department',
      'Contact Person', 'Location', 'Purpose', 'Discussion Summary', 'Next Action',
      'Next Follow-up', 'Vehicle', 'Distance (km)', 'Rate (₹/km)', 'Expense (₹)',
      'Funnel Stage', 'Outcome', 'Expected Value (₹)', 'Probability (%)',
      'Check In', 'Check Out', 'Remarks', 'Status'
    ];
    
    const csvData = filteredVisits.map(visit => [
      visit.visitId, visit.visitDate, visit.employeeName, visit.companyName,
      visit.organisationName, visit.departmentName, visit.contactPerson, visit.location,
      visit.purposeOfVisit, visit.discussionSummary, visit.nextAction, visit.nextFollowUpDate,
      visit.vehicleType, visit.distanceKm, visit.ratePerKm, visit.totalExpense,
      visit.funnelStage, visit.outcomeType, visit.expectedBusinessValue, visit.probabilityPercentage,
      visit.checkInTime, visit.checkOutTime, visit.remarks, visit.status
    ]);

    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `all_visits_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [filteredVisits]);

  // Badge renderers
  const renderStatusBadge = useCallback((status: string) => (
    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(status)}`}>
      <span className={`w-1.5 h-1.5 rounded-full bg-${status === 'active' ? 'blue' : status === 'completed' ? 'green' : 'red'}-500`}></span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  ), []);

  const renderStageBadge = useCallback((stage: string) => (
    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${stageColors[stage] || 'bg-gray-100 text-gray-600'}`}>{stage}</span>
  ), []);

  const renderOutcomeBadge = useCallback((outcome: string) => (
    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${outcomeColors[outcome] || 'bg-gray-100 text-gray-600'}`}>{outcome}</span>
  ), []);

  // Stat Card Component
  const StatCard = ({ title, value, icon: Icon, color, subtitle }: any) => (
    <div className="group bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5 sm:space-y-1 flex-1 min-w-0">
          <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</p>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent truncate">{value}</p>
        </div>
        <div className={`p-2 sm:p-2.5 md:p-3 bg-${color}-50 rounded-xl sm:rounded-2xl group-hover:bg-${color}-100 transition-colors duration-300 flex-shrink-0`}>
          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-${color}-600`} />
        </div>
      </div>
      <div className="mt-2 sm:mt-3 pt-1.5 sm:pt-2 border-t border-gray-100">
        <p className="text-[10px] sm:text-xs text-gray-400 truncate">{subtitle}</p>
      </div>
    </div>
  );

  // Modal Header Component
  const ModalHeader = ({ title, subtitle, onClose }: any) => (
    <div className="sticky top-0 bg-white border-b border-gray-200 p-3 sm:p-4 flex justify-between items-center">
      <div>
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-xs sm:text-sm text-gray-500">{subtitle}</p>
      </div>
      <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
        <X className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );

  // Info Row Component
  const InfoRow = ({ label, value, icon: Icon }: any) => (
    <div>
      <p className="text-[10px] sm:text-xs text-gray-500">{label}</p>
      {Icon ? (
        <div className="flex items-center gap-1">
          <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400" />
          <p className="text-xs sm:text-sm font-medium">{value}</p>
        </div>
      ) : (
        <p className="text-xs sm:text-sm font-medium">{value}</p>
      )}
    </div>
  );

  // Section Header Component
  const SectionHeader = ({ title, icon: Icon }: any) => (
    <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {title}
    </h3>
  );

  return (
    <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 space-y-3 sm:space-y-4 md:space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 sm:gap-4">
        <div className="flex-1">
          <h1 className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
            <ClipboardList size={24} className="text-blue-600" />
            All Visits
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">All visits with detailed tracking</p>
        </div>
        <div className="flex justify-end xs:justify-start">
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center justify-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm text-[11px] sm:text-xs font-medium whitespace-nowrap active:scale-95"
          >
            <PlusCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
            <span className="hidden xs:inline">Create New Visit</span>
            <span className="xs:hidden">Create New Visit</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
        <StatCard title="Total Visits" value={stats.totalVisits} icon={Calendar} color="blue" subtitle="Total visits recorded" />
        <StatCard title="Total Expense" value={`₹${stats.totalExpense.toLocaleString()}`} icon={DollarSign} color="orange" subtitle="Total travel & visit expenses" />
        <StatCard title="Pipeline Value" value={`₹${(stats.totalPipelineValue / 100000).toFixed(1)}L`} icon={TrendingUp} color="green" subtitle="Expected business value" />
        <StatCard title="Avg. Probability" value={`${stats.avgProbability}%`} icon={Percent} color="purple" subtitle="Average success probability" />
        <StatCard title="Avg. Expense/Visit" value={`₹${stats.avgExpensePerVisit}`} icon={Car} color="cyan" subtitle="Average cost per visit" />
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-3 sm:p-4 flex flex-col xs:flex-row gap-3 items-stretch xs:items-center justify-between">
          <div className="relative w-full xs:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID, employee, company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-1.5 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {showFilters && (
          <div className="p-3 sm:p-4 border-t border-gray-200 bg-gray-50">
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Date Range</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value as "all" | "today" | "week" | "month")}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Funnel Stage</label>
                <select
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {stageOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Outcome</label>
                <select
                  value={selectedOutcome}
                  onChange={(e) => setSelectedOutcome(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {outcomeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Visits Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Visit ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Employee</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Company/Org</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Location</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Purpose</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Stage</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Outcome</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Expense</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Expected</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Prob.</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentItems.map((visit) => (
                <tr key={visit.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3"><span className="text-sm font-mono font-medium text-gray-800">{visit.visitId}</span></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1"><Calendar className="w-3 h-3 text-gray-400" /><span className="text-sm text-gray-600">{visit.visitDate}</span></div></td>
                  <td className="px-4 py-3"><p className="text-sm font-medium text-gray-800">{visit.employeeName}</p></td>
                  <td className="px-4 py-3"><div><p className="text-sm text-gray-800">{visit.companyName}</p><p className="text-xs text-gray-400">{visit.departmentName}</p></div></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1"><MapPin className="w-3 h-3 text-gray-400" /><span className="text-sm text-gray-600">{visit.location}</span></div></td>
                  <td className="px-4 py-3"><span className="text-sm text-gray-600 line-clamp-2">{visit.purposeOfVisit}</span></td>
                  <td className="px-4 py-3">{renderStageBadge(visit.funnelStage)}</td>
                  <td className="px-4 py-3">{renderOutcomeBadge(visit.outcomeType)}</td>
                  <td className="px-4 py-3"><span className="text-sm font-semibold text-orange-600">₹{visit.totalExpense}</span></td>
                  <td className="px-4 py-3"><span className="text-sm font-semibold text-green-600">₹{(visit.expectedBusinessValue / 100000).toFixed(1)}L</span></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1"><span className="text-sm font-medium">{visit.probabilityPercentage}%</span><div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-green-500 rounded-full" style={{ width: `${visit.probabilityPercentage}%` }}></div></div></div></td>
                  <td className="px-4 py-3">{renderStatusBadge(visit.status)}</td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => viewVisitDetails(visit)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tablet View */}
        <div className="hidden md:block lg:hidden overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Visit ID</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Date/Employee</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Company/Location</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Stage/Outcome</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Expense/Value</th>
                <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-3 py-2 text-center text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentItems.map((visit) => (
                <tr key={visit.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-2"><span className="text-xs font-mono font-medium">{visit.visitId}</span></td>
                  <td className="px-3 py-2">
                    <div className="text-xs">{visit.visitDate}</div>
                    <div className="text-xs font-medium text-gray-800">{visit.employeeName}</div>
                  </td>
                  <td className="px-3 py-2">
                    <div className="text-xs">{visit.companyName}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5" /> {visit.location}</div>
                  </td>
                  <td className="px-3 py-2">
                    <div className="mb-1">{renderStageBadge(visit.funnelStage)}</div>
                    {renderOutcomeBadge(visit.outcomeType)}
                  </td>
                  <td className="px-3 py-2">
                    <div className="text-xs font-semibold text-orange-600">₹{visit.totalExpense}</div>
                    <div className="text-xs text-green-600">₹{(visit.expectedBusinessValue / 100000).toFixed(1)}L</div>
                  </td>
                  <td className="px-3 py-2">{renderStatusBadge(visit.status)}</td>
                  <td className="px-3 py-2 text-center">
                    <button onClick={() => viewVisitDetails(visit)} className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-gray-100">
          {currentItems.map((visit) => (
            <div key={visit.id} className="p-3 sm:p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-xs sm:text-sm font-mono font-semibold text-gray-800">{visit.visitId}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">{visit.visitDate}</p>
                </div>
                {renderStatusBadge(visit.status)}
              </div>
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-xs sm:text-sm mt-2">
                <div><span className="text-gray-500">Employee:</span> {visit.employeeName}</div>
                <div><span className="text-gray-500">Location:</span> {visit.location}</div>
                <div><span className="text-gray-500">Company:</span> {visit.companyName}</div>
                <div><span className="text-gray-500">Expense:</span> <span className="text-orange-600 font-semibold">₹{visit.totalExpense}</span></div>
                <div className="col-span-2"><span className="text-gray-500">Purpose:</span> <span className="text-xs sm:text-sm">{visit.purposeOfVisit}</span></div>
                <div><span className="text-gray-500">Stage:</span> {renderStageBadge(visit.funnelStage)}</div>
                <div><span className="text-gray-500">Outcome:</span> {renderOutcomeBadge(visit.outcomeType)}</div>
                <div><span className="text-gray-500">Expected:</span> <span className="text-green-600 font-semibold">₹{(visit.expectedBusinessValue / 100000).toFixed(1)}L</span></div>
                <div><span className="text-gray-500">Probability:</span> {visit.probabilityPercentage}%</div>
              </div>
              <div className="flex justify-end mt-2 sm:mt-3">
                <button onClick={() => viewVisitDetails(visit)} className="p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredVisits.length === 0 && (
          <div className="py-8 sm:py-12 text-center">
            <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2 sm:mb-3" />
            <p className="text-sm sm:text-base text-gray-400">No visits found</p>
            <button onClick={resetFilters} className="mt-2 text-xs sm:text-sm text-blue-600 hover:text-blue-700">Clear filters</button>
          </div>
        )}

        {/* Pagination */}
        {filteredVisits.length > 0 && (
          <div className="px-3 sm:px-4 py-3 border-t border-gray-200 flex flex-col xs:flex-row items-center justify-between gap-3">
            <div className="text-[11px] sm:text-xs text-gray-500 order-2 xs:order-1">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredVisits.length)} of {filteredVisits.length} visits
            </div>
            <div className="flex gap-2 order-1 xs:order-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-blue-50 text-blue-600 rounded-lg font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create New Visit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <ModalHeader title="Create New Visit" subtitle="Fill in the details to create a new visit" onClose={() => setShowCreateModal(false)} />

            <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Visit Date *</label>
                  <input type="date" name="visitDate" value={createFormData.visitDate} onChange={handleCreateFormChange} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Employee Name *</label>
                  <input type="text" name="employeeName" value={createFormData.employeeName} onChange={handleCreateFormChange} placeholder="Enter employee name" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" required />
                </div>
              </div>

              {/* Company & Organization */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Company Name *</label>
                  <input type="text" name="companyName" value={createFormData.companyName} onChange={handleCreateFormChange} placeholder="Enter company name" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Organization Name</label>
                  <input type="text" name="organisationName" value={createFormData.organisationName} onChange={handleCreateFormChange} placeholder="Enter organization name" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              {/* Department & Contact Person */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Department</label>
                  <input type="text" name="departmentName" value={createFormData.departmentName} onChange={handleCreateFormChange} placeholder="Enter department" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Contact Person</label>
                  <input type="text" name="contactPerson" value={createFormData.contactPerson} onChange={handleCreateFormChange} placeholder="Enter contact person" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              {/* Location & Purpose */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Location *</label>
                  <input type="text" name="location" value={createFormData.location} onChange={handleCreateFormChange} placeholder="Enter location" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Purpose of Visit *</label>
                  <input type="text" name="purposeOfVisit" value={createFormData.purposeOfVisit} onChange={handleCreateFormChange} placeholder="Enter purpose" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" required />
                </div>
              </div>

              {/* Check In/Out Times */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Check In Time</label>
                  <input type="text" name="checkInTime" value={createFormData.checkInTime} onChange={handleCreateFormChange} placeholder="e.g., 09:00 AM" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Check Out Time</label>
                  <input type="text" name="checkOutTime" value={createFormData.checkOutTime} onChange={handleCreateFormChange} placeholder="e.g., 05:00 PM" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              {/* Travel Details */}
              <div className="border-t pt-4">
                <SectionHeader title="Travel Details" icon={Car} />
                <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Vehicle Type</label>
                    <select name="vehicleType" value={createFormData.vehicleType} onChange={handleCreateFormChange} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option value="Two Wheeler">Two Wheeler</option>
                      <option value="Four Wheeler">Four Wheeler</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Distance (km)</label>
                    <input type="number" name="distanceKm" value={createFormData.distanceKm} onChange={handleCreateFormChange} placeholder="Distance in km" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Rate per km (₹)</label>
                    <input type="number" name="ratePerKm" value={createFormData.ratePerKm} onChange={handleCreateFormChange} placeholder="Rate per km" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>

              {/* Business Tracking */}
              <div className="border-t pt-4">
                <SectionHeader title="Business Tracking" icon={Target} />
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Funnel Stage</label>
                    <select name="funnelStage" value={createFormData.funnelStage} onChange={handleCreateFormChange} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                      {stageOptions.filter(opt => opt.value !== 'all').map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Outcome Type</label>
                    <select name="outcomeType" value={createFormData.outcomeType} onChange={handleCreateFormChange} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                      {outcomeOptions.filter(opt => opt.value !== 'all').map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Expected Business Value (₹)</label>
                    <input type="number" name="expectedBusinessValue" value={createFormData.expectedBusinessValue} onChange={handleCreateFormChange} placeholder="Expected value" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Probability (%)</label>
                    <input type="number" name="probabilityPercentage" value={createFormData.probabilityPercentage} onChange={handleCreateFormChange} placeholder="Probability percentage" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>

              {/* Discussion Summary & Next Action */}
              <div className="border-t pt-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Discussion Summary</label>
                    <textarea name="discussionSummary" value={createFormData.discussionSummary} onChange={handleCreateFormChange} rows={3} placeholder="Enter discussion summary" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Next Action</label>
                    <input type="text" name="nextAction" value={createFormData.nextAction} onChange={handleCreateFormChange} placeholder="Enter next action" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Next Follow-up Date</label>
                    <input type="date" name="nextFollowUpDate" value={createFormData.nextFollowUpDate} onChange={handleCreateFormChange} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Remarks</label>
                    <textarea name="remarks" value={createFormData.remarks} onChange={handleCreateFormChange} rows={2} placeholder="Enter remarks" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-3 sm:p-4 flex justify-end gap-2 sm:gap-3">
              <button onClick={() => setShowCreateModal(false)} className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Cancel</button>
              <button onClick={handleSubmitCreateVisit} className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1.5 sm:gap-2">
                <PlusCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Create Visit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showViewModal && selectedVisit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <ModalHeader title="Visit Details" subtitle={`ID: ${selectedVisit.visitId}`} onClose={() => setShowViewModal(false)} />

            <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                <div className="bg-gray-50 rounded-lg p-2 sm:p-3"><p className="text-[10px] sm:text-xs text-gray-500">Visit Date</p><p className="font-medium text-xs sm:text-sm">{selectedVisit.visitDate}</p></div>
                <div className="bg-gray-50 rounded-lg p-2 sm:p-3"><p className="text-[10px] sm:text-xs text-gray-500">Check In/Out</p><p className="font-medium text-xs sm:text-sm">{selectedVisit.checkInTime} - {selectedVisit.checkOutTime}</p></div>
                <div className="bg-gray-50 rounded-lg p-2 sm:p-3"><p className="text-[10px] sm:text-xs text-gray-500">Status</p>{renderStatusBadge(selectedVisit.status)}</div>
                <div className="bg-gray-50 rounded-lg p-2 sm:p-3"><p className="text-[10px] sm:text-xs text-gray-500">Attachment</p>{selectedVisit.attachment ? <a href="#" className="text-[10px] sm:text-xs text-blue-600 hover:underline flex items-center gap-1"><Upload className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> {selectedVisit.attachment}</a> : <span className="text-[10px] sm:text-xs text-gray-400">No attachment</span>}</div>
              </div>

              {/* Employee & Location */}
              <div className="border-b pb-3 sm:pb-4">
                <SectionHeader title="Employee & Location" icon={User} />
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-4">
                  <InfoRow label="Employee" value={selectedVisit.employeeName} />
                  <InfoRow label="Location" value={selectedVisit.location} icon={MapPin} />
                </div>
              </div>

              {/* Organization Details */}
              <div className="border-b pb-3 sm:pb-4">
                <SectionHeader title="Organization Details" icon={Building2} />
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-4">
                  <InfoRow label="Company" value={selectedVisit.companyName} />
                  <InfoRow label="Organisation" value={selectedVisit.organisationName} />
                  <InfoRow label="Department" value={selectedVisit.departmentName} />
                  <InfoRow label="Contact Person" value={selectedVisit.contactPerson} />
                </div>
              </div>

              {/* Visit Details */}
              <div className="border-b pb-3 sm:pb-4">
                <SectionHeader title="Visit Details" icon={FileText} />
                <div className="space-y-2 sm:space-y-3">
                  <InfoRow label="Purpose of Visit" value={selectedVisit.purposeOfVisit} />
                  <InfoRow label="Discussion Summary" value={selectedVisit.discussionSummary} />
                  <InfoRow label="Remarks" value={selectedVisit.remarks || 'N/A'} />
                </div>
              </div>

              {/* Travel & Expense */}
              <div className="border-b pb-3 sm:pb-4">
                <SectionHeader title="Travel & Expense" icon={Car} />
                <div className="grid grid-cols-2 xs:grid-cols-4 gap-2 sm:gap-3">
                  <div className="bg-gray-50 rounded-lg p-1.5 sm:p-2 text-center"><p className="text-[9px] sm:text-[10px] text-gray-500">Vehicle</p><p className="text-[10px] sm:text-xs font-medium">{selectedVisit.vehicleType}</p></div>
                  <div className="bg-gray-50 rounded-lg p-1.5 sm:p-2 text-center"><p className="text-[9px] sm:text-[10px] text-gray-500">Distance</p><p className="text-[10px] sm:text-xs font-medium">{selectedVisit.distanceKm} km</p></div>
                  <div className="bg-gray-50 rounded-lg p-1.5 sm:p-2 text-center"><p className="text-[9px] sm:text-[10px] text-gray-500">Rate</p><p className="text-[10px] sm:text-xs font-medium">₹{selectedVisit.ratePerKm}/km</p></div>
                  <div className="bg-gray-50 rounded-lg p-1.5 sm:p-2 text-center"><p className="text-[9px] sm:text-[10px] text-gray-500">Total</p><p className="text-[10px] sm:text-xs font-bold text-orange-600">₹{selectedVisit.totalExpense}</p></div>
                </div>
              </div>

              {/* Business Tracking */}
              <div className="border-b pb-3 sm:pb-4">
                <SectionHeader title="Business Tracking" icon={Target} />
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-4">
                  <div><p className="text-[10px] sm:text-xs text-gray-500">Funnel Stage</p>{renderStageBadge(selectedVisit.funnelStage)}</div>
                  <div><p className="text-[10px] sm:text-xs text-gray-500">Outcome</p>{renderOutcomeBadge(selectedVisit.outcomeType)}</div>
                  <div><p className="text-[10px] sm:text-xs text-gray-500">Expected Business Value</p><p className="text-xs sm:text-sm font-semibold text-green-600">₹{selectedVisit.expectedBusinessValue.toLocaleString()}</p></div>
                  <div><p className="text-[10px] sm:text-xs text-gray-500">Probability</p><div className="flex items-center gap-1 sm:gap-2"><div className="flex-1 h-1 sm:h-1.5 bg-gray-200 rounded-full"><div className="h-full bg-green-500 rounded-full" style={{ width: `${selectedVisit.probabilityPercentage}%` }}></div></div><span className="text-xs sm:text-sm font-medium">{selectedVisit.probabilityPercentage}%</span></div></div>
                  {selectedVisit.actualBusinessValue && <div><p className="text-[10px] sm:text-xs text-gray-500">Actual Business Value</p><p className="text-xs sm:text-sm font-semibold text-emerald-600">₹{selectedVisit.actualBusinessValue.toLocaleString()}</p></div>}
                </div>
              </div>

              {/* Follow-up */}
              <div>
                <SectionHeader title="Follow-up" icon={ClockIcon} />
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-4">
                  <InfoRow label="Next Action" value={selectedVisit.nextAction} />
                  <InfoRow label="Next Follow-up Date" value={selectedVisit.nextFollowUpDate} icon={Calendar} />
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-3 sm:p-4 flex justify-end gap-2 sm:gap-3">
              <button onClick={() => setShowViewModal(false)} className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Close</button>
              <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1.5 sm:gap-2"><Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Edit Visit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllVisits;