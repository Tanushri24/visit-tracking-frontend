import React, { useState } from "react";
import { Medal, Download, Filter, Plus, X, Edit, Trash2, TrendingUp, DollarSign, Wallet, ShoppingBag } from "lucide-react";

interface Productivity {
  id: number;
  employee: string;
  visits: number;
  leads: number;
  proposals: number;
  orders: number;
  revenue: number;
  expense: number;
  score: number;
}

const ProductivityScorePage = () => {

  const [data, setData] = useState<Productivity[]>([
    {
      id: 1,
      employee: "Rahul Sharma",
      visits: 32,
      leads: 14,
      proposals: 7,
      orders: 3,
      revenue: 1250000,
      expense: 18000,
      score: 82
    },
    {
      id: 2,
      employee: "Priya Singh",
      visits: 28,
      leads: 11,
      proposals: 6,
      orders: 2,
      revenue: 900000,
      expense: 15000,
      score: 74
    },
    {
      id: 3,
      employee: "Amit Kumar",
      visits: 25,
      leads: 9,
      proposals: 4,
      orders: 2,
      revenue: 700000,
      expense: 12000,
      score: 68
    }
  ]);

  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterMinScore, setFilterMinScore] = useState("");
  const [filterMaxScore, setFilterMaxScore] = useState("");
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Productivity | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<Productivity>({
    id: 0,
    employee: "",
    visits: 0,
    leads: 0,
    proposals: 0,
    orders: 0,
    revenue: 0,
    expense: 0,
    score: 0
  });

  const filtered = data.filter(d =>
    d.employee.toLowerCase().includes(search.toLowerCase()) &&
    (filterMinScore === "" || d.score >= Number(filterMinScore)) &&
    (filterMaxScore === "" || d.score <= Number(filterMaxScore))
  );

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalExpense = data.reduce((sum, item) => sum + item.expense, 0);
  const totalOrders = data.reduce((sum, item) => sum + item.orders, 0);
  const avgScore = Math.round(data.reduce((sum, item) => sum + item.score, 0) / data.length);

  // Delete
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setData(data.filter(item => item.id !== id));
    }
  };

  // Add
  const handleAdd = () => {
    if (formData.employee && formData.visits > 0 && formData.leads > 0) {
      const newId = data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1;
      const score = Math.round((formData.leads / formData.visits) * 100);
      const newItem = { ...formData, id: newId, score };
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
      const score = Math.round((formData.leads / formData.visits) * 100);
      setData(data.map(item => item.id === selectedItem.id ? { ...formData, id: item.id, score } : item));
      setShowEditModal(false);
      setSelectedItem(null);
      resetForm();
    }
  };

  const openEditModal = (item: Productivity) => {
    setSelectedItem(item);
    setFormData(item);
    setShowEditModal(true);
  };

  // Export CSV
  const handleExport = () => {
    const headers = ["Employee", "Visits", "Leads", "Proposals", "Orders", "Revenue", "Expense", "Score"];
    const rows = filtered.map(d => [d.employee, d.visits, d.leads, d.proposals, d.orders, d.revenue, d.expense, d.score]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "productivity_score.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setFilterMinScore("");
    setFilterMaxScore("");
    setSearch("");
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      employee: "",
      visits: 0,
      leads: 0,
      proposals: 0,
      orders: 0,
      revenue: 0,
      expense: 0,
      score: 0
    });
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">

      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
              Productivity Score
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Employee productivity performance based on visits and business outcomes
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm hover:bg-green-700 w-full sm:w-auto"
          >
            <Plus size={16}/>
            Add Record
          </button>
        </div>
      </div>

     {/* Stats Cards */}
<div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
  <div className="group bg-gradient-to-br from-white to-gray-50 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-green-200 hover:-translate-y-0.5 border-l-4 border-l-green-500">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-[10px] xs:text-xs font-medium text-gray-500 uppercase tracking-wider">Total Revenue</p>
        <p className="text-xs xs:text-sm sm:text-base lg:text-lg font-bold text-green-600 mt-1 break-words">₹{totalRevenue.toLocaleString()}</p>
      </div>
      <div className="p-1.5 xs:p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-all duration-300 group-hover:scale-105 ml-2 flex-shrink-0">
        <DollarSign size={14} className="xs:w-4 xs:h-4 text-green-600" />
      </div>
    </div>
  </div>

  <div className="group bg-gradient-to-br from-white to-gray-50 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-orange-200 hover:-translate-y-0.5 border-l-4 border-l-orange-500">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-[10px] xs:text-xs font-medium text-gray-500 uppercase tracking-wider">Total Expense</p>
        <p className="text-xs xs:text-sm sm:text-base lg:text-lg font-bold text-orange-600 mt-1 break-words">₹{totalExpense.toLocaleString()}</p>
      </div>
      <div className="p-1.5 xs:p-2 bg-orange-50 rounded-lg group-hover:bg-orange-100 transition-all duration-300 group-hover:scale-105 ml-2 flex-shrink-0">
        <Wallet size={14} className="xs:w-4 xs:h-4 text-orange-600" />
      </div>
    </div>
  </div>

  <div className="group bg-gradient-to-br from-white to-gray-50 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-purple-200 hover:-translate-y-0.5 border-l-4 border-l-purple-500">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-[10px] xs:text-xs font-medium text-gray-500 uppercase tracking-wider">Total Orders</p>
        <p className="text-xs xs:text-sm sm:text-base lg:text-lg font-bold text-purple-600 mt-1 break-words">{totalOrders}</p>
      </div>
      <div className="p-1.5 xs:p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-all duration-300 group-hover:scale-105 ml-2 flex-shrink-0">
        <ShoppingBag size={14} className="xs:w-4 xs:h-4 text-purple-600" />
      </div>
    </div>
  </div>

  <div className="group bg-gradient-to-br from-white to-gray-50 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-0.5 border-l-4 border-l-blue-500">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-[10px] xs:text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Score</p>
        <p className="text-xs xs:text-sm sm:text-base lg:text-lg font-bold text-blue-600 mt-1 break-words">{avgScore}%</p>
      </div>
      <div className="p-1.5 xs:p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-all duration-300 group-hover:scale-105 ml-2 flex-shrink-0">
        <TrendingUp size={14} className="xs:w-4 xs:h-4 text-blue-600" />
      </div>
    </div>
  </div>
