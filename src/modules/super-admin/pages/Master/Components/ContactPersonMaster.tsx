// src/modules/super-admin/pages/Master/ContactPersonMaster.tsx
import React, { useState, useEffect } from 'react';
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
  Building2,
  MapPin,
  Plus,
  Trash2
} from 'lucide-react';
import axios from 'axios';
import { contactService } from "../../../services/contactPerson.service";
import type { CompanyOption as CompanyApiOption, OrganisationOption as OrganisationApiOption, DepartmentOption as DepartmentApiOption } from '../../../services/contactPerson.service';

interface ContactPerson {
  id: number;
  name: string;
  designation: string;
  organisationId: number;
  organisationName: string;
  departmentId: number;
  department: string;
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

interface ContactPersonPayload {
  companyId: number;
  organisationId: number;
  departmentId: number;
  name: string;
  designation: string;
  mobile: string;
  email: string;
  remark: string;
  isActive: boolean;
}

const ContactPersonMaster = () => {
  const [contacts, setContacts] = useState<ContactPerson[]>([]);
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
  const [showInsertModal, setShowInsertModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<ContactPerson | null>(null);
  const [loading, setLoading] = useState(false);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [companies, setCompanies] = useState<CompanyApiOption[]>([]);
  const [organizations, setOrganizations] = useState<OrganisationApiOption[]>([]);
  const [departments, setDepartments] = useState<DepartmentApiOption[]>([]);
  
  // Form state for new/edit contact
  const [form, setForm] = useState({
    companyId: 0,
    organisationId: 0,
    departmentId: 0,
    name: "",
    designation: "",
    mobile: "",
    email: "",
    remark: "",
    isActive: true,
  });

  // Get unique values for filters
  const companiesList = ['all', ...new Set(contacts.map(c => c.companyName))];
  const organisationsList = ['all', ...new Set(contacts.map(c => c.organisationName))];
  const departmentsList = ['all', ...new Set(contacts.map(c => c.department))];

  // Filter contacts based on search and filters
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.organisationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.mobile.includes(searchTerm);
    
    const matchesStatus = filterStatus === 'all' || contact.status === filterStatus;
    const matchesCompany = filterCompany === 'all' || contact.companyName === filterCompany;
    const matchesOrganization = filterOrganization === 'all' || contact.organisationName === filterOrganization;
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

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await contactService.getAll();
      if (res.data && res.data.length > 0) {
        setContacts(res.data);
      }
    } catch (err) {
      console.error("Error fetching contacts", err);
    }
    setLoading(false);
  };

