// src/modules/super-admin/pages/Master/OrganizationMaster.tsx

import React, { useState,useEffect } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Download,
  Building2,
  Plus,
  Trash2,
  X,
  CheckCircle,
  AlertCircle,
  Edit,
  TrendingUp,
  Users,
  Calendar,
  Briefcase,
} from "lucide-react";

import { createOrganisation, getOrganisations } from '../../../services/organization.service';

interface Organisation {
  id: number;
  organisationName: string;
  companyId: number;
  address: string;
  city: string;
  state: string;
  updatedBy: string;
  updatedDate: string;
}

const sampleCompanies = [
  { id: 1, name: "Agnigate Technologies Pvt. Ltd." },
  { id: 2, name: "MP Board of Secondary Education" },
  { id: 3, name: "ITI Limited" },
];

const OrganisationMaster = () => {

  const [organisations, setOrganisations] = useState<Organisation[]>([
    {
      id: 1,
      organisationName: "Exam Wing MP Board",
      companyId: 2,
      address: "Shivaji Nagar",
      city: "Bhopal",
      state: "MP",
      updatedBy: "Admin",
      updatedDate: "2026-04-01"
    },
    {
      id: 2,
      organisationName: "Agnigate Corporate Office",
      companyId: 1,
      address: "Vijay Nagar",
      city: "Indore",
      state: "MP",
      updatedBy: "Super Admin",
      updatedDate: "2026-03-28"
    },
    {
      id: 3,
      organisationName: "ITI Training Center",
      companyId: 3,
      address: "Govindpura",
      city: "Bhopal",
      state: "MP",
      updatedBy: "Admin",
      updatedDate: "2026-03-25"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showInsertModal, setShowInsertModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [newOrganisation, setNewOrganisation] = useState({
    organisationName: "",
    companyId: 0,
    address: "",
    city: "",
    state: "",
    updatedBy: "Super Admin"
  });

  const [editOrganisation, setEditOrganisation] = useState({
    id: 0,
    organisationName: "",
    companyId: 0,
    address: "",
    city: "",
    state: "",
    updatedBy: ""
  });

  const itemsPerPage = 10;

const fetchOrganisations = async () => {
  try {
    const data = await getOrganisations();

    const formatted = data.map((org: any) => ({
      id: org.id,
      organisationName: org.organisationName,
      companyId: org.companyId,
      address: org.address,
      city: org.city,
      state: org.state,
      updatedBy: org.updatedBy,
      updatedDate: org.updatedDate
    }));

    setOrganisations(formatted);

  } catch (error) {
    console.error("Error fetching organisations:", error);
  }
};

useEffect(() => {
  fetchOrganisations();
}, []);

  const getCompanyName = (companyId: number) => {
    const company = sampleCompanies.find(c => c.id === companyId);
    return company ? company.name : "N/A";
  };

  const filteredOrganisations = organisations.filter((org) =>
    org.organisationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getCompanyName(org.companyId).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentItems = filteredOrganisations.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredOrganisations.length / itemsPerPage);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewOrganisation({ ...newOrganisation, [name]: value });
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditOrganisation({ ...editOrganisation, [name]: value });
  };

  const handleInsertOrganisation = async () => {
    const payload = {
      id: 0,
      organisationName: newOrganisation.organisationName,
      companyId: Number(newOrganisation.companyId),
      address: newOrganisation.address,
      city: newOrganisation.city,
      state: newOrganisation.state,
      updatedBy: newOrganisation.updatedBy,
      updatedDate: new Date().toISOString()
    };

    try {
      const response = await createOrganisation(payload);
      
      const newOrg: Organisation = {
        ...payload,
        id: response?.id || Date.now(),
        updatedDate: new Date().toISOString().split('T')[0]
      };

      setOrganisations([...organisations, newOrg]);
      setShowInsertModal(false);
      setSuccessMessage("Organisation added successfully!");
      setShowSuccessMessage(true);

      setTimeout(() => setShowSuccessMessage(false), 3000);

      setNewOrganisation({
        organisationName: "",
        companyId: 0,
        address: "",
        city: "",
        state: "",
        updatedBy: "Super Admin"
      });

    } catch (error) {
      console.error(error);
      alert("Failed to create organisation");
    }
  };

  const handleUpdateOrganisation = () => {
    setOrganisations(organisations.map(org => 
      org.id === editOrganisation.id 
        ? {
            ...org,
            organisationName: editOrganisation.organisationName,
            companyId: editOrganisation.companyId,
            address: editOrganisation.address,
            city: editOrganisation.city,
            state: editOrganisation.state,
            updatedBy: editOrganisation.updatedBy,
            updatedDate: new Date().toISOString().split('T')[0]
          }
        : org
    ));
    setShowEditModal(false);
    setSuccessMessage("Organisation updated successfully!");
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleDeleteOrganisation = (id: number) => {
    setOrganisations(organisations.filter(o => o.id !== id));
    setShowDeleteConfirm(null);
    setSuccessMessage("Organisation deleted successfully!");
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const openEditModal = (org: Organisation) => {
    setEditOrganisation({
      id: org.id,
      organisationName: org.organisationName,
      companyId: org.companyId,
      address: org.address,
      city: org.city,
      state: org.state,
      updatedBy: org.updatedBy
    });
    setShowEditModal(true);
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Organisation Name', 'Company ID', 'Address', 'City', 'State', 'Updated By', 'Updated Date'];
    const csvData = filteredOrganisations.map((org) => [
      org.id,
      org.organisationName,
      org.companyId,
      org.address,
      org.city,
      org.state,
      org.updatedBy,
      org.updatedDate
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `organisations_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    setSuccessMessage("Export completed successfully!");
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  // Calculate statistics
  const totalOrganisations = organisations.length;
  const totalCompanies = sampleCompanies.length;
  const lastUpdated = organisations.reduce((latest, org) => {
    return org.updatedDate > latest ? org.updatedDate : latest;
  }, organisations[0]?.updatedDate || "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-6 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="text-purple-600" size={28} />
            <h1 className="text-3xl font-bold text-gray-900">Organisation Master</h1>
          </div>
          <p className="text-gray-600">Manage and organise all organisational entities in the system</p>
        </div>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="fixed top-4 right-4 z-50 animate-slide-in">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 shadow-lg">
              <CheckCircle className="text-green-600" size={20} />
              <p className="text-green-800">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200">
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-md p-1.5 shadow-lg group-hover:scale-110 transition-transform">
                  <Building2 size={16} className="text-white" />
                </div>
                <TrendingUp className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" size={12} />
              </div>
              <div>
                <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-0.5">Total Organisations</p>
                <p className="text-xl font-bold text-gray-900">{totalOrganisations}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">+{totalOrganisations} total entries</p>
              </div>
            </div>
            <div className="h-0.5 bg-gradient-to-r from-purple-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform"></div>
          </div>
          
          <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200">
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-md p-1.5 shadow-lg group-hover:scale-110 transition-transform">
                  <Users size={16} className="text-white" />
                </div>
                <TrendingUp className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" size={12} />
              </div>
              <div>
                <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-0.5">Active Organisations</p>
                <p className="text-xl font-bold text-gray-900">{organisations.length}</p>
                <p className="text-[10px] text-green-600 mt-0.5">All active</p>
              </div>
            </div>
            <div className="h-0.5 bg-gradient-to-r from-green-500 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform"></div>
          </div>
          
          <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200">
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-md p-1.5 shadow-lg group-hover:scale-110 transition-transform">
                  <Briefcase size={16} className="text-white" />
                </div>
              </div>
              <div>
                <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-0.5">Associated Companies</p>
                <p className="text-xl font-bold text-gray-900">{totalCompanies}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Across all industries</p>
              </div>
            </div>
            <div className="h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform"></div>
          </div>
          
          <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200">
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-md p-1.5 shadow-lg group-hover:scale-110 transition-transform">
                  <Calendar size={16} className="text-white" />
                </div>
              </div>
              <div>
                <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-0.5">Last Updated</p>
                <p className="text-base font-bold text-gray-900">{lastUpdated || "N/A"}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Most recent update</p>
              </div>
            </div>
            <div className="h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform"></div>
          </div>
        </div>
        
        {/* Action Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by organisation name, company ID, or city..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700 transition-all hover:shadow-md"
              >
                <Download size={18} /> Export
              </button>
              <button
                onClick={() => setShowInsertModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg flex items-center gap-2 hover:shadow-lg transition-all hover:scale-105"
              >
                <Plus size={18} /> Add Organisation
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Organisation Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Company ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Address</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">City</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">State</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Updated By</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Updated Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map((org) => (
                    <tr key={org.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-4 py-3 text-sm text-gray-600">{org.id}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Building2 size={16} className="text-purple-500" />
                          <span className="font-medium text-gray-900">{org.organisationName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-700">{org.companyId}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{org.address || 'N/A'}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{org.city}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {org.state}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{org.updatedBy}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-700">{new Date(org.updatedDate).toLocaleDateString()}</span>
                          <span className="text-xs text-gray-400">{new Date(org.updatedDate).toLocaleTimeString()}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(org)}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Edit Organisation"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(org.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Organisation"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="px-4 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Building2 size={48} className="text-gray-300" />
                        <p className="text-gray-500">No organisations found</p>
                        <button
                          onClick={() => setShowInsertModal(true)}
                          className="mt-2 text-purple-600 hover:text-purple-700 font-medium"
                        >
                          Add your first organisation
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Pagination */}
        {filteredOrganisations.length > 0 && (
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-600">
              Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filteredOrganisations.length)} of {filteredOrganisations.length} entries
            </div>
            <div className="flex gap-2 items-center">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} /> Previous
              </button>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1.5 rounded-lg transition-colors ${
                        currentPage === pageNum
                          ? 'bg-purple-600 text-white'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Insert Modal */}
        {showInsertModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-[550px] max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Plus size={24} className="text-purple-600" />
                  <h2 className="text-xl font-bold text-gray-900">Add New Organisation</h2>
                </div>
                <button
                  onClick={() => setShowInsertModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organisation Name *</label>
                    <input
                      name="organisationName"
                      placeholder="Enter organisation name"
                      value={newOrganisation.organisationName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                    <select
                      name="companyId"
                      value={newOrganisation.companyId}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value={0}>Select Company</option>
                      {sampleCompanies.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      name="address"
                      placeholder="Enter full address"
                      value={newOrganisation.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        name="city"
                        placeholder="Enter city"
                        value={newOrganisation.city}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        name="state"
                        placeholder="Enter state"
                        value={newOrganisation.state}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowInsertModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleInsertOrganisation}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Save Organisation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-[550px] max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Edit size={24} className="text-green-600" />
                  <h2 className="text-xl font-bold text-gray-900">Edit Organisation</h2>
                </div>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organisation Name *</label>
                    <input
                      name="organisationName"
                      placeholder="Enter organisation name"
                      value={editOrganisation.organisationName}
                      onChange={handleEditInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                    <select
                      name="companyId"
                      value={editOrganisation.companyId}
                      onChange={handleEditInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value={0}>Select Company</option>
                      {sampleCompanies.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      name="address"
                      placeholder="Enter full address"
                      value={editOrganisation.address}
                      onChange={handleEditInputChange}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        name="city"
                        placeholder="Enter city"
                        value={editOrganisation.city}
                        onChange={handleEditInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        name="state"
                        placeholder="Enter state"
                        value={editOrganisation.state}
                        onChange={handleEditInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Updated By</label>
                    <input
                      name="updatedBy"
                      placeholder="Enter updater name"
                      value={editOrganisation.updatedBy}
                      onChange={handleEditInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateOrganisation}
                  className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Update Organisation
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-[400px] shadow-2xl animate-fade-in">
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-red-100 rounded-full p-3">
                    <AlertCircle size={32} className="text-red-600" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Confirm Delete</h3>
                <p className="text-gray-600 text-center mb-6">
                  Are you sure you want to delete this organisation? This action cannot be undone.
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteOrganisation(showDeleteConfirm)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default OrganisationMaster;