</div>

      {/* Search, Filter & Export Section - Filter & Export on RIGHT */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4 justify-between">
        <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm flex-1 sm:flex-none sm:w-64">
          <input
            type="text"
            placeholder="Search employee..."
            className="outline-none text-sm w-full"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 justify-end">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 border border-gray-300 bg-white px-3 sm:px-4 py-2 rounded-lg text-sm hover:bg-gray-50"
          >
            <Filter size={16}/>
            <span>Filter</span>
          </button>

          <button
            onClick={handleExport}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
          >
            <Download size={16}/>
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white rounded-xl shadow-sm border mb-4 p-3 sm:p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium text-gray-700">Filter by Score</h3>
            <button onClick={clearFilters} className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1">
              <X size={14}/> Clear All
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Min Score"
              value={filterMinScore}
              onChange={(e) => setFilterMinScore(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
            />
            <input
              type="number"
              placeholder="Max Score"
              value={filterMaxScore}
              onChange={(e) => setFilterMaxScore(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
            />
          </div>
        </div>
      )}

      {/* Top 3 Ranking */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
        {data
          .sort((a,b)=>b.score-a.score)
          .slice(0,3)
          .map((item,index)=>(
            <div key={item.id} className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-gray-500 font-medium">Rank #{index+1}</p>
                  <h3 className="font-bold text-sm sm:text-base text-gray-800">{item.employee}</h3>
                  <p className="text-xs text-gray-500">Score: <span className="font-semibold text-blue-600">{item.score}</span></p>
                </div>
                <Medal className="text-yellow-500" size={20} />
              </div>
            </div>
        ))}
      </div>

      {/* Productivity Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-sm">
            <thead className="bg-gray-50 border-b">
              <tr className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <th className="p-3 text-left">Employee</th>
                <th className="p-3 text-left">Visits</th>
                <th className="p-3 text-left">Leads</th>
                <th className="p-3 text-left">Proposals</th>
                <th className="p-3 text-left">Orders</th>
                <th className="p-3 text-left">Revenue</th>
                <th className="p-3 text-left">Expense</th>
                <th className="p-3 text-left">Score</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-medium text-gray-800 text-xs sm:text-sm">{item.employee}</td>
                  <td className="p-3 text-gray-600 text-xs sm:text-sm">{item.visits}</td>
                  <td className="p-3 text-gray-600 text-xs sm:text-sm">{item.leads}</td>
                  <td className="p-3 text-gray-600 text-xs sm:text-sm">{item.proposals}</td>
                  <td className="p-3 text-gray-600 text-xs sm:text-sm">{item.orders}</td>
                  <td className="p-3 font-semibold text-green-600 text-xs sm:text-sm">₹{item.revenue.toLocaleString()}</td>
                  <td className="p-3 text-orange-600 text-xs sm:text-sm">₹{item.expense.toLocaleString()}</td>
                  <td className="p-3 w-40">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-green-500 to-blue-500 h-1.5 rounded-full" style={{width:`${item.score}%`}} />
                      </div>
                      <span className="text-xs font-semibold text-gray-700">{item.score}</span>
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex gap-2 justify-center">
                      <button onClick={() => openEditModal(item)} className="text-blue-600 hover:text-blue-800">
                        <Edit size={16}/>
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 size={16}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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
                <h2 className="text-lg sm:text-xl font-bold">Add Productivity Record</h2>
                <button onClick={() => { setShowAddModal(false); resetForm(); }} className="p-1 hover:bg-gray-100 rounded-lg">
                  <X size={18} />
                </button>
              </div>
              <input className="border p-2 w-full mb-3 rounded-lg text-sm" placeholder="Employee Name *" value={formData.employee} onChange={(e) => setFormData({ ...formData, employee: e.target.value })} />
              <input type="number" className="border p-2 w-full mb-3 rounded-lg text-sm" placeholder="Visits *" value={formData.visits} onChange={(e) => setFormData({ ...formData, visits: Number(e.target.value) })} />
              <input type="number" className="border p-2 w-full mb-3 rounded-lg text-sm" placeholder="Leads *" value={formData.leads} onChange={(e) => setFormData({ ...formData, leads: Number(e.target.value) })} />
              <input type="number" className="border p-2 w-full mb-3 rounded-lg text-sm" placeholder="Proposals" value={formData.proposals} onChange={(e) => setFormData({ ...formData, proposals: Number(e.target.value) })} />
              <input type="number" className="border p-2 w-full mb-3 rounded-lg text-sm" placeholder="Orders" value={formData.orders} onChange={(e) => setFormData({ ...formData, orders: Number(e.target.value) })} />
              <input type="number" className="border p-2 w-full mb-3 rounded-lg text-sm" placeholder="Revenue" value={formData.revenue} onChange={(e) => setFormData({ ...formData, revenue: Number(e.target.value) })} />
              <input type="number" className="border p-2 w-full mb-4 rounded-lg text-sm" placeholder="Expense" value={formData.expense} onChange={(e) => setFormData({ ...formData, expense: Number(e.target.value) })} />
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
                <h2 className="text-lg sm:text-xl font-bold">Edit Productivity Record</h2>
                <button onClick={() => { setShowEditModal(false); setSelectedItem(null); resetForm(); }} className="p-1 hover:bg-gray-100 rounded-lg">
                  <X size={18} />
                </button>
              </div>
              <input className="border p-2 w-full mb-3 rounded-lg text-sm" placeholder="Employee Name" value={formData.employee} onChange={(e) => setFormData({ ...formData, employee: e.target.value })} />
              <input type="number" className="border p-2 w-full mb-3 rounded-lg text-sm" placeholder="Visits" value={formData.visits} onChange={(e) => setFormData({ ...formData, visits: Number(e.target.value) })} />
              <input type="number" className="border p-2 w-full mb-3 rounded-lg text-sm" placeholder="Leads" value={formData.leads} onChange={(e) => setFormData({ ...formData, leads: Number(e.target.value) })} />
              <input type="number" className="border p-2 w-full mb-3 rounded-lg text-sm" placeholder="Proposals" value={formData.proposals} onChange={(e) => setFormData({ ...formData, proposals: Number(e.target.value) })} />
              <input type="number" className="border p-2 w-full mb-3 rounded-lg text-sm" placeholder="Orders" value={formData.orders} onChange={(e) => setFormData({ ...formData, orders: Number(e.target.value) })} />
              <input type="number" className="border p-2 w-full mb-3 rounded-lg text-sm" placeholder="Revenue" value={formData.revenue} onChange={(e) => setFormData({ ...formData, revenue: Number(e.target.value) })} />
              <input type="number" className="border p-2 w-full mb-4 rounded-lg text-sm" placeholder="Expense" value={formData.expense} onChange={(e) => setFormData({ ...formData, expense: Number(e.target.value) })} />
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

export default ProductivityScorePage;