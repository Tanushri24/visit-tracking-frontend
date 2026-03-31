import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Delete,
  Edit,
  TrendingUp,
  Plus,
  Trash2,
  X
} from "lucide-react";

interface Lead {
  visitId: string;
  visitDate: string;
  employee: string;
  customer: string;
  pipelineValue: number;
  outcome: string;
}

const LeadGeneratedTracker = () => {

  const [leads, setLeads] = useState<Lead[]>([
    {
      visitId: "V-1001",
      visitDate: "20 May 2024",
      employee: "Rajesh Kumar",
      customer: "ABC Corp",
      pipelineValue: 50000,
      outcome: "Requirement: Cloud Infrastructure",
    },
    {
      visitId: "V-1002",
      visitDate: "20 May 2024",
      employee: "Priya Singh",
      customer: "XYZ Ltd",
      pipelineValue: 12500,
      outcome: "Lead Source: Trade Show",
    },
    {
      visitId: "V-1003",
      visitDate: "19 May 2024",
      employee: "Amit Patel",
      customer: "Beta Solutions",
      pipelineValue: 25000,
      outcome: "Follow-up required in 2 weeks",
    },
    {
      visitId: "V-1004",
      visitDate: "19 May 2024",
      employee: "Sneha Iyer",
      customer: "Gamma LLC",
      pipelineValue: 5000,
      outcome: "Small business package",
    },
    {
      visitId: "V-1005",
      visitDate: "18 May 2024",
      employee: "Rajesh Kumar",
      customer: "Delta Inc",
      pipelineValue: 100000,
      outcome: "Tender Opportunity attached",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [filterEmployee, setFilterEmployee] = useState("");
  const [filterMinValue, setFilterMinValue] = useState("");
  const [filterMaxValue, setFilterMaxValue] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [newLead, setNewLead] = useState<Lead>({
    visitId: "",
    visitDate: "",
    employee: "",
    customer: "",
    pipelineValue: 0,
    outcome: "",
  });

  const handleAddLead = () => {
    setLeads([...leads, newLead]);
    setNewLead({
      visitId: "",
      visitDate: "",
      employee: "",
      customer: "",
      pipelineValue: 0,
      outcome: "",
    });
    setIsAddOpen(false);
  };

  const handleEdit = (lead: Lead) => {
    setSelectedLead(lead);
    setIsEditOpen(true);
  };

  const handleDelete = (leadToDelete: Lead) => {
    if (window.confirm(`Are you sure you want to delete lead ${leadToDelete.visitId}?`)) {
      setLeads(leads.filter(lead => lead.visitId !== leadToDelete.visitId));
    }
  };

  const handleUpdateLead = () => {
    if (selectedLead) {
      setLeads(leads.map(lead => 
        lead.visitId === selectedLead.visitId ? selectedLead : lead
      ));
      setIsEditOpen(false);
      setSelectedLead(null);
    }
  };
  
  const clearFilters = () => {
    setFilterEmployee("");
    setFilterMinValue("");
    setFilterMaxValue("");
    setFilterDate("");
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = lead.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.visitId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEmployee = filterEmployee === "" || lead.employee.toLowerCase().includes(filterEmployee.toLowerCase());
    const matchesMinValue = filterMinValue === "" || lead.pipelineValue >= Number(filterMinValue);
    const matchesMaxValue = filterMaxValue === "" || lead.pipelineValue <= Number(filterMaxValue);
    const matchesDate = filterDate === "" || lead.visitDate.includes(filterDate);
    
    return matchesSearch && matchesEmployee && matchesMinValue && matchesMaxValue && matchesDate;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLeads.slice(indexOfFirstItem, indexOfLastItem);
  

  const totalPipeline = leads.reduce((sum, item) => sum + item.pipelineValue, 0);

  const exportToCSV = () => {
    const headers = ["Visit ID","Visit Date","Employee","Customer","Pipeline Value","Outcome"];
    const csvData = filteredLeads.map(l => [
      l.visitId,
      l.visitDate,
      l.employee,
      l.customer,
      l.pipelineValue,
      l.outcome
    ]);
    const csvContent = [headers,...csvData].map(e=>e.join(",")).join("\n");
    const blob = new Blob([csvContent],{type:"text/csv"});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lead_generated.csv";
    a.click();
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <TrendingUp className="text-purple-600"/>
            Lead Generation Tracker
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Track all visits where leads were generated
          </p>
        </div>
        <button
          onClick={()=>setIsAddOpen(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center gap-2 hover:bg-purple-700"
        >
          <Plus size={18}/>
          Add Lead
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
          <p className="text-sm text-gray-600">Leads Generated</p>
          <p className="text-2xl font-bold text-gray-800">{leads.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-600">Total Pipeline Value</p>
          <p className="text-2xl font-bold text-green-600">
            ${totalPipeline.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">Visit to Lead Ratio</p>
          <p className="text-2xl font-bold text-blue-600">18.5%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-orange-500">
          <p className="text-sm text-gray-600">Cost per Lead</p>
          <p className="text-2xl font-bold text-orange-600">$45.20</p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-96 relative">
            <input
              type="text"
              placeholder="Search leads..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e)=>setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20}/>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={()=>setShowFilters(!showFilters)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <Filter size={18}/>
            </button>
            <button
              onClick={exportToCSV}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <Download size={18}/>
            </button>
          </div>
        </div>
        
        {/* Filter Panel */}
        {showFilters && (
          <div className="border-t p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-gray-700">Filters</h3>
              <button onClick={clearFilters} className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1">
                <X size={14}/> Clear All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <input
                type="text"
                placeholder="Filter by Employee"
                value={filterEmployee}
                onChange={(e)=>setFilterEmployee(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <input
                type="text"
                placeholder="Min Pipeline Value"
                value={filterMinValue}
                onChange={(e)=>setFilterMinValue(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <input
                type="text"
                placeholder="Max Pipeline Value"
                value={filterMaxValue}
                onChange={(e)=>setFilterMaxValue(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <input
                type="text"
                placeholder="Filter by Date (e.g., May 2024)"
                value={filterDate}
                onChange={(e)=>setFilterDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">S.No</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Visit ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Visit Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pipeline Value</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Outcome Details</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {currentItems.map((lead,index)=>(
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {lead.visitId}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {lead.visitDate}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {lead.employee}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {lead.customer}
                  </td>
                  <td className="px-4 py-3 text-green-600 font-semibold">
                    ${lead.pipelineValue.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {lead.outcome}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button 
                        onClick={()=>handleEdit(lead)} 
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="Edit"
                      >
                        <Edit size={18}/>
                      </button>
                      <button 
                        onClick={()=>handleDelete(lead)} 
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <Trash2 size={18}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT MODAL */}
      {isEditOpen && selectedLead && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4">Edit Lead</h2>
            <input 
              className="border p-2 w-full mb-2" 
              placeholder="Visit ID"
              value={selectedLead.visitId}
              onChange={(e)=>setSelectedLead({...selectedLead,visitId:e.target.value})}
            />
            <input 
              className="border p-2 w-full mb-2" 
              placeholder="Visit Date"
              value={selectedLead.visitDate}
              onChange={(e)=>setSelectedLead({...selectedLead,visitDate:e.target.value})}
            />
            <input 
              className="border p-2 w-full mb-2" 
              placeholder="Employee"
              value={selectedLead.employee}
              onChange={(e)=>setSelectedLead({...selectedLead,employee:e.target.value})}
            />
            <input 
              className="border p-2 w-full mb-2" 
              placeholder="Customer"
              value={selectedLead.customer}
              onChange={(e)=>setSelectedLead({...selectedLead,customer:e.target.value})}
            />
            <input 
              type="number" 
              className="border p-2 w-full mb-2" 
              placeholder="Pipeline Value"
              value={selectedLead.pipelineValue}
              onChange={(e)=>setSelectedLead({...selectedLead,pipelineValue:Number(e.target.value)})}
            />
            <textarea 
              className="border p-2 w-full mb-2" 
              placeholder="Outcome"
              value={selectedLead.outcome}
              onChange={(e)=>setSelectedLead({...selectedLead,outcome:e.target.value})}
            />
            <div className="flex justify-end gap-2 mt-3">
              <button 
                onClick={()=>{
                  setIsEditOpen(false);
                  setSelectedLead(null);
                }} 
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdateLead} 
                className="px-4 py-2 bg-purple-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD MODAL */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4">Add Lead</h2>
            <input className="border p-2 w-full mb-2" placeholder="Visit ID"
              value={newLead.visitId}
              onChange={(e)=>setNewLead({...newLead,visitId:e.target.value})}
            />
            <input className="border p-2 w-full mb-2" placeholder="Visit Date"
              value={newLead.visitDate}
              onChange={(e)=>setNewLead({...newLead,visitDate:e.target.value})}
            />
            <input className="border p-2 w-full mb-2" placeholder="Employee"
              value={newLead.employee}
              onChange={(e)=>setNewLead({...newLead,employee:e.target.value})}
            />
            <input className="border p-2 w-full mb-2" placeholder="Customer"
              value={newLead.customer}
              onChange={(e)=>setNewLead({...newLead,customer:e.target.value})}
            />
            <input type="number" className="border p-2 w-full mb-2" placeholder="Pipeline Value"
              value={newLead.pipelineValue}
              onChange={(e)=>setNewLead({...newLead,pipelineValue:Number(e.target.value)})}
            />
            <textarea className="border p-2 w-full mb-2" placeholder="Outcome"
              value={newLead.outcome}
              onChange={(e)=>setNewLead({...newLead,outcome:e.target.value})}
            />
            <div className="flex justify-end gap-2 mt-3">
              <button onClick={()=>setIsAddOpen(false)} className="px-4 py-2 bg-gray-500 text-white rounded">
                Cancel
              </button>
              <button onClick={handleAddLead} className="px-4 py-2 bg-purple-600 text-white rounded">
                Add
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default LeadGeneratedTracker;