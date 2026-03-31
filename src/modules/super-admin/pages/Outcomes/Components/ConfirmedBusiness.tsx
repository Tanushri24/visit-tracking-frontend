import React, { useState } from "react";
import { Search, DollarSign, Edit, Trash2, Download, Filter, Plus, TrendingUp, Users, X } from "lucide-react";

interface ConfirmedBusiness {
  id: number;
  visit: string;
  stage: string;
  organisation: string;
  employee: string;
  confirmedValue: number;
}

const ConfirmedBusinessPage = () => {

  const [data, setData] = useState<ConfirmedBusiness[]>([
    {
      id: 1,
      visit: "Visit to University",
      stage: "Won",
      organisation: "ABC University",
      employee: "Rahul Sharma",
      confirmedValue: 500000
    },
    {
      id: 2,
      visit: "Visit to IT Department",
      stage: "Won",
      organisation: "XYZ IT",
      employee: "Priya Singh",
      confirmedValue: 800000
    },
    {
      id: 3,
      visit: "Visit to Training Institute",
      stage: "Won",
      organisation: "SkillTech",
      employee: "Amit Kumar",
      confirmedValue: 300000
    }
  ]);

  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterEmployee, setFilterEmployee] = useState("");
  const [filterOrganisation, setFilterOrganisation] = useState("");
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ConfirmedBusiness | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<ConfirmedBusiness>({
    id: 0,
    visit: "",
    stage: "Won",
    organisation: "",
    employee: "",
    confirmedValue: 0
  });

  // Employee-wise for filter
  const employeeWise = data.reduce((acc: Record<string, number>, item) => {
    acc[item.employee] = (acc[item.employee] || 0) + item.confirmedValue;
    return acc;
  }, {} as Record<string, number>);

  // Organisation-wise for filter
  const organisationWise = data.reduce((acc: Record<string, number>, item) => {
    acc[item.organisation] = (acc[item.organisation] || 0) + item.confirmedValue;
    return acc;
  }, {} as Record<string, number>);

  const filtered = data.filter(
    item =>
      (item.visit.toLowerCase().includes(search.toLowerCase()) ||
      item.organisation.toLowerCase().includes(search.toLowerCase()) ||
      item.employee.toLowerCase().includes(search.toLowerCase())) &&
      (filterEmployee === "" || item.employee === filterEmployee) &&
      (filterOrganisation === "" || item.organisation === filterOrganisation)
  );

  const totalConfirmed = data.reduce(
    (sum, item) => sum + item.confirmedValue,
    0
  );

  const totalDeals = data.length;

  const avgDeal = totalConfirmed / (totalDeals || 1);

  // Delete
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      const updated = data.filter(item => item.id !== id);
      setData(updated);
    }
  };

  // Edit
  const handleEdit = () => {
    if (selectedItem) {
      setData(data.map(item => item.id === selectedItem.id ? { ...formData, id: item.id, stage: "Won" } : item));
      setShowEditModal(false);
      setSelectedItem(null);
      resetForm();
    }
  };

  // Add
  const handleAdd = () => {
    if (formData.visit && formData.organisation && formData.employee && formData.confirmedValue > 0) {
      const newId = data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1;
      const newItem = { ...formData, id: newId, stage: "Won" };
      setData([...data, newItem]);
      setShowAddModal(false);
      resetForm();
    } else {
      alert("Please fill all required fields");
    }
  };

  // Export
  const handleExport = () => {
    const headers = ["Visit", "Stage", "Organisation", "Employee", "Confirmed Value"];
    const rows = filtered.map(d => [d.visit, d.stage, d.organisation, d.employee, d.confirmedValue]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "confirmed_business.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Filters
  const clearFilters = () => {
    setFilterEmployee("");
    setFilterOrganisation("");
    setSearch("");
  };

  const openEditModal = (item: ConfirmedBusiness) => {
    setSelectedItem(item);
    setFormData(item);
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      visit: "",
      stage: "Won",
      organisation: "",
      employee: "",
      confirmedValue: 0
    });
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            Confirmed Business
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
            Actual business value generated from visits
          </p>
        </div>

        {/* Add Business Button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 bg-green-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm hover:bg-green-700 w-full sm:w-auto"
        >
          <Plus size={16}/>
          Add Business
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {/* Total Confirmed */}
        <div className="group bg-gradient-to-br from-white to-gray-50 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-green-200 hover:-translate-y-0.5">
          <div className="flex justify-between items-start">
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Total Confirmed</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">₹{totalConfirmed.toLocaleString()}</p>
              <p className="text-[8px] sm:text-[10px] text-gray-400">From won deals</p>
            </div>
            <div className="p-2 sm:p-2.5 bg-green-50 rounded-xl group-hover:bg-green-100 transition-all duration-300 group-hover:scale-105">
              <DollarSign className="text-green-600" size={18} />
            </div>
          </div>
        </div>

        {/* Total Deals */}
        <div className="group bg-gradient-to-br from-white to-gray-50 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-0.5">
          <div className="flex justify-between items-start">
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Won Deals</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">{totalDeals}</p>
              <p className="text-[8px] sm:text-[10px] text-gray-400">Successfully converted</p>
            </div>
            <div className="p-2 sm:p-2.5 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-all duration-300 group-hover:scale-105">
              <Users className="text-blue-600" size={18} />
            </div>
          </div>
        </div>

        {/* Average Deal */}
        <div className="group bg-gradient-to-br from-white to-gray-50 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-purple-200 hover:-translate-y-0.5">
          <div className="flex justify-between items-start">
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Average Deal</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">₹{Math.round(avgDeal).toLocaleString()}</p>
              <p className="text-[8px] sm:text-[10px] text-gray-400">Per confirmed deal</p>
            </div>
            <div className="p-2 sm:p-2.5 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-all duration-300 group-hover:scale-105">
              <TrendingUp className="text-purple-600" size={18}/>
            </div>
          </div>
        </div>
      </div>

      {/* Search, Export & Filter Section */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        {/* Search Bar */}
        <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm flex-1 sm:flex-none sm:w-80">
          <Search size={16} className="text-gray-400"/>
          <input
            type="text"
            placeholder="Search visit, organisation or employee..."
            className="ml-2 outline-none text-sm w-full"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Export & Filter Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm hover:bg-blue-700 flex-1 sm:flex-none"
          >
            <Download size={16}/>
            <span className="sm:inline">Export</span>
          </button>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 border border-gray-300 bg-white px-3 sm:px-4 py-2 rounded-lg text-sm hover:bg-gray-50 flex-1 sm:flex-none"
          >
            <Filter size={16}/>
            <span className="sm:inline">Filters</span>
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white rounded-xl shadow-sm border mb-4 p-3 sm:p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium text-gray-700">Filter Records</h3>
            <button onClick={clearFilters} className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1">
              <X size={14}/> Clear All
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select
              value={filterEmployee}
              onChange={(e) => setFilterEmployee(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
            >
              <option value="">All Employees</option>
              {Object.keys(employeeWise).map(emp => (
                <option key={emp} value={emp}>{emp}</option>
              ))}
            </select>
            <select
              value={filterOrganisation}
              onChange={(e) => setFilterOrganisation(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
            >
              <option value="">All Organisations</option>
              {Object.keys(organisationWise).map(org => (
                <option key={org} value={org}>{org}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr className="text-xs sm:text-sm">
                <th className="p-2 sm:p-3 text-left font-semibold">Visit</th>
                <th className="p-2 sm:p-3 text-left font-semibold">Stage</th>
                <th className="p-2 sm:p-3 text-left font-semibold">Organisation</th>
                <th className="p-2 sm:p-3 text-left font-semibold">Employee</th>
                <th className="p-2 sm:p-3 text-left font-semibold">Confirmed Value</th>
                <th className="p-2 sm:p-3 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <tr key={item.id} className="border-t hover:bg-gray-50 transition">
                    <td className="p-2 sm:p-3 text-xs sm:text-sm font-medium text-gray-700">{item.visit}</td>
                    <td className="p-2 sm:p-3">
                      <span className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-green-100 text-green-700 rounded-full font-medium">
                        {item.stage}
                      </span>
                    </td>
                    <td className="p-2 sm:p-3 text-xs sm:text-sm text-gray-600">{item.organisation}</td>
                    <td className="p-2 sm:p-3 text-xs sm:text-sm text-gray-600">{item.employee}</td>
                    <td className="p-2 sm:p-3 text-xs sm:text-sm font-semibold text-green-600">
                      ₹{item.confirmedValue.toLocaleString()}
                    </td>
                    <td className="p-2 sm:p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit size={16} className="sm:w-[18px] sm:h-[18px]"/>
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]"/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 sm:py-10 text-gray-400 text-sm">
                    No confirmed business found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-xl w-[90%] sm:w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-bold">Add Confirmed Business</h2>
                <button onClick={() => { setShowAddModal(false); resetForm(); }} className="p-1 hover:bg-gray-100 rounded-lg">
                  <X size={18} className="sm:w-5 sm:h-5"/>
                </button>
              </div>
              <input
                className="border p-2 w-full mb-3 rounded-lg text-sm"
                placeholder="Visit Name *"
                value={formData.visit}
                onChange={(e) => setFormData({ ...formData, visit: e.target.value })}
              />
              <input
                className="border p-2 w-full mb-3 rounded-lg text-sm"
                placeholder="Organisation *"
                value={formData.organisation}
                onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
              />
              <input
                className="border p-2 w-full mb-3 rounded-lg text-sm"
                placeholder="Employee *"
                value={formData.employee}
                onChange={(e) => setFormData({ ...formData, employee: e.target.value })}
              />
              <input
                type="number"
                className="border p-2 w-full mb-4 rounded-lg text-sm"
                placeholder="Confirmed Value *"
                value={formData.confirmedValue}
                onChange={(e) => setFormData({ ...formData, confirmedValue: Number(e.target.value) })}
              />
              <div className="flex gap-2 justify-end">
                <button onClick={() => { setShowAddModal(false); resetForm(); }} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-500 text-white rounded-lg text-sm">Cancel</button>
                <button onClick={handleAdd} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-green-600 text-white rounded-lg text-sm">Add Record</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-xl w-[90%] sm:w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-bold">Edit Confirmed Business</h2>
                <button onClick={() => { setShowEditModal(false); setSelectedItem(null); resetForm(); }} className="p-1 hover:bg-gray-100 rounded-lg">
                  <X size={18} className="sm:w-5 sm:h-5"/>
                </button>
              </div>
              <input
                className="border p-2 w-full mb-3 rounded-lg text-sm"
                placeholder="Visit Name"
                value={formData.visit}
                onChange={(e) => setFormData({ ...formData, visit: e.target.value })}
              />
              <input
                className="border p-2 w-full mb-3 rounded-lg text-sm"
                placeholder="Organisation"
                value={formData.organisation}
                onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
              />
              <input
                className="border p-2 w-full mb-3 rounded-lg text-sm"
                placeholder="Employee"
                value={formData.employee}
                onChange={(e) => setFormData({ ...formData, employee: e.target.value })}
              />
              <input
                type="number"
                className="border p-2 w-full mb-4 rounded-lg text-sm"
                placeholder="Confirmed Value"
                value={formData.confirmedValue}
                onChange={(e) => setFormData({ ...formData, confirmedValue: Number(e.target.value) })}
              />
              <div className="flex gap-2 justify-end">
                <button onClick={() => { setShowEditModal(false); setSelectedItem(null); resetForm(); }} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-500 text-white rounded-lg text-sm">Cancel</button>
                <button onClick={handleEdit} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-green-600 text-white rounded-lg text-sm">Update Record</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ConfirmedBusinessPage;