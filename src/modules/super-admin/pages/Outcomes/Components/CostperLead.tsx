import React, { useState } from "react";
import { Search, Download, Trash2, DollarSign, TrendingUp, Plus, Filter, X, Edit } from "lucide-react";

interface CostPerLead {
  id: number;
  visit: string;
  employee: string;
  travelExpense: number;
  leadsGenerated: number;
  costPerLead: number;
}

const CostPerLeadPage = () => {

  const [data, setData] = useState<CostPerLead[]>([
    {
      id: 1,
      visit: "Visit to University",
      employee: "Rahul Sharma",
      travelExpense: 350,
      leadsGenerated: 1,
      costPerLead: 350
    },
    {
      id: 2,
      visit: "Visit to IT Company",
      employee: "Priya Singh",
      travelExpense: 500,
      leadsGenerated: 2,
      costPerLead: 250
    },
    {
      id: 3,
      visit: "Visit to Training Center",
      employee: "Amit Kumar",
      travelExpense: 400,
      leadsGenerated: 1,
      costPerLead: 400
    }
  ]);

  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterEmployee, setFilterEmployee] = useState("");
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CostPerLead | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<CostPerLead>({
    id: 0,
    visit: "",
    employee: "",
    travelExpense: 0,
    leadsGenerated: 0,
    costPerLead: 0
  });

  // Employee-wise for filter
  const employeeWise = data.reduce((acc: Record<string, number>, item) => {
    acc[item.employee] = (acc[item.employee] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const filtered = data.filter(
    item =>
      (item.visit.toLowerCase().includes(search.toLowerCase()) ||
      item.employee.toLowerCase().includes(search.toLowerCase())) &&
      (filterEmployee === "" || item.employee === filterEmployee)
  );

  const totalExpense = data.reduce((sum, item) => sum + item.travelExpense, 0);
  const totalLeads = data.reduce((sum, item) => sum + item.leadsGenerated, 0);
  const avgCostPerLead = totalExpense / (totalLeads || 1);

  // Delete
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      const updated = data.filter(item => item.id !== id);
      setData(updated);
    }
  };

  // Add
  const handleAdd = () => {
    if (formData.visit && formData.employee && formData.travelExpense > 0 && formData.leadsGenerated > 0) {
      const newId = data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1;
      const costPerLead = formData.travelExpense / formData.leadsGenerated;
      const newItem = { ...formData, id: newId, costPerLead };
      setData([...data, newItem]);
      setShowAddModal(false);
      resetForm();
    } else {
      alert("Please fill all required fields");
    }
  };

  // Edit
  const handleEdit = () => {
    if (selectedItem) {
      const costPerLead = formData.travelExpense / formData.leadsGenerated;
      setData(data.map(item => item.id === selectedItem.id ? { ...formData, id: item.id, costPerLead } : item));
      setShowEditModal(false);
      setSelectedItem(null);
      resetForm();
    }
  };

  const openEditModal = (item: CostPerLead) => {
    setSelectedItem(item);
    setFormData(item);
    setShowEditModal(true);
  };

  // Export CSV
  const handleExport = () => {
    const headers = ["Visit", "Employee", "Travel Expense", "Leads Generated", "Cost Per Lead"];
    const rows = filtered.map(d => [d.visit, d.employee, d.travelExpense, d.leadsGenerated, d.costPerLead]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cost_per_lead.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setFilterEmployee("");
    setSearch("");
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      visit: "",
      employee: "",
      travelExpense: 0,
      leadsGenerated: 0,
      costPerLead: 0
    });
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            Cost per Lead
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
            Travel expense required to generate each lead
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          {/* Add Record Button - Now on LEFT side */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm hover:bg-green-700 flex-1 sm:flex-none"
          >
            <Plus size={16}/>
            Add Record
          </button>
          
          {/* Export Button */}
          <button
            onClick={handleExport}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm hover:bg-blue-700 flex-1 sm:flex-none"
          >
            <Download size={16}/>
            <span>Export</span>
          </button>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 border border-gray-300 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm hover:bg-gray-50 flex-1 sm:flex-none"
          >
            <Filter size={16}/>
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-6">
        {/* Total Travel Expense */}
        <div className="group bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-0.5">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Total Travel Expense</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">₹{totalExpense.toLocaleString()}</p>
              <p className="text-[10px] sm:text-xs text-gray-400">Total travel & visit expenses</p>
            </div>
            <div className="p-2.5 sm:p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-all duration-300 group-hover:scale-105">
              <DollarSign className="text-blue-600" size={20}/>
            </div>
          </div>
        </div>

        {/* Total Leads Generated */}
        <div className="group bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-green-200 hover:-translate-y-0.5">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Total Leads Generated</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">{totalLeads}</p>
              <p className="text-[10px] sm:text-xs text-gray-400">From all visits</p>
            </div>
            <div className="p-2.5 sm:p-3 bg-green-50 rounded-xl group-hover:bg-green-100 transition-all duration-300 group-hover:scale-105">
              <TrendingUp className="text-green-600" size={20} />
            </div>
          </div>
        </div>

        {/* Average Cost per Lead */}
        <div className="group bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-purple-200 hover:-translate-y-0.5">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Average Cost per Lead</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600">₹{Math.round(avgCostPerLead)}</p>
              <p className="text-[10px] sm:text-xs text-gray-400">Cost per generated lead</p>
            </div>
            <div className="p-2.5 sm:p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-all duration-300 group-hover:scale-105">
              <DollarSign className="text-purple-600" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm w-full sm:w-80">
          <Search size={16} className="text-gray-400"/>
          <input
            type="text"
            placeholder="Search visit or employee..."
            className="ml-2 outline-none text-sm w-full"
            onChange={(e) => setSearch(e.target.value)}
          />
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
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-3">
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
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr className="text-xs sm:text-sm">
                <th className="p-2 sm:p-3 text-left font-semibold">Visit</th>
                <th className="p-2 sm:p-3 text-left font-semibold">Employee</th>
                <th className="p-2 sm:p-3 text-left font-semibold">Travel Expense</th>
                <th className="p-2 sm:p-3 text-left font-semibold">Leads Generated</th>
                <th className="p-2 sm:p-3 text-left font-semibold">Cost per Lead</th>
                <th className="p-2 sm:p-3 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <tr key={item.id} className="border-t hover:bg-gray-50">
                    <td className="p-2 sm:p-3 text-xs sm:text-sm font-medium text-gray-700">{item.visit}</td>
                    <td className="p-2 sm:p-3 text-xs sm:text-sm text-gray-600">{item.employee}</td>
                    <td className="p-2 sm:p-3 text-xs sm:text-sm text-gray-600">₹{item.travelExpense}</td>
                    <td className="p-2 sm:p-3 text-xs sm:text-sm text-gray-600">{item.leadsGenerated}</td>
                    <td className="p-2 sm:p-3 text-xs sm:text-sm font-semibold text-purple-600">₹{item.costPerLead}</td>
                    <td className="p-2 sm:p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit size={16}/>
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 sm:py-10 text-gray-400 text-sm">
                    No data found
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
                <h2 className="text-lg sm:text-xl font-bold">Add Cost per Lead Record</h2>
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
                placeholder="Employee Name *"
                value={formData.employee}
                onChange={(e) => setFormData({ ...formData, employee: e.target.value })}
              />
              <input
                type="number"
                className="border p-2 w-full mb-3 rounded-lg text-sm"
                placeholder="Travel Expense *"
                value={formData.travelExpense}
                onChange={(e) => setFormData({ ...formData, travelExpense: Number(e.target.value) })}
              />
              <input
                type="number"
                className="border p-2 w-full mb-4 rounded-lg text-sm"
                placeholder="Leads Generated *"
                value={formData.leadsGenerated}
                onChange={(e) => setFormData({ ...formData, leadsGenerated: Number(e.target.value) })}
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
                <h2 className="text-lg sm:text-xl font-bold">Edit Cost per Lead Record</h2>
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
                placeholder="Employee Name"
                value={formData.employee}
                onChange={(e) => setFormData({ ...formData, employee: e.target.value })}
              />
              <input
                type="number"
                className="border p-2 w-full mb-3 rounded-lg text-sm"
                placeholder="Travel Expense"
                value={formData.travelExpense}
                onChange={(e) => setFormData({ ...formData, travelExpense: Number(e.target.value) })}
              />
              <input
                type="number"
                className="border p-2 w-full mb-4 rounded-lg text-sm"
                placeholder="Leads Generated"
                value={formData.leadsGenerated}
                onChange={(e) => setFormData({ ...formData, leadsGenerated: Number(e.target.value) })}
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

export default CostPerLeadPage;