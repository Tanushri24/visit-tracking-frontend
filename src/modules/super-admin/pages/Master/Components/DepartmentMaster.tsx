<<<<<<< HEAD
// src/modules/super-admin/pages/Master/Components/DepartmentMaster.tsx
=======
// src/modules/super-admin/pages/Master/DepartmentMaster.tsx
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Layers,
  Plus,
  Trash2
} from 'lucide-react';
>>>>>>> acb0ce5fde67d4993ba4d9be0e64b291d4054935

import React, { useEffect, useState } from "react";
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment
} from "../../../services/department.service";

export interface Department {
  id: number;
  departmentName: string;
  organisationId: number;
  isActive: boolean;
  insertedDate?: string;
}

const DepartmentMaster = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

<<<<<<< HEAD
=======
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCompany, setFilterCompany] = useState<string>('all');
  const [filterOrganization, setFilterOrganization] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showInsertModal, setShowInsertModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState<Department | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Form state for new department
>>>>>>> acb0ce5fde67d4993ba4d9be0e64b291d4054935
  const [newDepartment, setNewDepartment] = useState({
    departmentName: "",
    organisationId: 0,
    isActive: true
  });

  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

<<<<<<< HEAD
  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getDepartments();
      const normalizedDepartments = (data ?? []).map((department: any) => ({
        id: Number(department.id ?? 0),
        departmentName: department.departmentName ?? "",
        organisationId: Number(department.organisationId ?? 0),
        isActive: Boolean(department.isActive ?? true),
        insertedDate: department.insertedDate ?? department.createdAt ?? ""
=======
  // Filter departments
  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = 
      dept.departmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.departmentHead.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || dept.status === filterStatus;
    const matchesCompany = filterCompany === 'all' || dept.companyName === filterCompany;
    const matchesOrganization = filterOrganization === 'all' || dept.organizationName === filterOrganization;
    
    return matchesSearch && matchesStatus && matchesCompany && matchesOrganization;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDepartments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);

  // Fetch departments (mock for now)
  const fetchDepartments = async () => {
    setLoading(true);
    try {
      // In real implementation, fetch from API
      // const res = await getDepartments();
      // setDepartments(res.data);
    } catch (err) {
      console.error("Error fetching departments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Department Name', 'Organization', 'Company', 'Department Head', 'City', 'Contact Person', 'Email', 'Phone', 'Employee Count', 'Status'];
    const csvData = filteredDepartments.map(dept => [
      dept.departmentName, dept.organizationName, dept.companyName, dept.departmentHead,
      dept.city, dept.contactPerson, dept.contactEmail, dept.contactPhone,
      dept.employeeCount.toString(), dept.status
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `departments_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const viewDepartmentDetails = (department: Department) => {
    setSelectedDepartment(department);
    setShowViewModal(true);
  };

  // Delete department
  const handleDeleteDepartment = () => {
    if (departmentToDelete) {
      setDepartments(departments.filter(d => d.id !== departmentToDelete.id));
      setShowDeleteModal(false);
      setDepartmentToDelete(null);
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (department: Department) => {
    setDepartmentToDelete(department);
    setShowDeleteModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'organizationId') {
      const selectedOrg = sampleOrganizations.find(o => o.id === parseInt(value));
      const selectedCompany = sampleCompanies.find(c => c.id === selectedOrg?.companyId);
      setNewDepartment(prev => ({ 
        ...prev, 
        organizationId: parseInt(value),
        organizationName: selectedOrg ? selectedOrg.name : '',
        companyId: selectedOrg ? selectedOrg.companyId : 0,
        companyName: selectedCompany ? selectedCompany.name : ''
>>>>>>> acb0ce5fde67d4993ba4d9be0e64b291d4054935
      }));
      setDepartments(normalizedDepartments);
    } catch (err: any) {
      setError("Failed to load departments");
      console.error("fetchDepartments error", err);
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleInsertDepartment = async () => {
    if (!newDepartment.departmentName || !newDepartment.organisationId) {
      alert("Department Name and Organisation Id are required");
      return;
    }

    try {
      setLoading(true);
      await createDepartment({
        departmentName: newDepartment.departmentName.trim(),
        organisationId: Number(newDepartment.organisationId),
        isActive: newDepartment.isActive
      });
      await fetchDepartments();
      setNewDepartment({ departmentName: "", organisationId: 0, isActive: true });
    } catch (err: any) {
      const validationErrors = err?.response?.data?.errors;
      const validationMessage =
        validationErrors && typeof validationErrors === "object"
          ? Object.values(validationErrors).flat().join("\n")
          : null;

      alert(validationMessage || err?.response?.data?.message || err?.response?.data?.title || "Error creating department");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteDepartment(id);
      await fetchDepartments();
    } catch (err) {
      alert("Delete failed");
      console.error("deleteDepartment error", err);
    }
  };

  const handleEdit = (department: Department) => {
    setSelectedDepartment(department);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    if (!selectedDepartment) return;

    try {
      setLoading(true);
      await updateDepartment(selectedDepartment.id, selectedDepartment);
      await fetchDepartments();
      setShowEditModal(false);
      setSelectedDepartment(null);
    } catch (err) {
      alert("Update failed");
      console.error("updateDepartment error", err);
    } finally {
      setLoading(false);
    }
=======
  const handleInsertDepartment = () => {
    const newId = Math.max(...departments.map(d => d.id), 0) + 1;
    const currentDate = new Date().toISOString().split('T')[0];
    
    const departmentToAdd: Department = {
      id: newId,
      departmentName: newDepartment.departmentName,
      organizationId: newDepartment.organizationId,
      organizationName: newDepartment.organizationName,
      companyId: newDepartment.companyId,
      companyName: newDepartment.companyName,
      departmentHead: newDepartment.departmentHead,
      headDesignation: newDepartment.headDesignation,
      headEmail: newDepartment.headEmail,
      headPhone: newDepartment.headPhone,
      employeeCount: newDepartment.employeeCount,
      location: newDepartment.location,
      city: newDepartment.city,
      state: newDepartment.state,
      pincode: newDepartment.pincode,
      contactPerson: newDepartment.contactPerson,
      contactEmail: newDepartment.contactEmail,
      contactPhone: newDepartment.contactPhone,
      extensionNumber: newDepartment.extensionNumber,
      workingHours: newDepartment.workingHours,
      workingDays: newDepartment.workingDays,
      status: newDepartment.status,
      createdAt: currentDate,
      updatedAt: currentDate
    };
    
    setDepartments([...departments, departmentToAdd]);
    setShowInsertModal(false);
    setNewDepartment({
      departmentName: '', organizationId: 0, organizationName: '', companyId: 0, companyName: '',
      departmentHead: '', headDesignation: '', headEmail: '', headPhone: '', employeeCount: 0,
      location: '', city: '', state: '', pincode: '', contactPerson: '', contactEmail: '',
      contactPhone: '', extensionNumber: '', workingHours: '', workingDays: '', status: 'active'
    });
>>>>>>> acb0ce5fde67d4993ba4d9be0e64b291d4054935
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Department Master</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">Add Department</h2>
        <div className="flex flex-wrap gap-3 items-end">
          <input
            type="text"
            placeholder="Department Name"
            value={newDepartment.departmentName}
            onChange={(e) => setNewDepartment((s) => ({ ...s, departmentName: e.target.value }))}
            className="border p-2 rounded w-1/3"
          />
          <input
            type="number"
            placeholder="Organisation ID"
            value={newDepartment.organisationId}
            onChange={(e) => setNewDepartment((s) => ({ ...s, organisationId: Number(e.target.value) }))}
            className="border p-2 rounded w-1/3"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newDepartment.isActive}
              onChange={(e) => setNewDepartment((s) => ({ ...s, isActive: e.target.checked }))}
            />
            Active
          </label>
          <button onClick={handleInsertDepartment} className="bg-purple-600 text-white px-4 py-2 rounded">
            Add
          </button>
        </div>
      </div>

<<<<<<< HEAD
      <div className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">Department List</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Organisation</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Created</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{d.id}</td>
                  <td className="p-2 border">{d.departmentName}</td>
                  <td className="p-2 border">{d.organisationId}</td>
                  <td className="p-2 border">{d.isActive ? "Active" : "Inactive"}</td>
                  <td className="p-2 border">{d.insertedDate || "-"}</td>
                  <td className="p-2 border">
                    <button
                      className="text-blue-600 mr-2"
                      onClick={() => handleEdit(d)}
                    >
                      Edit
                    </button>
                    <button className="text-red-600" onClick={() => handleDelete(d.id)}>
                      Delete
                    </button>
=======
      {/* Action Bar */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-96 relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search departments..." 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button onClick={() => setShowInsertModal(true)} className="flex-1 md:flex-none px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2">
              <Plus size={18} /><span>Add Department</span>
            </button>
            <button onClick={() => setShowFilters(!showFilters)} className="flex-1 md:flex-none px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
              <Filter size={18} /><span>Filters</span>
            </button>
            <button onClick={exportToCSV} className="flex-1 md:flex-none px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
              <Download size={18} /><span>Export</span>
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="p-4 border-t bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select className="w-full px-3 py-2 border rounded-lg" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company</label>
                <select className="w-full px-3 py-2 border rounded-lg" value={filterCompany} onChange={(e) => setFilterCompany(e.target.value)}>
                  {companies.map(c => <option key={c} value={c}>{c === 'all' ? 'All Companies' : c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Organization</label>
                <select className="w-full px-3 py-2 border rounded-lg" value={filterOrganization} onChange={(e) => setFilterOrganization(e.target.value)}>
                  {organizations.map(o => <option key={o} value={o}>{o === 'all' ? 'All Organizations' : o}</option>)}
                </select>
              </div>
              <div className="flex items-end">
                <button onClick={() => { setFilterStatus('all'); setFilterCompany('all'); setFilterOrganization('all'); setSearchTerm(''); }} className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2">
                  <RefreshCw size={16} /> Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1600px] lg:min-w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">S.No</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Department Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Organization</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Company</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Department Head</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">City</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Contact Person</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Employees</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {currentItems.map((dept, index) => (
                <tr key={dept.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{indexOfFirstItem + index + 1}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{dept.departmentName}</p>
                    <p className="text-xs text-gray-500">Ext: {dept.extensionNumber}</p>
                  </td>
                  <td className="px-4 py-3 text-sm">{dept.organizationName}</td>
                  <td className="px-4 py-3 text-sm">{dept.companyName}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{dept.departmentHead}</p>
                    <p className="text-xs text-gray-500">{dept.headDesignation}</p>
                  </td>
                  <td className="px-4 py-3 text-sm">{dept.city}</td>
                  <td className="px-4 py-3 text-sm">{dept.contactPerson}</td>
                  <td className="px-4 py-3 text-sm">
                    <a href={`mailto:${dept.contactEmail}`} className="text-blue-600 hover:underline">{dept.contactEmail}</a>
                  </td>
                  <td className="px-4 py-3 text-sm">{dept.contactPhone}</td>
                  <td className="px-4 py-3 text-sm">{dept.employeeCount}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${dept.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {dept.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => viewDepartmentDetails(dept)} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Eye size={18} /></button>
                      <button onClick={() => openDeleteModal(dept)} className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 size={18} /></button>
                    </div>
>>>>>>> acb0ce5fde67d4993ba4d9be0e64b291d4054935
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {departments.length === 0 && !loading && (
          <p className="text-gray-500 text-center mt-4">No departments found</p>
        )}
      </div>

<<<<<<< HEAD
      {showEditModal && selectedDepartment && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Edit Department</h3>
            <div className="grid gap-3">
              <input
                type="text"
                value={selectedDepartment.departmentName}
                onChange={(e) => setSelectedDepartment((prev) => prev ? { ...prev, departmentName: e.target.value } : prev)}
                className="border p-2 rounded"
              />
              <input
                type="number"
                value={selectedDepartment.organisationId}
                onChange={(e) => setSelectedDepartment((prev) => prev ? { ...prev, organisationId: Number(e.target.value) } : prev)}
                className="border p-2 rounded"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedDepartment.isActive}
                  onChange={(e) => setSelectedDepartment((prev) => prev ? { ...prev, isActive: e.target.checked } : prev)}
                />
                Active
              </label>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={handleUpdate} className="px-4 py-2 bg-purple-600 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}
=======
      {/* Pagination */}
      {filteredDepartments.length > 0 && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredDepartments.length)} of {filteredDepartments.length} entries
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1} 
              className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-gray-50 flex items-center gap-1"
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <span className="px-4 py-1 bg-purple-600 text-white rounded-lg">Page {currentPage} of {totalPages}</span>
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
      {showViewModal && selectedDepartment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Department Details</h2>
              <button onClick={() => setShowViewModal(false)} className="p-1 hover:bg-gray-100 rounded">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-purple-600 mb-3">Department Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><p className="text-sm text-gray-500">Department Name</p><p className="font-medium">{selectedDepartment.departmentName}</p></div>
                  <div><p className="text-sm text-gray-500">Extension</p><p className="font-medium">{selectedDepartment.extensionNumber}</p></div>
                  <div><p className="text-sm text-gray-500">Organization</p><p className="font-medium">{selectedDepartment.organizationName}</p></div>
                  <div><p className="text-sm text-gray-500">Company</p><p className="font-medium">{selectedDepartment.companyName}</p></div>
                  <div><p className="text-sm text-gray-500">Employee Count</p><p className="font-medium">{selectedDepartment.employeeCount}</p></div>
                  <div><p className="text-sm text-gray-500">Status</p><span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${selectedDepartment.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{selectedDepartment.status}</span></div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-600 mb-3">Department Head</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><p className="text-sm text-gray-500">Name</p><p className="font-medium">{selectedDepartment.departmentHead}</p></div>
                  <div><p className="text-sm text-gray-500">Designation</p><p className="font-medium">{selectedDepartment.headDesignation}</p></div>
                  <div><p className="text-sm text-gray-500">Email</p><p className="font-medium text-blue-600">{selectedDepartment.headEmail}</p></div>
                  <div><p className="text-sm text-gray-500">Phone</p><p className="font-medium">{selectedDepartment.headPhone}</p></div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-600 mb-3">Contact & Location</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><p className="text-sm text-gray-500">Contact Person</p><p className="font-medium">{selectedDepartment.contactPerson}</p></div>
                  <div><p className="text-sm text-gray-500">Email</p><p className="font-medium text-blue-600">{selectedDepartment.contactEmail}</p></div>
                  <div><p className="text-sm text-gray-500">Phone</p><p className="font-medium">{selectedDepartment.contactPhone}</p></div>
                  <div><p className="text-sm text-gray-500">Location</p><p className="font-medium">{selectedDepartment.location}</p></div>
                  <div><p className="text-sm text-gray-500">Address</p><p className="font-medium">{selectedDepartment.city}, {selectedDepartment.state} - {selectedDepartment.pincode}</p></div>
                  <div><p className="text-sm text-gray-500">Working Hours</p><p className="font-medium">{selectedDepartment.workingHours}</p></div>
                  <div><p className="text-sm text-gray-500">Working Days</p><p className="font-medium">{selectedDepartment.workingDays}</p></div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button onClick={() => setShowViewModal(false)} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Insert Department Modal */}
      {showInsertModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Department</h2>
              <button onClick={() => setShowInsertModal(false)} className="p-1 hover:bg-gray-100 rounded">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleInsertDepartment(); }}>
              {/* Basic Information */}
              <div className="border-b pb-4 mb-4">
                <h3 className="text-lg font-semibold text-purple-600 mb-3">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Department Name *</label>
                    <input type="text" name="departmentName" value={newDepartment.departmentName} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Organization *</label>
                    <select name="organizationId" value={newDepartment.organizationId} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded-lg">
                      <option value={0}>Select Organization</option>
                      {sampleOrganizations.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Extension Number</label>
                    <input type="text" name="extensionNumber" value={newDepartment.extensionNumber} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Employee Count</label>
                    <input type="number" name="employeeCount" value={newDepartment.employeeCount} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select name="status" value={newDepartment.status} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Department Head */}
              <div className="border-b pb-4 mb-4">
                <h3 className="text-lg font-semibold text-purple-600 mb-3">Department Head</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Head Name *</label>
                    <input type="text" name="departmentHead" value={newDepartment.departmentHead} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Designation</label>
                    <input type="text" name="headDesignation" value={newDepartment.headDesignation} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" name="headEmail" value={newDepartment.headEmail} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input type="text" name="headPhone" value={newDepartment.headPhone} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                </div>
              </div>

              {/* Address & Location */}
              <div className="border-b pb-4 mb-4">
                <h3 className="text-lg font-semibold text-purple-600 mb-3">Address & Location</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <input type="text" name="location" value={newDepartment.location} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">City</label>
                      <input type="text" name="city" value={newDepartment.city} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">State</label>
                      <input type="text" name="state" value={newDepartment.state} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Pincode</label>
                      <input type="text" name="pincode" value={newDepartment.pincode} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact & Working Hours */}
              <div>
                <h3 className="text-lg font-semibold text-purple-600 mb-3">Contact & Working Hours</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Contact Person</label>
                    <input type="text" name="contactPerson" value={newDepartment.contactPerson} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Contact Email</label>
                    <input type="email" name="contactEmail" value={newDepartment.contactEmail} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Contact Phone</label>
                    <input type="text" name="contactPhone" value={newDepartment.contactPhone} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Working Hours</label>
                    <input type="text" name="workingHours" value={newDepartment.workingHours} onChange={handleInputChange} placeholder="e.g., 9:00 AM - 6:00 PM" className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Working Days</label>
                    <input type="text" name="workingDays" value={newDepartment.workingDays} onChange={handleInputChange} placeholder="e.g., Monday - Friday" className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowInsertModal(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Add Department</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && departmentToDelete && (
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
                Are you sure you want to delete the department <strong className="text-gray-800">{departmentToDelete.departmentName}</strong>?
                <br />
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDepartmentToDelete(null);
                  }}
                  className="flex-1 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteDepartment}
                  className="flex-1 px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredDepartments.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow mt-6">
          <Layers className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">No departments found matching your criteria.</p>
        </div>
      )}
>>>>>>> acb0ce5fde67d4993ba4d9be0e64b291d4054935
    </div>
  );
};

export default DepartmentMaster;
