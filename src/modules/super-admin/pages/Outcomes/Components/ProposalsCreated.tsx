import React, { useState } from "react";
import {
  Search,
  Download,
  Edit,
  Trash2,
  Plus,
  FileText,
  TrendingUp,
  DollarSign,
  X
} from "lucide-react";

interface Proposal {
  proposalId: string;
  proposalDate: string;
  proposalTitle: string;
  proposalValue: number;
  proposalType: string;
  client: string;
  preparedBy: string;
  proposalStatus: string;
  expectedClosureDate: string;
  remarks: string;
}

const ProposalManagement: React.FC = () => {

  const [proposals, setProposals] = useState<Proposal[]>([
    {
      proposalId: "PR-1001",
      proposalDate: "22 May 2024",
      proposalTitle: "Cloud Migration",
      proposalValue: 75000,
      proposalType: "Technical",
      client: "ABC Corp",
      preparedBy: "Rajesh Kumar",
      proposalStatus: "Submitted",
      expectedClosureDate: "10 Jun 2024",
      remarks: "Client reviewing"
    },
    {
      proposalId: "PR-1002",
      proposalDate: "21 May 2024",
      proposalTitle: "ERP Implementation",
      proposalValue: 120000,
      proposalType: "Commercial",
      client: "XYZ Ltd",
      preparedBy: "Priya Singh",
      proposalStatus: "Under Review",
      expectedClosureDate: "15 Jun 2024",
      remarks: "Waiting approval"
    }
  ]);

  const [search, setSearch] = useState<string>("");
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [selected, setSelected] = useState<Proposal | null>(null);

  const [form, setForm] = useState<Proposal>({
    proposalId: "",
    proposalDate: "",
    proposalTitle: "",
    proposalValue: 0,
    proposalType: "",
    client: "",
    preparedBy: "",
    proposalStatus: "",
    expectedClosureDate: "",
    remarks: ""
  });

  const filtered = proposals.filter(p =>
    p.proposalTitle.toLowerCase().includes(search.toLowerCase()) ||
    p.client.toLowerCase().includes(search.toLowerCase()) ||
    p.proposalId.toLowerCase().includes(search.toLowerCase())
  );

  const totalValue = proposals.reduce((sum, p) => sum + p.proposalValue, 0);
  const avgValue = proposals.length > 0 ? totalValue / proposals.length : 0;

  const addProposal = (): void => {
    if (form.proposalId && form.proposalTitle && form.client) {
      setProposals([...proposals, form]);
      setShowAdd(false);
      resetForm();
    } else {
      alert("Please fill required fields");
    }
  };

  const editProposal = (): void => {
    if (selected) {
      setProposals(proposals.map(p => p.proposalId === selected.proposalId ? form : p));
      setShowEdit(false);
      setSelected(null);
      resetForm();
    }
  };

  const deleteProposal = (id: string): void => {
    if (window.confirm("Are you sure you want to delete this proposal?")) {
      setProposals(proposals.filter(p => p.proposalId !== id));
    }
  };

  const resetForm = (): void => {
    setForm({
      proposalId: "",
      proposalDate: "",
      proposalTitle: "",
      proposalValue: 0,
      proposalType: "",
      client: "",
      preparedBy: "",
      proposalStatus: "",
      expectedClosureDate: "",
      remarks: ""
    });
  };

  const exportToCSV = (): void => {
    const headers = ["Proposal ID", "Date", "Title", "Value", "Type", "Client", "Prepared By", "Status", "Closure Date", "Remarks"];
    const csvData = filtered.map(p => [
      p.proposalId,
      p.proposalDate,
      p.proposalTitle,
      p.proposalValue,
      p.proposalType,
      p.client,
      p.preparedBy,
      p.proposalStatus,
      p.expectedClosureDate,
      p.remarks
    ]);
    const csvContent = [headers, ...csvData].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "proposals.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const statusColor = (status: string): string => {
    switch (status) {
      case "Accepted": return "bg-emerald-100 text-emerald-700";
      case "Rejected": return "bg-rose-100 text-rose-700";
      case "Submitted": return "bg-blue-100 text-blue-700";
      default: return "bg-amber-100 text-amber-700";
    }
  };

  return (

    <div className="p-3 sm:p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex gap-2 items-center text-gray-800">
            <FileText className="text-purple-600" size={24} />
            Proposal Created
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">Manage and track all your business proposals</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-lg sm:rounded-xl flex gap-2 items-center hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 text-sm sm:text-base"
        >
          <Plus size={16} />
          Add Proposal
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-5">

        <div className="group bg-gradient-to-br from-white to-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-0.5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs sm:text-sm text-gray-500 mb-0.5">Total Proposals</p>
              <p className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">
                {proposals.length}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
                Active proposals
              </p>
            </div>
            <div className="p-2 sm:p-2.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition">
              <FileText className="text-blue-600 group-hover:scale-110 transition-transform" size={16} />
            </div>
          </div>
        </div>

        <div className="group bg-gradient-to-br from-white to-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200 hover:-translate-y-0.5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs sm:text-sm text-gray-500 mb-0.5">Total Proposal Value</p>
              <p className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">
                ${totalValue.toLocaleString()}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
                Total pipeline value
              </p>
            </div>
            <div className="p-2 sm:p-2.5 bg-green-50 rounded-lg group-hover:bg-green-100 transition">
              <DollarSign className="text-green-600 group-hover:scale-110 transition-transform" size={16} />
            </div>
          </div>
        </div>

        <div className="group bg-gradient-to-br from-white to-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 hover:-translate-y-0.5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs sm:text-sm text-gray-500 mb-0.5">Average Proposal Value</p>
              <p className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">
                ${Math.round(avgValue).toLocaleString()}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
                Per proposal average
              </p>
            </div>
            <div className="p-2 sm:p-2.5 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition">
              <TrendingUp className="text-purple-600 group-hover:scale-110 transition-transform" size={16} />
            </div>
          </div>
        </div>

      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 mb-4 sm:mb-6">

        <div className="p-3 sm:p-4 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-center">

          <div className="relative w-full sm:w-80 md:w-96">
            <input
              placeholder="Search by title, client or proposal ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-200 w-full rounded-lg pl-9 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
            <Search className="absolute left-2.5 sm:left-3 top-2 sm:top-3 text-gray-400" size={16} />
          </div>

          <button 
            onClick={exportToCSV} 
            className="w-full sm:w-auto flex items-center justify-center gap-2 border border-gray-200 px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[800px] sm:min-w-[900px] md:min-w-full">

            <thead className="bg-gray-50 border-b border-gray-100">

              <tr className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="p-2 sm:p-3 md:p-4 text-left">Proposal ID</th>
                <th className="p-2 sm:p-3 md:p-4 text-left">Date</th>
                <th className="p-2 sm:p-3 md:p-4 text-left">Title</th>
                <th className="p-2 sm:p-3 md:p-4 text-left">Value</th>
                <th className="p-2 sm:p-3 md:p-4 text-left">Type</th>
                <th className="p-2 sm:p-3 md:p-4 text-left">Client</th>
                <th className="p-2 sm:p-3 md:p-4 text-left">Prepared By</th>
                <th className="p-2 sm:p-3 md:p-4 text-left">Status</th>
                <th className="p-2 sm:p-3 md:p-4 text-left">Closure</th>
                <th className="p-2 sm:p-3 md:p-4 text-center">Actions</th>
              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">
              {filtered.map(p => (
                <tr key={p.proposalId} className="hover:bg-gray-50 transition-colors">

                  <td className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm font-medium text-gray-900">{p.proposalId}</td>
                  <td className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm text-gray-600">{p.proposalDate}</td>
                  <td className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm font-medium text-gray-800">{p.proposalTitle}</td>
                  <td className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm font-semibold text-green-600">${p.proposalValue.toLocaleString()}</td>
                  <td className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm text-gray-600">
                    <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 rounded-full text-[10px] sm:text-xs">{p.proposalType}</span>
                  </td>
                  <td className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm text-gray-600">{p.client}</td>
                  <td className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm text-gray-600">{p.preparedBy}</td>

                  <td className="p-2 sm:p-3 md:p-4">
                    <span className={`px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full ${statusColor(p.proposalStatus)}`}>
                      {p.proposalStatus}
                    </span>
                  </td>

                  <td className="p-2 sm:p-3 md:p-4 text-xs sm:text-sm text-gray-600">{p.expectedClosureDate}</td>

                  <td className="p-2 sm:p-3 md:p-4">
                    <div className="flex gap-1.5 sm:gap-2 justify-center">
                      <button
                        onClick={() => {
                          setSelected(p);
                          setForm(p);
                          setShowEdit(true);
                        }}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteProposal(p.proposalId)}
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
      </div>

      {/* Add Proposal Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-lg sm:rounded-xl w-[90%] sm:w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <h2 className="text-lg sm:text-xl font-bold">Add New Proposal</h2>
                <button onClick={() => setShowAdd(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                  <X size={18} />
                </button>
              </div>

              <input className="border p-2 w-full mb-2 sm:mb-3 rounded-lg text-sm" placeholder="Proposal ID *"
                value={form.proposalId} onChange={(e) => setForm({ ...form, proposalId: e.target.value })} />
              <input className="border p-2 w-full mb-2 sm:mb-3 rounded-lg text-sm" placeholder="Proposal Date *"
                value={form.proposalDate} onChange={(e) => setForm({ ...form, proposalDate: e.target.value })} />
              <input className="border p-2 w-full mb-2 sm:mb-3 rounded-lg text-sm" placeholder="Proposal Title *"
                value={form.proposalTitle} onChange={(e) => setForm({ ...form, proposalTitle: e.target.value })} />
              <input type="number" className="border p-2 w-full mb-2 sm:mb-3 rounded-lg text-sm" placeholder="Proposal Value *"
                value={form.proposalValue} onChange={(e) => setForm({ ...form, proposalValue: Number(e.target.value) })} />
              <input className="border p-2 w-full mb-2 sm:mb-3 rounded-lg text-sm" placeholder="Proposal Type"
                value={form.proposalType} onChange={(e) => setForm({ ...form, proposalType: e.target.value })} />
              <input className="border p-2 w-full mb-2 sm:mb-3 rounded-lg text-sm" placeholder="Client *"
                value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} />
              <input className="border p-2 w-full mb-2 sm:mb-3 rounded-lg text-sm" placeholder="Prepared By"
                value={form.preparedBy} onChange={(e) => setForm({ ...form, preparedBy: e.target.value })} />
              <input className="border p-2 w-full mb-2 sm:mb-3 rounded-lg text-sm" placeholder="Proposal Status"
                value={form.proposalStatus} onChange={(e) => setForm({ ...form, proposalStatus: e.target.value })} />
              <input className="border p-2 w-full mb-2 sm:mb-3 rounded-lg text-sm" placeholder="Expected Closure Date"
                value={form.expectedClosureDate} onChange={(e) => setForm({ ...form, expectedClosureDate: e.target.value })} />
              <textarea className="border p-2 w-full mb-3 sm:mb-4 rounded-lg text-sm" placeholder="Remarks" rows={3}
                value={form.remarks} onChange={(e) => setForm({ ...form, remarks: e.target.value })} />

              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowAdd(false)} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-500 text-white rounded-lg text-sm">Cancel</button>
                <button onClick={addProposal} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-600 text-white rounded-lg text-sm">Add Proposal</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Proposal Modal */}
      {showEdit && selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-lg sm:rounded-xl w-[90%] sm:w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <h2 className="text-lg sm:text-xl font-bold">Edit Proposal</h2>
                <button onClick={() => { setShowEdit(false); setSelected(null); resetForm(); }} className="p-1 hover:bg-gray-100 rounded-lg">
                  <X size={18} />
                </button>
              </div>

              <input className="border p-2 w-full mb-2 sm:mb-3 rounded-lg text-sm" placeholder="Proposal ID"
                value={form.proposalId} onChange={(e) => setForm({ ...form, proposalId: e.target.value })} />
              <input className="border p-2 w-full mb-2 sm:mb-3 rounded-lg text-sm" placeholder="Proposal Date"
                value={form.proposalDate} onChange={(e) => setForm({ ...form, proposalDate: e.target.value })} />
              <input className="border p-2 w-full mb-2 sm:mb-3 rounded-lg text-sm" placeholder="Proposal Title"
                value={form.proposalTitle} onChange={(e) => setForm({ ...form, proposalTitle: e.target.value })} />
              <input type="number" className="border p-2 w-full mb-2 sm:mb-3 rounded-lg text-sm" placeholder="Proposal Value"
                value={form.proposalValue} onChange={(e) => setForm({ ...form, proposalValue: Number(e.target.value) })} />
              <input className="border p-2 w-full mb-2 sm:mb-3 rounded-lg text-sm" placeholder="Proposal Type"
                value={form.proposalType} onChange={(e) => setForm({ ...form, proposalType: e.target.value })} />
              <input className="border p-2 w-full mb-2 sm:mb-3 rounded-lg text-sm" placeholder="Client"
                value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} />
              <input className="border p-2 w-full mb-2 sm:mb-3 rounded-lg text-sm" placeholder="Prepared By"
                value={form.preparedBy} onChange={(e) => setForm({ ...form, preparedBy: e.target.value })} />
              <input className="border p-2 w-full mb-2 sm:mb-3 rounded-lg text-sm" placeholder="Proposal Status"
                value={form.proposalStatus} onChange={(e) => setForm({ ...form, proposalStatus: e.target.value })} />
              <input className="border p-2 w-full mb-2 sm:mb-3 rounded-lg text-sm" placeholder="Expected Closure Date"
                value={form.expectedClosureDate} onChange={(e) => setForm({ ...form, expectedClosureDate: e.target.value })} />
              <textarea className="border p-2 w-full mb-3 sm:mb-4 rounded-lg text-sm" placeholder="Remarks" rows={3}
                value={form.remarks} onChange={(e) => setForm({ ...form, remarks: e.target.value })} />

              <div className="flex gap-2 justify-end">
                <button onClick={() => { setShowEdit(false); setSelected(null); resetForm(); }} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-500 text-white rounded-lg text-sm">Cancel</button>
                <button onClick={editProposal} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-600 text-white rounded-lg text-sm">Update Proposal</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProposalManagement;