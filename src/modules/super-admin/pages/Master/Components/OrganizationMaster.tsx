// src/modules/super-admin/pages/Master/OrganizationMaster.tsx
import React, { useState } from 'react';
import { 
  Search, 
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Building2
} from 'lucide-react';

interface Organization {
  id: number;
  organizationName: string;
  companyId: number;
  companyName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  gstNo: string;
  registrationNo: string;
  establishedYear: string;
  employeeCount: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

const OrganizationMaster = () => {
  const [organizations] = useState<Organization[]>([
    {
      id: 1,
      organizationName: 'Examination Wing - MP Board',
      companyId: 2,
      companyName: 'MP Board of Secondary Education',
      address: 'Bhopal',
      city: 'Bhopal',
      state: 'Madhya Pradesh',
      pincode: '462011',
      contactPerson: 'Dr. S.K. Rao',
      contactEmail: 'examwing@mpbse.com',
      contactPhone: '+91 755 2551234',
      website: 'www.mpbse.nic.in/exam',
      gstNo: '23BBBBB0000B2Z6',
      registrationNo: 'EDU/MP/2024/001',
      establishedYear: '1965',
      employeeCount: '150+',
      status: 'active',
      createdAt: '2024-01-20',
      updatedAt: '2024-02-18'
    },
    {
      id: 2,
      organizationName: 'University Campus Office',
      companyId: 4,
      companyName: 'Bhoj University',
      address: 'Bhopal',
      city: 'Bhopal',
      state: 'Madhya Pradesh',
      pincode: '462022',
      contactPerson: 'Prof. V.K. Shrivastava',
      contactEmail: 'campus@bhojuni.ac.in',
      contactPhone: '+91 755 2731234',
      website: 'www.bhojuni.ac.in/campus',
      gstNo: '23DDDDD0000D4Z8',
      registrationNo: 'UNI/MP/1992/045',
      establishedYear: '1992',
      employeeCount: '200+',
      status: 'active',
      createdAt: '2024-02-01',
      updatedAt: '2024-02-10'
    },
    {
      id: 3,
      organizationName: 'ITI Limited - Rae Bareli Plant',
      companyId: 3,
      companyName: 'ITI Limited',
      address: 'ITI Industrial Area',
      city: 'Rae Bareli',
      state: 'Uttar Pradesh',
      pincode: '229010',
      contactPerson: 'A.K. Singh',
      contactEmail: 'plant@iti.co.in',
      contactPhone: '+91 535 2701234',
      website: 'www.itiltd.in/raebareli',
      gstNo: '09CCCCC0000C3Z7',
      registrationNo: 'IND/UP/1950/789',
      establishedYear: '1950',
      employeeCount: '500+',
      status: 'inactive',
      createdAt: '2024-01-25',
      updatedAt: '2024-02-15'
    },
    {
      id: 4,
      organizationName: 'Infosys - Electronic City Campus',
      companyId: 5,
      companyName: 'Infosys Limited',
      address: 'Electronic City',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560100',
      contactPerson: 'Sundar Rajan',
      contactEmail: 'campus@infosys.com',
      contactPhone: '+91 80 4112 3456',
      website: 'www.infosys.com/campus',
      gstNo: '29EEEEE0000E5Z9',
      registrationNo: 'IT/KA/1999/123',
      establishedYear: '1999',
      employeeCount: '1000+',
      status: 'active',
      createdAt: '2024-02-05',
      updatedAt: '2024-02-12'
    },
    {
      id: 5,
      organizationName: 'Tata Motors - Pimpri Plant',
      companyId: 6,
      companyName: 'Tata Motors',
      address: 'Pimpri Chinchwad',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411018',
      contactPerson: 'Vikram Singh',
      contactEmail: 'pimpri@tatamotors.com',
      contactPhone: '+91 20 6732 1234',
      website: 'www.tatamotors.com/pimpri',
      gstNo: '27FFFFF0000F6Z0',
      registrationNo: 'AUTO/MH/1945/456',
      establishedYear: '1945',
      employeeCount: '2000+',
      status: 'active',
      createdAt: '2024-02-08',
      updatedAt: '2024-02-14'
    },
    {
      id: 6,
      organizationName: 'ICICI Bank - BKC Branch',
      companyId: 7,
      companyName: 'ICICI Bank',
      address: 'Bandra Kurla Complex',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400051',
      contactPerson: 'Priya Mehta',
      contactEmail: 'bkc@icicibank.com',
      contactPhone: '+91 22 2653 1234',
      website: 'www.icicibank.com/bkc',
      gstNo: '27GGGGG0000G7Z1',
      registrationNo: 'BANK/MH/1994/789',
      establishedYear: '1994',
      employeeCount: '300+',
      status: 'inactive',
      createdAt: '2024-02-10',
      updatedAt: '2024-02-16'
    },
    {
      id: 7,
      organizationName: 'Agnigate - Corporate Office',
      companyId: 1,
      companyName: 'Agnigate Technologies Pvt. Ltd.',
      address: 'Plot No. 123, Scheme No. 74',
      city: 'Indore',
      state: 'Madhya Pradesh',
      pincode: '452010',
      contactPerson: 'Rajesh Sharma',
      contactEmail: 'corporate@agnigate.com',
      contactPhone: '+91 9876543210',
      website: 'www.agnigate.com/corporate',
      gstNo: '23AAAAA0000A1Z5',
      registrationNo: 'IT/MP/2010/321',
      establishedYear: '2010',
      employeeCount: '50+',
      status: 'active',
      createdAt: '2024-01-15',
      updatedAt: '2024-02-20'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCompany, setFilterCompany] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);

  // Get unique companies for filter
  const companies = ['all', ...new Set(organizations.map(o => o.companyName))];

  // Filter organizations based on search and filters
  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = 
      org.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.contactEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || org.status === filterStatus;
    const matchesCompany = filterCompany === 'all' || org.companyName === filterCompany;
    
    return matchesSearch && matchesStatus && matchesCompany;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrganizations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrganizations.length / itemsPerPage);

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Organization Name', 'Company', 'City', 'State', 'Contact Person', 'Email', 'Phone', 'Status'];
    const csvData = filteredOrganizations.map(org => [
      org.organizationName,
      org.companyName,
      org.city,
      org.state,
      org.contactPerson,
      org.contactEmail,
      org.contactPhone,
      org.status
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `organizations_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // View organization details
  const viewOrganizationDetails = (organization: Organization) => {
    setSelectedOrganization(organization);
    setShowViewModal(true);
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Organization Master</h1>
        <p className="text-sm text-gray-600 mt-1">View organization details (Read Only)</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
          <p className="text-sm text-gray-600">Total Organizations</p>
          <p className="text-2xl font-bold text-gray-800">{organizations.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-600">Active Organizations</p>
          <p className="text-2xl font-bold text-green-600">{organizations.filter(o => o.status === 'active').length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
          <p className="text-sm text-gray-600">Inactive Organizations</p>
          <p className="text-2xl font-bold text-red-600">{organizations.filter(o => o.status === 'inactive').length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">Companies</p>
          <p className="text-2xl font-bold text-blue-600">{companies.length - 1}</p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="w-full md:w-96 relative">
            <input
              type="text"
              placeholder="Search organizations..."
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setFilterStatus('all');
                    setFilterCompany('all');
                    setSearchTerm('');
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2"
                >
                  <RefreshCw size={16} />
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Table with Horizontal Scroll - Works on all devices */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1400px] lg:min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Person</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration No</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.map((org, index) => (
                <tr key={org.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-900">{org.organizationName}</p>
                      <p className="text-xs text-gray-500">{org.website}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{org.companyName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{org.city}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{org.state}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{org.contactPerson}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <a href={`mailto:${org.contactEmail}`} className="text-blue-600 hover:underline">
                      {org.contactEmail}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{org.contactPhone}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{org.registrationNo}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                      org.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {org.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => viewOrganizationDetails(org)}
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
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredOrganizations.length)} of {filteredOrganizations.length} entries
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
      {showViewModal && selectedOrganization && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Organization Details</h2>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedOrganization(null);
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {/* Organization Information */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">Organization Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Organization Name</p>
                      <p className="font-medium">{selectedOrganization.organizationName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Company</p>
                      <p className="font-medium">{selectedOrganization.companyName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Registration No</p>
                      <p className="font-medium">{selectedOrganization.registrationNo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">GST No</p>
                      <p className="font-medium">{selectedOrganization.gstNo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <p className="font-medium text-blue-600">
                        <a href={`https://${selectedOrganization.website}`} target="_blank" rel="noopener noreferrer">
                          {selectedOrganization.website}
                        </a>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                        selectedOrganization.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedOrganization.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Established Year</p>
                      <p className="font-medium">{selectedOrganization.establishedYear}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Employee Count</p>
                      <p className="font-medium">{selectedOrganization.employeeCount}</p>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">Address</h3>
                  <div className="grid grid-cols-1 gap-2">
                    <p className="font-medium">{selectedOrganization.address}</p>
                    <p>{selectedOrganization.city}, {selectedOrganization.state} - {selectedOrganization.pincode}</p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Contact Person</p>
                      <p className="font-medium">{selectedOrganization.contactPerson}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-blue-600">
                        <a href={`mailto:${selectedOrganization.contactEmail}`}>{selectedOrganization.contactEmail}</a>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{selectedOrganization.contactPhone}</p>
                    </div>
                  </div>
                </div>

                {/* System Information */}
                <div>
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">System Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Created At</p>
                      <p className="font-medium">{new Date(selectedOrganization.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Last Updated</p>
                      <p className="font-medium">{new Date(selectedOrganization.updatedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedOrganization(null);
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
      {filteredOrganizations.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">No organizations found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default OrganizationMaster;