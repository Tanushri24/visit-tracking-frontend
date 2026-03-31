// src/modules/super-admin/pages/Master/OrganizationMaster.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, ChevronLeft, ChevronRight, Filter, Download, RefreshCw, Eye, Plus } from 'lucide-react';

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

const OrganizationMaster = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [showInsertModal, setShowInsertModal] = useState(false);

  const [newOrganization, setNewOrganization] = useState({
    organisationName: '',
    companyId: 0,
    address: '',
    city: '',
    state: '',
    pincode: '',
    isActive: true
  });

  const safeLower = (value?: string | null) => (value ?? '').toString().toLowerCase();

  const normalizeOrganization = (org: Partial<Organization>): Organization => ({
    id: Number(org.id ?? 0),
    organisationName: org.organisationName ?? '',
    companyId: Number(org.companyId ?? 0),
    address: org.address ?? '',
    city: org.city ?? '',
    state: org.state ?? '',
    pincode: org.pincode ?? '',
    isActive: Boolean(org.isActive ?? true)
  });

  const fetchOrganizations = async (): Promise<Organization[]> => {
    try {
      setLoading(true);
      const res = await axios.get<Organization[]>('https://localhost:7146/api/Organisation');
      const normalizedData = (res.data ?? []).map((org) => normalizeOrganization(org));
      setOrganizations(normalizedData);
      return normalizedData;
    } catch {
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredOrganizations = organizations.filter((org) => {
    if (!normalizedSearch) return true;
    return (
      safeLower(org.organisationName).includes(normalizedSearch) ||
      safeLower(org.city).includes(normalizedSearch) ||
      safeLower(org.state).includes(normalizedSearch)
    );
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

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-center py-10">Loading...</p>
          ) : (
            <table className="w-full min-w-[900px] lg:min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organisation Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Id</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pincode</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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

      {showInsertModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6">
            <h2 className="text-xl font-bold mb-4">Add Organization</h2>
            <div className="grid grid-cols-1 gap-3">
              <label className="text-sm font-medium">Organisation Name</label>
              <input
                name="organisationName"
                value={newOrganization.organisationName}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <label className="text-sm font-medium">Company Id</label>
              <input
                name="companyId"
                type="number"
                value={newOrganization.companyId}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <label className="text-sm font-medium">Address</label>
              <input
                name="address"
                value={newOrganization.address}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <label className="text-sm font-medium">City</label>
              <input
                name="city"
                value={newOrganization.city}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <label className="text-sm font-medium">State</label>
              <input
                name="state"
                value={newOrganization.state}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <label className="text-sm font-medium">Pincode</label>
              <input
                name="pincode"
                value={newOrganization.pincode}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setShowInsertModal(false)} className="px-4 py-2 border border-gray-300 rounded">Cancel</button>
              <button onClick={handleInsertOrganization} className="px-4 py-2 bg-purple-600 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationMaster;
