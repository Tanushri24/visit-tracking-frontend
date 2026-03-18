import React, { useState, useEffect } from 'react';
import {
  Building2, Building, Layers, Users2, User, Badge, Tag,
  GitMerge, Target, DollarSign, MapPin, Car, Plus, Search,
  Filter, Download, Upload, RefreshCw, ChevronRight, Edit,
  Trash2, Eye, CheckCircle, XCircle, AlertCircle, MoreVertical,
  FileText, Calendar, Clock, Mail, Phone, Map, Globe
} from 'lucide-react';

// Import types
// Import types
import type {
    MasterType,
    Company,
    Organisation,
    Department,
    ContactPerson,
    Employee,
    Designation,
    VisitPurpose,
    FunnelStage,
    OutcomeType,
    ExpenseRate,
    Location,
    VehicleType
} from './types/master.types';

// ============================================
// MASTER CONFIGURATION
// ============================================

const masterConfigs = [
  {
    id: 'companies' as MasterType,
    icon: <Building2 className="w-5 h-5" />,
    label: 'Companies',
    description: 'Manage client companies and organizations',
    color: 'blue',
    fields: [
      { name: 'companyName', label: 'Company Name', type: 'text', required: true },
      { name: 'companyType', label: 'Company Type', type: 'select', required: true,
        options: [
          { value: 'Private', label: 'Private' },
          { value: 'Public', label: 'Public' },
          { value: 'Government', label: 'Government' },
          { value: 'Educational', label: 'Educational' }
        ]
      },
      { name: 'industryType', label: 'Industry Type', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: false },
      { name: 'phone', label: 'Phone', type: 'tel', required: false },
      { name: 'gstNo', label: 'GST No', type: 'text', required: false },
      { name: 'address', label: 'Address', type: 'textarea', required: true },
      { name: 'city', label: 'City', type: 'text', required: true },
      { name: 'state', label: 'State', type: 'text', required: true },
      { name: 'pincode', label: 'Pincode', type: 'text', required: true }
    ]
  },
  {
    id: 'organisations' as MasterType,
    icon: <Building className="w-5 h-5" />,
    label: 'Organisations',
    description: 'Manage sub-organizations under companies',
    color: 'purple',
    fields: [
      { name: 'organisationName', label: 'Organisation Name', type: 'text', required: true },
      { name: 'companyId', label: 'Parent Company', type: 'select', required: true,
        options: [] // Will be populated dynamically
      },
      { name: 'email', label: 'Email', type: 'email', required: false },
      { name: 'phone', label: 'Phone', type: 'tel', required: false },
      { name: 'address', label: 'Address', type: 'textarea', required: true },
      { name: 'city', label: 'City', type: 'text', required: true },
      { name: 'state', label: 'State', type: 'text', required: true },
      { name: 'pincode', label: 'Pincode', type: 'text', required: true }
    ]
  },
  {
    id: 'departments' as MasterType,
    icon: <Layers className="w-5 h-5" />,
    label: 'Departments',
    description: 'Manage departments within organisations',
    color: 'green',
    fields: [
      { name: 'departmentName', label: 'Department Name', type: 'text', required: true },
      { name: 'organisationId', label: 'Organisation', type: 'select', required: true,
        options: []
      },
      { name: 'headOfDepartment', label: 'Head of Department', type: 'text', required: false },
      { name: 'email', label: 'Email', type: 'email', required: false },
      { name: 'phone', label: 'Phone', type: 'tel', required: false }
    ]
  },
  {
    id: 'contacts' as MasterType,
    icon: <Users2 className="w-5 h-5" />,
    label: 'Contact Persons',
    description: 'Manage contact persons for clients',
    color: 'orange',
    fields: [
      { name: 'name', label: 'Full Name', type: 'text', required: true },
      { name: 'designation', label: 'Designation', type: 'text', required: true },
      { name: 'mobile', label: 'Mobile Number', type: 'tel', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'companyId', label: 'Company', type: 'select', required: false,
        options: []
      },
      { name: 'organisationId', label: 'Organisation', type: 'select', required: false,
        options: []
      },
      { name: 'departmentId', label: 'Department', type: 'select', required: false,
        options: []
      },
      { name: 'isPrimary', label: 'Primary Contact', type: 'boolean', required: false },
      { name: 'remarks', label: 'Remarks', type: 'textarea', required: false }
    ]
  },
  {
    id: 'employees' as MasterType,
    icon: <User className="w-5 h-5" />,
    label: 'Employees',
    description: 'Manage internal employees',
    color: 'cyan',
    fields: [
      { name: 'employeeCode', label: 'Employee Code', type: 'text', required: true },
      { name: 'name', label: 'Full Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'mobile', label: 'Mobile', type: 'tel', required: true },
      { name: 'designationId', label: 'Designation', type: 'select', required: true,
        options: []
      },
      { name: 'departmentId', label: 'Department', type: 'select', required: true,
        options: []
      },
      { name: 'reportingManagerId', label: 'Reporting Manager', type: 'select', required: false,
        options: []
      },
      { name: 'locationId', label: 'Location', type: 'select', required: false,
        options: []
      },
      { name: 'joiningDate', label: 'Joining Date', type: 'date', required: true }
    ]
  },
  {
    id: 'designations' as MasterType,
    icon: <Badge className="w-5 h-5" />,
    label: 'Designations',
    description: 'Manage employee designations',
    color: 'pink',
    fields: [
      { name: 'designationName', label: 'Designation Name', type: 'text', required: true },
      { name: 'level', label: 'Level', type: 'number', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: false }
    ]
  },
  {
    id: 'purposes' as MasterType,
    icon: <Tag className="w-5 h-5" />,
    label: 'Visit Purposes',
    description: 'Manage purposes for visits',
    color: 'yellow',
    fields: [
      { name: 'purposeName', label: 'Purpose Name', type: 'text', required: true },
      { name: 'category', label: 'Category', type: 'select', required: true,
        options: [
          { value: 'Sales', label: 'Sales' },
          { value: 'Support', label: 'Support' },
          { value: 'Service', label: 'Service' },
          { value: 'Meeting', label: 'Meeting' },
          { value: 'Other', label: 'Other' }
        ]
      },
      { name: 'description', label: 'Description', type: 'textarea', required: false }
    ]
  },
  {
    id: 'funnel-stages' as MasterType,
    icon: <GitMerge className="w-5 h-5" />,
    label: 'Funnel Stages',
    description: 'Configure sales funnel stages',
    color: 'indigo',
    fields: [
      { name: 'stageName', label: 'Stage Name', type: 'text', required: true },
      { name: 'stageOrder', label: 'Stage Order', type: 'number', required: true },
      { name: 'probability', label: 'Probability (%)', type: 'number', required: true },
      { name: 'color', label: 'Color', type: 'text', required: true },
      { name: 'isClosedStage', label: 'Is Closed Stage', type: 'boolean', required: true },
      { name: 'isWonStage', label: 'Is Won Stage', type: 'boolean', required: true },
      { name: 'isLostStage', label: 'Is Lost Stage', type: 'boolean', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: false }
    ]
  },
  {
    id: 'outcomes' as MasterType,
    icon: <Target className="w-5 h-5" />,
    label: 'Outcome Types',
    description: 'Manage visit outcome types',
    color: 'red',
    fields: [
      { name: 'outcomeName', label: 'Outcome Name', type: 'text', required: true },
      { name: 'category', label: 'Category', type: 'select', required: true,
        options: [
          { value: 'Lead', label: 'Lead' },
          { value: 'Proposal', label: 'Proposal' },
          { value: 'Demo', label: 'Demo' },
          { value: 'Order', label: 'Order' },
          { value: 'Follow-up', label: 'Follow-up' },
          { value: 'Other', label: 'Other' }
        ]
      },
      { name: 'isRevenueLinked', label: 'Revenue Linked', type: 'boolean', required: true },
      { name: 'isPositive', label: 'Positive Outcome', type: 'boolean', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: false }
    ]
  },
  {
    id: 'expense-rates' as MasterType,
    icon: <DollarSign className="w-5 h-5" />,
    label: 'Expense Rates',
    description: 'Configure vehicle expense rates',
    color: 'green',
    fields: [
      { name: 'vehicleTypeId', label: 'Vehicle Type', type: 'select', required: true,
        options: []
      },
      { name: 'ratePerKm', label: 'Rate per KM (₹)', type: 'number', required: true },
      { name: 'effectiveFrom', label: 'Effective From', type: 'date', required: true },
      { name: 'effectiveTo', label: 'Effective To', type: 'date', required: false }
    ]
  },
  {
    id: 'locations' as MasterType,
    icon: <MapPin className="w-5 h-5" />,
    label: 'Locations',
    description: 'Manage geographic locations',
    color: 'teal',
    fields: [
      { name: 'locationName', label: 'Location Name', type: 'text', required: true },
      { name: 'city', label: 'City', type: 'text', required: true },
      { name: 'state', label: 'State', type: 'text', required: true },
      { name: 'pincode', label: 'Pincode', type: 'text', required: false }
    ]
  },
  {
    id: 'vehicles' as MasterType,
    icon: <Car className="w-5 h-5" />,
    label: 'Vehicle Types',
    description: 'Manage vehicle types',
    color: 'amber',
    fields: [
      { name: 'vehicleName', label: 'Vehicle Name', type: 'text', required: true },
      { name: 'defaultRatePerKm', label: 'Default Rate (₹/km)', type: 'number', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: false }
    ]
  }
];

// ============================================
// MOCK DATA
// ============================================

const mockCompanies: Company[] = [
  {
      id: 1,
      companyName: 'MP Board of Secondary Education',
      companyType: 'Government',
      industryType: 'Education',
      address: 'Bhopal, MP',
      city: 'Bhopal',
      state: 'Madhya Pradesh',
      pincode: '462001',
      email: 'contact@mpbse.mp.gov.in',
      phone: '0755-2551234',
      gstNo: '23AAAAA0000A1Z5',
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: undefined
  },
  {
      id: 2,
      companyName: 'Bhoj University',
      companyType: 'Educational',
      industryType: 'Higher Education',
      address: 'Bhopal, MP',
      city: 'Bhopal',
      state: 'Madhya Pradesh',
      pincode: '462016',
      email: 'info@bhojuni.ac.in',
      phone: '0755-2421234',
      isActive: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: undefined
  },
  {
      id: 3,
      companyName: 'ITI Limited',
      companyType: 'Public',
      industryType: 'Manufacturing',
      address: 'Bangalore',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      email: 'contact@iti.co.in',
      phone: '080-22221234',
      isActive: true,
      createdAt: new Date('2024-02-01'),
      updatedAt: undefined
  }
];

const mockOrganisations: Organisation[] = [
  {
    id: 1,
    organisationName: 'Examination Wing',
    companyId: 1,
    companyName: 'MP Board of Secondary Education',
    address: 'Bhopal',
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    pincode: '462001',
    email: 'exam@mpbse.mp.gov.in',
    phone: '0755-2551235',
    isActive: true,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 2,
    organisationName: 'Campus Office',
    companyId: 2,
    companyName: 'Bhoj University',
    address: 'Bhopal',
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    pincode: '462016',
    email: 'campus@bhojuni.ac.in',
    phone: '0755-2421235',
    isActive: true,
    createdAt: new Date('2024-01-15')
  }
];

const mockDepartments: Department[] = [
  {
    id: 1,
    departmentName: 'Registrar Office',
    organisationId: 1,
    organisationName: 'Examination Wing',
    companyId: 1,
    companyName: 'MP Board of Secondary Education',
    headOfDepartment: 'Dr. R.K. Sharma',
    email: 'registrar@mpbse.mp.gov.in',
    phone: '0755-2551236',
    isActive: true,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 2,
    departmentName: 'Examination Department',
    organisationId: 1,
    organisationName: 'Examination Wing',
    companyId: 1,
    companyName: 'MP Board of Secondary Education',
    headOfDepartment: 'Mrs. S. Patel',
    email: 'examdept@mpbse.mp.gov.in',
    phone: '0755-2551237',
    isActive: true,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 3,
    departmentName: 'IT Department',
    organisationId: 2,
    organisationName: 'Campus Office',
    companyId: 2,
    companyName: 'Bhoj University',
    headOfDepartment: 'Mr. A. Verma',
    email: 'it@bhojuni.ac.in',
    phone: '0755-2421236',
    isActive: true,
    createdAt: new Date('2024-01-16')
  }
];

const mockContacts: ContactPerson[] = [
  {
    id: 1,
    name: 'Dr. R.K. Sharma',
    designation: 'Registrar',
    mobile: '9876543210',
    email: 'registrar@mpbse.mp.gov.in',
    companyId: 1,
    companyName: 'MP Board of Secondary Education',
    organisationId: 1,
    organisationName: 'Examination Wing',
    departmentId: 1,
    departmentName: 'Registrar Office',
    isPrimary: true,
    isActive: true,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 2,
    name: 'Mrs. S. Patel',
    designation: 'Examination Officer',
    mobile: '9876543211',
    email: 'exam@mpbse.mp.gov.in',
    companyId: 1,
    companyName: 'MP Board of Secondary Education',
    organisationId: 1,
    organisationName: 'Examination Wing',
    departmentId: 2,
    departmentName: 'Examination Department',
    isPrimary: true,
    isActive: true,
    createdAt: new Date('2024-01-01')
  }
];

const mockDesignations: Designation[] = [
  { id: 1, designationName: 'Business Development Executive', level: 1, isActive: true, createdAt: new Date() },
  { id: 2, designationName: 'Senior BD Executive', level: 2, isActive: true, createdAt: new Date() },
  { id: 3, designationName: 'Team Lead', level: 3, isActive: true, createdAt: new Date() },
  { id: 4, designationName: 'Manager', level: 4, isActive: true, createdAt: new Date() }
];

const mockPurposes: VisitPurpose[] = [
  { id: 1, purposeName: 'Product Demo', category: 'Sales', description: 'Demonstrate product features', isActive: true, createdAt: new Date() },
  { id: 2, purposeName: 'Proposal Discussion', category: 'Sales', description: 'Discuss proposal details', isActive: true, createdAt: new Date() },
  { id: 3, purposeName: 'Requirement Gathering', category: 'Sales', description: 'Collect client requirements', isActive: true, createdAt: new Date() },
  { id: 4, purposeName: 'Technical Support', category: 'Support', description: 'Provide technical assistance', isActive: true, createdAt: new Date() }
];

const mockFunnelStages: FunnelStage[] = [
  { id: 1, stageName: 'Lead Identified', stageOrder: 1, color: '#3B82F6', isClosedStage: false, isWonStage: false, isLostStage: false, probability: 10, isActive: true, createdAt: new Date() },
  { id: 2, stageName: 'Initial Visit', stageOrder: 2, color: '#8B5CF6', isClosedStage: false, isWonStage: false, isLostStage: false, probability: 20, isActive: true, createdAt: new Date() },
  { id: 3, stageName: 'Requirement Discussion', stageOrder: 3, color: '#F59E0B', isClosedStage: false, isWonStage: false, isLostStage: false, probability: 30, isActive: true, createdAt: new Date() },
  { id: 4, stageName: 'Proposal Shared', stageOrder: 4, color: '#10B981', isClosedStage: false, isWonStage: false, isLostStage: false, probability: 50, isActive: true, createdAt: new Date() },
  { id: 5, stageName: 'Demo Conducted', stageOrder: 5, color: '#6366F1', isClosedStage: false, isWonStage: false, isLostStage: false, probability: 60, isActive: true, createdAt: new Date() },
  { id: 6, stageName: 'Negotiation', stageOrder: 6, color: '#EF4444', isClosedStage: false, isWonStage: false, isLostStage: false, probability: 70, isActive: true, createdAt: new Date() },
  { id: 7, stageName: 'Won', stageOrder: 7, color: '#22C55E', isClosedStage: true, isWonStage: true, isLostStage: false, probability: 100, isActive: true, createdAt: new Date() },
  { id: 8, stageName: 'Lost', stageOrder: 8, color: '#6B7280', isClosedStage: true, isWonStage: false, isLostStage: true, probability: 0, isActive: true, createdAt: new Date() }
];

const mockOutcomes: OutcomeType[] = [
  { id: 1, outcomeName: 'Lead Generated', category: 'Lead', isRevenueLinked: false, isPositive: true, isActive: true, createdAt: new Date() },
  { id: 2, outcomeName: 'Proposal Created', category: 'Proposal', isRevenueLinked: true, isPositive: true, isActive: true, createdAt: new Date() },
  { id: 3, outcomeName: 'Demo Scheduled', category: 'Demo', isRevenueLinked: false, isPositive: true, isActive: true, createdAt: new Date() },
  { id: 4, outcomeName: 'Order Received', category: 'Order', isRevenueLinked: true, isPositive: true, isActive: true, createdAt: new Date() },
  { id: 5, outcomeName: 'No Outcome', category: 'Other', isRevenueLinked: false, isPositive: false, isActive: true, createdAt: new Date() }
];

const mockVehicles: VehicleType[] = [
  { id: 1, vehicleName: 'Two Wheeler', defaultRatePerKm: 4, description: 'Motorcycle/Scooter', isActive: true, createdAt: new Date() },
  { id: 2, vehicleName: 'Four Wheeler', defaultRatePerKm: 10, description: 'Car/SUV', isActive: true, createdAt: new Date() }
];

const mockExpenseRates: ExpenseRate[] = [
  { id: 1, vehicleTypeId: 1, vehicleTypeName: 'Two Wheeler', ratePerKm: 4, effectiveFrom: new Date('2024-01-01'), isActive: true, createdAt: new Date() },
  { id: 2, vehicleTypeId: 1, vehicleTypeName: 'Two Wheeler', ratePerKm: 5, effectiveFrom: new Date('2024-04-01'), isActive: true, createdAt: new Date() },
  { id: 3, vehicleTypeId: 2, vehicleTypeName: 'Four Wheeler', ratePerKm: 10, effectiveFrom: new Date('2024-01-01'), isActive: true, createdAt: new Date() },
  { id: 4, vehicleTypeId: 2, vehicleTypeName: 'Four Wheeler', ratePerKm: 12, effectiveFrom: new Date('2024-04-01'), isActive: true, createdAt: new Date() }
];

const mockLocations: Location[] = [
  { id: 1, locationName: 'Bhopal Head Office', city: 'Bhopal', state: 'Madhya Pradesh', pincode: '462001', isActive: true, createdAt: new Date() },
  { id: 2, locationName: 'Indore Branch', city: 'Indore', state: 'Madhya Pradesh', pincode: '452001', isActive: true, createdAt: new Date() }
];

// ============================================
// MAIN COMPONENT
// ============================================

const MasterManagement: React.FC = () => {
  const [activeMaster, setActiveMaster] = useState<MasterType>('companies');
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Get current master config
  const currentMaster = masterConfigs.find(m => m.id === activeMaster)!;

  // Get data based on active master
  const getCurrentData = () => {
    switch(activeMaster) {
      case 'companies': return mockCompanies;
      case 'organisations': return mockOrganisations;
      case 'departments': return mockDepartments;
      case 'contacts': return mockContacts;
      case 'designations': return mockDesignations;
      case 'purposes': return mockPurposes;
      case 'funnel-stages': return mockFunnelStages;
      case 'outcomes': return mockOutcomes;
      case 'vehicles': return mockVehicles;
      case 'expense-rates': return mockExpenseRates;
      case 'locations': return mockLocations;
      default: return [];
    }
  };

  const data = getCurrentData();

  // Filter data based on search
  const filteredData = data.filter((item: any) => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    
    // Search in common fields
    if (item.name?.toLowerCase().includes(searchLower)) return true;
    if (item.companyName?.toLowerCase().includes(searchLower)) return true;
    if (item.organisationName?.toLowerCase().includes(searchLower)) return true;
    if (item.departmentName?.toLowerCase().includes(searchLower)) return true;
    if (item.email?.toLowerCase().includes(searchLower)) return true;
    if (item.city?.toLowerCase().includes(searchLower)) return true;
    
    return false;
  });

  const handleAdd = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      console.log('Delete', id);
      // API call to delete
    }
  };

  const handleToggleStatus = (id: number, currentStatus: boolean) => {
    console.log('Toggle status', id, !currentStatus);
    // API call to update status
  };

  const handleExport = () => {
    console.log('Export', activeMaster);
  };

  const handleImport = () => {
    console.log('Import', activeMaster);
  };

  const handleBulkDelete = () => {
    if (selectedItems.length > 0 && window.confirm(`Delete ${selectedItems.length} items?`)) {
      console.log('Bulk delete', selectedItems);
      setSelectedItems([]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredData.map((item: any) => item.id));
    }
  };

  const toggleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(i => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full flex items-center gap-1">
        <CheckCircle className="w-3 h-3" /> Active
      </span>
    ) : (
      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full flex items-center gap-1">
        <XCircle className="w-3 h-3" /> Inactive
      </span>
    );
  };

  const getCompanyTypeBadge = (type: string) => {
    const colors: any = {
      Private: 'bg-blue-100 text-blue-700',
      Public: 'bg-purple-100 text-purple-700',
      Government: 'bg-green-100 text-green-700',
      Educational: 'bg-orange-100 text-orange-700'
    };
    return (
      <span className={`px-2 py-1 ${colors[type] || 'bg-gray-100 text-gray-700'} text-xs font-medium rounded-full`}>
        {type}
      </span>
    );
  };

  const renderTable = () => {
    switch(activeMaster) {
      case 'companies':
        return (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === filteredData.length && filteredData.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Industry</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((company: Company) => (
                <tr key={company.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(company.id)}
                      onChange={() => toggleSelectItem(company.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{company.companyName}</p>
                      <p className="text-xs text-gray-500">{company.gstNo}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">{getCompanyTypeBadge(company.companyType)}</td>
                  <td className="px-4 py-3 text-sm">{company.industryType}</td>
                  <td className="px-4 py-3 text-sm">{company.city}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-xs flex items-center gap-1"><Mail className="w-3 h-3" /> {company.email}</span>
                      <span className="text-xs flex items-center gap-1"><Phone className="w-3 h-3" /> {company.phone}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">{getStatusBadge(company.isActive)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => handleEdit(company)} className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleToggleStatus(company.id, company.isActive)} className="p-1 text-orange-600 hover:bg-orange-50 rounded">
                        {company.isActive ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                      </button>
                      <button onClick={() => handleDelete(company.id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case 'organisations':
        return (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Organisation Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parent Company</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((org: Organisation) => (
                <tr key={org.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900">{org.organisationName}</p>
                  </td>
                  <td className="px-4 py-3 text-sm">{org.companyName}</td>
                  <td className="px-4 py-3 text-sm">{org.city}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-xs flex items-center gap-1"><Mail className="w-3 h-3" /> {org.email}</span>
                      <span className="text-xs flex items-center gap-1"><Phone className="w-3 h-3" /> {org.phone}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">{getStatusBadge(org.isActive)}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit className="w-4 h-4" /></button>
                      <button className="p-1 text-orange-600 hover:bg-orange-50 rounded"><XCircle className="w-4 h-4" /></button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case 'contacts':
        return (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Designation</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company/Org</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Primary</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((contact: ContactPerson) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                  </td>
                  <td className="px-4 py-3 text-sm">{contact.designation}</td>
                  <td className="px-4 py-3 text-sm">{contact.companyName || contact.organisationName}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-xs flex items-center gap-1"><Mail className="w-3 h-3" /> {contact.email}</span>
                      <span className="text-xs flex items-center gap-1"><Phone className="w-3 h-3" /> {contact.mobile}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {contact.isPrimary ? (
                      <CheckCircle className="w-4 h-4 text-green-600 mx-auto" />
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-center">{getStatusBadge(contact.isActive)}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit className="w-4 h-4" /></button>
                      <button className="p-1 text-orange-600 hover:bg-orange-50 rounded"><XCircle className="w-4 h-4" /></button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case 'funnel-stages':
        return (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stage Name</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Order</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Probability</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Color</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((stage: FunnelStage) => (
                <tr key={stage.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stage.color }}></div>
                      <span className="text-sm font-medium">{stage.stageName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-sm">{stage.stageOrder}</td>
                  <td className="px-4 py-3 text-center text-sm">{stage.probability}%</td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-1 text-xs font-mono rounded" style={{ backgroundColor: stage.color + '20', color: stage.color }}>
                      {stage.color}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {stage.isWonStage && <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full mr-1">Won</span>}
                    {stage.isLostStage && <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">Lost</span>}
                    {!stage.isWonStage && !stage.isLostStage && stage.isClosedStage && <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Closed</span>}
                  </td>
                  <td className="px-4 py-3 text-center">{getStatusBadge(stage.isActive)}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit className="w-4 h-4" /></button>
                      <button className="p-1 text-orange-600 hover:bg-orange-50 rounded"><XCircle className="w-4 h-4" /></button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case 'expense-rates':
        return (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle Type</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Rate (₹/km)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Effective From</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Effective To</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((rate: ExpenseRate) => (
                <tr key={rate.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">{rate.vehicleTypeName}</td>
                  <td className="px-4 py-3 text-right text-sm font-bold">₹{rate.ratePerKm}</td>
                  <td className="px-4 py-3 text-sm">{rate.effectiveFrom.toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-sm">{rate.effectiveTo?.toLocaleDateString() || 'Current'}</td>
                  <td className="px-4 py-3 text-center">{getStatusBadge(rate.isActive)}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit className="w-4 h-4" /></button>
                      <button className="p-1 text-orange-600 hover:bg-orange-50 rounded"><XCircle className="w-4 h-4" /></button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      default:
        return (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((item: any) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">{item.name || item.designationName || item.purposeName || item.outcomeName || item.vehicleName || item.locationName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.description || item.email || item.city || '-'}</td>
                  <td className="px-4 py-3 text-center">{getStatusBadge(item.isActive)}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit className="w-4 h-4" /></button>
                      <button className="p-1 text-orange-600 hover:bg-orange-50 rounded"><XCircle className="w-4 h-4" /></button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Database className="w-6 h-6 text-purple-600" />
                Master Management
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Configure and manage all master data for the system
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Bulk Actions */}
              {selectedItems.length > 0 && (
                <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-lg">
                  <span className="text-sm text-purple-700">{selectedItems.length} selected</span>
                  <button onClick={handleBulkDelete} className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded ${viewMode === 'table' ? 'bg-white shadow' : 'text-gray-500'}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M3 18h18M3 6h18" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : 'text-gray-500'}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
              </div>
              
              {/* Action Buttons */}
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add New</span>
              </button>
              
              <button
                onClick={handleExport}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                title="Export"
              >
                <Download className="w-4 h-4 text-gray-600" />
              </button>
              
              <button
                onClick={handleImport}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                title="Import"
              >
                <Upload className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Master Tabs */}
        <div className="px-6 overflow-x-auto">
          <div className="flex space-x-1 border-b border-gray-200 min-w-max">
            {masterConfigs.map((master) => (
              <button
                key={master.id}
                onClick={() => setActiveMaster(master.id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeMaster === master.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className={activeMaster === master.id ? 'text-purple-600' : 'text-gray-400'}>
                  {master.icon}
                </span>
                {master.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Current Master Info */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 bg-${currentMaster.color}-100 rounded-lg`}>
              {currentMaster.icon}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{currentMaster.label}</h2>
              <p className="text-sm text-gray-500">{currentMaster.description}</p>
            </div>
          </div>
          
          {/* Search and Filters */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${currentMaster.label.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 border border-gray-200 rounded-lg hover:bg-gray-50 ${
                showFilters ? 'bg-purple-50 border-purple-200' : ''
              }`}
            >
              <Filter className="w-4 h-4 text-gray-600" />
            </button>
            
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <RefreshCw className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-6 p-4 bg-white border border-gray-200 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input type="text" placeholder="Filter by city..." className="px-3 py-2 border border-gray-200 rounded-lg text-sm" />
              <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                <option value="">Date Range</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700">
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Data Table/Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {filteredData.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No {currentMaster.label} Found</h3>
              <p className="text-gray-500 mb-4">Get started by adding your first {currentMaster.label.toLowerCase()}</p>
              <button
                onClick={handleAdd}
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <Plus className="w-4 h-4" />
                Add New {currentMaster.label.slice(0, -1)}
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {renderTable()}
            </div>
          )}
          
          {/* Pagination */}
          {filteredData.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing 1 to {filteredData.length} of {filteredData.length} entries
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 border border-gray-200 rounded text-sm disabled:opacity-50" disabled>
                  Previous
                </button>
                <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm">1</button>
                <button className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50">3</button>
                <button className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50">Next</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingItem ? 'Edit' : 'Add New'} {currentMaster.label.slice(0, -1)}
              </h3>
            </div>
            
            <div className="p-6">
              <form className="space-y-4">
                {currentMaster.fields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    
                    {field.type === 'select' ? (
                      <select
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required={field.required}
                      >
                        <option value="">Select {field.label}</option>
                        {field.options?.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    ) : field.type === 'textarea' ? (
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                        required={field.required}
                      />
                    ) : field.type === 'boolean' ? (
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2">
                          <input type="radio" name={field.name} value="true" className="text-purple-600" />
                          <span className="text-sm">Yes</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="radio" name={field.name} value="false" className="text-purple-600" />
                          <span className="text-sm">No</span>
                        </label>
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                        required={field.required}
                      />
                    )}
                  </div>
                ))}
              </form>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                {editingItem ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MasterManagement;