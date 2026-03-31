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
  Building2,
  Plus,
  Trash2
} from 'lucide-react';

interface Organization {
  id: number;
  organisationName: string;
  companyId: number;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isActive: boolean;
}

// Sample company data for dropdown
const sampleCompanies = [
  { id: 1, name: 'Agnigate Technologies Pvt. Ltd.' },
  { id: 2, name: 'MP Board of Secondary Education' },
  { id: 3, name: 'ITI Limited' },
  { id: 4, name: 'Bhoj University' },
  { id: 5, name: 'Infosys Limited' },
  { id: 6, name: 'Tata Motors' },
  { id: 7, name: 'ICICI Bank' },
];

const OrganizationMaster = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showInsertModal, setShowInsertModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [organizationToDelete, setOrganizationToDelete] = useState<Organization | null>(null);
  
  // Form state for new organization
  const [newOrganization, setNewOrganization] = useState({
    organizationName: '',
    companyId: 0,
    companyName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    gstNo: '',
    registrationNo: '',
    establishedYear: '',
    employeeCount: '',
    status: 'active' as 'active' | 'inactive'
  });

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrganizations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.max(1, Math.ceil(filteredOrganizations.length / itemsPerPage));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewOrganization((prev) => ({ ...prev, [name]: name === 'companyId' ? Number(value) : value }));
  };

  const handleInsertOrganization = async () => {
    if (!newOrganization.organisationName || !newOrganization.companyId || !newOrganization.address || !newOrganization.city || !newOrganization.state || !newOrganization.pincode) {
      alert('Organisation Name, Company Id, Address, City, State and Pincode are required');
      return;
    }

    const payload = {
      organisationName: newOrganization.organisationName.trim(),
      companyId: Number(newOrganization.companyId),
      address: newOrganization.address.trim(),
      city: newOrganization.city.trim(),
      state: newOrganization.state.trim(),
      pincode: newOrganization.pincode.trim(),
      isActive: newOrganization.isActive
    };

    console.log('Sending payload:', payload);

    try {
      setLoading(true);
      const response = await axios.post('https://localhost:7146/api/Organisation', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const createdOrganization = normalizeOrganization({
        id: response?.data?.id ?? Date.now(),
        organisationName: response?.data?.organisationName ?? payload.organisationName,
        companyId: response?.data?.companyId ?? payload.companyId,
        address: response?.data?.address ?? payload.address,
        city: response?.data?.city ?? payload.city,
        state: response?.data?.state ?? payload.state,
        pincode: response?.data?.pincode ?? payload.pincode,
        isActive: response?.data?.isActive ?? payload.isActive
      });

      setOrganizations((prev) => [createdOrganization, ...prev]);
      setCurrentPage(1);
      setShowInsertModal(false);
      setNewOrganization({ organisationName: '', companyId: 0, address: '', city: '', state: '', pincode: '', isActive: true });
      alert('Organization created successfully');
    } catch (error: any) {
      const refreshedOrganizations = await fetchOrganizations();
      const normalizedOrganizationName = payload.organisationName.toLowerCase();
      const normalizedAddress = payload.address.toLowerCase();
      const normalizedCity = payload.city.toLowerCase();
      const normalizedState = payload.state.toLowerCase();
      const normalizedPincode = payload.pincode.toLowerCase();

      const matchingOrganization = refreshedOrganizations.find((org) => {
        const sameName = org.organisationName.trim().toLowerCase() === normalizedOrganizationName;
        const sameCompany = org.companyId === payload.companyId;
        const sameAddress = org.address.trim().toLowerCase() === normalizedAddress;
        const sameCity = org.city.trim().toLowerCase() === normalizedCity;
        const sameState = org.state.trim().toLowerCase() === normalizedState;
        const samePincode = org.pincode.trim().toLowerCase() === normalizedPincode;

        return sameName && (sameCompany || sameAddress || sameCity || sameState || samePincode);
      });

      if (matchingOrganization) {
        setOrganizations((prev) => {
          const alreadyExists = prev.some((org) => org.id === matchingOrganization.id);
          return alreadyExists ? prev : [matchingOrganization, ...prev];
        });
        setCurrentPage(1);
        setShowInsertModal(false);
        setNewOrganization({ organisationName: '', companyId: 0, address: '', city: '', state: '', pincode: '', isActive: true });
        alert('Organization created successfully');
        return;
      }

      const validationErrors = error?.response?.data?.errors;
      const validationMessage =
        validationErrors && typeof validationErrors === 'object'
          ? Object.values(validationErrors).flat().join('\n')
          : null;

      const errorMessage =
        validationMessage ||
        error?.response?.data?.message ||
        error?.response?.data?.title ||
        'Organization creation failed';
      alert(typeof errorMessage === 'string' ? errorMessage : 'Organization creation failed');
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['Id', 'Organisation Name', 'Company Id', 'Address', 'City', 'State', 'Pincode', 'Active'];
    const rows = filteredOrganizations.map((org) => [
      org.id,
      org.organisationName || '',
      org.companyId,
      org.address || '',
      org.city || '',
      org.state || '',
      org.pincode || '',
      org.isActive ? 'active' : 'inactive'
    ]);
    const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `organizations_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const viewOrganizationDetails = (organization: Organization) => {
    console.log('View organization', organization);
  };

  // Delete organization
  const handleDeleteOrganization = () => {
    if (organizationToDelete) {
      setOrganizations(organizations.filter(o => o.id !== organizationToDelete.id));
      setShowDeleteModal(false);
      setOrganizationToDelete(null);
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (organization: Organization) => {
    setOrganizationToDelete(organization);
    setShowDeleteModal(true);
  };

  // Handle insert form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'companyId') {
      const selectedCompany = sampleCompanies.find(c => c.id === parseInt(value));
      setNewOrganization(prev => ({ 
        ...prev, 
        companyId: parseInt(value),
        companyName: selectedCompany ? selectedCompany.name : ''
      }));
    } else {
      setNewOrganization(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleInsertOrganization = () => {
    const newId = Math.max(...organizations.map(o => o.id), 0) + 1;
    const currentDate = new Date().toISOString().split('T')[0];
    
    const organizationToAdd: Organization = {
      id: newId,
      ...newOrganization,
      createdAt: currentDate,
      updatedAt: currentDate
    };
    
    setOrganizations([...organizations, organizationToAdd]);
    setShowInsertModal(false);
    setNewOrganization({
      organizationName: '',
      companyId: 0,
      companyName: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      contactPerson: '',
      contactEmail: '',
      contactPhone: '',
      website: '',
      gstNo: '',
      registrationNo: '',
      establishedYear: '',
      employeeCount: '',
      status: 'active'
    });
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Organization Master</h1>
        <p className="text-sm text-gray-600 mt-1">Manage organization details</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
          <p className="text-sm text-gray-600">Total Organizations</p>
          <p className="text-2xl font-bold text-gray-800">{organizations.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">Showing</p>
          <p className="text-2xl font-bold text-blue-600">{filteredOrganizations.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
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

          {/* Action Buttons - Add Organization moved to left of Filter and Export */}
          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={() => setShowInsertModal(true)}
              className="flex-1 md:flex-none px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              <span>Add Organization</span>
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex-1 md:flex-none px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>
            <button
              onClick={exportToCSV}
              className="flex-1 md:flex-none px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <Download size={18} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={() => {
                setSearchTerm('');
                setCurrentPage(1);
                setShowFilters(false);
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2"
            >
              <RefreshCw size={16} />
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Table */}
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
                  <td className="px-4 py-3 text-sm text-gray-600">{indexOfFirstItem + index + 1}</td>
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
                      org.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {org.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => viewOrganizationDetails(org)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(org)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        title="Delete Organization"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.map((org, index) => (
                  <tr key={org.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-600">{indexOfFirstItem + index + 1}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{org.organisationName || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{org.companyId}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{org.address || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{org.city || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{org.state || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{org.pincode || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{org.isActive ? 'active' : 'inactive'}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => viewOrganizationDetails(org)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredOrganizations.length)} of {filteredOrganizations.length} entries
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border border-gray-300"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border border-gray-300"
          >
            <ChevronRight size={16} />
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
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">Organization Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><p className="text-sm text-gray-500">Organization Name</p><p className="font-medium">{selectedOrganization.organizationName}</p></div>
                    <div><p className="text-sm text-gray-500">Company</p><p className="font-medium">{selectedOrganization.companyName}</p></div>
                    <div><p className="text-sm text-gray-500">Registration No</p><p className="font-medium">{selectedOrganization.registrationNo}</p></div>
                    <div><p className="text-sm text-gray-500">GST No</p><p className="font-medium">{selectedOrganization.gstNo}</p></div>
                    <div><p className="text-sm text-gray-500">Website</p><p className="font-medium text-blue-600">{selectedOrganization.website}</p></div>
                    <div><p className="text-sm text-gray-500">Status</p><span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${selectedOrganization.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{selectedOrganization.status}</span></div>
                    <div><p className="text-sm text-gray-500">Established Year</p><p className="font-medium">{selectedOrganization.establishedYear}</p></div>
                    <div><p className="text-sm text-gray-500">Employee Count</p><p className="font-medium">{selectedOrganization.employeeCount}</p></div>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">Address</h3>
                  <p className="font-medium">{selectedOrganization.address}</p>
                  <p>{selectedOrganization.city}, {selectedOrganization.state} - {selectedOrganization.pincode}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><p className="text-sm text-gray-500">Contact Person</p><p className="font-medium">{selectedOrganization.contactPerson}</p></div>
                    <div><p className="text-sm text-gray-500">Email</p><p className="font-medium text-blue-600">{selectedOrganization.contactEmail}</p></div>
                    <div><p className="text-sm text-gray-500">Phone</p><p className="font-medium">{selectedOrganization.contactPhone}</p></div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button onClick={() => setShowViewModal(false)} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Insert Organization Modal */}
      {showInsertModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Add New Organization</h2>
                <button
                  onClick={() => {
                    setShowInsertModal(false);
                    setNewOrganization({
                      organizationName: '', companyId: 0, companyName: '', address: '', city: '', state: '', pincode: '',
                      contactPerson: '', contactEmail: '', contactPhone: '', website: '', gstNo: '', registrationNo: '',
                      establishedYear: '', employeeCount: '', status: 'active'
                    });
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleInsertOrganization(); }}>
                {/* Basic Information */}
                <div className="border-b pb-4 mb-4">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name *</label>
                      <input type="text" name="organizationName" value={newOrganization.organizationName} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Parent Company *</label>
                      <select name="companyId" value={newOrganization.companyId} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500">
                        <option value="">Select Company</option>
                        {sampleCompanies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
                      <input type="text" name="registrationNo" value={newOrganization.registrationNo} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                      <input type="text" name="gstNo" value={newOrganization.gstNo} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                      <input type="text" name="website" value={newOrganization.website} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Established Year</label>
                      <input type="text" name="establishedYear" value={newOrganization.establishedYear} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Employee Count</label>
                      <input type="text" name="employeeCount" value={newOrganization.employeeCount} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select name="status" value={newOrganization.status} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="border-b pb-4 mb-4">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">Address Information</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Address *</label>
                      <textarea name="address" value={newOrganization.address} onChange={handleInputChange} required rows={2} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">City *</label><input type="text" name="city" value={newOrganization.city} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">State *</label><input type="text" name="state" value={newOrganization.state} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label><input type="text" name="pincode" value={newOrganization.pincode} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" /></div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Contact Person *</label><input type="text" name="contactPerson" value={newOrganization.contactPerson} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Email *</label><input type="email" name="contactEmail" value={newOrganization.contactEmail} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label><input type="tel" name="contactPhone" value={newOrganization.contactPhone} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" /></div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button type="button" onClick={() => setShowInsertModal(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Add Organization</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && organizationToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-center text-gray-800 mb-2">Confirm Delete</h3>
              <p className="text-sm text-gray-600 text-center mb-4">
                Are you sure you want to delete the organization <strong className="text-gray-800">{organizationToDelete.organizationName}</strong>?
                <br />
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setOrganizationToDelete(null);
                  }}
                  className="flex-1 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteOrganization}
                  className="flex-1 px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationMaster;
