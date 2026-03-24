import React, { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";

// ================= Types =================
interface RateHistory {
  id: number;
  vehicle: "Two Wheeler" | "Four Wheeler";
  rate: number;
  from: string;
  to: string;
  status: "Active" | "Inactive";
}

// ================= Mock Data =================
const data: RateHistory[] = [
  { id: 1, vehicle: "Two Wheeler", rate: 4, from: "01 Jan 2025", to: "31 Mar 2025", status: "Inactive" },
  { id: 2, vehicle: "Two Wheeler", rate: 5, from: "01 Apr 2025", to: "Present", status: "Active" },
  { id: 3, vehicle: "Four Wheeler", rate: 10, from: "01 Jan 2025", to: "30 Jun 2025", status: "Inactive" },
  { id: 4, vehicle: "Four Wheeler", rate: 12, from: "01 Jul 2025", to: "Present", status: "Active" }
];

export default function RateHistoryPage(): React.ReactElement {

  const [selected, setSelected] = useState<RateHistory | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [vehicleFilter, setVehicleFilter] = useState<string>("All Vehicles");
  const [statusFilter, setStatusFilter] = useState<string>("All Status");

  // ================= KPI Logic =================
  const kpis = useMemo(() => {
    const total = data.length;
    const active = data.filter(d => d.status === "Active").length;
    const inactive = total - active;
    const avgRate = total ? data.reduce((s, d) => s + d.rate, 0) / total : 0;

    return { total, active, inactive, avgRate };
  }, []);

  // ================= Filter Logic =================
  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Search filter
      const matchesSearch = searchTerm === "" || 
        item.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.rate.toString().includes(searchTerm) ||
        item.status.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Vehicle filter
      const matchesVehicle = vehicleFilter === "All Vehicles" || item.vehicle === vehicleFilter;
      
      // Status filter
      const matchesStatus = statusFilter === "All Status" || item.status === statusFilter;
      
      return matchesSearch && matchesVehicle && matchesStatus;
    });
  }, [searchTerm, vehicleFilter, statusFilter]);

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Rate Change History</h1>
          <p className="text-gray-500 text-sm">Manage rate change history</p>
        </div>
      </div>

      {/* ================= KPI Cards ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">

        {/* Total Rate Changes */}
        <div className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition border overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-blue-300"></div>
          <div className="p-3">
            <span className="text-[10px] text-gray-400">Changes</span>
            <h2 className="text-xl font-bold text-gray-800">{kpis.total}</h2>
            <p className="text-[10px] text-gray-500">Total rate updates</p>
          </div>
        </div>

        {/* Active Rates */}
        <div className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition border overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-green-500 to-green-300"></div>
          <div className="p-3">
            <span className="text-[10px] text-gray-400">Current</span>
            <h2 className="text-xl font-bold text-green-600">{kpis.active}</h2>
            <p className="text-[10px] text-gray-500">Currently applied</p>
          </div>
        </div>

        {/* Historical Rates */}
        <div className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition border overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-red-500 to-red-300"></div>
          <div className="p-3">
            <span className="text-[10px] text-gray-400">History</span>
            <h2 className="text-xl font-bold text-red-600">{kpis.inactive}</h2>
            <p className="text-[10px] text-gray-500">Previous rates</p>
          </div>
        </div>

        {/* Latest Avg Rate */}
        <div className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition border overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-500 to-purple-300"></div>
          <div className="p-3">
            <span className="text-[10px] text-gray-400">Latest</span>
            <h2 className="text-xl font-bold text-purple-600">
              ₹ {kpis.avgRate.toFixed(1)}
            </h2>
            <p className="text-[10px] text-gray-500">Current avg/km</p>
          </div>
        </div>

      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex items-center border px-3 py-2 rounded-lg">
          <Search size={16} className="mr-2 text-gray-400" />
          <input 
            placeholder="Search..." 
            className="outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select 
          className="border px-3 py-2 rounded-lg text-sm"
          value={vehicleFilter}
          onChange={(e) => setVehicleFilter(e.target.value)}
        >
          <option>All Vehicles</option>
          <option>Two Wheeler</option>
          <option>Four Wheeler</option>
        </select>

        <select 
          className="border px-3 py-2 rounded-lg text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <button 
          className="flex items-center gap-2 border px-3 py-2 rounded-lg text-sm"
          onClick={() => {
            setSearchTerm("");
            setVehicleFilter("All Vehicles");
            setStatusFilter("All Status");
          }}
        >
          <Filter size={16} /> Reset Filters
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4">Vehicle</th>
              <th className="p-4">Rate</th>
              <th className="p-4">From</th>
              <th className="p-4">To</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map(item => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">{item.vehicle}</td>
                  <td className="p-4 font-medium">₹{item.rate}</td>
                  <td className="p-4">{item.from}</td>
                  <td className="p-4">{item.to}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      item.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-200 text-gray-600"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => setSelected(item)} 
                      className="text-blue-600 font-medium hover:text-blue-800 transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Drawer */}
      {selected && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSelected(null)}
          />
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-6 z-50 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">{selected.vehicle} History</h2>

            <div className="space-y-5">
              {data
                .filter(d => d.vehicle === selected.vehicle)
                .slice()
                .reverse()
                .map(d => (
                  <div key={d.id} className="pl-5 border-l-2 border-blue-500">
                    <p className="font-medium">{d.from} - {d.to}</p>
                    <p className="text-sm text-gray-600">₹{d.rate}/km</p>
                    <p className="text-xs text-gray-400">{d.status}</p>
                  </div>
                ))}
            </div>

            <button
              onClick={() => setSelected(null)}
              className="mt-6 w-full bg-gray-200 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
}