<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import axios from "axios";
import { contactService } from "../../../services/contactPerson.service";
import type {
  ContactPerson,
  ContactPersonPayload,
  CompanyOption,
  OrganisationOption,
  DepartmentOption,
} from "../../../services/contactPerson.service";
=======
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
>>>>>>> acb0ce5fde67d4993ba4d9be0e64b291d4054935

interface CompanyOption {
  id: number;
  name: string;
  isActive: boolean;
}

interface OrganisationOption {
  id: number;
  name: string;
  companyId: number;
  isActive: boolean;
}

interface DepartmentOption {
  id: number;
  name: string;
  organisationId: number;
  isActive: boolean;
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

// Mock service - replace with actual API calls
const contactService = {
  getAll: async () => {
    // Replace with actual API call
    return { data: [] };
  },
  getCompanies: async () => {
    // Replace with actual API call
    return [];
  },
  getOrganisations: async () => {
    // Replace with actual API call
    return [];
  },
  getDepartments: async () => {
    // Replace with actual API call
    return [];
  },
  create: async (payload: ContactPersonPayload) => {
    // Replace with actual API call
    return { data: payload };
  },
  update: async (id: number, payload: ContactPersonPayload & { id: number }) => {
    // Replace with actual API call
    return { data: payload };
  }
};

const ContactPersonMaster = () => {
  const [contacts, setContacts] = useState<ContactPerson[]>([]);
  const [loading, setLoading] = useState(false);
  const [lookupLoading, setLookupLoading] = useState(false);

<<<<<<< HEAD
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState<Omit<ContactPerson, "id">>({
=======
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
  const [companies, setCompanies] = useState<CompanyOption[]>([]);
  const [organizations, setOrganizations] = useState<OrganisationOption[]>([]);
  const [departments, setDepartments] = useState<DepartmentOption[]>([]);
  
  // Form state for new/edit contact
  const [form, setForm] = useState({
>>>>>>> acb0ce5fde67d4993ba4d9be0e64b291d4054935
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

<<<<<<< HEAD
  const [editId, setEditId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [companies, setCompanies] = useState<CompanyOption[]>([]);
  const [organizations, setOrganizations] = useState<OrganisationOption[]>([]);
  const [departments, setDepartments] = useState<DepartmentOption[]>([]);

=======
  // Get unique values for filters
  const companiesList = ['all', ...new Set(contacts.map(c => c.companyName))];
  const organizationsList = ['all', ...new Set(contacts.map(c => c.organizationName))];
  const departmentsList = ['all', ...new Set(contacts.map(c => c.department))];

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

>>>>>>> acb0ce5fde67d4993ba4d9be0e64b291d4054935
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await contactService.getAll();
<<<<<<< HEAD
      setContacts(res.data);
=======
      if (res.data && res.data.length > 0) {
        setContacts(res.data);
      }
>>>>>>> acb0ce5fde67d4993ba4d9be0e64b291d4054935
    } catch (err) {
      console.error("Error fetching contacts", err);
    }
    setLoading(false);
<<<<<<< HEAD
  };

  const fetchLookupData = async () => {
    setLookupLoading(true);
    try {
      const [companyData, organisationData, departmentData] = await Promise.all([
        contactService.getCompanies(),
        contactService.getOrganisations(),
        contactService.getDepartments(),
      ]);

      setCompanies((companyData ?? []).filter((company) => company.isActive !== false));
      setOrganizations((organisationData ?? []).filter((organisation) => organisation.isActive !== false));
      setDepartments((departmentData ?? []).filter((department) => department.isActive !== false));
    } catch (err) {
      console.error("Error fetching contact master dependencies", err);
      setErrorMessage("Unable to load company, organisation, or department master data.");
    } finally {
      setLookupLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
    fetchLookupData();
  }, []);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : ["companyId", "organisationId", "departmentId"].includes(name)
          ? Number(value) // ✅ FIX: convert to number
          : value,
    });
=======
  };

  const fetchLookupData = async () => {
    setLookupLoading(true);
    try {
      const [companyData, organisationData, departmentData] = await Promise.all([
        contactService.getCompanies(),
        contactService.getOrganisations(),
        contactService.getDepartments(),
      ]);

      setCompanies((companyData ?? []).filter((company: CompanyOption) => company.isActive !== false));
      setOrganizations((organisationData ?? []).filter((organisation: OrganisationOption) => organisation.isActive !== false));
      setDepartments((departmentData ?? []).filter((department: DepartmentOption) => department.isActive !== false));
    } catch (err) {
      console.error("Error fetching contact master dependencies", err);
      setErrorMessage("Unable to load company, organisation, or department master data.");
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
      [name]: type === "checkbox" ? checked : Number(value) || value,
    });
  };

