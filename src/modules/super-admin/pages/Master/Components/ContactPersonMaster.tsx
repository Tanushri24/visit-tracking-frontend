// src/modules/super-admin/pages/Master/ContactPersonMaster.tsx
import React, { useState } from 'react';
import { 
  Search, 
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  RefreshCw,
  Eye,
  UserCircle,
  Mail,
  Phone,
  Building2,
  MapPin
} from 'lucide-react';

interface ContactPerson {
  id: number;
  name: string;
  designation: string;
  department: string;
  organizationId: number;
  organizationName: string;
  companyId: number;
  companyName: string;
  email: string;
  mobile: string;
  alternatePhone: string;
  whatsappNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  dateOfBirth: string;
  anniversaryDate: string;
  gender: 'Male' | 'Female' | 'Other';
  isPrimary: boolean;
  isDecisionMaker: boolean;
  reportingTo: string;
  remarks: string;
  preferredContactMode: 'Email' | 'Phone' | 'WhatsApp' | 'Any';
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

const ContactPersonMaster = () => {
  const [contacts] = useState<ContactPerson[]>([
    {
      id: 1,
      name: 'Dr. S.K. Rao',
      designation: 'Controller of Examinations',
      department: 'Examination Department',
      organizationId: 1,
      organizationName: 'Examination Wing - MP Board',
      companyId: 2,
      companyName: 'MP Board of Secondary Education',
      email: 'controller@mpbse.com',
      mobile: '+91 755 2551234',
      alternatePhone: '+91 9425001234',
      whatsappNumber: '+91 9425001234',
      address: 'Board Headquarters, Shiva Ji Nagar',
      city: 'Bhopal',
      state: 'Madhya Pradesh',
      pincode: '462011',
      country: 'India',
      dateOfBirth: '1965-05-15',
      anniversaryDate: '1990-12-10',
      gender: 'Male',
      isPrimary: true,
      isDecisionMaker: true,
      reportingTo: 'Education Secretary',
      remarks: 'Key decision maker for examination related purchases',
      preferredContactMode: 'Email',
      status: 'active',
      createdAt: '2024-01-20',
      updatedAt: '2024-02-18'
    },
    {
      id: 2,
      name: 'Prof. V.K. Shrivastava',
      designation: 'Director - IT',
      department: 'IT Department',
      organizationId: 2,
      organizationName: 'University Campus Office',
      companyId: 4,
      companyName: 'Bhoj University',
      email: 'itdirector@bhojuni.ac.in',
      mobile: '+91 755 2731234',
      alternatePhone: '+91 9826005678',
      whatsappNumber: '+91 9826005678',
      address: 'University Campus, Kolar Road',
      city: 'Bhopal',
      state: 'Madhya Pradesh',
      pincode: '462022',
      country: 'India',
      dateOfBirth: '1970-08-22',
      anniversaryDate: '1995-02-14',
      gender: 'Male',
      isPrimary: true,
      isDecisionMaker: true,
      reportingTo: 'Vice Chancellor',
      remarks: 'Handles all IT infrastructure decisions',
      preferredContactMode: 'Phone',
      status: 'active',
      createdAt: '2024-02-01',
      updatedAt: '2024-02-10'
    },
    {
      id: 3,
      name: 'A.K. Singh',
      designation: 'Plant Manager',
      department: 'Production Department',
      organizationId: 3,
      organizationName: 'ITI Limited - Rae Bareli Plant',
      companyId: 3,
      companyName: 'ITI Limited',
      email: 'aksingh@iti.co.in',
      mobile: '+91 535 2701234',
      alternatePhone: '+91 9839001122',
      whatsappNumber: '+91 9839001122',
      address: 'ITI Industrial Area',
      city: 'Rae Bareli',
      state: 'Uttar Pradesh',
      pincode: '229010',
      country: 'India',
      dateOfBirth: '1968-11-30',
      anniversaryDate: '1992-04-25',
      gender: 'Male',
      isPrimary: true,
      isDecisionMaker: true,
      reportingTo: 'Regional Director',
      remarks: 'Retiring next year, establish relationship with successor',
      preferredContactMode: 'Any',
      status: 'inactive',
      createdAt: '2024-01-25',
      updatedAt: '2024-02-15'
    },
    {
      id: 4,
      name: 'Sundar Rajan',
      designation: 'Delivery Manager',
      department: 'Software Development',
      organizationId: 4,
      organizationName: 'Infosys - Electronic City Campus',
      companyId: 5,
      companyName: 'Infosys Limited',
      email: 'sundar.rajan@infosys.com',
      mobile: '+91 80 4112 3456',
      alternatePhone: '+91 9845012345',
      whatsappNumber: '+91 9845012345',
      address: 'Building 12, Electronic City',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560100',
      country: 'India',
      dateOfBirth: '1975-03-18',
      anniversaryDate: '2000-06-20',
      gender: 'Male',
      isPrimary: true,
      isDecisionMaker: false,
      reportingTo: 'VP Engineering',
      remarks: 'Technical evaluator for vendor proposals',
      preferredContactMode: 'Email',
      status: 'active',
      createdAt: '2024-02-05',
      updatedAt: '2024-02-12'
    },
    {
      id: 5,
      name: 'Priya Mehta',
      designation: 'Branch Manager',
      department: 'Retail Banking',
      organizationId: 6,
      organizationName: 'ICICI Bank - BKC Branch',
      companyId: 7,
      companyName: 'ICICI Bank',
      email: 'priya.mehta@icicibank.com',
      mobile: '+91 22 2653 1234',
      alternatePhone: '+91 9987012345',
      whatsappNumber: '+91 9987012345',
      address: 'BKC Complex, Bandra East',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400051',
      country: 'India',
      dateOfBirth: '1980-07-12',
      anniversaryDate: '2005-11-08',
      gender: 'Female',
      isPrimary: true,
      isDecisionMaker: true,
      reportingTo: 'Regional Manager',
      remarks: 'Approves all vendor empanelment',
      preferredContactMode: 'WhatsApp',
      status: 'inactive',
      createdAt: '2024-02-10',
      updatedAt: '2024-02-16'
    },
    {
      id: 6,
      name: 'Rajesh Sharma',
      designation: 'CTO',
      department: 'Research & Development',
      organizationId: 7,
      organizationName: 'Agnigate - Corporate Office',
      companyId: 1,
      companyName: 'Agnigate Technologies Pvt. Ltd.',
      email: 'rajesh@agnigate.com',
      mobile: '+91 9876543210',
      alternatePhone: '+91 9876501234',
      whatsappNumber: '+91 9876543210',
      address: 'Plot No. 123, Scheme No. 74',
      city: 'Indore',
      state: 'Madhya Pradesh',
      pincode: '452010',
      country: 'India',
      dateOfBirth: '1985-09-25',
      anniversaryDate: '2010-01-15',
      gender: 'Male',
      isPrimary: true,
      isDecisionMaker: true,
      reportingTo: 'CEO',
      remarks: 'Founder and technical head',
      preferredContactMode: 'Phone',
      status: 'active',
      createdAt: '2024-01-15',
      updatedAt: '2024-02-20'
    },
    {
      id: 7,
      name: 'Neha Gupta',
      designation: 'HR Manager',
      department: 'Human Resources',
      organizationId: 7,
      organizationName: 'Agnigate - Corporate Office',
      companyId: 1,
      companyName: 'Agnigate Technologies Pvt. Ltd.',
      email: 'neha.gupta@agnigate.com',
      mobile: '+91 9876543222',
      alternatePhone: '+91 9876512345',
      whatsappNumber: '+91 9876543222',
      address: 'Plot No. 123, Scheme No. 74',
      city: 'Indore',
      state: 'Madhya Pradesh',
      pincode: '452010',
      country: 'India',
      dateOfBirth: '1988-12-05',
      anniversaryDate: '2015-03-20',
      gender: 'Female',
      isPrimary: false,
      isDecisionMaker: false,
      reportingTo: 'CTO',
      remarks: 'Handles recruitment and employee relations',
      preferredContactMode: 'Email',
      status: 'active',
      createdAt: '2024-01-16',
      updatedAt: '2024-02-19'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCompany, setFilterCompany] = useState<string>('all');
  const [filterOrganization, setFilterOrganization] = useState<string>('all');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [filterDecisionMaker, setFilterDecisionMaker] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactPerson | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  // Get unique values for filters
  const companies = ['all', ...new Set(contacts.map(c => c.companyName))];
  const organizations = ['all', ...new Set(contacts.map(c => c.organizationName))];
  const departments = ['all', ...new Set(contacts.map(c => c.department))];

  // Filter contacts based on search and filters
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.mobile.includes(searchTerm);
    
    const matchesStatus = filterStatus === 'all' || contact.status === filterStatus;
    const matchesCompany = filterCompany === 'all' || contact.companyName === filterCompany;
    const matchesOrganization = filterOrganization === 'all' || contact.organizationName === filterOrganization;
    const matchesDepartment = filterDepartment === 'all' || contact.department === filterDepartment;
    const matchesDecisionMaker = filterDecisionMaker === 'all' || 
      (filterDecisionMaker === 'yes' && contact.isDecisionMaker) ||
      (filterDecisionMaker === 'no' && !contact.isDecisionMaker);
    
    return matchesSearch && matchesStatus && matchesCompany && matchesOrganization && matchesDepartment && matchesDecisionMaker;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContacts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Name', 'Designation', 'Department', 'Organization', 'Company', 'Email', 'Mobile', 'City', 'Decision Maker', 'Status'];
    const csvData = filteredContacts.map(contact => [
      contact.name,
      contact.designation,
      contact.department,
      contact.organizationName,
      contact.companyName,
      contact.email,
      contact.mobile,
      contact.city,
      contact.isDecisionMaker ? 'Yes' : 'No',
      contact.status
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contact_persons_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // View contact details
  const viewContactDetails = (contact: ContactPerson) => {
    setSelectedContact(contact);
    setShowViewModal(true);
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Contact Person Master</h1>
        <p className="text-sm text-gray-600 mt-1">View contact person details (Read Only)</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
          <p className="text-sm text-gray-600">Total Contacts</p>
          <p className="text-2xl font-bold text-gray-800">{contacts.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-600">Active Contacts</p>
          <p className="text-2xl font-bold text-green-600">{contacts.filter(c => c.status === 'active').length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">Decision Makers</p>
          <p className="text-2xl font-bold text-blue-600">{contacts.filter(c => c.isDecisionMaker).length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-orange-500">
          <p className="text-sm text-gray-600">Primary Contacts</p>
          <p className="text-2xl font-bold text-orange-600">{contacts.filter(c => c.isPrimary).length}</p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="w-full md:w-96 relative">
            <input
              type="text"
              placeholder="Search contacts..."
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
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={filterCompany}
                  onChange={(e) => setFilterCompany(e.target.value)}
                >
                  {companies.map(company => (
                    <option key={company} value={company}>{company === 'all' ? 'All Companies' : company}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={filterOrganization}
                  onChange={(e) => setFilterOrganization(e.target.value)}
                >
                  {organizations.map(org => (
                    <option key={org} value={org}>{org === 'all' ? 'All Organizations' : org}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept === 'all' ? 'All Departments' : dept}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Decision Maker</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={filterDecisionMaker}
                  onChange={(e) => setFilterDecisionMaker(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setFilterStatus('all');
                    setFilterCompany('all');
                    setFilterOrganization('all');
                    setFilterDepartment('all');
                    setFilterDecisionMaker('all');
                    setSearchTerm('');
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2"
                >
                  <RefreshCw size={16} />
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Table with Horizontal Scroll */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1800px] lg:min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Decision Maker</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Primary</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.map((contact, index) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{contact.name}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{contact.designation}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{contact.department}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{contact.organizationName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{contact.companyName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                      {contact.email}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{contact.mobile}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{contact.city}</td>
                  <td className="px-4 py-3">
                    {contact.isDecisionMaker ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                        Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {contact.isPrimary ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                        Primary
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                        Secondary
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                      contact.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => viewContactDetails(contact)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded flex items-center gap-1"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredContacts.length)} of {filteredContacts.length} entries
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-1"
          >
            <ChevronLeft size={16} /> Previous
          </button>
          <span className="px-4 py-1 bg-purple-600 text-white rounded-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-1"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* View Details Modal */}
      {showViewModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Contact Person Details</h2>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedContact(null);
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {/* Personal Information */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3 flex items-center gap-2">
                    <UserCircle size={20} /> Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">{selectedContact.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium">{selectedContact.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-medium">{new Date(selectedContact.dateOfBirth).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Anniversary</p>
                      <p className="font-medium">{new Date(selectedContact.anniversaryDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3 flex items-center gap-2">
                    <Building2 size={20} /> Professional Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Designation</p>
                      <p className="font-medium">{selectedContact.designation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="font-medium">{selectedContact.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Organization</p>
                      <p className="font-medium">{selectedContact.organizationName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Company</p>
                      <p className="font-medium">{selectedContact.companyName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Reporting To</p>
                      <p className="font-medium">{selectedContact.reportingTo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Remarks</p>
                      <p className="font-medium">{selectedContact.remarks}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3 flex items-center gap-2">
                    <Mail size={20} /> Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-blue-600">
                        <a href={`mailto:${selectedContact.email}`}>{selectedContact.email}</a>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Mobile</p>
                      <p className="font-medium">{selectedContact.mobile}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Alternate Phone</p>
                      <p className="font-medium">{selectedContact.alternatePhone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">WhatsApp</p>
                      <p className="font-medium">{selectedContact.whatsappNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Preferred Contact Mode</p>
                      <p className="font-medium">{selectedContact.preferredContactMode}</p>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3 flex items-center gap-2">
                    <MapPin size={20} /> Address Information
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    <p className="font-medium">{selectedContact.address}</p>
                    <p>{selectedContact.city}, {selectedContact.state} - {selectedContact.pincode}</p>
                    <p>{selectedContact.country}</p>
                  </div>
                </div>

                {/* Status Information */}
                <div>
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">Status & System Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                        selectedContact.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedContact.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Decision Maker</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                        selectedContact.isDecisionMaker ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedContact.isDecisionMaker ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Primary Contact</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                        selectedContact.isPrimary ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedContact.isPrimary ? 'Primary' : 'Secondary'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Created At</p>
                      <p className="text-sm">{new Date(selectedContact.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedContact(null);
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
      {filteredContacts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <UserCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">No contact persons found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ContactPersonMaster;