  const fetchLookupData = async () => {
    setLookupLoading(true);
    try {
      const [companiesRes, organisationsRes, departmentsRes] = await Promise.all([
        contactService.getCompanies(),
        contactService.getOrganisations(),
        contactService.getDepartments(),
      ]);
      setCompanies(companiesRes);
      setOrganizations(organisationsRes);
      setDepartments(departmentsRes);
    } catch (error) {
      console.error("Error fetching contact master dependencies", error);
    } finally {
      setLookupLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
    fetchLookupData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : (name === 'companyId' || name === 'organisationId' || name === 'departmentId' ? Number(value) : value),
    });
  };

  const handleSubmit = async () => {
    if (!form.companyId || !form.organisationId || !form.departmentId) {
      setErrorMessage("Please select company, organisation, and department.");
      return;
    }

    if (!form.name.trim() || !form.designation.trim() || !form.mobile.trim() || !form.email.trim()) {
      setErrorMessage("Name, designation, mobile, and email are required.");
      return;
    }

    const selectedCompany = companies.find((company) => company.id === form.companyId);
    const selectedOrganisation = organizations.find((organisation) => organisation.id === form.organisationId);
    const selectedDepartment = departments.find((department) => department.id === form.departmentId);

    if (!selectedCompany || !selectedOrganisation || !selectedDepartment) {
      setErrorMessage("Please select valid company, organisation, and department values from master data.");
      return;
    }

    if (selectedOrganisation.companyId !== selectedCompany.id) {
      setErrorMessage("Selected organisation does not belong to the selected company.");
      return;
    }

    if (selectedDepartment.organisationId !== selectedOrganisation.id) {
      setErrorMessage("Selected department does not belong to the selected organisation.");
      return;
    }

    const payload: ContactPersonPayload = {
      companyId: form.companyId,
      organisationId: form.organisationId,
      departmentId: form.departmentId,
      name: form.name.trim(),
      designation: form.designation.trim(),
      mobile: form.mobile.trim(),
      email: form.email.trim(),
      remark: form.remark.trim(),
      isActive: form.isActive,
    };

    setErrorMessage("");

    try {
      if (editMode && editId !== null) {
        await contactService.update(editId, { id: editId, ...payload });
      } else {
        await contactService.create(payload);
      }

      setShowInsertModal(false);
      resetForm();
      fetchContacts();
    } catch (err) {
      console.error("Save error", err);
      if (axios.isAxiosError(err)) {
        const apiMessage =
          (err.response?.data as { message?: string; title?: string })?.message ||
          (err.response?.data as { message?: string; title?: string })?.title ||
          `Request failed with status code ${err.response?.status ?? 500}`;
        setErrorMessage(apiMessage);
        return;
      }

      setErrorMessage("Unable to save contact person. Please try again.");
    }
  };

  const handleEdit = (data: ContactPerson) => {
    setEditMode(true);
    setEditId(data.id);

    setForm({
      companyId: data.companyId,
      organisationId: data.organisationId,
      departmentId: data.departmentId,
      name: data.name,
      designation: data.designation,
      mobile: data.mobile,
      email: data.email,
      remark: data.remarks,
      isActive: data.status === 'active',
    });

    setErrorMessage("");
    setShowInsertModal(true);
  };

  const resetForm = () => {
    setForm({
      companyId: 0,
      organisationId: 0,
      departmentId: 0,
      name: "",
      designation: "",
      mobile: "",
      email: "",
      remark: "",
      isActive: true,
    });
    setErrorMessage("");
    setEditMode(false);
    setEditId(null);
  };

  // Delete contact
  const handleDeleteContact = () => {
    if (contactToDelete) {
      setContacts(contacts.filter(c => c.id !== contactToDelete.id));
      setShowDeleteModal(false);
      setContactToDelete(null);
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (contact: ContactPerson) => {
    setContactToDelete(contact);
    setShowDeleteModal(true);
  };

  // View contact details
  const viewContactDetails = (contact: ContactPerson) => {
    setSelectedContact(contact);
    setShowViewModal(true);
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Name', 'Designation', 'Department', 'Organisation', 'Company', 'Email', 'Mobile', 'City', 'Status'];
    const csvData = filteredContacts.map(contact => [
      contact.name,
      contact.designation,
      contact.department,
      contact.organisationName,
      contact.companyName,
      contact.email,
      contact.mobile,
      contact.city,
      contact.status
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contact_persons.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Contact Person Master</h1>
        <p className="text-sm text-gray-600 mt-1">Manage contact person details</p>
      </div>

      {(loading || lookupLoading) && (
        <div className="mb-4 p-4 bg-yellow-100 text-yellow-800 rounded-lg border border-yellow-300">
          Loading data, please wait...
        </div>
      )}

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
        <div className="p-4 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search contacts..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                resetForm();
                fetchLookupData();
                setShowInsertModal(true);
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Add New Contact</span>
              <span className="sm:hidden">Add</span>
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <Filter size={18} />
              <span className="hidden sm:inline">Filters</span>
            </button>
            <button
              onClick={exportToCSV}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <Download size={18} />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
                  {companiesList.map(company => (
                    <option key={company} value={company}>{company === 'all' ? 'All Companies' : company}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organisation</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={filterOrganization}
                  onChange={(e) => setFilterOrganization(e.target.value)}
                >
                  {organisationsList.map(org => (
                    <option key={org} value={org}>{org === 'all' ? 'All Organisations' : org}</option>
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
                  {departmentsList.map(dept => (
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

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1800px] lg:min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organisation</th>
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
                  <td className="px-4 py-3 text-sm text-gray-600">{indexOfFirstItem + index + 1}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{contact.name}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{contact.designation}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{contact.department}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{contact.organisationName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{contact.companyName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">{contact.email}</a>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{contact.mobile}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{contact.city}</td>
                  <td className="px-4 py-3">
                    {contact.isDecisionMaker ? (
                      <span className="inline-flex px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">Yes</span>
                    ) : (
                      <span className="inline-flex px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">No</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {contact.isPrimary ? (
                      <span className="inline-flex px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">Primary</span>
                    ) : (
                      <span className="inline-flex px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">Secondary</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                      contact.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => viewContactDetails(contact)} className="p-1 text-blue-600 hover:bg-blue-50 rounded" title="View Details">
                        <Eye size={18} />
                      </button>
                      <button onClick={() => handleEdit(contact)} className="p-1 text-green-600 hover:bg-green-50 rounded" title="Edit Contact">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button onClick={() => openDeleteModal(contact)} className="p-1 text-red-600 hover:bg-red-50 rounded" title="Delete Contact">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {filteredContacts.length > 0 && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredContacts.length)} of {filteredContacts.length} entries
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1} 
              className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-50 flex items-center gap-1"
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <span className="px-4 py-1 bg-purple-600 text-white rounded-lg">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages} 
              className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-50 flex items-center gap-1"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showViewModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Contact Person Details</h2>
                <button onClick={() => { setShowViewModal(false); setSelectedContact(null); }} className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
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
                      <p className="font-medium">{selectedContact.dateOfBirth ? new Date(selectedContact.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Anniversary</p>
                      <p className="font-medium">{selectedContact.anniversaryDate ? new Date(selectedContact.anniversaryDate).toLocaleDateString() : 'N/A'}</p>
                    </div>
                  </div>
                </div>
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
                      <p className="text-sm text-gray-500">Organisation</p>
                      <p className="font-medium">{selectedContact.organisationName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Company</p>
                      <p className="font-medium">{selectedContact.companyName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Reporting To</p>
                      <p className="font-medium">{selectedContact.reportingTo || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Remarks</p>
                      <p className="font-medium">{selectedContact.remarks || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3 flex items-center gap-2">
                    <Mail size={20} /> Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-blue-600">{selectedContact.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Mobile</p>
                      <p className="font-medium">{selectedContact.mobile}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Alternate Phone</p>
                      <p className="font-medium">{selectedContact.alternatePhone || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">WhatsApp</p>
                      <p className="font-medium">{selectedContact.whatsappNumber || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Preferred Contact Mode</p>
                      <p className="font-medium">{selectedContact.preferredContactMode || 'Any'}</p>
                    </div>
                  </div>
                </div>
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3 flex items-center gap-2">
                    <MapPin size={20} /> Address Information
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    <p className="font-medium">{selectedContact.address || 'N/A'}</p>
                    <p>{selectedContact.city || 'N/A'}, {selectedContact.state || 'N/A'} - {selectedContact.pincode || 'N/A'}</p>
                    <p>{selectedContact.country || 'N/A'}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">Status & System Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${selectedContact.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {selectedContact.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Decision Maker</p>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${selectedContact.isDecisionMaker ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                        {selectedContact.isDecisionMaker ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Primary Contact</p>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${selectedContact.isPrimary ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                        {selectedContact.isPrimary ? 'Primary' : 'Secondary'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Created At</p>
                      <p className="text-sm">{selectedContact.createdAt ? new Date(selectedContact.createdAt).toLocaleDateString() : 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button onClick={() => { setShowViewModal(false); setSelectedContact(null); }} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Contact Modal */}
      {showInsertModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {editMode ? 'Edit Contact Person' : 'Add New Contact Person'}
                </h2>
                <button onClick={() => { setShowInsertModal(false); resetForm(); }} className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {errorMessage && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                      <select
                        name="companyId"
                        value={form.companyId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                        required
                      >
                        <option value={0}>Select Company</option>
                        {companies.map(company => (
                          <option key={company.id} value={company.id}>{company.companyName}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Organisation *</label>
                      <select
                        name="organisationId"
                        value={form.organisationId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                        required
                      >
                        <option value={0}>Select Organisation</option>
                        {organizations
                          .filter(org => form.companyId === 0 || org.companyId === form.companyId)
                          .map(org => (
                            <option key={org.id} value={org.id}>{org.organisationName}</option>
                          ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                      <select
                        name="departmentId"
                        value={form.departmentId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                        required
                      >
                        <option value={0}>Select Department</option>
                        {departments.map(dept => (
                          <option key={dept.id} value={dept.id}>{dept.departmentName}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Designation *</label>
                      <input
                        type="text"
                        name="designation"
                        value={form.designation}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mobile *</label>
                      <input
                        type="text"
                        name="mobile"
                        value={form.mobile}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                      <textarea
                        name="remark"
                        value={form.remark}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={form.isActive}
                        onChange={handleChange}
                        className="w-4 h-4"
                      />
                      <label className="text-sm font-medium text-gray-700">Active</label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => { setShowInsertModal(false); resetForm(); }}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    {editMode ? 'Update Contact' : 'Add Contact'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && contactToDelete && (
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
                Are you sure you want to delete the contact person <strong className="text-gray-800">{contactToDelete.name}</strong>?
                <br />
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setContactToDelete(null);
                  }}
                  className="flex-1 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteContact}
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

export default ContactPersonMaster;