  const handleSubmit = async () => {
    if (!form.companyId || !form.organisationId || !form.departmentId) {
      setErrorMessage("Please select company, organization, and department.");
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
      setErrorMessage("Please select valid company, organization, and department values from master data.");
      return;
    }

    if (selectedOrganisation.companyId !== selectedCompany.id) {
      setErrorMessage("Selected organization does not belong to the selected company.");
      return;
    }

    if (selectedDepartment.organisationId !== selectedOrganisation.id) {
      setErrorMessage("Selected department does not belong to the selected organization.");
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
      organisationId: data.organizationId,
      departmentId: 0, // You'll need to map this from your data
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
    const headers = ['Name', 'Designation', 'Department', 'Organization', 'Company', 'Email', 'Mobile', 'City', 'Status'];
    const csvData = filteredContacts.map(contact => [
      contact.name,
      contact.designation,
      contact.department,
      contact.organizationName,
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

  // Handle insert form input changes for the simple modal
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      // This would need to be implemented for the simple modal
    }
  };

  // Handle simple form submission
  const handleInsertContact = () => {
    // This is a simplified version - you would implement full form handling here
    setShowInsertModal(false);
>>>>>>> acb0ce5fde67d4993ba4d9be0e64b291d4054935
  };

  const handleSubmit = async () => {
    if (!form.companyId || !form.organisationId || !form.departmentId) {
      setErrorMessage("Please select company, organization, and department.");
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
      setErrorMessage("Please select valid company, organization, and department values from master data.");
      return;
    }

    if (selectedOrganisation.companyId !== selectedCompany.id) {
      setErrorMessage("Selected organization does not belong to the selected company.");
      return;
    }

    if (selectedDepartment.organisationId !== selectedOrganisation.id) {
      setErrorMessage("Selected department does not belong to the selected organization.");
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

      setShowModal(false);
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
      remark: data.remark,
      isActive: data.isActive,
    });

      setErrorMessage("");
      setShowModal(true);
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

  return (
<<<<<<< HEAD
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Contact Person Master</h2>
=======
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Contact Person Master</h1>
        <p className="text-sm text-gray-600 mt-1">Manage contact person details</p>
      </div>
>>>>>>> acb0ce5fde67d4993ba4d9be0e64b291d4054935

      <button
        onClick={() => {
          resetForm();
          setShowModal(true);
        }}
        className="bg-purple-600 text-white px-4 py-2 rounded mb-4"
      >
        Add Contact
      </button>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>Designation</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

<<<<<<< HEAD
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6}>Loading...</td>
            </tr>
          ) : (
            contacts.map((c) => (
              <tr key={c.id} className="text-center border-t">
                <td>{c.name}</td>
                <td>{c.designation}</td>
                <td>{c.mobile}</td>
                <td>{c.email}</td>
                <td>{c.isActive ? "Active" : "Inactive"}</td>
                <td>
                  <button
                    onClick={() => handleEdit(c)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-[500px]">
            <h3 className="text-lg font-bold mb-4">
              {editMode ? "Edit Contact" : "Add Contact"}
            </h3>

            <select name="companyId" value={form.companyId} onChange={handleChange} className="input">
              <option value={0}>Select Company</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>{c.companyName}</option>
=======
          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                resetForm();
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={filterOrganization}
                  onChange={(e) => setFilterOrganization(e.target.value)}
                >
                  {organizationsList.map(org => (
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
                  <td className="px-4 py-3 text-sm text-gray-600">{indexOfFirstItem + index + 1}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{contact.name}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{contact.designation}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{contact.department}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{contact.organizationName}</td>
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
>>>>>>> acb0ce5fde67d4993ba4d9be0e64b291d4054935
              ))}
            </select>

<<<<<<< HEAD
            <select name="organisationId" value={form.organisationId} onChange={handleChange} className="input">
              <option value={0}>Select Organization</option>
              {organizations
                .filter((o) => !form.companyId || o.companyId === form.companyId)
                .map((o) => (
                  <option key={o.id} value={o.id}>{o.organisationName}</option>
                ))}
            </select>

            <select name="departmentId" value={form.departmentId} onChange={handleChange} className="input">
              <option value={0}>Select Department</option>
              {departments
                .filter((d) => !form.organisationId || d.organisationId === form.organisationId)
                .map((d) => (
                  <option key={d.id} value={d.id}>{d.departmentName}</option>
                ))}
            </select>

            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="input" />
            <input name="designation" value={form.designation} onChange={handleChange} placeholder="Designation" className="input" />
            <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile" className="input" />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="input" />
            <input name="remark" value={form.remark} onChange={handleChange} placeholder="Remark" className="input" />

            <label className="flex items-center gap-2 mt-2">
              <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
              Active
            </label>

            {lookupLoading && (
              <p className="mt-3 text-sm text-gray-500">Loading company, organization, and department masters...</p>
            )}

            {errorMessage && (
              <p className="mt-3 text-sm text-red-600">{errorMessage}</p>
            )}

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button onClick={handleSubmit} className="bg-purple-600 text-white px-4 py-2 rounded">
                Save
              </button>
=======
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
                      <p className="font-medium">{new Date(selectedContact.dateOfBirth).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Anniversary</p>
                      <p className="font-medium">{new Date(selectedContact.anniversaryDate).toLocaleDateString()}</p>
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
                      <p className="text-sm">{new Date(selectedContact.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button onClick={() => { setShowViewModal(false); setSelectedContact(null); }} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Close
                </button>
              </div>
>>>>>>> acb0ce5fde67d4993ba4d9be0e64b291d4054935
            </div>
          </div>
        </div>
      )}
<<<<<<< HEAD
=======

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
                          <option key={company.id} value={company.id}>{company.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Organization *</label>
                      <select
                        name="organisationId"
                        value={form.organisationId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                        required
                      >
                        <option value={0}>Select Organization</option>
                        {organizations.map(org => (
                          <option key={org.id} value={org.id}>{org.name}</option>
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
                          <option key={dept.id} value={dept.id}>{dept.name}</option>
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
>>>>>>> acb0ce5fde67d4993ba4d9be0e64b291d4054935
    </div>
  );
};

export default ContactPersonMaster;
