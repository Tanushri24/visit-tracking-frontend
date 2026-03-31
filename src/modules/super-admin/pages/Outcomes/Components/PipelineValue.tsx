import React, { useState } from "react";
import { Search, Plus, DollarSign, Filter, Download, Edit, Trash2, X } from "lucide-react";

interface Opportunity {
  id: number;
  visit: string;
  stage: string;
  pipelineValue: number;
  employee: string;
  organisation: string;
}

const PipelineValuePage = () => {

  const [data, setData] = useState<Opportunity[]>([
    {
      id: 1,
      visit: "Visit to University",
      stage: "Requirement Discussion",
      pipelineValue: 500000,
      employee: "Rahul Sharma",
      organisation: "ABC University"
    },
    {
      id: 2,
      visit: "Visit to IT Department",
      stage: "Demo Conducted",
      pipelineValue: 800000,
      employee: "Priya Singh",
      organisation: "XYZ IT"
    },
    {
      id: 3,
      visit: "Visit to Training Institute",
      stage: "Proposal Shared",
      pipelineValue: 300000,
      employee: "Amit Kumar",
      organisation: "SkillTech"
    }
  ]);

  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterStage, setFilterStage] = useState("");
  const [filterEmployee, setFilterEmployee] = useState("");
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Opportunity | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<Opportunity>({
    id: 0,
    visit: "",
    stage: "",
    pipelineValue: 0,
    employee: "",
    organisation: ""
  });

  const totalPipeline = data.reduce((sum, item) => sum + item.pipelineValue, 0);
  const avgValue = data.length > 0 ? totalPipeline / data.length : 0;

  // Employee-wise Pipeline (for employee filter dropdown)
  const employeeWise = data.reduce((acc: Record<string, number>, item) => {
    acc[item.employee] = (acc[item.employee] || 0) + item.pipelineValue;
    return acc;
  }, {} as Record<string, number>);

  const filtered = data.filter(
    (item) =>
      (item.visit.toLowerCase().includes(search.toLowerCase()) ||
      item.organisation.toLowerCase().includes(search.toLowerCase()) ||
      item.employee.toLowerCase().includes(search.toLowerCase())) &&
      (filterStage === "" || item.stage === filterStage) &&
      (filterEmployee === "" || item.employee === filterEmployee)
  );

  const stageColor = (stage: string) => {
    const colors: any = {
      "Lead Identified": "bg-blue-100 text-blue-700",
      "Requirement Discussion": "bg-yellow-100 text-yellow-700",
      "Demo Conducted": "bg-purple-100 text-purple-700",
      "Proposal Shared": "bg-indigo-100 text-indigo-700",
      "Commercial Negotiation": "bg-orange-100 text-orange-700",
      "Order Expected": "bg-green-100 text-green-700"
    };
    return colors[stage] || "bg-gray-100 text-gray-600";
  };

  const exportToCSV = () => {
    const headers = ["Visit", "Funnel Stage", "Organisation", "Employee", "Pipeline Value"];
    const csvData = filtered.map(item => [
      item.visit,
      item.stage,
      item.organisation,
      item.employee,
      item.pipelineValue
    ]);
    const csvContent = [headers, ...csvData].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pipeline_value.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setFilterStage("");
    setFilterEmployee("");
    setSearch("");
  };

  const handleAdd = () => {
    const newId = data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1;
    const newOpportunity = { ...formData, id: newId };
    setData([...data, newOpportunity]);
    setShowAddModal(false);
    setFormData({ id: 0, visit: "", stage: "", pipelineValue: 0, employee: "", organisation: "" });
  };

  const handleEdit = () => {
    if (selectedItem) {
      setData(data.map(item => item.id === selectedItem.id ? { ...formData, id: item.id } : item));
      setShowEditModal(false);
      setSelectedItem(null);
      setFormData({ id: 0, visit: "", stage: "", pipelineValue: 0, employee: "", organisation: "" });
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this opportunity?")) {
      setData(data.filter(item => item.id !== id));
    }
  };

  const openEditModal = (item: Opportunity) => {
    setSelectedItem(item);
    setFormData(item);
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({ id: 0, visit: "", stage: "", pipelineValue: 0, employee: "", organisation: "" });
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-purple-600 mb-2">
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Pipeline Value</h1>
            <p className="text-sm text-gray-500 mt-1">Total expected business value from active opportunities</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all text-sm"
          >
            <Plus size={18} />
            Add Opportunity
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500 hover:shadow-md transition">
          <p className="text-xs text-gray-500">Total Pipeline Value</p>
          <p className="text-2xl font-bold text-gray-800">₹{totalPipeline.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">From {data.length} opportunities</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-500 hover:shadow-md transition">
          <p className="text-xs text-gray-500">Active Opportunities</p>
          <p className="text-2xl font-bold text-gray-800">{data.length}</p>
          <p className="text-xs text-gray-400 mt-1">In active stages</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-purple-500 hover:shadow-md transition">
          <p className="text-xs text-gray-500">Average Deal Size</p>
          <p className="text-2xl font-bold text-gray-800">₹{Math.round(avgValue).toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">Per opportunity</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-orange-500 hover:shadow-md transition">
          <p className="text-xs text-gray-500">Active Employees</p>
          <p className="text-2xl font-bold text-gray-800">{Object.keys(employeeWise).length}</p>
          <p className="text-xs text-gray-400 mt-1">Contributors</p>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="bg-white rounded-xl shadow-sm border mb-4">
        <div className="p-3 flex flex-col sm:flex-row gap-3 justify-between items-center">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search by visit, organisation or employee..."
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <Filter size={16} />
            </button>
            <button
              onClick={exportToCSV}
              className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <Download size={16} />
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="border-t p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-gray-700">Filter Opportunities</h3>
              <button onClick={clearFilters} className="text-xs text-red-600 hover:text-red-700">
                Clear All
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select
                value={filterStage}
                onChange={(e) => setFilterStage(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
              >
                <option value="">All Stages</option>
                <option value="Lead Identified">Lead Identified</option>
                <option value="Requirement Discussion">Requirement Discussion</option>
                <option value="Demo Conducted">Demo Conducted</option>
                <option value="Proposal Shared">Proposal Shared</option>
                <option value="Commercial Negotiation">Commercial Negotiation</option>
                <option value="Order Expected">Order Expected</option>
              </select>
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
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50 border-b">
              <tr className="text-xs font-semibold text-gray-500 uppercase">
                <th className="p-3 text-left">Visit</th>
                <th className="p-3 text-left">Funnel Stage</th>
                <th className="p-3 text-left">Organisation</th>
                <th className="p-3 text-left">Employee</th>
                <th className="p-3 text-right">Pipeline Value</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="p-3 text-sm font-medium text-gray-800">{item.visit}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${stageColor(item.stage)}`}>
                      {item.stage}
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-600">{item.organisation}</td>
                  <td className="p-3 text-sm text-gray-600">{item.employee}</td>
                  <td className="p-3 text-right text-sm font-semibold text-green-600">
                    ₹{item.pipelineValue.toLocaleString()}
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-8 text-center">
            <DollarSign className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-400">No opportunities found</p>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Add Opportunity</h2>
                <button onClick={() => { setShowAddModal(false); resetForm(); }} className="p-1 hover:bg-gray-100 rounded-lg">
                  <X size={20} />
                </button>
              </div>
              <input
                className="border p-2 w-full mb-3 rounded-lg text-sm"
                placeholder="Visit Name *"
                value={formData.visit}
                onChange={(e) => setFormData({ ...formData, visit: e.target.value })}
              />
              <select
                className="border p-2 w-full mb-3 rounded-lg text-sm bg-white"
                value={formData.stage}
                onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
              >
                <option value="">Select Stage *</option>
                <option value="Lead Identified">Lead Identified</option>
                <option value="Requirement Discussion">Requirement Discussion</option>
                <option value="Demo Conducted">Demo Conducted</option>
                <option value="Proposal Shared">Proposal Shared</option>
                <option value="Commercial Negotiation">Commercial Negotiation</option>
                <option value="Order Expected">Order Expected</option>
              </select>
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
                placeholder="Pipeline Value *"
                value={formData.pipelineValue}
                onChange={(e) => setFormData({ ...formData, pipelineValue: Number(e.target.value) })}
              />
              <div className="flex gap-2 justify-end">
                <button onClick={() => { setShowAddModal(false); resetForm(); }} className="px-4 py-2 bg-gray-500 text-white rounded-lg text-sm">Cancel</button>
                <button onClick={handleAdd} className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm">Add Opportunity</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Edit Opportunity</h2>
                <button onClick={() => { setShowEditModal(false); setSelectedItem(null); resetForm(); }} className="p-1 hover:bg-gray-100 rounded-lg">
                  <X size={20} />
                </button>
              </div>
              <input
                className="border p-2 w-full mb-3 rounded-lg text-sm"
                placeholder="Visit Name"
                value={formData.visit}
                onChange={(e) => setFormData({ ...formData, visit: e.target.value })}
              />
              <select
                className="border p-2 w-full mb-3 rounded-lg text-sm bg-white"
                value={formData.stage}
                onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
              >
                <option value="">Select Stage</option>
                <option value="Lead Identified">Lead Identified</option>
                <option value="Requirement Discussion">Requirement Discussion</option>
                <option value="Demo Conducted">Demo Conducted</option>
                <option value="Proposal Shared">Proposal Shared</option>
                <option value="Commercial Negotiation">Commercial Negotiation</option>
                <option value="Order Expected">Order Expected</option>
              </select>
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
                placeholder="Pipeline Value"
                value={formData.pipelineValue}
                onChange={(e) => setFormData({ ...formData, pipelineValue: Number(e.target.value) })}
              />
              <div className="flex gap-2 justify-end">
                <button onClick={() => { setShowEditModal(false); setSelectedItem(null); resetForm(); }} className="px-4 py-2 bg-gray-500 text-white rounded-lg text-sm">Cancel</button>
                <button onClick={handleEdit} className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm">Update Opportunity</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PipelineValuePage;